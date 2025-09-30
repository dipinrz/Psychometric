import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  AlertTriangle,
  CheckCircle,
  FileText,
  BarChart3,
  Users,
  Shield,
  Download,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  Loader,
  X,
  FileUp,
} from "lucide-react";
// import { AxiosRequestConfig } from "axios";
import axios from "axios";

interface Prediction {
  report_id: string;
  candidate_id: string;
  report_date: string;
  Hemoglobin: number;
  Hematocrit: number;
  WBC: number;
  Neutrophils: number;
  Lymphocytes: number;
  Platelets: number;
  ALT: number;
  AST: number;
  Bilirubin: number;
  HBsAg: string;
  HBV_DNA: string;
  HAV_IgM: string;
  RPR: string;
  Treponemal: string;
  TotalProtein: number;
  Albumin: number;
  HbA1c: number;
  FastingGlucose: number;
  Creatinine: number;
  BUN: number;
  Sodium: number;
  Potassium: number;
  ALP: number;
  Cholesterol: number;
  LDL: number;
  HDL: number;
  Triglycerides: number;
  Urine_RBC: string;
  Urine_Blood: string;
  Urine_Protein: string | null;
  ABO_BloodGrp: string;
  Rh_Factor: string;
  Parasites: string;
  Eosinophils: number;
  RandomGlucose: number;
  SampleType: string;
  Predicted_Target_Label: number;
  Probability_Altered: number;
  description?: string;
}

const FraudDetectionDashboardAPI: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "fraud" | "clean">(
    "all"
  );
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_ENDPOINT = "https://fraud-detection-1-b3m1.onrender.com/predict";

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.name.match(/\.(csv|xlsx|xls)$/i)) {
      setError("Please upload a CSV or Excel file");
      return;
    }

    setFile(selectedFile);
    setError(null);
    setUploadProgress(0);

    await processFile(selectedFile);
  };

  const processFile = async (file: File) => {
    setLoading(true);
    setUploadProgress(10);

    try {
      const formData = new FormData();
      formData.append("file", file);

      setUploadProgress(30);

      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      } as any);

      setUploadProgress(70);

      const data: any = response.data;
      setUploadProgress(90);

      // Transform the API response to match our interface
      if (data.predictions && Array.isArray(data.predictions)) {
        const transformedPredictions = data.predictions.map((pred: any) => ({
          ...pred,
          description:
            pred.Predicted_Target_Label === 1
              ? generateFraudDescription(pred)
              : "No significant anomalies detected. Report appears normal.",
        }));

        setPredictions(transformedPredictions);
      } else {
        throw new Error("Invalid response format from API");
      }

      setUploadProgress(100);
    } catch (err: any) {
      console.error("API Call failed:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to process file"
      );
      setPredictions([]);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const generateFraudDescription = (prediction: any): string => {
    const anomalies = [];

    // Check for common fraud indicators
    if (prediction?.Top_Feature_Contributions?.ALT > 40) anomalies.push("elevated liver enzymes");
    if (prediction?.Top_Feature_Contributions?.HbA1c > 6.5) anomalies.push("abnormal blood sugar levels");
    if (prediction?.Top_Feature_Contributions?.HBsAg === "Positive")
      anomalies.push("positive hepatitis B marker");
    if (prediction?.Top_Feature_Contributions?.RPR === "Positive")
      anomalies.push("positive syphilis screening");
    if (prediction?.Top_Feature_Contributions?.Cholesterol > 200) anomalies.push("high cholesterol levels");

    if (anomalies.length > 0) {
      return `Suspicious patterns detected: ${anomalies.join(
        ", "
      )}. Requires medical review.`;
    }

    return "Unusual parameter combinations detected. Potential data alteration suspected.";
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      processFile(droppedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPredictions([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const filteredPredictions = predictions.filter((prediction) => {
    const matchesSearch =
      prediction.report_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prediction.candidate_id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "fraud" && prediction.Predicted_Target_Label === 1) ||
      (filterStatus === "clean" && prediction.Predicted_Target_Label === 0);

    return matchesSearch && matchesFilter;
  });

  const fraudCount = predictions.filter(
    (p) => p.Predicted_Target_Label === 1
  ).length;
  const cleanCount = predictions.filter(
    (p) => p.Predicted_Target_Label === 0
  ).length;
  const riskPercentage =
    predictions.length > 0 ? (fraudCount / predictions.length) * 100 : 0;

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }> = ({ title, value, icon, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl border-l-4 ${color} bg-white shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      </div>
    </motion.div>
  );

  const FraudIndicator: React.FC<{ isFraud: boolean; probability: number }> = ({
    isFraud,
    probability,
  }) => (
    <div className="flex items-center space-x-2">
      <div
        className={`p-2 rounded-full ${
          isFraud ? "bg-red-100" : "bg-green-100"
        }`}
      >
        {isFraud ? (
          <AlertTriangle className="w-4 h-4 text-red-600" />
        ) : (
          <CheckCircle className="w-4 h-4 text-green-600" />
        )}
      </div>
      <div>
        <span
          className={`font-medium ${
            isFraud ? "text-red-700" : "text-green-700"
          }`}
        >
          {isFraud ? "Altered" : "Normal"}
        </span>
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              isFraud ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${probability * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  const ExportToCSV = () => {
    const convertToCSV = () => {
      const headers = [
        "Report ID",
        "Candidate ID",
        "Status",
        "Confidence",
        "Description",
      ];
      const csvData = filteredPredictions.map((pred) => [
        pred.report_id,
        pred.candidate_id,
        pred.Predicted_Target_Label === 1 ? "Altered" : "Normal",
        `${(pred.Probability_Altered * 100).toFixed(1)}%`,
        pred.description,
      ]);

      return [headers, ...csvData].map((row) => row.join(",")).join("\n");
    };

    const downloadCSV = () => {
      const csv = convertToCSV();
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fraud-detection-results-${
        new Date().toISOString().split("T")[0]
      }.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    };

    return (
      <button
        onClick={downloadCSV}
        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Results
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-lg mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Medical Report Fraud Detection
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered analysis to detect altered medical reports
          </p>
        </motion.div>

        {/* Upload Section */}
        {predictions.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-white/80 backdrop-blur-sm hover:border-blue-400 transition-all duration-300"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv,.xlsx,.xls"
                className="hidden"
              />

              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <FileUp className="w-10 h-10 text-blue-600" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Upload Medical Reports
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Drag and drop your CSV or Excel file here, or click to browse
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Choose File
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Supports .csv, .xlsx, .xls files
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center"
              >
                <X className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-700">{error}</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <Loader className="w-16 h-16 text-blue-600 animate-spin" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analyzing Medical Reports
            </h3>
            <p className="text-gray-600 mb-6">
              Processing your file with AI detection...
            </p>

            {/* Progress Bar */}
            <div className="w-64 mx-auto bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {uploadProgress}% complete
            </p>
          </motion.div>
        )}

        {/* Results Dashboard */}
        {predictions.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Total Reports"
                value={predictions.length}
                icon={<FileText className="w-6 h-6 text-gray-600" />}
                color="border-blue-400"
                subtitle="Processed"
              />
              <StatCard
                title="Altered Reports"
                value={fraudCount}
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                color="border-red-400"
                subtitle="Require review"
              />
              <StatCard
                title="Normal Reports"
                value={cleanCount}
                icon={<CheckCircle className="w-6 h-6 text-green-600" />}
                color="border-green-400"
                subtitle="Verified"
              />
              <StatCard
                title="Risk Score"
                value={Math.round(riskPercentage)}
                icon={<BarChart3 className="w-6 h-6 text-amber-600" />}
                color="border-amber-400"
                subtitle="% of total"
              />
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by Report ID or Candidate ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === "all"
                        ? "bg-blue-100 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus("fraud")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === "fraud"
                        ? "bg-red-100 text-red-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Altered
                  </button>
                  <button
                    onClick={() => setFilterStatus("clean")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === "clean"
                        ? "bg-green-100 text-green-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Normal
                  </button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Report Details
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Confidence
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPredictions.map((prediction: any, index) => (
                      <React.Fragment key={prediction.report_id}>
                        <tr className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {prediction.report_id}
                              </div>
                              <div className="text-sm text-gray-600">
                                Candidate: {prediction.candidate_id}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {prediction.report_date} •{" "}
                                {prediction.SampleType}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <FraudIndicator
                              isFraud={prediction.Predicted_Target_Label === 1}
                              probability={prediction.Probability_Altered}
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className="text-lg font-bold text-gray-900">
                                {(prediction.Probability_Altered * 100).toFixed(
                                  1
                                )}
                                %
                              </div>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  prediction.Probability_Altered > 0.7
                                    ? "bg-red-500"
                                    : prediction.Probability_Altered > 0.3
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                                }`}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                setExpandedRow(
                                  expandedRow === prediction.report_id
                                    ? null
                                    : prediction.report_id
                                )
                              }
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {expandedRow === prediction.report_id
                                ? "Hide"
                                : "View"}{" "}
                              Details
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {expandedRow === prediction.report_id && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td
                                colSpan={4}
                                className="px-6 py-6 bg-blue-50/30"
                              >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                      <FileText className="w-4 h-4 mr-2" />
                                      Key Medical Parameters
                                    </h4>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      {prediction?.Top_Feature_Contributions &&
                                        Object.entries(
                                          prediction.Top_Feature_Contributions
                                        ).map(([key, value]) => (
                                          <ParameterItem
                                            key={key}
                                            label={key}
                                            value={value}
                                            unit={
                                              typeof value === "number"
                                                ? "%"
                                                : ""
                                            }
                                          />
                                        ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                      <Shield className="w-4 h-4 mr-2" />
                                      AI Analysis Results
                                    </h4>
                                    <div
                                      className={`p-4 rounded-xl border-2 ${
                                        prediction.Predicted_Target_Label === 1
                                          ? "bg-red-50/50 border-red-200"
                                          : "bg-green-50/50 border-green-200"
                                      }`}
                                    >
                                      <div className="flex items-start space-x-3">
                                        {prediction.Predicted_Target_Label ===
                                        1 ? (
                                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                        ) : (
                                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        )}
                                        <div>
                                          <p className="font-medium text-gray-900 mb-1">
                                            {prediction.Predicted_Target_Label ===
                                            1
                                              ? "Potential Fraud Detected"
                                              : "Report Verified"}
                                          </p>
                                          <p className="text-sm text-gray-700 leading-relaxed">
                                            {prediction.description}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPredictions.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">
                    No reports found matching your criteria
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing {filteredPredictions.length} of {predictions.length}{" "}
                reports
              </div>
              <div className="flex space-x-4">
                <ExportToCSV />
                <button
                  onClick={clearFile}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                >
                  Analyze New Batch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const ParameterItem: React.FC<{
  label: string;
  value: number | any;
  unit: string;
}> = ({ label, value, unit }) => (
  <div className="flex justify-between items-center p-2 bg-white rounded-lg border">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-900 font-semibold">
      {value} <span className="text-gray-400 text-sm">{unit}</span>
    </span>
  </div>
);

export default FraudDetectionDashboardAPI;
