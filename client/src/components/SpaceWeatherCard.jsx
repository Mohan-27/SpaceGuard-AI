import { motion } from "framer-motion";
import { 
  Sun, 
  Zap, 
  Activity, 
  Shield, 
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import "../style/SpaceWeatherCard.css";

function SpaceWeatherCard({ weather }) {
  if (!weather) {
    return (
      <motion.div 
        className="space-weather-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Loading Space Weather...</p>
      </motion.div>
    );
  }

  // Helper function to get KP status
  const getKPStatus = (kp) => {
    if (kp >= 7) return { label: "Severe Storm", color: "#EF4444", icon: AlertTriangle };
    if (kp >= 5) return { label: "Moderate Storm", color: "#F59E0B", icon: AlertTriangle };
    if (kp >= 3) return { label: "Active", color: "#38BDF8", icon: Activity };
    return { label: "Quiet", color: "#4ADE80", icon: Shield };
  };

  // Helper function to get solar activity status
  const getSolarStatus = (activity) => {
    const lower = activity?.toLowerCase() || "";
    if (lower.includes("high") || lower.includes("severe")) return { color: "#EF4444", emoji: "🔴" };
    if (lower.includes("moderate") || lower.includes("medium")) return { color: "#F59E0B", emoji: "🟡" };
    return { color: "#4ADE80", emoji: "🟢" };
  };

  const kpStatus = getKPStatus(weather.kp_index || 0);
  const solarStatus = getSolarStatus(weather.solar_activity);
  const KPStatusIcon = kpStatus.icon;

  // Determine if KP is trending
  const isTrendingUp = weather.kp_index > 3;

  return (
    <motion.div 
      className="space-weather-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-glow-effect"></div>
      
      <div className="weather-header">
        <div className="header-left">
          <div className="header-icon-wrapper">
            <Sun size={24} className="header-icon" />
          </div>
          <div>
            <h3 className="weather-title">Space Weather</h3>
            <p className="weather-subtitle">Real-time solar conditions</p>
          </div>
        </div>
        <div className="header-status">
          <span className="status-badge" style={{ background: `${solarStatus.color}15`, color: solarStatus.color }}>
            {solarStatus.emoji} {weather.solar_activity || "Unknown"}
          </span>
        </div>
      </div>

      <div className="weather-content">
        {/* KP Index Display */}
        <div className="kp-display">
          <div className="kp-circle">
            <div className="kp-ring" style={{ 
              strokeDasharray: 251.2,
              strokeDashoffset: 251.2 * (1 - Math.min(weather.kp_index / 9, 1)),
              stroke: kpStatus.color 
            }}></div>
            <div className="kp-content">
              <span className="kp-value" style={{ color: kpStatus.color }}>
                {weather.kp_index?.toFixed(1) || "0.0"}
              </span>
              <span className="kp-label">KP Index</span>
            </div>
          </div>
          <div className="kp-status">
            <div className="kp-status-icon" style={{ color: kpStatus.color }}>
              <KPStatusIcon size={20} />
            </div>
            <span className="kp-status-label" style={{ color: kpStatus.color }}>
              {kpStatus.label}
            </span>
            <div className="kp-trend">
              {isTrendingUp ? (
                <TrendingUp size={16} color="#EF4444" />
              ) : (
                <TrendingDown size={16} color="#4ADE80" />
              )}
              <span className="trend-label">
                {isTrendingUp ? "Increasing" : "Stable"}
              </span>
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="weather-details-grid">
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <Zap size={18} />
            </div>
            <div className="detail-info">
              <span className="detail-label">Solar Activity</span>
              <span className="detail-value" style={{ color: solarStatus.color }}>
                {weather.solar_activity || "N/A"}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <Activity size={18} />
            </div>
            <div className="detail-info">
              <span className="detail-label">KP Index</span>
              <span className="detail-value" style={{ color: kpStatus.color }}>
                {weather.kp_index?.toFixed(1) || "0.0"}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <Shield size={18} />
            </div>
            <div className="detail-info">
              <span className="detail-label">Status</span>
              <span className="detail-value" style={{ color: kpStatus.color }}>
                {kpStatus.label}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <Clock size={18} />
            </div>
            <div className="detail-info">
              <span className="detail-label">Last Updated</span>
              <span className="detail-value">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="weather-footer">
          <div className="footer-message">
            <div className="message-dot" style={{ background: kpStatus.color }}></div>
            <span>
              {kpStatus.label === "Severe Storm" && "⚠️ Take protective measures for satellites"}
              {kpStatus.label === "Moderate Storm" && "⚡ Monitor satellite systems closely"}
              {kpStatus.label === "Active" && "📡 Normal operations with slight variations"}
              {kpStatus.label === "Quiet" && "✅ All systems operating normally"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SpaceWeatherCard;