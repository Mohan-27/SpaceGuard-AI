import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  Shield, 
  Zap, 
  AlertCircle,
  Satellite,
  Clock,
  ArrowRight,
  Bell,
  Radio,
  Wifi
} from "lucide-react";
import "../style/AlertCard.css";

function AlertCard({ weather }) {
  if (!weather) {
    return (
      <motion.div 
        className="alert-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Loading Alert System...</p>
      </motion.div>
    );
  }

  // Determine alert level based on KP index
  const getAlertLevel = (kp) => {
    if (kp >= 8) {
      return {
        level: "extreme",
        title: "EXTREME RISK",
        icon: AlertCircle,
        color: "#EF4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgba(239, 68, 68, 0.3)",
        glowColor: "rgba(239, 68, 68, 0.3)",
        emoji: "🔴",
        message: "Severe geomagnetic storm detected. Critical satellite operations may be affected. Immediate protective measures required.",
        impact: "Critical",
        action: "Emergency Response Required",
        recommendations: [
          "Activate emergency protocols",
          "Power down non-essential satellite systems",
          "Notify all ground stations",
          "Prepare for communication disruptions"
        ]
      };
    }
    if (kp >= 6) {
      return {
        level: "high",
        title: "HIGH RISK",
        icon: AlertTriangle,
        color: "#F97316",
        bgColor: "rgba(249, 115, 22, 0.1)",
        borderColor: "rgba(249, 115, 22, 0.3)",
        glowColor: "rgba(249, 115, 22, 0.3)",
        emoji: "🟠",
        message: "Significant geomagnetic activity detected. GPS and satellite communication may experience disturbances.",
        impact: "High",
        action: "Enhanced Monitoring Required",
        recommendations: [
          "Increase monitoring frequency",
          "Review contingency plans",
          "Prepare backup communication systems",
          "Monitor satellite telemetry closely"
        ]
      };
    }
    if (kp >= 4) {
      return {
        level: "moderate",
        title: "MODERATE RISK",
        icon: Zap,
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderColor: "rgba(245, 158, 11, 0.3)",
        glowColor: "rgba(245, 158, 11, 0.3)",
        emoji: "🟡",
        message: "Minor geomagnetic activity detected. Continue standard monitoring procedures.",
        impact: "Moderate",
        action: "Routine Monitoring",
        recommendations: [
          "Continue standard monitoring",
          "Review space weather forecasts",
          "Maintain situational awareness",
          "Check systems periodically"
        ]
      };
    }
    return {
      level: "low",
      title: "LOW RISK",
      icon: Shield,
      color: "#4ADE80",
      bgColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "rgba(34, 197, 94, 0.3)",
      glowColor: "rgba(34, 197, 94, 0.3)",
      emoji: "🟢",
      message: "No geomagnetic storm detected. Satellite operations are normal and stable.",
      impact: "Low",
      action: "Normal Operations",
      recommendations: [
        "Continue normal operations",
        "Routine system checks",
        "Prepare for future events",
        "Maintain standard protocols"
      ]
    };
  };

  const alert = getAlertLevel(weather.kp_index || 0);
  const AlertIcon = alert.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className={`alert-card alert-${alert.level}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          borderColor: alert.borderColor
        }}
      >
        <div className="card-glow-effect" style={{ 
          background: `radial-gradient(circle at 30% 30%, ${alert.bgColor}, transparent 70%)` 
        }}></div>

        {/* Alert Pulse Ring */}
        <div className="alert-pulse-ring">
          <div className="pulse-ring ring-1" style={{ borderColor: alert.color }}></div>
          <div className="pulse-ring ring-2" style={{ borderColor: alert.color }}></div>
          <div className="pulse-ring ring-3" style={{ borderColor: alert.color }}></div>
        </div>

        {/* Header */}
        <div className="alert-header">
          <div className="header-left">
            <div className="alert-icon-wrapper" style={{ 
              background: alert.bgColor,
              borderColor: alert.borderColor
            }}>
              <AlertIcon size={28} className="alert-icon" style={{ color: alert.color }} />
            </div>
            <div>
              <h3 className="alert-title">
                <span className="alert-emoji">{alert.emoji}</span>
                Space Weather Alert
              </h3>
              <p className="alert-subtitle">Real-time threat assessment</p>
            </div>
          </div>
          <div className="alert-badge" style={{ 
            background: alert.bgColor,
            borderColor: alert.borderColor,
            color: alert.color
          }}>
            <Bell size={14} />
            <span>{alert.title}</span>
          </div>
        </div>

        {/* Main Alert */}
        <div className="alert-main" style={{ 
          background: alert.bgColor,
          borderColor: alert.borderColor
        }}>
          <div className="alert-kp-display">
            <div className="kp-indicator">
              <span className="kp-label">KP Index</span>
              <motion.span 
                className="kp-value"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                style={{ color: alert.color }}
              >
                {weather.kp_index?.toFixed(1) || "0.0"}
              </motion.span>
            </div>
            <div className="alert-divider" style={{ background: alert.borderColor }}></div>
            <div className="impact-indicator">
              <span className="impact-label">Impact Level</span>
              <span className="impact-value" style={{ color: alert.color }}>
                {alert.impact}
              </span>
            </div>
          </div>
          <p className="alert-message">{alert.message}</p>
          <div className="alert-action">
            <span className="action-dot" style={{ background: alert.color }}></span>
            <span className="action-text" style={{ color: alert.color }}>
              {alert.action}
            </span>
          </div>
        </div>

        {/* Recommendations */}
        <div className="alert-recommendations">
          <h4 className="recommendations-title">
            <span>📋</span>
            Recommended Actions
          </h4>
          <div className="recommendations-grid">
            {alert.recommendations.map((rec, index) => (
              <motion.div 
                key={index}
                className="recommendation-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  borderColor: alert.borderColor,
                  background: alert.bgColor
                }}
              >
                <div className="rec-marker" style={{ background: alert.color }}></div>
                <span className="rec-text">{rec}</span>
                <ArrowRight size={14} className="rec-arrow" style={{ color: alert.color }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="alert-footer">
          <div className="footer-status">
            <div className="status-item">
              <Satellite size={14} />
              <span>Satellites: {weather.kp_index >= 6 ? "⚠️ Affected" : "✅ Normal"}</span>
            </div>
            <div className="status-item">
              <Radio size={14} />
              <span>Comms: {weather.kp_index >= 6 ? "⚠️ Disturbed" : "✅ Clear"}</span>
            </div>
            <div className="status-item">
              <Wifi size={14} />
              <span>GPS: {weather.kp_index >= 4 ? "⚠️ Degraded" : "✅ Normal"}</span>
            </div>
          </div>
          <div className="footer-timestamp">
            <Clock size={14} />
            <span>Updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Alert Level Indicator */}
        <div className="alert-level-indicator">
          <div className="level-dot" style={{ background: alert.color }}></div>
          <div className="level-bar">
            <motion.div 
              className="level-fill"
              initial={{ width: "0%" }}
              animate={{ 
                width: alert.level === "extreme" ? "100%" :
                       alert.level === "high" ? "75%" :
                       alert.level === "moderate" ? "50%" : "25%"
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ background: alert.color }}
            />
          </div>
          <span className="level-text" style={{ color: alert.color }}>
            {alert.level.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AlertCard;