import { motion, AnimatePresence } from "framer-motion";
import { 
  Satellite, 
  Wifi, 
  Signal, 
  Battery, 
  Activity,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Power,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap
} from "lucide-react";
import "../style/SatelliteStatus.css";

function SatelliteStatus({ weather }) {
  if (!weather) {
    return (
      <motion.div 
        className="satellite-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Loading Satellite Status...</p>
      </motion.div>
    );
  }

  const kp = weather.kp_index || 0;

  // Get satellite status based on KP index
  const getSatelliteStatus = (kp) => {
    if (kp <= 3) {
      return {
        level: "healthy",
        text: "Healthy",
        color: "#4ADE80",
        bgColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "rgba(34, 197, 94, 0.2)",
        glowColor: "rgba(34, 197, 94, 0.3)",
        icon: CheckCircle,
        emoji: "🟢",
        status: "All systems nominal",
        health: 98,
        signal: 95,
        battery: 92,
        performance: 96,
        details: "All satellite systems operating within normal parameters."
      };
    } else if (kp <= 5) {
      return {
        level: "warning",
        text: "Warning",
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderColor: "rgba(245, 158, 11, 0.2)",
        glowColor: "rgba(245, 158, 11, 0.3)",
        icon: AlertTriangle,
        emoji: "🟡",
        status: "Minor interference detected",
        health: 82,
        signal: 78,
        battery: 85,
        performance: 80,
        details: "Some satellite systems experiencing minor interference from geomagnetic activity."
      };
    } else if (kp <= 7) {
      return {
        level: "critical",
        text: "Critical",
        color: "#F97316",
        bgColor: "rgba(249, 115, 22, 0.1)",
        borderColor: "rgba(249, 115, 22, 0.2)",
        glowColor: "rgba(249, 115, 22, 0.3)",
        icon: AlertCircle,
        emoji: "🟠",
        status: "Significant disruptions",
        health: 65,
        signal: 55,
        battery: 70,
        performance: 60,
        details: "Significant satellite disruptions expected. Some systems may experience degraded performance."
      };
    } else {
      return {
        level: "offline",
        text: "Offline",
        color: "#EF4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgba(239, 68, 68, 0.2)",
        glowColor: "rgba(239, 68, 68, 0.3)",
        icon: Power,
        emoji: "🔴",
        status: "Critical failure imminent",
        health: 35,
        signal: 20,
        battery: 45,
        performance: 30,
        details: "Satellite operations at critical risk. Immediate protective measures required."
      };
    }
  };

  const status = getSatelliteStatus(kp);
  const StatusIcon = status.icon;

  // Satellite data with individual statuses
  const satellites = [
    { 
      name: "GPS Satellite", 
      type: "Navigation",
      icon: Signal,
      status: kp <= 3 ? "Healthy" : kp <= 5 ? "Warning" : kp <= 7 ? "Critical" : "Offline",
      signal: kp <= 3 ? 95 : kp <= 5 ? 75 : kp <= 7 ? 55 : 25,
      orbit: "MEO",
      altitude: "20,200 km"
    },
    { 
      name: "Communication Satellite", 
      type: "Communication",
      icon: Wifi,
      status: kp <= 3 ? "Healthy" : kp <= 5 ? "Warning" : kp <= 7 ? "Critical" : "Offline",
      signal: kp <= 3 ? 92 : kp <= 5 ? 72 : kp <= 7 ? 50 : 20,
      orbit: "GEO",
      altitude: "35,786 km"
    },
    { 
      name: "Weather Satellite", 
      type: "Monitoring",
      icon: Activity,
      status: kp <= 3 ? "Healthy" : kp <= 5 ? "Warning" : kp <= 7 ? "Critical" : "Offline",
      signal: kp <= 3 ? 88 : kp <= 5 ? 68 : kp <= 7 ? 48 : 18,
      orbit: "LEO",
      altitude: "705 km"
    },
    { 
      name: "Navigation Satellite", 
      type: "Navigation",
      icon: Satellite,
      status: kp <= 3 ? "Healthy" : kp <= 5 ? "Warning" : kp <= 7 ? "Critical" : "Offline",
      signal: kp <= 3 ? 90 : kp <= 5 ? 70 : kp <= 7 ? 52 : 22,
      orbit: "MEO",
      altitude: "20,180 km"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "Healthy": return "#4ADE80";
      case "Warning": return "#F59E0B";
      case "Critical": return "#F97316";
      case "Offline": return "#EF4444";
      default: return "#6B7280";
    }
  };

  const getStatusDot = (status) => {
    switch(status) {
      case "Healthy": return "🟢";
      case "Warning": return "🟡";
      case "Critical": return "🟠";
      case "Offline": return "🔴";
      default: return "⚪";
    }
  };

  return (
    <motion.div 
      className={`satellite-card satellite-${status.level}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        borderColor: status.borderColor
      }}
    >
      <div className="card-glow-effect" style={{ 
        background: `radial-gradient(circle at 30% 30%, ${status.bgColor}, transparent 70%)` 
      }}></div>

      {/* Header */}
      <div className="satellite-header">
        <div className="header-left">
          <div className="header-icon-wrapper" style={{ 
            background: status.bgColor,
            borderColor: status.borderColor
          }}>
            <Satellite size={24} className="header-icon" style={{ color: status.color }} />
          </div>
          <div>
            <h3 className="satellite-title">Satellite Health Monitor</h3>
            <p className="satellite-subtitle">Real-time system status</p>
          </div>
        </div>
        <div className="overall-status" style={{ 
          background: status.bgColor,
          borderColor: status.borderColor,
          color: status.color
        }}>
          <StatusIcon size={14} />
          <span>{status.text}</span>
          <span className="status-emoji">{status.emoji}</span>
        </div>
      </div>

      {/* Overall Health Summary */}
      <div className="health-summary" style={{ 
        background: status.bgColor,
        borderColor: status.borderColor
      }}>
        <div className="summary-item">
          <div className="summary-label">System Health</div>
          <div className="summary-value" style={{ color: status.color }}>
            {status.health}%
          </div>
          <div className="summary-bar">
            <motion.div 
              className="summary-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${status.health}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ background: status.color }}
            />
          </div>
        </div>
        <div className="summary-divider" style={{ background: status.borderColor }}></div>
        <div className="summary-item">
          <div className="summary-label">Signal Strength</div>
          <div className="summary-value" style={{ color: status.color }}>
            {status.signal}%
          </div>
          <div className="summary-bar">
            <motion.div 
              className="summary-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${status.signal}%` }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              style={{ background: status.color }}
            />
          </div>
        </div>
        <div className="summary-divider" style={{ background: status.borderColor }}></div>
        <div className="summary-item">
          <div className="summary-label">Battery Level</div>
          <div className="summary-value" style={{ color: status.color }}>
            {status.battery}%
          </div>
          <div className="summary-bar">
            <motion.div 
              className="summary-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${status.battery}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              style={{ background: status.color }}
            />
          </div>
        </div>
        <div className="summary-divider" style={{ background: status.borderColor }}></div>
        <div className="summary-item">
          <div className="summary-label">Performance</div>
          <div className="summary-value" style={{ color: status.color }}>
            {status.performance}%
          </div>
          <div className="summary-bar">
            <motion.div 
              className="summary-fill"
              initial={{ width: "0%" }}
              animate={{ width: `${status.performance}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              style={{ background: status.color }}
            />
          </div>
        </div>
      </div>

      {/* Status Description */}
      <div className="status-description" style={{ 
        background: status.bgColor,
        borderColor: status.borderColor
      }}>
        <p>{status.details}</p>
      </div>

      {/* Satellite Table */}
      <div className="satellite-table-wrapper">
        <table className="satellite-table">
          <thead>
            <tr>
              <th>Satellite</th>
              <th>Type</th>
              <th>Orbit</th>
              <th>Signal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {satellites.map((sat, index) => {
              const statusColor = getStatusColor(sat.status);
              const StatusIcon = sat.icon;
              
              return (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="satellite-row"
                >
                  <td className="satellite-name">
                    <div className="satellite-name-wrapper">
                      <div className="satellite-icon-wrapper" style={{ 
                        background: `${statusColor}15`,
                        borderColor: `${statusColor}30`
                      }}>
                        <StatusIcon size={14} style={{ color: statusColor }} />
                      </div>
                      <span>{sat.name}</span>
                    </div>
                  </td>
                  <td className="satellite-type">{sat.type}</td>
                  <td className="satellite-orbit">
                    <div className="orbit-info">
                      <span>{sat.orbit}</span>
                      <span className="orbit-altitude">{sat.altitude}</span>
                    </div>
                  </td>
                  <td className="satellite-signal">
                    <div className="signal-indicator">
                      <div className="signal-bar-track">
                        <motion.div 
                          className="signal-bar-fill"
                          initial={{ width: "0%" }}
                          animate={{ width: `${sat.signal}%` }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                          style={{ background: statusColor }}
                        />
                      </div>
                      <span className="signal-value">{sat.signal}%</span>
                    </div>
                  </td>
                  <td className="satellite-status-cell">
                    <div className="status-badge" style={{ 
                      background: `${statusColor}15`,
                      borderColor: `${statusColor}30`,
                      color: statusColor
                    }}>
                      <span className="status-dot">{getStatusDot(sat.status)}</span>
                      <span>{sat.status}</span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="satellite-footer">
        <div className="footer-info">
          <div className="info-item">
            <Clock size={14} />
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="info-item">
            <Zap size={14} />
            <span>KP Index: {kp.toFixed(1)}</span>
          </div>
          <div className="info-item">
            <TrendingUp size={14} />
            <span>Active: {satellites.filter(s => s.status === "Healthy").length}/{satellites.length}</span>
          </div>
        </div>
        <div className="footer-status">
          <span>All systems monitored 24/7</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="satellite-status-indicator">
        <div className="status-dot-list">
          <div className="status-dot-item">
            <span className="dot" style={{ background: "#4ADE80" }}></span>
            <span>Healthy</span>
          </div>
          <div className="status-dot-item">
            <span className="dot" style={{ background: "#F59E0B" }}></span>
            <span>Warning</span>
          </div>
          <div className="status-dot-item">
            <span className="dot" style={{ background: "#F97316" }}></span>
            <span>Critical</span>
          </div>
          <div className="status-dot-item">
            <span className="dot" style={{ background: "#EF4444" }}></span>
            <span>Offline</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SatelliteStatus;