import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Satellite, 
  MapPin, 
  RefreshCw, 
  Clock,
  Maximize2,
  Minimize2,
  Navigation,
  Activity
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import API from "../services/api";
import "../style/ISSMap.css";

// Fix for default markers in Leaflet with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom ISS icon
const createISSIcon = () => {
  return L.divIcon({
    className: 'iss-marker',
    html: `
      <div class="iss-marker-wrapper">
        <div class="iss-marker-pulse"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="iss-marker-icon">
          <path d="M13 7L9 3L5 7l4 4z"/>
          <path d="M17 11l4-4-4-4-4 4z"/>
          <path d="M3 21h18"/>
          <path d="M5 21V7"/>
          <path d="M19 21V7"/>
          <path d="M9 21v-4"/>
          <path d="M15 21v-4"/>
        </svg>
        <div class="iss-marker-glow"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    className: 'iss-marker-container'
  });
};

// Map controller component for animations
function MapController({ center, zoom }) {
  const map = useMap();
  const prevCenterRef = useRef(center);

  useEffect(() => {
    if (center && prevCenterRef.current) {
      // Smooth fly to new position
      map.flyTo(center, zoom || 3, {
        duration: 2,
        easeLinearity: 0.25
      });
    }
    prevCenterRef.current = center;
  }, [center, map, zoom]);

  return null;
}

function ISSMap() {
  const [iss, setIss] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [showOrbit, setShowOrbit] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    loadISS();
    const interval = setInterval(loadISS, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadISS = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/iss");
      setIss(res.data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load ISS location");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleOrbit = () => {
    setShowOrbit(!showOrbit);
  };

  // Format timestamp
  const formatTime = (date) => {
    if (!date) return "Just now";
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  if (isLoading && !iss) {
    return (
      <motion.div 
        className="issmap-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-large"></div>
        <p>Loading ISS Location...</p>
        <span className="loading-sub">Tracking International Space Station</span>
      </motion.div>
    );
  }

  if (error || !iss) {
    return (
      <motion.div 
        className="issmap-error"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="error-icon-wrapper">
          <Satellite size={48} className="error-icon" />
        </div>
        <h3>Location Unavailable</h3>
        <p>{error || "No ISS data available"}</p>
        <button className="retry-btn" onClick={loadISS}>
          <RefreshCw size={16} />
          <span>Retry</span>
        </button>
      </motion.div>
    );
  }

  const position = [iss.latitude, iss.longitude];
  const issIcon = createISSIcon();

  return (
    <motion.div 
      className={`issmap-container ${isFullscreen ? 'fullscreen' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-glow-effect"></div>

      {/* Header */}
      <div className="issmap-header">
        <div className="header-left">
          <div className="header-icon-wrapper">
            <Navigation size={22} className="header-icon" />
          </div>
          <div>
            <h3 className="issmap-title">Live ISS Location</h3>
            <p className="issmap-subtitle">International Space Station Tracker</p>
          </div>
        </div>
        <div className="header-right">
          <div className="live-badge">
            <span className="live-dot"></span>
            <span>LIVE</span>
          </div>
          <button className="control-btn" onClick={toggleOrbit} title="Toggle Orbit Path">
            <Activity size={16} className={showOrbit ? 'active' : ''} />
          </button>
          <button className="control-btn" onClick={toggleFullscreen} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button className="control-btn" onClick={loadISS} disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="issmap-wrapper">
        <MapContainer
          center={position}
          zoom={3}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "12px"
          }}
          zoomControl={false}
          ref={mapRef}
        >
          <MapController center={position} zoom={3} />
          
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; CartoDB'
          />

          {/* ISS Marker */}
          <Marker position={position} icon={issIcon}>
            <Popup className="iss-popup">
              <div className="popup-content">
                <div className="popup-header">
                  <Satellite size={20} className="popup-icon" />
                  <h4>International Space Station</h4>
                </div>
                <div className="popup-details">
                  <div className="popup-detail">
                    <span className="popup-label">Latitude</span>
                    <span className="popup-value">{iss.latitude?.toFixed(4) || "N/A"}°</span>
                  </div>
                  <div className="popup-detail">
                    <span className="popup-label">Longitude</span>
                    <span className="popup-value">{iss.longitude?.toFixed(4) || "N/A"}°</span>
                  </div>
                  <div className="popup-detail">
                    <span className="popup-label">Altitude</span>
                    <span className="popup-value">{iss.altitude?.toFixed(0) || "N/A"} km</span>
                  </div>
                  <div className="popup-detail">
                    <span className="popup-label">Velocity</span>
                    <span className="popup-value">{iss.velocity?.toFixed(0) || "N/A"} km/h</span>
                  </div>
                  <div className="popup-detail">
                    <span className="popup-label">Visibility</span>
                    <span className="popup-value">{iss.visibility || "N/A"}</span>
                  </div>
                </div>
                <div className="popup-footer">
                  <span>🛰️ {iss.name || "ISS"}</span>
                  <span>{formatTime(lastUpdate)}</span>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Orbit Circle */}
          {showOrbit && (
            <Circle
              center={position}
              radius={2000000} // 2000km radius
              pathOptions={{
                color: 'rgba(56, 189, 248, 0.2)',
                fillColor: 'rgba(56, 189, 248, 0.05)',
                fillOpacity: 0.1,
                weight: 1,
                dashArray: '5, 10'
              }}
            />
          )}
        </MapContainer>

        {/* Map Overlay Stats */}
        <div className="map-stats">
          <div className="map-stat">
            <div className="stat-icon" style={{ background: "rgba(56, 189, 248, 0.1)" }}>
              <MapPin size={14} style={{ color: "#38BDF8" }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Position</span>
              <span className="stat-value">
                {iss.latitude?.toFixed(2) || "N/A"}°N, {iss.longitude?.toFixed(2) || "N/A"}°E
              </span>
            </div>
          </div>
          <div className="map-stat">
            <div className="stat-icon" style={{ background: "rgba(74, 222, 128, 0.1)" }}>
              <Clock size={14} style={{ color: "#4ADE80" }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Updated</span>
              <span className="stat-value">{formatTime(lastUpdate)}</span>
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="zoom-controls">
          <button 
            className="zoom-btn"
            onClick={() => {
              if (mapRef.current) {
                const map = mapRef.current;
                map.setZoom(map.getZoom() + 1);
              }
            }}
          >
            +
          </button>
          <button 
            className="zoom-btn"
            onClick={() => {
              if (mapRef.current) {
                const map = mapRef.current;
                map.setZoom(map.getZoom() - 1);
              }
            }}
          >
            −
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="issmap-footer">
        <div className="footer-info">
          <div className="info-item">
            <Satellite size={14} />
            <span>{iss.name || "ISS"}</span>
          </div>
          <div className="info-item">
            <span className="info-dot"></span>
            <span>Auto-updating every 10s</span>
          </div>
        </div>
        <div className="footer-controls">
          <button className="footer-btn" onClick={loadISS} disabled={isLoading}>
            <RefreshCw size={14} className={isLoading ? 'spinning' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ISSMap;