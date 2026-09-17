import requests

NOAA_URL = "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"


def fetch_kp_index():
    try:
        response = requests.get(NOAA_URL, timeout=10)
        response.raise_for_status()

        data = response.json()

        latest = data[-1]

        if isinstance(latest, dict):
            return float(latest["Kp"])

        return float(latest[1])

    except Exception as e:
        print("KP ERROR:", e)
        return None


def fetch_kp_history():
    try:
        response = requests.get(NOAA_URL, timeout=10)
        response.raise_for_status()

        data = response.json()
        print("Total Records:", len(data))
        print("Last Record:", data[-1])

        labels = []
        values = []

        for row in data[-10:]:

            if isinstance(row, dict):
                labels.append(row["time_tag"][11:16])
                values.append(float(row["Kp"]))

            else:
                labels.append(row[0][11:16])
                values.append(float(row[1]))

        return {
            "labels": labels,
            "values": values
        }

    except Exception as e:
        print("HISTORY ERROR:", e)

        return {
            "labels": [],
            "values": []
        }