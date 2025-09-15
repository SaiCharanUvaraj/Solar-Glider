import requests, time, os
import configs
import math

endPoint = configs.server + "/updateLocation"

def send_location(lat, lng):
    data = {"latitude": lat, "longitude": lng}
    print(f"Updating location: {lat}, {lng}")
    try:
        requests.post(endPoint, json=data, timeout=5)
    except Exception as e:
        print("Error in sending location:", e)

# Starting coordinates (e.g., Bangalore)
lat, lng = 12.9716, 77.5946

# Simulation parameters
step = 0.0001   # how much to move each time (~11m per step in lat)
direction = 0   # angle in radians (0 = east, π/2 = north)

while True:
    # Simple circular motion simulation
    lat += step * math.cos(direction)
    lng += step * math.sin(direction)

    send_location(round(lat, 6), round(lng, 6))

    # Change direction slightly to simulate turning
    direction += 0.1
    if direction > 2 * math.pi:
        direction = 0

    time.sleep(2)
