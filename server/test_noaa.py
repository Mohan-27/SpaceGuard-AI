import requests

url = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"

try:
    response = requests.get(url, timeout=20)

    print("Status Code:", response.status_code)
    print("Content Type:", response.headers.get("Content-Type"))
    print("Length:", len(response.text))

    print("\nFirst 300 characters:\n")
    print(response.text[:300])

except Exception as e:
    print("ERROR:", e)