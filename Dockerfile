FROM python:3.11-slim
RUN groupadd -g 10001 commitiq && useradd -u 10000 -g commitiq commitiq
WORKDIR /app
COPY . .
RUN pip install -r backend/requirements.txt
USER commitiq
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0"]