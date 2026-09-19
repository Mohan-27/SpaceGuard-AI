from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.apod_service import fetch_apod

# Import Services
from services.weather_service import get_space_weather
from services.nasa_service import fetch_kp_history

from services.satellite_service import get_iss_location

from pydantic import BaseModel
from services.gemini_service import ask_gemini

# ==========================================
# Create FastAPI Application
# ==========================================
app = FastAPI(
    title="SpaceGuard AI API",
    version="1.0"
)

class ChatRequest(BaseModel):
    question: str


# ==========================================
# Enable CORS (Allow React Frontend)
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://spaceguard-ai-eight.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Home Route
# ==========================================
@app.get("/")
def home():
    return {
        "project": "SpaceGuard AI",
        "status": "Backend Connected Successfully",
        "version": "1.0"
    }

# ==========================================
# Current Space Weather
# ==========================================
@app.get("/space-weather")
def space_weather():
    return get_space_weather()

# ==========================================
# KP Index History
# ==========================================
@app.get("/kp-history")
def kp_history():
    return fetch_kp_history()

@app.get("/apod")
def get_apod():
    return fetch_apod()

@app.get("/iss")
def iss():
    return get_iss_location()

@app.post("/chat")
def chat(request: ChatRequest):
    answer = ask_gemini(request.question)
    return {"answer": answer}