import requests

ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544"


def get_iss_location():
    try:
        response = requests.get(
            ISS_URL,
            timeout=20,
            headers={
                "User-Agent": "SpaceGuardAI/1.0"
            }
        )

        response.raise_for_status()

        data = response.json()

        return {
            "name": data["name"].upper(),
            "latitude": round(data["latitude"], 4),
            "longitude": round(data["longitude"], 4),
            "altitude": round(data["altitude"], 2),
            "velocity": round(data["velocity"], 2),
            "visibility": data["visibility"]
        }

    except Exception as e:
        print("ISS ERROR:", e)

        return {
            "name": "ISS",
            "latitude": 0,
            "longitude": 0,
            "altitude": 0,
            "velocity": 0,
            "visibility": "Unavailable"
        }