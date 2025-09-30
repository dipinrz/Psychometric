import React from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText, 
  Shield, 
  Clock,
  Image,
  Activity
} from "lucide-react";

interface FraudDetectionReportProps {
  report: any;
}

const FraudDetectionReport: React.FC<FraudDetectionReportProps> = ({ report }) => {
  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700">No fraud detection report provided.</p>
      </div>
    );
  }

  const getStatusColor = (score: number) => {
    if (score >= 0.7) return "text-red-600";
    if (score >= 0.4) return "text-amber-600";
    return "text-green-600";
  };

  const getStatusBgColor = (score: number) => {
    if (score >= 0.7) return "bg-red-100";
    if (score >= 0.4) return "bg-amber-100";
    return "bg-green-100";
  };

  const getStatusIcon = (score: number) => {
    if (score >= 0.7) return <XCircle className="h-8 w-8 text-red-600" />;
    if (score >= 0.4) return <AlertTriangle className="h-8 w-8 text-amber-600" />;
    return <CheckCircle className="h-8 w-8 text-green-600" />;
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case "low": return "text-red-600 bg-red-50";
      case "high": return "text-amber-600 bg-amber-50";
      case "slightly_high": return "text-amber-500 bg-amber-50";
      case "normal": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getFlagColor = (confidence: number) => {
    if (confidence >= 0.8) return "border-red-200 bg-red-50";
    if (confidence >= 0.6) return "border-amber-200 bg-amber-50";
    return "border-blue-200 bg-blue-50";
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />

      <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-center p-6 rounded-xl mb-8 ${getStatusBgColor(report.fraud_detection.fraud_score)} border-2 ${getStatusBgColor(report.fraud_detection.fraud_score).replace('bg-', 'border-')}`}
        >
          <div className="flex items-center space-x-4">
            {getStatusIcon(report.fraud_detection.fraud_score)}
            <div className="text-center">
              <h1 className={`text-3xl font-bold ${getStatusColor(report.fraud_detection.fraud_score)}`}>
                Fraud Detection Report
              </h1>
              <p className={`text-xl font-semibold mt-2 ${getStatusColor(report.fraud_detection.fraud_score)}`}>
                Score: {(report.fraud_detection.fraud_score * 100).toFixed(0)}% - {report.fraud_detection.is_fraudulent ? "Potential Fraud" : "Likely Authentic"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Patient Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Patient Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Patient ID</label>
              <p className="text-gray-800 font-semibold">{report.patient.patient_id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Name</label>
              <p className="text-gray-800 font-semibold">{report.patient.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Age & Gender</label>
              <p className="text-gray-800 font-semibold">{report.patient.age} years, {report.patient.gender}</p>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          {/* Lab Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Lab Metrics</h2>
            </div>
            <div className="space-y-4">
              {report.metrics.map((metric: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{metric.display_name}</p>
                    <p className="text-sm text-gray-600">{metric.value} {metric.units}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMetricStatusColor(metric.status)}`}>
                    {metric.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Image className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Image Analysis</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">OCR Confidence</span>
                <span className="font-semibold text-gray-800">{(report.image_analysis.ocr_confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Metadata Consistency</span>
                <span className="font-semibold text-gray-800">{(report.image_analysis.metadata_consistency_score * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Suspicious Regions</span>
                <span className="font-semibold text-red-600">{report.image_analysis.suspicious_regions.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fraud Flags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">Fraud Detection Flags</h2>
          </div>
          <div className="space-y-4">
            {report.fraud_detection.flags.map((flag: any, index: number) => (
              <div
                key={index}
                className={`p-4 border-2 rounded-lg ${getFlagColor(flag.confidence)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-800">{flag.code}</span>
                  <span className="text-sm font-medium text-gray-600">
                    Confidence: {(flag.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-gray-700">{flag.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Explanation & Recommended Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          {/* Explanation */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Analysis Explanation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{report.fraud_detection.explanation}</p>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Recommended Actions</h2>
            </div>
            <ul className="space-y-2">
              {report.fraud_detection.recommended_action.map((action: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Related Reports */}
        {report.related_reports && report.related_reports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Related Reports</h2>
            <div className="space-y-3">
              {report.related_reports.map((related: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-800">{related.id}</span>
                  <span className="text-sm text-gray-600">
                    Similarity: {(related.similarity_score * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-8 py-6"
        >
          <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl p-4 inline-block shadow-lg">
            <p className="text-sm" style={{ color: "#424750" }}>
              AI-Powered Fraud Detection • Generated on {new Date(report.generated_at).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FraudDetectionReport;