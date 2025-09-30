import React from "react";
import Header from "./components/Header";
import GaugeChart from "./components/GaugeChart";
import HealthCard from "./components/HealthCard";
import Recommendations from "./components/Recommendations";
import Footer from "./components/Footer";
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
    // fullWidth: true
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
        {/* <Header 
        
          patientName="Alex Morgan" 
          age={42} 
          date="May 07, 2025" 
        /> */}

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            OVERALL CARDIOVASCULAR RISK
          </h3>
          <div className="relative inline-block">
            <GaugeChart percentage={42} />
          </div>
          <div className="mt-3 text-sm text-orange-600">
            Moderate risk: follow up in 3 months
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {healthMetrics.map((metric, index) => (
            <HealthCard
              key={index}
              title={metric.title}
              score={metric.score}
              suggestion={metric.suggestion}
              // fullWidth={metric.fullWidth}
            />
          ))}
        </div>

        {/* <Recommendations /> */}
        {/* <Footer /> */}
      </div>
      <Build />
      <FraudDetectionDashboard />
      <FraudDetectionDashboardAPI />
      <FraudDetectionReport
        report={{
          id: "report_0001",
          type: "fraud_detection_lab_report",
          generated_at: "2025-09-29T15:22:10Z",
          patient: {
            patient_id: "pat_54231",
            name: "Test User",
            age: 58,
            gender: "male",
          },
          image: {
            s3_url:
              "https://s3.amazonaws.com/your-bucket/reports/graph_report_0001.png",
            filename: "graph_report_0001.png",
            mime_type: "image/png",
            width: 1200,
            height: 800,
            hash_sha256:
              "3f7c2a8b7a1c9d5e9b0f14a2a9d8f6c3e5b1c9d7f2a4e6b8c9d0a1b2c3d4e5f6",
            graph_meta: {
              chart_type: "line",
              x_axis_label: "Date",
              y_axis_label: "Value",
              series: ["Hemoglobin", "RBC"],
              captured_at: "2025-09-29T15:20:23Z",
            },
          },
          metrics: [
            {
              name: "RBC",
              display_name: "Red Blood Cells",
              value: 3.9,
              units: "10^6/µL",
              normal_range: {
                min: 4.2,
                max: 5.9,
                population: "male_adult",
              },
              status: "low",
              measured_at: "2025-09-29T15:18:00Z",
              source: "reported_value",
            },
            {
              name: "Hemoglobin",
              display_name: "Hemoglobin (Hb)",
              value: 11.0,
              units: "g/dL",
              normal_range: {
                min: 13.5,
                max: 17.5,
                population: "male_adult",
              },
              status: "low",
              measured_at: "2025-09-29T15:18:00Z",
              source: "reported_value",
            },
            {
              name: "HbA1c",
              display_name: "HbA1c",
              value: 5.7,
              units: "%",
              normal_range: {
                min: 4.0,
                max: 5.6,
                population: "general",
              },
              status: "slightly_high",
              measured_at: "2025-09-29T15:18:00Z",
              source: "reported_value",
            },
            {
              name: "WBC",
              display_name: "White Blood Cells",
              value: 6.2,
              units: "10^3/µL",
              normal_range: {
                min: 4.0,
                max: 11.0,
                population: "adult",
              },
              status: "normal",
              measured_at: "2025-09-29T15:18:00Z",
              source: "reported_value",
            },
          ],
          image_analysis: {
            detected_text:
              "Hemoglobin: 11 g/dL\\nRBC: 3.9 x10^6/µL\\nHbA1c: 5.7%",
            ocr_confidence: 0.92,
            detected_plot_series: [
              {
                name: "Hemoglobin",
                points_detected: 12,
                value_range_in_plot: {
                  min: 10,
                  max: 15,
                },
              },
              {
                name: "RBC",
                points_detected: 12,
                value_range_in_plot: {
                  min: 3.8,
                  max: 5.2,
                },
              },
            ],
            metadata_consistency_score: 0.71,
            suspicious_regions: [
              {
                x: 820,
                y: 120,
                w: 220,
                h: 80,
                reason: "visual artifact / splice-like edge",
                confidence: 0.84,
              },
            ],
          },
          fraud_detection: {
            is_fraudulent: true,
            fraud_score: 0.86,
            flags: [
              {
                code: "IMG_TAMPER",
                description:
                  "Image shows signs of tampering (edge blending and inconsistent noise profile).",
                confidence: 0.84,
              },
              {
                code: "META_MISMATCH",
                description:
                  "Reported numeric values do not fully match values inferred from the graph image OCR & plot extraction.",
                confidence: 0.78,
              },
              {
                code: "UNUSUAL_TIMESTAMP",
                description:
                  "Image capture timestamp is suspicious relative to claimed sample collection time.",
                confidence: 0.6,
              },
            ],
            explanation:
              "High fraud score driven by image tampering evidence + mismatch between reported values and values extracted from the graph. OCR shows Hemoglobin ~11 g/dL and RBC ~3.9, but plot axis scaling suggests those points were altered.",
            recommended_action: [
              "Flag report for manual review by clinical team",
              "Request original lab files / DICOM / raw instrument output from source",
              "Compare image hash against previously submitted reports for duplicates",
            ],
          },
          related_reports: [
            {
              id: "report_0001_dupA",
              similarity_score: 0.92,
              match_reason: "identical image hash with minor metadata changes",
            },
          ],
          ui_summaries: {
            short_text:
              "Potential fraud detected — image tampering and value mismatch (fraud_score: 0.86). Manual review recommended.",
            detailed_text:
              "Image tampering detected with high confidence (0.84). OCR and plot extraction produce RBC=3.9 and Hb=11.0 which are inconsistent with claimed normal ranges. Please escalate.",
          },
        }}
      />
    </div>
  );
}

export default App;
