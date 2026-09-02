from backend.features.repo_ingestion.identity_normalizer import ContributorIdentityResolver


class TestContributorIdentityResolver:
    """Tests for ContributorIdentityResolver covering .mailmap, normalization, and edge cases."""

    def test_no_mailmap_returns_normalized_identity(self):
        resolver = ContributorIdentityResolver()
        assert resolver.resolve("John Doe", "john@example.com") == ("John Doe", "john@example.com")
        assert resolver.resolve("Jane Doe", None) == ("Jane Doe", None)

    def test_mailmap_maps_old_email_to_new_identity(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "John New <john.new@company.com> John Old <john.old@personal.com>\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", "john.old@personal.com") == (
            "John New",
            "john.new@company.com",
        )

    def test_mailmap_maps_without_email(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "John Canonical <john@company.com> Johnny\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        # Should map by name only; GitHub will usually provide no email or the same email abstraction here.
        assert resolver.resolve("Johnny", None) == ("John Canonical", "john@company.com")

    def test_mailmap_two_part_canonical_email_form(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "<john@new.com> John Old <john@old.com>\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", "john@old.com") == ("", "john@new.com")

    def test_mailmap_three_part_form(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "John Canonical <john@new.com> John Old \n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", None) == ("John Canonical", "john@new.com")

    def test_normalize_emails_case_insensitive(self):
        resolver = ContributorIdentityResolver()
        assert resolver.resolve("User", "User@Example.COM") == ("User", "user@example.com")

    def test_normalize_emails_strip_whitespace(self):
        resolver = ContributorIdentityResolver()
        assert resolver.resolve(" User ", "\tjohn@example.com\n") == ("User", "john@example.com")

    def test_unknown_email_returns_none(self):
        resolver = ContributorIdentityResolver()
        identity = resolver.resolve("User", " ")
        assert identity[1] is None

    def test_empty_name_returns_unknown(self):
        resolver = ContributorIdentityResolver()
        assert resolver.resolve("  ", "john@example.com") == ("unknown", "john@example.com")

    def test_mailmap_comments_and_blank_lines_ignored(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "# This is a comment\n\n"
            "John New <john.new@company.com> John Old <john.old@personal.com>\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", "john.old@personal.com") == (
            "John New",
            "john.new@company.com",
        )

    def test_mailmap_invalid_short_lines_ignored(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "bad\n" "John New <john.new@company.com> John Old <john.old@personal.com>\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", "john.old@personal.com") == (
            "John New",
            "john.new@company.com",
        )

    def test_distinct_contributors_do_not_merge(self):
        resolver = ContributorIdentityResolver()
        a = resolver.resolve("Alice", "alice@example.com")
        b = resolver.resolve("Bob", "bob@example.com")
        assert a != b

    def test_same_contributor_repeated_emails_map_to_same_identity(self):
        resolver = ContributorIdentityResolver()
        assert resolver.resolve("Alice", "alice@work.com") == resolver.resolve(
            "Alice", "alice@work.com"
        )

    def test_mailmap_unicode_name(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "José García <jose@new.com> Jose Garcia <jose@old.com>\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("Jose Garcia", "jose@old.com") == ("José García", "jose@new.com")

    def test_mailmap_only_canonical_email_provided(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "John New <john.new@company.com> John Old\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", None) == ("John New", "john.new@company.com")

    def test_oserror_reading_mailmap_does_not_raise(self, tmp_path, monkeypatch):
        def bad_read(*args, **kwargs):
            raise OSError("permission denied")

        monkeypatch.setattr("pathlib.Path.read_text", bad_read)
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("User", "user@example.com") == ("User", "user@example.com")

    def test_resolve_many_returns_raw_to_canonical_mapping(self):
        resolver = ContributorIdentityResolver()
        identities = [
            ("Alice", "alice@work.com"),
            ("Alice", "alice@personal.com"),
            ("Bob", "bob@example.com"),
        ]
        mapping = resolver.resolve_many(identities)
        assert mapping[("Alice", "alice@work.com")] == ("Alice", "alice@work.com")
        assert mapping[("Alice", "alice@personal.com")] == ("Alice", "alice@personal.com")

    def test_mailmap_normalizes_whitespace_in_email(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "John New <john.new@company.com> John Old <john.old@personal.com>\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", "  john.old@personal.com  ") == (
            "John New",
            "john.new@company.com",
        )

    def test_mailmap_preserves_canonical_name_when_no_canonical_email(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "John Canonical <john@canonical.com> John Old\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        assert resolver.resolve("John Old", None) == ("John Canonical", "john@canonical.com")
        # Also verify distinct contributors don't merge
        assert resolver.resolve("Jane Doe", None) == ("Jane Doe", None)
        assert resolver.resolve("Someone Else", "other@example.com") == (
            "Someone Else",
            "other@example.com",
        )

    def test_normalize_collapses_duplicate_spaces_in_name(self):
        resolver = ContributorIdentityResolver()
        assert resolver.resolve("John   Doe", "john@example.com") == (
            "John Doe",
            "john@example.com",
        )
        assert resolver.resolve("  Jane    Doe  ", "jane@example.com") == (
            "Jane Doe",
            "jane@example.com",
        )

    def test_normalize_collapses_duplicate_spaces_in_mailmap_lookup(self, tmp_path):
        mailmap = tmp_path / ".mailmap"
        mailmap.write_text(
            "John New <john.new@company.com> John Old <john.old@personal.com>\n",
            encoding="utf-8",
        )
        resolver = ContributorIdentityResolver(tmp_path)
        # Even with extra spaces in the input, the normalized key should match
        assert resolver.resolve("John   Old", "  john.old@personal.com  ") == (
            "John New",
            "john.new@company.com",
        )
