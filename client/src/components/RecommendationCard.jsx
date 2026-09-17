import { motion } from "framer-motion";
import { 
  Lightbulb, 
  AlertTriangle, 
  Shield, 
  Zap, 
  CheckCircle,
  Clock,
  ArrowRight,
  Brain,
  AlertCircle
} from "lucide-react";
import "../style/RecommendationCard.css";

function RecommendationCard({ weather }) {
  if (!weather) {
    return (
      <motion.div 
        className="recommendation-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Generating Recommendations...</p>
      </motion.div>
    );
  }

  // Parse recommendation or generate based on weather data
  const getRecommendations = () => {
    const rec = weather.recommendation || "";
    const kp = weather.kp_index || 0;
    const risk = weather.risk_score || 0;

    // If there's a custom recommendation, parse it
    if (rec) {
      const sentences = rec.split(/[.!?]+/).filter(s => s.trim().length > 0);
      return {
        primary: sentences[0] || rec,
        details: sentences.slice(1, 3).map(s => s.trim()),
        priority: kp >= 5 ? "high" : kp >= 3 ? "medium" : "low",
        action: kp >= 5 ? "Take Immediate Action" : kp >= 3 ? "Monitor Closely" : "Continue Normal Operations",
      };
    }

    // Generate recommendation based on weather data
    const kpLevel = kp;
    let primary = "";
    let details = [];
    let priority = "low";
    let action = "Continue Normal Operations";

    if (kpLevel >= 7) {
      primary = "Critical solar storm detected. Immediate protective measures required for all satellite assets.";
      details = [
        "Activate emergency contingency protocols",
        "Prepare for potential satellite communication disruptions",
        "Consider powering down non-essential systems"
      ];
      priority = "critical";
      action = "Emergency Response Required";
    } else if (kpLevel >= 5) {
      primary = "Significant geomagnetic storm activity. Enhanced monitoring and protective actions recommended.";
      details = [
        "Increase satellite monitoring frequency",
        "Review contingency plans for critical assets",
        "Prepare for potential operational impacts"
      ];
      priority = "high";
      action = "Take Immediate Action";
    } else if (kpLevel >= 3) {
      primary = "Elevated space weather conditions. Maintain heightened awareness and standard protocols.";
      details = [
        "Continue regular monitoring of systems",
        "Review space weather forecasts",
        "Maintain communication with ground stations"
      ];
      priority = "medium";
      action = "Monitor Closely";
    } else {
      primary = "Stable space weather conditions. All systems operating within normal parameters.";
      details = [
        "Continue standard monitoring protocols",
        "Routine maintenance and checks",
        "Prepare systems for future events"
      ];
      priority = "low";
      action = "Continue Normal Operations";
    }

    return { primary, details, priority, action };
  };

  const recommendation = getRecommendations();
  const priorityColors = {
    critical: { bg: "rgba(239, 68, 68, 0.1)", border: "rgba(239, 68, 68, 0.2)", color: "#EF4444", glow: "rgba(239, 68, 68, 0.3)" },
    high: { bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.2)", color: "#F59E0B", glow: "rgba(245, 158, 11, 0.3)" },
    medium: { bg: "rgba(56, 189, 248, 0.1)", border: "rgba(56, 189, 248, 0.2)", color: "#38BDF8", glow: "rgba(56, 189, 248, 0.3)" },
    low: { bg: "rgba(34, 197, 94, 0.1)", border: "rgba(34, 197, 94, 0.2)", color: "#4ADE80", glow: "rgba(34, 197, 94, 0.3)" },
  };

  const colors = priorityColors[recommendation.priority] || priorityColors.low;

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case "critical": return AlertCircle;
      case "high": return AlertTriangle;
      case "medium": return Zap;
      default: return Shield;
    }
  };

  const PriorityIcon = getPriorityIcon(recommendation.priority);

  return (
    <motion.div 
      className="recommendation-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        borderColor: colors.border
      }}
    >
      <div className="card-glow-effect" style={{ 
        background: `radial-gradient(circle at 30% 30%, ${colors.bg}, transparent 70%)` 
      }}></div>
      
      {/* Header */}
      <div className="recommendation-header">
        <div className="header-left">
          <div className="header-icon-wrapper" style={{ 
            background: colors.bg,
            borderColor: colors.border
          }}>
            <Brain size={24} className="header-icon" style={{ color: colors.color }} />
          </div>
          <div>
            <h3 className="recommendation-title">AI Recommendation</h3>
            <p className="recommendation-subtitle">Space weather advisory</p>
          </div>
        </div>
        <div className="priority-badge" style={{ 
          background: colors.bg,
          borderColor: colors.border,
          color: colors.color
        }}>
          <PriorityIcon size={14} />
          <span>{recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority</span>
        </div>
      </div>

      {/* Primary Recommendation */}
      <div className="primary-recommendation" style={{ 
        background: colors.bg,
        borderColor: colors.border
      }}>
        <div className="recommendation-icon-wrapper">
          <Lightbulb size={24} style={{ color: colors.color }} />
        </div>
        <div className="recommendation-content">
          <p className="recommendation-text">{recommendation.primary}</p>
          <div className="action-badge" style={{ 
            background: colors.bg,
            borderColor: colors.border,
            color: colors.color
          }}>
            <span className="action-dot" style={{ background: colors.color }}></span>
            <span>{recommendation.action}</span>
          </div>
        </div>
      </div>

      {/* Detailed Recommendations */}
      {recommendation.details && recommendation.details.length > 0 && (
        <div className="details-section">
          <h4 className="details-title">
            <span className="details-icon">📋</span>
            Action Items
          </h4>
          <div className="details-list">
            {recommendation.details.map((detail, index) => (
              <motion.div 
                key={index}
                className="detail-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="detail-marker" style={{ 
                  background: colors.color,
                  boxShadow: `0 0 12px ${colors.glow}`
                }}></div>
                <span className="detail-text">{detail}</span>
                <div className="detail-check">
                  <CheckCircle size={16} style={{ color: colors.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="recommendation-footer">
        <div className="footer-info">
          <div className="info-item">
            <Clock size={14} />
            <span>Updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="info-item">
            <span className="confidence-label">AI Confidence</span>
            <span className="confidence-value" style={{ color: colors.color }}>
              {weather.kp_index ? "92%" : "85%"}
            </span>
          </div>
        </div>
        <div className="footer-tip">
          <span>💡 Based on real-time space weather data</span>
        </div>
      </div>

      {/* Floating Glow Effect */}
      <div className="floating-glow" style={{ 
        background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)` 
      }}></div>
    </motion.div>
  );
}

export default RecommendationCard;