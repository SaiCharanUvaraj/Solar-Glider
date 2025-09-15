from flask import Flask
from flask_socketio import SocketIO
import configs

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Import the blueprints
from Routes.location import locationBp
app.register_blueprint(locationBp)

# Pass socketio to the blueprints
import Routes.location as location
location.socketio = socketio

#base route
@app.route('/')
def home():
    return "Flask-SocketIO server is running", 200

#server execution
if __name__ == "__main__":
    socketio.run(app,  host=configs.host, port=configs.port, debug=configs.debug)
    print("Server is running on",configs.server)
