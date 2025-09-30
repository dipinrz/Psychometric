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

        {/* Patient Information - Made smaller */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-200"
        >
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">Patient Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Patient ID</label>
              <p className="text-gray-800 font-semibold text-sm">{report.patient.patient_id}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Name</label>
              <p className="text-gray-800 font-semibold text-sm">{report.patient.name}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Age & Gender</label>
              <p className="text-gray-800 font-semibold text-sm">{report.patient.age} years, {report.patient.gender}</p>
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
          {/* Lab Metrics - Scrollable */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Lab Metrics</h2>
            </div>
            <div className="flex-1 overflow-y-auto max-h-80"> {/* Added max height and scroll */}
              <div className="space-y-3 pr-2"> {/* Reduced spacing and added padding for scrollbar */}
                {report.metrics.map((metric: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{metric.display_name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-600">
                          {metric.value} {metric.units}
                        </p>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs text-gray-500 truncate">
                          {metric.normal_range}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ml-3 ${getMetricStatusColor(metric.status)}`}>
                      {metric.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Analysis - Updated to show only image */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <Image className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-800">Image Analysis</h2>
            </div>
            <div className="flex-1 flex justify-center items-center min-h-64"> {/* Added min height */}
              {report.image_analysis.image_url ? (
                <img 
                  src={report.image_analysis.image_url} 
                  alt="Lab report analysis"
                  className="max-w-full h-auto rounded-lg border border-gray-200 max-h-64 object-contain"
                />
              ) : (
                <div className="text-gray-500 text-center py-8">
                  <Image className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>No image available</p>
                </div>
              )}
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

        {/* Explanation - Single column since we removed the other sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Analysis Explanation</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{report.fraud_detection.explanation}</p>
        </motion.div>

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