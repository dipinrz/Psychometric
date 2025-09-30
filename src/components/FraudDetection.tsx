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
} from "lucide-react";
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

const FraudDetectionDashboard: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "fraud" | "clean">(
    "all"
  );
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for demonstration
  const mockPredictions: Prediction[] = [
    {
      report_id: "RPT_0000820",
      candidate_id: "C_00293",
      report_date: "2024-12-04",
      Hemoglobin: 13.82,
      Hematocrit: 43.87,
      WBC: 7.66,
      Neutrophils: 66,
      Lymphocytes: 25.2,
      Platelets: 256.41,
      ALT: 50,
      AST: 35,
      Bilirubin: 1.15,
      HBsAg: "Positive",
      HBV_DNA: "Negative",
      HAV_IgM: "Negative",
      RPR: "Negative",
      Treponemal: "Negative",
      TotalProtein: 7.68,
      Albumin: 4.34,
      HbA1c: 4.95,
      FastingGlucose: 87.4,
      Creatinine: 0.95,
      BUN: 12.45,
      Sodium: 142.02,
      Potassium: 3.68,
      ALP: 71.37,
      Cholesterol: 167.2,
      LDL: 90.37,
      HDL: 60.78,
      Triglycerides: 4.75,
      Urine_RBC: "Absent",
      Urine_Blood: "Negative",
      Urine_Protein: null,
      ABO_BloodGrp: "AB",
      Rh_Factor: "Positive",
      Parasites: "Absent",
      Eosinophils: 3.8,
      RandomGlucose: 98.98,
      SampleType: "Serum",
      Predicted_Target_Label: 1,
      Probability_Altered: 0.7192,
      description:
        "Elevated ALT levels with positive HBsAg indicate potential hepatitis B infection requiring verification",
    },
    {
      report_id: "RPT_0000265",
      candidate_id: "C_00207",
      report_date: "2025-08-01",
      Hemoglobin: 13.86,
      Hematocrit: 38.43,
      WBC: 6.75,
      Neutrophils: 58.4,
      Lymphocytes: 34.4,
      Platelets: 437.39,
      ALT: 31.65,
      AST: 12.49,
      Bilirubin: 0.86,
      HBsAg: "Negative",
      HBV_DNA: "Negative",
      HAV_IgM: "Negative",
      RPR: "Positive",
      Treponemal: "Negative",
      TotalProtein: 6.78,
      Albumin: 4.78,
      HbA1c: 4.7,
      FastingGlucose: 84.8,
      Creatinine: 0.7,
      BUN: 16.99,
      Sodium: 138.39,
      Potassium: 4.65,
      ALP: 65.21,
      Cholesterol: 64.34,
      LDL: 46.55,
      HDL: 68.86,
      Triglycerides: 139.76,
      Urine_RBC: "Absent",
      Urine_Blood: "Negative",
      Urine_Protein: null,
      ABO_BloodGrp: "A",
      Rh_Factor: "Negative",
      Parasites: "Absent",
      Eosinophils: 2.3,
      RandomGlucose: 80.46,
      SampleType: "Whole Blood",
      Predicted_Target_Label: 0,
      Probability_Altered: 0.3305,
      description:
        "Normal parameters with minor variations within acceptable limits",
    },
  ];

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);

    // const resp = await axios.post(
    //   "https://fraud-detection-1-b3m1.onrender.com/predict?return_csv=true",
    //   { file: selectedFile }
    // );
    // console.log(resp);

    // Simulate API call
    setTimeout(() => {
      setPredictions(mockPredictions);
      setLoading(false);
    }, 2000);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".xlsx"))
    ) {
      setFile(droppedFile);
      // Trigger API call here
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-blue-600" />
            Medical Report Fraud Detection
          </h1>
          <p className="text-gray-600 mt-2">
            Detect altered medical reports using AI-powered analysis
          </p>
        </motion.div>

        {/* Upload Section */}
        {predictions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".csv,.xlsx"
                className="hidden"
              />

              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Medical Reports
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your CSV or Excel file here, or click to browse
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose File
              </button>
              {file && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Analyzing medical reports...</p>
          </motion.div>
        )}

        {/* Results Dashboard */}
        {predictions.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                value={Math.round((fraudCount / predictions.length) * 100)}
                icon={<BarChart3 className="w-6 h-6 text-amber-600" />}
                color="border-amber-400"
                subtitle="% of total"
              />
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by Report ID or Candidate ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFilterStatus("all")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      filterStatus === "all"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus("fraud")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      filterStatus === "fraud"
                        ? "bg-red-100 text-red-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Altered
                  </button>
                  <button
                    onClick={() => setFilterStatus("clean")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      filterStatus === "clean"
                        ? "bg-green-100 text-green-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Normal
                  </button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Confidence
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPredictions.map((prediction, index) => (
                      <React.Fragment key={prediction.report_id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">
                                {prediction.report_id}
                              </div>
                              <div className="text-sm text-gray-500">
                                Candidate: {prediction.candidate_id} •{" "}
                                {prediction.report_date}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                Sample: {prediction.SampleType}
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
                            <div className="text-sm font-medium text-gray-900">
                              {(prediction.Probability_Altered * 100).toFixed(
                                1
                              )}
                              %
                            </div>
                            <div className="text-xs text-gray-500">
                              Confidence level
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
                              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              {expandedRow === prediction.report_id
                                ? "Hide"
                                : "View"}{" "}
                              Details
                              {expandedRow === prediction.report_id ? (
                                <ChevronUp className="w-4 h-4 ml-1" />
                              ) : (
                                <ChevronDown className="w-4 h-4 ml-1" />
                              )}
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
                              <td colSpan={4} className="px-6 py-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-3">
                                      Key Parameters
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div>
                                        <span className="text-gray-600">
                                          HbA1c:
                                        </span>
                                        <span className="font-medium ml-2">
                                          {prediction.HbA1c}%
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Glucose:
                                        </span>
                                        <span className="font-medium ml-2">
                                          {prediction.FastingGlucose}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          Cholesterol:
                                        </span>
                                        <span className="font-medium ml-2">
                                          {prediction.Cholesterol}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-gray-600">
                                          ALT:
                                        </span>
                                        <span className="font-medium ml-2">
                                          {prediction.ALT}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-3">
                                      AI Analysis
                                    </h4>
                                    <div
                                      className={`p-3 rounded-lg ${
                                        prediction.Predicted_Target_Label === 1
                                          ? "bg-red-50 border border-red-200"
                                          : "bg-green-50 border border-green-200"
                                      }`}
                                    >
                                      <p className="text-sm">
                                        {prediction.description ||
                                          (prediction.Predicted_Target_Label ===
                                          1
                                            ? "This report shows patterns consistent with data alteration"
                                            : "No significant anomalies detected")}
                                      </p>
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
                <div className="text-center py-12 text-gray-500">
                  No reports found matching your criteria
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </button>
              <button
                onClick={() => {
                  setPredictions([]);
                  setFile(null);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze New Batch
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FraudDetectionDashboard;
