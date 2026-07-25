# ==========================================
# Frontend Base
# ==========================================
FROM node:20-alpine AS frontend-base
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .

# ==========================================
# Frontend Build (Production)
# ==========================================
FROM frontend-base AS frontend-build
RUN npm run build

# ==========================================
# Frontend Nginx (Production)
# ==========================================
FROM nginx:alpine AS frontend-prod
COPY --from=frontend-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ==========================================
# Backend
# ==========================================
FROM python:3.11-slim AS backend
WORKDIR /app
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ ./backend/
EXPOSE 8000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
