from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
import configs

app = Flask(__name__)

# Set secret key
app.config['SECRET_KEY'] = configs.secretKey

# Initialize socketio
socketio = SocketIO(app, cors_allowed_origins=configs.allowedOrigins)

droneStatus = {"location":[]}

@socketio.on("DroneStatus")
def handleStatusUpdate(data):
    global droneStatus
    print("Received from drone:", data)
    droneStatus = data
    emit("DroneStatus", droneStatus, broadcast=True)

@app.route('/')
def root():
    return "Flask-SocketIO server for Solar glider is running", 200

if __name__ == "__main__":
    socketio.run(
        app,
        host=configs.host,
        port=configs.port,
        debug=configs.debug
    )