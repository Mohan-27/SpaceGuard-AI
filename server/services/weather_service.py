from services.nasa_service import fetch_kp_index
from services.ai_service import analyze_space_weather
import traceback


def get_space_weather():
    try:
        kp_index = fetch_kp_index()
        print("KP INDEX =", kp_index)

        if kp_index is None:
            return {
                "solar_activity": "Unknown",
                "kp_index": "Unavailable",
                "risk_level": "Unknown",
                "recommendation": "Unable to fetch live space weather data."
            }

        if kp_index <= 3:
            solar_activity = "Low"
        elif kp_index <= 5:
            solar_activity = "Moderate"
        else:
            solar_activity = "High"

        ai_result = analyze_space_weather(kp_index)

        return {
            "solar_activity": solar_activity,
            "kp_index": kp_index,
            "risk_score": ai_result["risk_score"],
            "risk_level": ai_result["risk_level"],
            "recommendation": ai_result["recommendation"]
        }

    except Exception:
        traceback.print_exc()
        return {
            "error": "Weather Service Failed"
        }