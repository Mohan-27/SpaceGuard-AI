import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Satellite, 
  MapPin, 
  Ruler, 
  Gauge, 
  Eye, 
  RefreshCw,
  Globe,
  Activity,
  Clock,
  ArrowUp,
  ArrowDown,
  Compass
} from "lucide-react";
import API from "../services/api";
import "../style/SatelliteTracker.css";

function SatelliteTracker() {
  const [iss, setIss] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    loadISS();

    const interval = setInterval(() => {
      loadISS();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadISS = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/iss");
      setIss(response.data);
      setLastUpdate(new Date());
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load ISS data");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to determine if ISS is visible
  const getVisibilityStatus = (visibility) => {
    if (!visibility) return { text: "Unknown", color: "#6B7280", icon: Eye };
    const lower = visibility.toLowerCase();
    if (lower.includes("daylight") || lower.includes("visible")) {
      return { text: "Visible", color: "#4ADE80", icon: Eye };
    }
    if (lower.includes("night")) {
      return { text: "Night", color: "#38BDF8", icon: Eye };
    }
    if (lower.includes("eclipse")) {
      return { text: "Eclipse", color: "#F59E0B", icon: Eye };
    }
    return { text: visibility, color: "#9CA3AF", icon: Eye };
  };

  // Determine movement direction based on latitude change (simulated)
  const getMovement = (lat) => {
    if (!lat) return "Stationary";
    // This is a simplified simulation - in reality you'd compare with previous value
    return lat > 0 ? "Northbound" : "Southbound";
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
        className="tracker-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-large"></div>
        <p>Acquiring ISS Signal...</p>
        <span className="loading-sub">Tracking International Space Station</span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="tracker-error"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="error-icon-wrapper">
          <Satellite size={48} className="error-icon" />
        </div>
        <h3>Connection Lost</h3>
        <p>{error}</p>
        <button className="retry-btn" onClick={loadISS}>
          <RefreshCw size={16} />
          <span>Retry</span>
        </button>
      </motion.div>
    );
  }

  if (!iss) {
    return (
      <motion.div 
        className="tracker-empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>No ISS data available</p>
      </motion.div>
    );
  }

  const visibility = getVisibilityStatus(iss.visibility);
  const VisibilityIcon = visibility.icon;
  const movement = getMovement(iss.latitude);

  // Calculate approximate distance (simplified)
  const distance = iss.altitude ? Math.round(iss.altitude * 0.621371) : 0;

  return (
    <motion.div 
      className="tracker-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-glow-effect"></div>

      {/* Header */}
      <div className="tracker-header">
        <div className="header-left">
          <div className="header-icon-wrapper">
            <Satellite size={24} className="header-icon" />
          </div>
          <div>
            <h3 className="tracker-title">ISS Tracker</h3>
            <p className="tracker-subtitle">Live International Space Station</p>
          </div>
        </div>
        <div className="header-right">
          <div className="live-badge">
            <span className="live-dot"></span>
            <span>LIVE</span>
          </div>
          <button className="refresh-btn" onClick={loadISS} disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? 'spinning' : ''} />
          </button>
        </div>
      </div>

      {/* Main Tracker Display */}
      <div className="tracker-display">
        {/* Earth Globe Visualization */}
        <div className="globe-container">
          <div className="globe">
            <div className="globe-rings">
              <div className="globe-ring ring-1"></div>
              <div className="globe-ring ring-2"></div>
              <div className="globe-ring ring-3"></div>
            </div>
            <div className="globe-center">
              <Globe size={48} className="globe-icon" />
            </div>
            <motion.div 
              className="iss-position"
              animate={{
                x: [0, 20, -10, 30, -20, 0],
                y: [0, -15, 10, -5, 15, 0],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Satellite size={20} className="iss-icon" />
              <div className="iss-pulse"></div>
            </motion.div>
          </div>
          <div className="globe-coordinates">
            <div className="coord-item">
              <span className="coord-label">Latitude</span>
              <span className="coord-value">
                {iss.latitude?.toFixed(4) || "N/A"}°
              </span>
            </div>
            <div className="coord-divider"></div>
            <div className="coord-item">
              <span className="coord-label">Longitude</span>
              <span className="coord-value">
                {iss.longitude?.toFixed(4) || "N/A"}°
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "rgba(56, 189, 248, 0.1)" }}>
              <Ruler size={18} style={{ color: "#38BDF8" }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Altitude</span>
              <span className="stat-value">
                {iss.altitude?.toFixed(0) || "N/A"} km
                <span className="stat-unit">{distance} mi</span>
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "rgba(74, 222, 128, 0.1)" }}>
              <Gauge size={18} style={{ color: "#4ADE80" }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Velocity</span>
              <span className="stat-value">
                {iss.velocity?.toFixed(0) || "N/A"} km/h
                <span className="stat-unit">~7.66 km/s</span>
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "rgba(96, 165, 250, 0.1)" }}>
              <VisibilityIcon size={18} style={{ color: visibility.color }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Visibility</span>
              <span className="stat-value" style={{ color: visibility.color }}>
                {visibility.text}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: "rgba(251, 191, 36, 0.1)" }}>
              <Compass size={18} style={{ color: "#FBBF24" }} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Direction</span>
              <span className="stat-value" style={{ color: "#FBBF24" }}>
                {movement}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="tracker-details">
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <MapPin size={16} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Position</span>
              <span className="detail-value">
                {iss.latitude?.toFixed(2) || "N/A"}°N, {iss.longitude?.toFixed(2) || "N/A"}°E
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <Activity size={16} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Status</span>
              <span className="detail-value" style={{ color: "#4ADE80" }}>
                <span className="status-dot"></span>
                Operational
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <Clock size={16} />
            </div>
            <div className="detail-content">
              <span className="detail-label">Last Update</span>
              <span className="detail-value">
                {formatTime(lastUpdate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="tracker-footer">
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
        <div className="footer-status">
          <span>🛰️ Tracking in real-time</span>
        </div>
      </div>
    </motion.div>
  );
}

export default SatelliteTracker;