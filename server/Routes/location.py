from flask import Blueprint, request, jsonify

# Blueprint for location routes
locationBp = Blueprint('location', __name__)

# Last known location stored in memory
lastLocation = {"latitude": None, "longitude": None}

# This SocketIO instance will be initialized in app.py
socketIo = None

@locationBp.route('/updateLocation', methods=['POST'])
def updateLocation():
    global lastLocation
    data = request.get_json()
    if "latitude" in data and "longitude" in data:
        # Convert keys to camelCase for consistency
        lastLocation = {
            "latitude": data["latitude"],
            "longitude": data["longitude"]
        }
        # Emit location update via Socket.IO to client
        if socketIo:
            socketIo.emit("locationUpdate", lastLocation)
        #return the success message to the drone
        return jsonify({"status": "success"}), 200
    #return the failure message to the drone
    return jsonify({"status": "error", "message": "Invalid data"}), 400

@locationBp.route('/getCurrentLocation', methods=['GET'])
def getLocation():
    return jsonify(lastLocation), 200