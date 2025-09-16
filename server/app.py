from flask import Flask
from flask_socketio import SocketIO
import configs

app = Flask(__name__)

# Set secret key from env (important for sessions & security)
app.config['SECRET_KEY'] = configs.secretKey

# Initialize socketio with secure CORS
socketio = SocketIO(app, cors_allowed_origins=configs.allowedOrigins)

# Import the blueprints
from Routes.location import locationBp
app.register_blueprint(locationBp)

# Pass socketio to the blueprints
import Routes.location as location
location.socketio = socketio

# Base route
@app.route('/')
def home():
    return "Flask-SocketIO server for Solar glider is running", 200

# Server execution
if __name__ == "__main__":
    socketio.run(
        app,
        host=configs.host,   # from .env -> 127.0.0.1 in dev, 0.0.0.0 in prod
        port=configs.port,   # default 8000
        debug=configs.debug  # True in dev, False in prod
    )
    print("Server is running on", configs.server)