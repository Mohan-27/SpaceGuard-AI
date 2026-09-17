import { motion } from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  AlertCircle, 
  Zap,
  TrendingUp,
  Clock,
  Activity
} from "lucide-react";
import "../style/RiskCard.css";

function RiskCard({ weather }) {
  if (!weather) {
    return (
      <motion.div 
        className="risk-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Loading Risk Assessment...</p>
      </motion.div>
    );
  }

  // Get risk level details
  const getRiskDetails = (riskLevel, riskScore) => {
    const score = riskScore || 0;
    const level = riskLevel?.toLowerCase() || "unknown";
    
    const details = {
      critical: {
        icon: AlertCircle,
        color: "#EF4444",
        bgColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgba(239, 68, 68, 0.2)",
        glowColor: "rgba(239, 68, 68, 0.3)",
        label: "Critical Risk",
        description: "Immediate action required. Severe space weather conditions detected.",
        emoji: "🔴",
        recommendation: "Activate emergency protocols and protect critical assets."
      },
      high: {
        icon: AlertTriangle,
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        borderColor: "rgba(245, 158, 11, 0.2)",
        glowColor: "rgba(245, 158, 11, 0.3)",
        label: "High Risk",
        description: "Significant risk to satellite operations. Monitor closely.",
        emoji: "🟡",
        recommendation: "Increase monitoring frequency and prepare contingency plans."
      },
      medium: {
        icon: Zap,
        color: "#38BDF8",
        bgColor: "rgba(56, 189, 248, 0.1)",
        borderColor: "rgba(56, 189, 248, 0.2)",
        glowColor: "rgba(56, 189, 248, 0.3)",
        label: "Medium Risk",
        description: "Moderate space weather activity. Routine monitoring advised.",
        emoji: "🔵",
        recommendation: "Maintain standard monitoring protocols."
      },
      low: {
        icon: Shield,
        color: "#4ADE80",
        bgColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "rgba(34, 197, 94, 0.2)",
        glowColor: "rgba(34, 197, 94, 0.3)",
        label: "Low Risk",
        description: "Stable space weather conditions. All systems nominal.",
        emoji: "🟢",
        recommendation: "Continue normal operations."
      }
    };

    // Determine risk level based on score if not provided
    let key = level;
    if (key === "unknown" || !details[key]) {
      if (score >= 70) key = "critical";
      else if (score >= 50) key = "high";
      else if (score >= 30) key = "medium";
      else key = "low";
    }

    return details[key] || details.low;
  };

  const riskDetails = getRiskDetails(weather.risk_level, weather.risk_score);
  const RiskIcon = riskDetails.icon;
  const score = weather.risk_score || 0;

  // Calculate risk level for meter
  const getRiskLevel = (score) => {
    if (score >= 70) return { label: "Critical", color: "#EF4444", width: "100%" };
    if (score >= 50) return { label: "High", color: "#F59E0B", width: "75%" };
    if (score >= 30) return { label: "Medium", color: "#38BDF8", width: "50%" };
    return { label: "Low", color: "#4ADE80", width: "25%" };
  };

  const riskLevel = getRiskLevel(score);

  return (
    <motion.div 
      className="risk-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-glow-effect" style={{ 
        background: `radial-gradient(circle at 30% 30%, ${riskDetails.bgColor}, transparent 70%)` 
      }}></div>
      
      {/* Header */}
      <div className="risk-header">
        <div className="header-left">
          <div className="header-icon-wrapper" style={{ 
            background: riskDetails.bgColor,
            borderColor: riskDetails.borderColor
          }}>
            <RiskIcon size={24} className="header-icon" style={{ color: riskDetails.color }} />
          </div>
          <div>
            <h3 className="risk-title">Risk Assessment</h3>
            <p className="risk-subtitle">Real-time threat analysis</p>
          </div>
        </div>
        <div className="header-badge" style={{ 
          background: riskDetails.bgColor,
          borderColor: riskDetails.borderColor,
          color: riskDetails.color
        }}>
          <span className="badge-emoji">{riskDetails.emoji}</span>
          <span className="badge-label">{riskDetails.label}</span>
        </div>
      </div>

      {/* Risk Meter */}
      <div className="risk-meter-container">
        <div className="risk-meter-header">
          <span className="meter-label">Risk Score</span>
          <span className="meter-value" style={{ color: riskDetails.color }}>
            {score}%
          </span>
        </div>
        <div className="risk-meter-track">
          <motion.div 
            className="risk-meter-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ 
              background: `linear-gradient(90deg, ${riskDetails.color}40, ${riskDetails.color})`,
              boxShadow: `0 0 20px ${riskDetails.glowColor}`
            }}
          >
            <div className="meter-glow"></div>
          </motion.div>
        </div>
        <div className="risk-meter-labels">
          <span style={{ color: "#4ADE80" }}>Low</span>
          <span style={{ color: "#F59E0B" }}>Medium</span>
          <span style={{ color: "#EF4444" }}>High</span>
        </div>
      </div>

      {/* Risk Details Grid */}
      <div className="risk-details-grid">
        <div className="risk-detail-item">
          <div className="detail-icon-wrapper" style={{ color: riskDetails.color }}>
            <Activity size={18} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Risk Level</span>
            <span className="detail-value" style={{ color: riskDetails.color }}>
              {riskDetails.label}
            </span>
          </div>
        </div>

        <div className="risk-detail-item">
          <div className="detail-icon-wrapper" style={{ color: riskDetails.color }}>
            <TrendingUp size={18} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Impact</span>
            <span className="detail-value" style={{ color: riskDetails.color }}>
              {score >= 50 ? "High" : score >= 30 ? "Moderate" : "Low"}
            </span>
          </div>
        </div>

        <div className="risk-detail-item">
          <div className="detail-icon-wrapper" style={{ color: riskDetails.color }}>
            <Shield size={18} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Status</span>
            <span className="detail-value" style={{ color: riskDetails.color }}>
              {riskLevel.label}
            </span>
          </div>
        </div>

        <div className="risk-detail-item">
          <div className="detail-icon-wrapper" style={{ color: riskDetails.color }}>
            <Clock size={18} />
          </div>
          <div className="detail-info">
            <span className="detail-label">Updated</span>
            <span className="detail-value">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Risk Description */}
      <div className="risk-description" style={{ 
        background: riskDetails.bgColor,
        borderColor: riskDetails.borderColor
      }}>
        <div className="description-header">
          <span className="description-emoji">{riskDetails.emoji}</span>
          <span className="description-title">Risk Analysis</span>
        </div>
        <p className="description-text">{riskDetails.description}</p>
        <div className="recommendation-box">
          <span className="recommendation-icon">💡</span>
          <span className="recommendation-text">{riskDetails.recommendation}</span>
        </div>
      </div>

      {/* Risk Indicator Dots */}
      <div className="risk-indicators">
        <div className="indicator-dot" style={{ 
          background: score >= 70 ? "#EF4444" : "#374151",
          boxShadow: score >= 70 ? "0 0 12px rgba(239, 68, 68, 0.4)" : "none"
        }}></div>
        <div className="indicator-dot" style={{ 
          background: score >= 50 && score < 70 ? "#F59E0B" : "#374151",
          boxShadow: score >= 50 && score < 70 ? "0 0 12px rgba(245, 158, 11, 0.4)" : "none"
        }}></div>
        <div className="indicator-dot" style={{ 
          background: score >= 30 && score < 50 ? "#38BDF8" : "#374151",
          boxShadow: score >= 30 && score < 50 ? "0 0 12px rgba(56, 189, 248, 0.4)" : "none"
        }}></div>
        <div className="indicator-dot" style={{ 
          background: score < 30 ? "#4ADE80" : "#374151",
          boxShadow: score < 30 ? "0 0 12px rgba(34, 197, 94, 0.4)" : "none"
        }}></div>
      </div>
    </motion.div>
  );
}

export default RiskCard;