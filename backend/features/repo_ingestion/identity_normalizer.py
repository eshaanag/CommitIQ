import re
from pathlib import Path


class ContributorIdentityResolver:
    """
    Resolves duplicate contributor identities to canonical forms using .mailmap
    and basic normalization rules.
    """

    def __init__(self, repo_path: Path | None = None):
        self._raw_to_canonical: dict[tuple[str, str | None], tuple[str, str | None]] = {}
        self._repo_path = repo_path
        self._mailmap_loaded = False
        if repo_path is not None:
            self._load_mailmap(repo_path)

    def _normalize_email(self, email: str | None) -> str | None:
        if email is None:
            return None
        return email.strip().lower() or None

    def _normalize_name(self, name: str) -> str:
        return re.sub(r"\s+", " ", name.strip()) or "unknown"

    def _normalize_canonical_name(self, name: str) -> str:
        return re.sub(r"\s+", " ", name.strip())

    def _canonical(self, name: str, email: str | None) -> tuple[str, str | None]:
        return (self._normalize_name(name), self._normalize_email(email))

    def _canonical_identity(self, name: str, email: str | None) -> tuple[str, str | None]:
        """Build a canonical identity that allows empty names when intentional."""
        return (self._normalize_canonical_name(name), self._normalize_email(email))

    def _load_mailmap(self, repo_path: Path) -> None:
        mailmap_path = repo_path / ".mailmap"
        if not mailmap_path.exists():
            self._mailmap_loaded = True
            return

        try:
            content = mailmap_path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            self._mailmap_loaded = True
            return

        for line in content.splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue

            canonical_name, canonical_email, raw_name, raw_email = self._parse_mailmap_line(line)
            key = self._canonical(raw_name, raw_email)
            canonical = self._canonical_identity(canonical_name, canonical_email)
            self._raw_to_canonical[key] = canonical

        self._mailmap_loaded = True

    @staticmethod
    def _tokenize_mailmap_line(line: str) -> list[str]:
        """Tokenize a mailmap line preserving <email> tokens as single units."""
        return re.findall(r"<[^>]+>|[^<\s]+", line)

    def _parse_mailmap_line(self, line: str):
        """
        Parse a .mailmap line into (canonical_name, canonical_email, raw_name, raw_email).

        Supports all standard .mailmap formats per git-shortlog(1):
        1. Proper Name <proper@email> Commit Name <commit@email>
        2. Proper Name <proper@email> <commit@email>
        3. Proper Name <proper@email> Commit Name
        4. <proper@email> Commit Name <commit@email>
        5. <proper@email> Commit Name
        6. Commit Name <commit@email>
        """
        tokens = self._tokenize_mailmap_line(line.strip())
        if len(tokens) < 2:
            return "unknown", None, "unknown", None

        emails = [t for t in tokens if t.startswith("<")]
        names = [t for t in tokens if not t.startswith("<")]

        num_emails = len(emails)
        num_names = len(names)

        if num_emails == 2 and num_names >= 1:
            # Formats 1, 2 or 4: two email addresses
            first_email_idx = tokens.index(emails[0])
            canonical_name_parts = [t for t in tokens[:first_email_idx] if not t.startswith("<")]
            raw_name_parts = [t for t in tokens[first_email_idx + 1 :] if not t.startswith("<")]
            canonical_name = " ".join(canonical_name_parts) if canonical_name_parts else ""
            raw_name = " ".join(raw_name_parts) if raw_name_parts else ""
            return canonical_name, emails[0][1:-1], raw_name, emails[1][1:-1]

        elif num_emails == 0 and num_names >= 2:
            # Name-only mapping: Proper Name Commit Name
            return names[0], None, " ".join(names[1:]), None

        elif num_emails == 1 and num_names >= 1:
            # Formats 3, 5 & 6: one email address
            email_idx = tokens.index(emails[0])
            before = " ".join(t for t in tokens[:email_idx] if not t.startswith("<"))
            after = " ".join(t for t in tokens[email_idx + 1 :] if not t.startswith("<"))
            email_val = emails[0][1:-1]

            if before and after:
                # Format 3: Proper Name <proper@email> Commit Name
                return before, email_val, after, None
            elif after and not before:
                # Format 5: <proper@email> Commit Name
                return "", email_val, after, None
            else:
                # Format 6: Commit Name <commit@email>
                return "", "", before, email_val

        return "unknown", None, "unknown", None

    def resolve(self, name: str, email: str | None) -> tuple[str, str | None]:
        normalized_key = self._canonical(name, email)
        if normalized_key in self._raw_to_canonical:
            return self._raw_to_canonical[normalized_key]
        return normalized_key

    def resolve_many(
        self, identities: list[tuple[str, str | None]]
    ) -> dict[tuple[str, str | None], tuple[str, str | None]]:
        return {identity: self.resolve(*identity) for identity in identities}
