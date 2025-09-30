import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
      image_url:
        "https://www.health.state.mn.us/communities/practice/resources/phqitoolbox/images/scatter_ex_atlanticcities_rsz.jpg",
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
      flags: [
        {
          code: "IMG_TAMPER",
          description:
            "Evidence of image manipulation in lab result values",
          confidence: 0.91,
          severity: "high",
        },
        {
          code: "VALUE_MISMATCH",
          description:
            "OCR extracted values differ from reported numerical values",
          confidence: 0.87,
          severity: "high",
        },
        {
          code: "AXIS_INCONSISTENCY",
          description: "Graph axis scaling suggests altered data points",
          confidence: 0.78,
          severity: "medium",
        },
        {
          code: "FONT_ANOMALY",
          description:
            "Inconsistent font styles detected in result labels",
          confidence: 0.65,
          severity: "medium",
        },
      ],
      explanation:
        "High fraud score driven by image tampering evidence + mismatch between reported values and values extracted from the graph. OCR shows Hemoglobin ~11 g/dL and RBC ~3.9, but plot axis scaling suggests those points were altered. Additional suspicious regions indicate potential digital manipulation of result values.",
    },
    generated_at: "2024-01-15T14:30:00Z",
    report_id: "FDR-2024-001567",
    analysis_timestamp: "2024-01-15T14:28:32Z",
    model_version: "v2.3.1-fraud-detector",
  };

  return (
    <Router>
      <div >

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
