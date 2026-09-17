def analyze_space_weather(kp_index):

    # Calculate risk score (0-100)
    risk_score = min((kp_index / 9) * 100, 100)

    # Determine risk level
    if risk_score < 30:
        risk_level = "Low"
        recommendation = "Satellite operations are safe."

    elif risk_score < 60:
        risk_level = "Medium"
        recommendation = "Monitor satellite communication."

    elif risk_score < 80:
        risk_level = "High"
        recommendation = "Prepare backup communication systems."

    else:
        risk_level = "Critical"
        recommendation = "Activate satellite safe mode immediately."

    return {
        "risk_score": round(risk_score, 2),
        "risk_level": risk_level,
        "recommendation": recommendation
    }