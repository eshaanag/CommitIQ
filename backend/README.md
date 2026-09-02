# OpenPrep AI Backend — Local Setup Guide

Follow these instructions to configure, install, and initialize the core Python FastAPI framework locally on your workstation.

## Prerequisites
- **Python 3.10 or higher** installed on your operating system.
- Access to a terminal interface.

## Installation & Setup Steps

### 1. Initialize Virtual Environment
It is highly recommended to isolate your dependencies within a localized virtual environment wrapper:
```bash
# Navigate to the backend application root
cd backend

# Create a virtual environment directory named .venv
python -m venv .venv

# Activate the virtual environment context
# On macOS / Linux:
source .venv/bin/activate
# On Windows (Command Prompt):
.venv\Scripts\activate.bat
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
```

### 2. Install Project Dependencies
Use `pip` to sync all external package dependencies declared in the requirements manifest:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Start the FastAPI Server Engine
Launch the server stack locally utilizing `uvicorn` as the ASGI production server:
```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

#### Key Parameter Breakdown:
- `main:app`: Instructs the engine to look inside `main.py` for the initialized `app = FastAPI()` object identifier.
- `--reload`: Enables hot-reloading watchers; modifications to code files will instantly recycle the server process.
- `--host` / `--port`: Binds the server loop locally to address `http://127.0.0.1:8000`.

### 4. Verify Active Core Routing Paths
Once operational, open your preferred web browser and query these structural links to test active execution loops:
- **API Endpoint:** `http://127.0.0.1:8000`
- **Interactive OpenAPI Documentation:** `http://127.0.0.1:8000/docs`
