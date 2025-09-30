import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Header from "./components/Header";
// import GaugeChart from "./components/GaugeChart";
// import HealthCard from "./components/HealthCard";
// import Recommendations from "./components/Recommendations";
// import Footer from "./components/Footer";
import Build from "./components/Build";
import FraudDetectionDashboard from "./components/FraudDetection";
import FraudDetectionDashboardAPI from "./components/FraudDetectionAPi";
import FraudDetectionReport from "./components/Fraud";

const healthMetrics = [
  {
    title: "⚖️ High BMI",
    score: 75,
    suggestion: "Adopt a balanced diet and increase physical activity.",
  },
  {
    title: "💓 High Blood Pressure",
    score: 68,
    suggestion: "Reduce salt intake and monitor BP regularly.",
  },
  {
    title: "🩸 Cholesterol Level",
    score: 72,
    suggestion: "Limit fried foods and include more fiber in diet.",
  },
  {
    title: "🩺 Medical History",
    score: 85,
    suggestion:
      "No major cardiovascular events. Regular check-ups recommended.",
  },
];

function App() {
  const reportData = {
    patient: {
      patient_id: "PT-2024-78942",
      name: "John M. Smith",
      age: 42,
      gender: "Male",
    },
    metrics: [
      {
        display_name: "Hemoglobin",
        value: 11.2,
        units: "g/dL",
        status: "low",
        normal_range: "13.5-17.5 g/dL",
      },
      {
        display_name: "Red Blood Cells",
        value: 3.9,
        units: "million/µL",
        status: "low",
        normal_range: "4.5-5.9 million/µL",
      },
      {
        display_name: "White Blood Cells",
        value: 6.8,
        units: "thousand/µL",
        status: "normal",
        normal_range: "4.5-11.0 thousand/µL",
      },
      {
        display_name: "Platelets",
        value: 245,
        units: "thousand/µL",
        status: "normal",
        normal_range: "150-450 thousand/µL",
      },
      {
        display_name: "Glucose",
        value: 98,
        units: "mg/dL",
        status: "normal",
        normal_range: "70-100 mg/dL",
      },
      {
        display_name: "Cholesterol",
        value: 189,
        units: "mg/dL",
        status: "slightly_high",
        normal_range: "<200 mg/dL",
      },
    ],
    image_analysis: {
      image_url: "/image.png",
      ocr_confidence: 0.87,
      metadata_consistency_score: 0.42,
      suspicious_regions: [
        {
          region_id: "reg_001",
          coordinates: { x: 145, y: 89, width: 120, height: 45 },
          confidence: 0.91,
          description: "Potential value tampering in hemoglobin results",
        },
        {
          region_id: "reg_002",
          coordinates: { x: 280, y: 156, width: 95, height: 38 },
          confidence: 0.76,
          description: "Inconsistent font rendering in RBC values",
        },
      ],
      image_hash: "a7f1c4d89e2b356f",
      format_analysis: "JPEG with potential compression artifacts",
    },
    fraud_detection: {
      fraud_score: 0.82,
      is_fraudulent: true,
      top_features: [
        {
          feature: "glucose_avg_hba1c_diff",
          mean_abs_shap: 0.545415,
          description: "Discrepancy between glucose levels and HbA1c averages",
          impact: "high",
        },
        {
          feature: "bp_hba1c_ratio",
          mean_abs_shap: 0.529408,
          description: "Abnormal blood pressure to HbA1c ratio",
          impact: "high",
        },
        {
          feature: "tg_hdl_ratio",
          mean_abs_shap: 0.516098,
          description: "Triglyceride to HDL cholesterol ratio anomaly",
          impact: "high",
        },
        {
          feature: "bmi_bp_ratio",
          mean_abs_shap: 0.44819,
          description: "BMI to blood pressure ratio inconsistency",
          impact: "medium",
        },
        {
          feature: "bmi_hba1c_ratio",
          mean_abs_shap: 0.436957,
          description: "BMI to HbA1c ratio deviation",
          impact: "medium",
        },
        {
          feature: "weight_height_bmi_check",
          mean_abs_shap: 0.369766,
          description: "Weight-height BMI calculation mismatch",
          impact: "medium",
        },
        {
          feature: "cholesterol_hba1c_ratio",
          mean_abs_shap: 0.336934,
          description: "Cholesterol to HbA1c ratio irregularity",
          impact: "medium",
        },
        {
          feature: "ldl_hba1c_ratio",
          mean_abs_shap: 0.2983,
          description: "LDL to HbA1c ratio discrepancy",
          impact: "low",
        },
        {
          feature: "hdl_ldl_ratio",
          mean_abs_shap: 0.283776,
          description: "HDL to LDL ratio anomaly",
          impact: "low",
        },
        {
          feature: "cholesterol_bp_ratio",
          mean_abs_shap: 0.260184,
          description: "Cholesterol to blood pressure ratio inconsistency",
          impact: "low",
        },
      ],
      explanation:
        "High fraud probability primarily driven by physiological inconsistencies in metabolic ratios. Key indicators include abnormal glucose-HbA1c relationship, unusual blood pressure correlations, and triglyceride-HDL ratio anomalies. These biomarker patterns suggest potential data manipulation as they deviate from expected clinical correlations observed in authentic medical reports.",
    },
    generated_at: "2024-01-15T14:30:00Z",
    report_id: "FDR-2024-001567",
    analysis_timestamp: "2024-01-15T14:28:32Z",
    model_version: "v2.3.1-fraud-detector",
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Default route */}
          <Route
            path="/"
            element={<FraudDetectionReport report={reportData} />}
          />

          {/* Other routes */}
          <Route path="/build" element={<Build />} />
          <Route path="/dashboard" element={<FraudDetectionDashboard />} />
          <Route
            path="/dashboard-api"
            element={<FraudDetectionDashboardAPI />}
          />

          {/* Redirect unknown routes to default */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
