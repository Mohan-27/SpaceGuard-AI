import requests

API_KEY = "6fvjHBmFuEHxPCZr9b5LJ6eTbedkSRinUB1PHU6b"

APOD_URL = f"https://api.nasa.gov/planetary/apod?api_key={API_KEY}"

def fetch_apod():
    response = requests.get(APOD_URL)
    response.raise_for_status()
    return response.json()