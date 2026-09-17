🚀 SpaceGuard AI
AI-Powered Space Weather Monitoring & Satellite Safety Dashboard
📖 Project Overview

SpaceGuard AI is an AI-powered web application designed to monitor real-time space weather conditions and provide intelligent insights for satellite operations. The system collects live data from trusted space agencies such as NOAA and NASA, analyzes geomagnetic activity using the KP Index, tracks the International Space Station (ISS), and provides AI-generated recommendations through a chatbot powered by Google Gemini AI.

The dashboard presents all critical space weather information in a modern and interactive interface, making it useful for students, researchers, and anyone interested in space science.

🎯 Problem Statement

Space weather events such as solar flares and geomagnetic storms can disrupt:

Satellite communication
GPS navigation
Radio communication
Power grids
Aviation systems

Most available space weather information is spread across multiple websites and is difficult for beginners to understand.

SpaceGuard AI solves this problem by combining multiple live space APIs into a single AI-powered dashboard.

🎯 Objectives
Monitor real-time space weather.
Display the latest KP Index.
Track the International Space Station.
Show NASA Astronomy Picture of the Day.
Predict satellite risk levels.
Provide AI-powered explanations.
Help users understand space weather easily.
🌍 Why This Project?

Space weather directly affects modern technology.

Examples include:

GPS accuracy
Satellite internet
Mobile communications
Weather forecasting satellites
Navigation systems
Military communication
Airline routes

Understanding these conditions helps organizations prepare for potential disruptions.

🚀 Key Features
🌍 1. Live Space Weather

Displays:

Solar Activity
KP Index
Space Weather Status

Data Source:

NOAA Space Weather Prediction Center
📈 2. KP Index Chart

Displays:

Last KP Index values
Interactive Line Chart
Historical trend

Helps users understand changes in geomagnetic activity.

⚠ 3. Risk Analysis

Automatically calculates:

Risk Score
Risk Level

Categories:

Low
Medium
High
Critical
🤖 4. AI Recommendation

Based on the KP Index, the system recommends actions such as:

Safe for satellite operations
Monitor communication
Prepare backup systems
Activate satellite safe mode
🛰 5. ISS Live Tracker

Shows:

Latitude
Longitude
Altitude
Velocity
Visibility

Updated from a live ISS API.

🗺 6. ISS Live Map

Displays the current ISS position on an interactive world map.

🌌 7. NASA Astronomy Picture of the Day (APOD)

Shows:

Daily NASA image
Image title
Explanation
Scientific information
🤖 8. AI Chat Assistant

Powered by Google Gemini AI.

Users can ask questions such as:

What is the KP Index?
Explain today's NASA picture.
What causes solar storms?
How do satellites work?
Why are geomagnetic storms dangerous?
📊 9. Satellite Health Monitor

Displays simulated health status of:

GPS Satellites
Communication Satellites
Weather Satellites
Navigation Satellites
🔄 10. Refresh Data

Allows users to instantly fetch the latest live data.

🛠 Technologies Used
Frontend
React.js
Vite
JavaScript (ES6)
HTML5
CSS3
Axios
Chart.js
React Chart.js 2
React Leaflet
Leaflet Maps
Backend
Python
FastAPI
Uvicorn
Requests
Python Dotenv
Artificial Intelligence
Google Gemini AI API
Prompt Engineering
APIs Used
NOAA Space Weather API

Purpose:

Live KP Index
Geomagnetic Activity
NASA APOD API

Purpose:

Astronomy Picture of the Day
WhereTheISS API

Purpose:

Live ISS Position
Velocity
Altitude
Development Tools
Visual Studio Code
Git
GitHub
Postman
Swagger UI
Python Virtual Environment (venv)

🏗 Project Architecture
React Dashboard
        │
        │
Axios API Calls
        │
        ▼
FastAPI Backend
        │
 ┌──────┼─────────┐
 │      │         │
 ▼      ▼         ▼
NOAA   NASA     ISS API
 │       │         │
 └──────┼─────────┘
        │
        ▼
 Risk Analysis Engine
        │
        ▼
 Gemini AI Assistant
        │
        ▼
 Dashboard UI


 📂 Project Structure
SpaceGuard-AI
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── services
│   │   ├── nasa_service.py
│   │   ├── weather_service.py
│   │   ├── iss_service.py
│   │   ├── gemini_service.py
│   │   └── prediction_service.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
⚙ Working Process
User opens the dashboard.
React requests data from FastAPI.
FastAPI calls:
NOAA API
NASA API
ISS API
Backend analyzes the KP Index.
Risk Analysis Engine calculates the risk score.
Gemini AI answers user questions.
React displays all information in the dashboard.

📊 Risk Calculation

Risk Score Formula:

Risk Score = (KP Index / 9) × 100

Example:

KP Index = 1.33

Risk Score = 14.78%

Risk Levels:

Score	Level
0–29	Low
30–59	Medium
60–79	High
80–100	Critical
🌟 Advantages
Live space weather monitoring
Easy-to-understand interface
AI-powered explanations
Real-time ISS tracking
Educational platform
Supports research and learning
Modern dashboard
Fast performance
🎓 Educational Applications

Suitable for:

AI & ML students
Space science students
Astronomy enthusiasts
Engineering projects
College demonstrations
Research presentations
🌍 Real-World Applications
Space agencies
Satellite communication companies
GPS service providers
Airline operations
Disaster management
Scientific research
Educational institutions
🚧 Current Limitations
Uses free public APIs, which may have rate limits or temporary downtime.
Satellite health values are currently simulated rather than connected to real telemetry.
No user authentication or database integration.
Internet connection is required for live data retrieval.
🔮 Future Improvements
User Login & Authentication
MongoDB Database
Historical Data Storage
AI-Based Space Weather Prediction
Push Notifications
Voice Assistant
Weather Forecast for Space Conditions
Multi-language Support
Mobile Application
PDF Report Generation
Admin Dashboard
Cloud Deployment
Machine Learning Model for Storm Prediction
Email Alerts
Real-Time Space News Feed
📸 Screenshots

Add screenshots of:

Home Dashboard
KP Index Chart
ISS Tracker
ISS Map
NASA APOD
AI Chat Assistant
Satellite Health Monitor
Risk Analysis Card
🚀 Installation
Clone Repository
git clone https://github.com/yourusername/SpaceGuard-AI.git
Backend
cd server

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
Frontend
cd client

npm install

npm run dev

📌 API Endpoints
Method	Endpoint	Description
GET	/	Home
GET	/space-weather	Live Space Weather
GET	/kp-history	KP Index History
GET	/apod	NASA APOD
GET	/iss	ISS Live Data
POST	/chat	AI Chat
👨‍💻 Developer

Boya Mohan
B.Tech – Artificial Intelligence & Machine Learning
VEMU Institute of Technology (Autonomous)