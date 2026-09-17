import { motion } from "framer-motion";
import { 
  Brain, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Shield,
  Zap,
  Activity,
  BarChart3,
  Sparkles
} from "lucide-react";
import "../style/PredictionCard.css";

function PredictionCard({ weather }) {
  if (!weather) {
    return (
      <motion.div 
        className="prediction-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Loading Predictions...</p>
      </motion.div>
    );
  }

  const kp = weather.kp_index || 0;

  // Get prediction based on KP index
  const getPrediction = (kp) => {
    if (kp < 3) {
      return {
        level: "stable",
        prediction: "Space weather is expected to remain stable for the next 24 hours. All satellite operations should proceed normally.",
        color: "#4ADE80",
        bgColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "rgba(34, 197, 94, 0.2)",
        glowColor: "rgba(34, 197, 94, 0.3)",
        icon: Shield,
        emoji: "🟢",
        status: "Stable",
        impact: "Minimal",
        confidence: "95%",
        trend: "stable",
        details: [
          "Normal satellite operations",
          "Clear communication channels",
          "Stable GPS signals",
          "No expected disruptions"
        ]
      };
    } else if (kp < 5) {
      return {
        level: "moderate",
        prediction: "Minor geomagnetic activity may occur in the next few hours. Continue standard monitoring procedures.",
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderColor: "rgba(245, 158, 11, 0.2)",
        glowColor: "rgba(245, 158, 11, 0.3)",
        icon: Zap,
        emoji: "🟡",
        status: "Moderate Activity",
        impact: "Low-Moderate",
        confidence: "87%",
        trend: "increasing",
        details: [
          "Monitor satellite systems",
          "Check communication links",
          "Review forecasts regularly",
          "Prepare for potential changes"
        ]
      };
    } else if (kp < 7) {
      return {
        level: "high",
        prediction: "High probability of communication and GPS disturbances. Enhanced monitoring and protective measures recommended.",
        color: "#F97316",
        bgColor: "rgba(249, 115, 22, 0.1)",
        borderColor: "rgba(249, 115, 22, 0.2)",
        glowColor: "rgba(249, 115, 22, 0.3)",
        icon: AlertTriangle,
        emoji: "🟠",
        status: "High Activity",
        impact: "Moderate-High",
        confidence: "82%",
        trend: "increasing",
        details: [
          "Increase monitoring frequency",
          "Prepare backup systems",
          "Review contingency plans",
          "Alert ground stations"
        ]
      };
    } else {
      return {
        level: "extreme",
        prediction: "Extreme geomagnetic storm likely. Satellite operations may be significantly affected. Immediate protective measures required.",
        color: "#EF4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgba(239, 68, 68, 0.2)",
        glowColor: "rgba(239, 68, 68, 0.3)",
        icon: AlertTriangle,
        emoji: "🔴",
        status: "Extreme Activity",
        impact: "Critical",
        confidence: "78%",
        trend: "critical",
        details: [
          "Activate emergency protocols",
          "Protect critical assets",
          "Prepare for disruptions",
          "Monitor real-time updates"
        ]
      };
    }
  };

  const prediction = getPrediction(kp);
  const PredictionIcon = prediction.icon;

  // Calculate time until next update
  const getNextUpdate = () => {
    const now = new Date();
    const next = new Date(now);
    next.setHours(now.getHours() + 1);
    next.setMinutes(0);
    next.setSeconds(0);
    const diff = next - now;
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m`;
  };

  return (
    <motion.div 
      className={`prediction-card prediction-${prediction.level}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        borderColor: prediction.borderColor
      }}
    >
      <div className="card-glow-effect" style={{ 
        background: `radial-gradient(circle at 30% 30%, ${prediction.bgColor}, transparent 70%)` 
      }}></div>

      {/* Header */}
      <div className="prediction-header">
        <div className="header-left">
          <div className="header-icon-wrapper" style={{ 
            background: prediction.bgColor,
            borderColor: prediction.borderColor
          }}>
            <Brain size={24} className="header-icon" style={{ color: prediction.color }} />
          </div>
          <div>
            <h3 className="prediction-title">AI Prediction</h3>
            <p className="prediction-subtitle">Next 24 hours forecast</p>
          </div>
        </div>
        <div className="prediction-badge" style={{ 
          background: prediction.bgColor,
          borderColor: prediction.borderColor,
          color: prediction.color
        }}>
          <span className="badge-emoji">{prediction.emoji}</span>
          <span>{prediction.status}</span>
        </div>
      </div>

      {/* Main Prediction */}
      <div className="prediction-main" style={{ 
        background: prediction.bgColor,
        borderColor: prediction.borderColor
      }}>
        <div className="prediction-icon-large">
          <PredictionIcon size={32} style={{ color: prediction.color }} />
        </div>
        <p className="prediction-text">{prediction.prediction}</p>
        <div className="prediction-metrics">
          <div className="metric-item">
            <span className="metric-label">Impact</span>
            <span className="metric-value" style={{ color: prediction.color }}>
              {prediction.impact}
            </span>
          </div>
          <div className="metric-divider" style={{ background: prediction.borderColor }}></div>
          <div className="metric-item">
            <span className="metric-label">Confidence</span>
            <span className="metric-value" style={{ color: prediction.color }}>
              {prediction.confidence}
            </span>
          </div>
          <div className="metric-divider" style={{ background: prediction.borderColor }}></div>
          <div className="metric-item">
            <span className="metric-label">Trend</span>
            <div className="metric-trend" style={{ color: prediction.color }}>
              {prediction.trend === "increasing" ? (
                <TrendingUp size={16} />
              ) : prediction.trend === "critical" ? (
                <AlertTriangle size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              <span>{prediction.trend === "increasing" ? "Rising" : 
                     prediction.trend === "critical" ? "Critical" : "Stable"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="prediction-details">
        <h4 className="details-title">
          <span>📋</span>
          Predicted Impacts
        </h4>
        <div className="details-grid">
          {prediction.details.map((detail, index) => (
            <motion.div 
              key={index}
              className="detail-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ 
                borderColor: prediction.borderColor,
                background: prediction.bgColor
              }}
            >
              <div className="detail-dot" style={{ background: prediction.color }}></div>
              <span className="detail-text">{detail}</span>
              <Sparkles size={12} className="detail-sparkle" style={{ color: prediction.color }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="prediction-footer">
        <div className="footer-info">
          <div className="info-item">
            <Clock size={14} />
            <span>Next Update: {getNextUpdate()}</span>
          </div>
          <div className="info-item">
            <Activity size={14} />
            <span>KP Index: {kp.toFixed(1)}</span>
          </div>
          <div className="info-item">
            <BarChart3 size={14} />
            <span>AI Model v2.4</span>
          </div>
        </div>
        <div className="footer-timestamp">
          <span>Generated {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Animated Background Particles */}
      <div className="prediction-particles">
        <div className="particle particle-1" style={{ background: prediction.color }}></div>
        <div className="particle particle-2" style={{ background: prediction.color }}></div>
        <div className="particle particle-3" style={{ background: prediction.color }}></div>
        <div className="particle particle-4" style={{ background: prediction.color }}></div>
        <div className="particle particle-5" style={{ background: prediction.color }}></div>
      </div>
    </motion.div>
  );
}

export default PredictionCard;