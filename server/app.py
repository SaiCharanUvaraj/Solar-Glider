from flask import Flask
from flask_socketio import SocketIO, emit
import configs

app = Flask(__name__)
app.config['SECRET_KEY'] = configs.secretKey

# Initialize SocketIO with async worker + proper CORS
socketio = SocketIO(
    app,
    async_mode="eventlet",   # ensures compatibility with WebSocket on Render
    cors_allowed_origins=configs.allowedOrigins  # comes from .env
)

droneStatus = {"location": []}

@socketio.on("DroneStatus")
def handleStatusUpdate(data):
    global droneStatus
    print("Received from drone:", data)
    droneStatus = data
    emit("DroneStatus", droneStatus, broadcast=True)

@app.route('/')
def root():
    return "Flask-SocketIO server for Solar Glider is running", 200

if __name__ == "__main__":
    # Run with eventlet to avoid worker timeout on SocketIO
    socketio.run(
        app,
        host=configs.host,
        port=configs.port,
        debug=configs.debug
    )