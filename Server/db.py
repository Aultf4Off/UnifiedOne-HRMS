# server/db.py

import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv

# Load .env from the server folder
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not configured")


def get_connection():
    return psycopg.connect(DATABASE_URL)