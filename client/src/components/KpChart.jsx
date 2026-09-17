import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { Activity, AlertCircle, TrendingUp, Clock } from "lucide-react";
import "../style/KpChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function KpChart({ history }) {
  // Print data in browser console
  console.log("History received:", history);

  // If history is not loaded yet
  if (!history) {
    return (
      <motion.div 
        className="kp-chart-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-spinner-small"></div>
        <p>Loading Chart Data...</p>
      </motion.div>
    );
  }

  // Check if labels and values exist
  if (!history.labels || !history.values) {
    return (
      <motion.div 
        className="kp-chart-error"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AlertCircle size={48} className="error-icon" />
        <h2>Invalid History Data</h2>
        <pre>{JSON.stringify(history, null, 2)}</pre>
      </motion.div>
    );
  }

  // Calculate statistics
  const values = history.values;
  const currentValue = values[values.length - 1] || 0;
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length;
  
  // Determine status
  const getStatus = (kp) => {
    if (kp >= 7) return { label: "Severe Storm", color: "#EF4444", emoji: "🔴" };
    if (kp >= 5) return { label: "Moderate Storm", color: "#F59E0B", emoji: "🟡" };
    if (kp >= 3) return { label: "Active", color: "#38BDF8", emoji: "🔵" };
    return { label: "Quiet", color: "#4ADE80", emoji: "🟢" };
  };

  const status = getStatus(currentValue);

  const data = {
    labels: history.labels,
    datasets: [
      {
        label: "KP Index",
        data: history.values,
        borderColor: "#38BDF8",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(56, 189, 248, 0.3)");
          gradient.addColorStop(0.5, "rgba(56, 189, 248, 0.1)");
          gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 7) return "#EF4444";
          if (value >= 5) return "#F59E0B";
          if (value >= 3) return "#38BDF8";
          return "#4ADE80";
        },
        pointBorderColor: "#030712",
        pointBorderWidth: 2,
        pointRadius: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 7) return 6;
          if (value >= 5) return 5;
          return 4;
        },
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#60A5FA",
        pointHoverBorderColor: "#030712",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(3, 7, 18, 0.9)",
        borderColor: "rgba(56, 189, 248, 0.2)",
        borderWidth: 1,
        titleColor: "#F8FAFC",
        titleFont: {
          family: "Poppins",
          size: 13,
          weight: "600",
        },
        bodyColor: "#E5E7EB",
        bodyFont: {
          family: "Poppins",
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            let status = "Quiet";
            let emoji = "🟢";
            if (value >= 7) {
              status = "Severe Storm";
              emoji = "🔴";
            } else if (value >= 5) {
              status = "Moderate Storm";
              emoji = "🟡";
            } else if (value >= 3) {
              status = "Active";
              emoji = "🔵";
            }
            return `${emoji} KP ${value.toFixed(1)} - ${status}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
          drawBorder: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            family: "Poppins",
            size: 10,
          },
          maxRotation: 45,
          minRotation: 30,
        },
      },
      y: {
        beginAtZero: true,
        max: 9,
        grid: {
          color: "rgba(255, 255, 255, 0.03)",
          drawBorder: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            family: "Poppins",
            size: 10,
          },
          stepSize: 1,
          callback: function(value) {
            if (value === 0) return "0";
            if (value === 9) return "9 ⚡";
            return value;
          }
        },
        title: {
          display: true,
          text: "KP Index Level",
          color: "#6B7280",
          font: {
            family: "Poppins",
            size: 11,
            weight: "500",
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <motion.div 
      className="kp-chart-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-glow-effect"></div>
      
      {/* Header */}
      <div className="kp-chart-header">
        <div className="header-left">
          <div className="header-icon-wrapper">
            <Activity size={20} className="header-icon" />
          </div>
          <div>
            <h3 className="chart-title">KP Index History</h3>
            <p className="chart-subtitle">24-hour geomagnetic activity</p>
          </div>
        </div>
        <div className="header-right">
          <div className="current-status" style={{ color: status.color }}>
            <span className="status-emoji">{status.emoji}</span>
            <span className="status-label">{status.label}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="kp-chart-wrapper">
        <Line data={data} options={options} />
      </div>

      {/* Statistics */}
      <div className="kp-chart-stats">
        <div className="stat-item">
          <span className="stat-label">Current</span>
          <span className="stat-value" style={{ color: status.color }}>
            {currentValue.toFixed(1)}
          </span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-label">Maximum</span>
          <span className="stat-value" style={{ color: maxValue >= 7 ? "#EF4444" : "#F8FAFC" }}>
            {maxValue.toFixed(1)}
          </span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-label">Minimum</span>
          <span className="stat-value" style={{ color: minValue <= 2 ? "#4ADE80" : "#F8FAFC" }}>
            {minValue.toFixed(1)}
          </span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-label">Average</span>
          <span className="stat-value" style={{ color: avgValue >= 5 ? "#F59E0B" : "#F8FAFC" }}>
            {avgValue.toFixed(1)}
          </span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-label">Data Points</span>
          <span className="stat-value">{values.length}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="kp-chart-footer">
        <div className="footer-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#4ADE80" }}></span>
            <span>Quiet (0-2)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#38BDF8" }}></span>
            <span>Active (3-4)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#F59E0B" }}></span>
            <span>Storm (5-6)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: "#EF4444" }}></span>
            <span>Severe (7-9)</span>
          </div>
        </div>
        <div className="footer-timestamp">
          <Clock size={14} />
          <span>Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default KpChart;