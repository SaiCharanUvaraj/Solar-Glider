import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Config values
port = int(os.getenv("PORT", 5000))
debug = os.getenv("DEBUG", "False").lower() == "true"
host = os.getenv("HOST", "127.0.0.1")

# Use localhost URL in debug, production URL otherwise
if debug:
    server = f"http://{host}:{port}"
else:
    server = os.getenv("SERVER_URL")
