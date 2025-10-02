import React, { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Activity,
  TrendingUp,
  ChevronDown,
  Upload,
  FileUp,
  Loader2,
  Users,
  Brain,
  Shield,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import axios from "axios";

const PsychometricTestAnalytics = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await axios.post(
        "https://psychometric-analysis.heuristics.ae/predict?return_csv=false&top_n=3",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
          },
        }
      );

      setResponse(result.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      const event = { target: { files: [file] } };
      handleFileUpload(event);
    }
  };

  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Mental Health Risk
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your CSV file to analyze suicide risk predictions using
            advanced machine learning models
          </p>
        </motion.div>

        {/* File Upload Section */}
        {!response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                loading
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleChooseFileClick}
            >
              <input
                id="file-upload"
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleFileUpload}
                ref={fileInputRef}
              />

              <div className="flex flex-col items-center justify-center space-y-4">
                {loading ? (
                  <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                ) : (
                  <FileUp className="h-16 w-16 text-gray-400" />
                )}

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {loading ? "Processing File..." : "Upload Patient Data CSV"}
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    {loading
                      ? "Analyzing patient data with our psychometric risk assessment model..."
                      : "Drag and drop your CSV file here, or click to browse"}
                  </p>
                </div>

                {selectedFile && !loading && (
                  <div className="bg-white rounded-lg px-4 py-2 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700">
                      Selected:{" "}
                      <span className="text-blue-600">{selectedFile.name}</span>
                    </p>
                  </div>
                )}

                {!loading && (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                    type="button"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Choose File</span>
                  </button>
                )}
              </div>
            </div>

            {/* File Requirements */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 bg-white rounded-lg p-4 border border-gray-200"
              >
                <h4 className="font-semibold text-gray-800 mb-2">
                  Expected CSV Format:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • Columns: PATIENT_ID, AGE, GENDER, BMI, HEART_RATE, HBA1C,
                    etc.
                  </li>
                  <li>
                    • File should contain patient demographic and medical data
                  </li>
                  <li>• Supports single or multiple patient entries</li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center space-x-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Upload Error:</span>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Results Display */}
        {response && (
          <PsychometricResults response={response} loading={loading} />
        )}

        {/* Upload Another File Button */}
        {response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => {
                setResponse(null);
                setSelectedFile(null);
                setError(null);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto"
            >
              <Upload className="h-5 w-5" />
              <span>Analyze Another File</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Results Component
const PsychometricResults = ({ response, loading = false }: any) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3 text-gray-700">Processing results...</p>
      </div>
    );
  }

  if (!response) return null;

  const { predictions } = response;
  const isSingleEntry = !Array.isArray(predictions) || predictions.length === 1;
  const entries = isSingleEntry ? [predictions] : predictions;

  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return "bg-red-100 border-red-200 text-red-700";
      case "moderate":
        return "bg-yellow-100 border-yellow-200 text-yellow-700";
      case "low":
        return "bg-green-100 border-green-200 text-green-700";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return <XCircle className="h-8 w-8 text-red-600" />;
      case "moderate":
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      case "low":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      default:
        return <Shield className="h-8 w-8 text-gray-600" />;
    }
  };

  const highRiskCount = entries.filter(
    (entry) => entry.Predicted_Suicide_risk?.toLowerCase() === "high"
  ).length;
  const hasHighRisk = highRiskCount > 0;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center justify-center p-6 rounded-xl ${
          hasHighRisk
            ? "bg-red-100 border-red-200"
            : "bg-green-100 border-green-200"
        } border-2`}
      >
        <div className="flex items-center space-x-4">
          {getRiskIcon(hasHighRisk ? "high" : "low")}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Risk Assessment Complete
            </h1>
            <p className="text-xl font-semibold mt-2 text-gray-700">
              {entries.length} {isSingleEntry ? "patient" : "patients"} analyzed
              • {highRiskCount} high-risk cases detected
            </p>
          </div>
        </div>
      </motion.div>

      {/* Results Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {isSingleEntry ? (
          <SinglePatientView patient={entries[0]} />
        ) : (
          <MultiplePatientsView patients={entries} />
        )}
      </motion.div>
    </div>
  );
};

// Single Patient Detailed View
const SinglePatientView = ({ patient }: { patient: any }) => {
  const {
    PATIENT_ID,
    AGE,
    GENDER,
    BMI,
    HEART_RATE,
    HBA1C,
    DIABETES,
    MARITAL_STATUS,
    JOB_TITLE,
    BP_SYSTOLIC,
    TOBACCO,
    Predicted_Suicide_risk,
    Prediction_Confidence,
    Top_Feature_Contributions,
  } = patient;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Header with risk status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {getRiskIcon(Predicted_Suicide_risk)}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Patient Analysis
            </h2>
            <p
              className={`text-lg font-semibold ${
                getRiskColor(Predicted_Suicide_risk)
                  .replace("bg-", "text-")
                  .split(" ")[0]
              }`}
            >
              {Predicted_Suicide_risk} Suicide Risk
            </p>
          </div>
        </div>
        <div
          className={`px-4 py-2 rounded-full ${getRiskColor(
            Predicted_Suicide_risk
          )} font-semibold border`}
        >
          Confidence: {(Prediction_Confidence * 100).toFixed(1)}%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Information */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">
              Patient Information
            </h3>
          </div>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {Object.entries({
                  PATIENT_ID,
                  AGE,
                  GENDER,
                  BMI,
                  MARITAL_STATUS,
                  JOB_TITLE,
                  TOBACCO,
                }).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-700 text-sm border-r border-gray-200">
                      {formatFeatureName(key)}
                    </td>
                    <td className="px-4 py-3 text-gray-900 text-sm text-right">
                      {value !== null && value !== undefined
                        ? value.toString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Medical Metrics */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Medical Metrics</h3>
          </div>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {Object.entries({
                  HEART_RATE,
                  HBA1C,
                  BP_SYSTOLIC,
                  DIABETES,
                }).map(([key, value]) => (
                  <tr key={key} className="hover:bg-gray-100 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-700 text-sm border-r border-gray-200">
                      {formatFeatureName(key)}
                    </td>
                    <td className="px-4 py-3 text-gray-900 text-sm text-right">
                      {value !== null && value !== undefined
                        ? value.toString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Feature Contributions */}
          {Top_Feature_Contributions && (
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-gray-800">
                  Top Feature Contributions
                </h4>
              </div>
              <div className="space-y-2">
                {Object.entries(Top_Feature_Contributions).map(
                  ([feature, value]: any) => (
                    <div
                      key={feature}
                      className={`p-3 rounded-lg border ${
                        value > 0
                          ? "bg-red-50 border-red-200"
                          : "bg-green-50 border-green-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {formatFeatureName(feature)}
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            value > 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {value > 0 ? "+" : ""}
                          {value.toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            value > 0 ? "bg-red-500" : "bg-green-500"
                          }`}
                          style={{ width: `${Math.abs(value) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Multiple Patients Summary View with Pagination
const MultiplePatientsView = ({ patients }: { patients: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage, setPatientsPerPage] = useState(10);

  // Calculate pagination values
  const totalPages = Math.ceil(patients.length / patientsPerPage);
  const startIndex = (currentPage - 1) * patientsPerPage;
  const endIndex = startIndex + patientsPerPage;
  const currentPatients = patients.slice(startIndex, endIndex);

  const highRiskCount = patients.filter(
    (p) => p.Predicted_Suicide_risk?.toLowerCase() === "high"
  ).length;
  const moderateRiskCount = patients.filter(
    (p) => p.Predicted_Suicide_risk?.toLowerCase() === "moderate"
  ).length;
  const lowRiskCount = patients.filter(
    (p) => p.Predicted_Suicide_risk?.toLowerCase() === "low"
  ).length;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) pages.push(1);
      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages - 1) pages.push("...");
      if (endPage < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {patients.length}
            </div>
            <div className="text-gray-600 text-sm mt-1">Total Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {highRiskCount}
            </div>
            <div className="text-gray-600 text-sm mt-1">High Risk</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {moderateRiskCount}
            </div>
            <div className="text-gray-600 text-sm mt-1">Moderate Risk</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {lowRiskCount}
            </div>
            <div className="text-gray-600 text-sm mt-1">Low Risk</div>
          </div>
        </div>
      </div>

      {/* Patients Per Page Selector */}
      <div className="flex justify-between items-center bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Show:</span>
          <select
            value={patientsPerPage}
            onChange={(e) => {
              setPatientsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 patients</option>
            <option value={10}>10 patients</option>
            <option value={20}>20 patients</option>
            <option value={50}>50 patients</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, patients.length)} of{" "}
          {patients.length} patients
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Patient ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Age / Gender
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Risk Level
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  Confidence
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Top Feature
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPatients.map((patient, index) => (
                <PatientTableRow
                  key={patient.PATIENT_ID || index}
                  patient={patient}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center space-x-2">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            {/* Previous Page */}
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  className={`min-w-[40px] h-10 rounded-lg border transition-colors ${
                    page === currentPage
                      ? "bg-blue-600 text-white border-blue-600"
                      : page === "..."
                      ? "border-transparent cursor-default"
                      : "border-gray-300 hover:bg-gray-50 text-gray-700"
                  }`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Page */}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>

          {/* Items per page selector for mobile */}
          <div className="sm:hidden w-full">
            <select
              value={patientsPerPage}
              onChange={(e) => {
                setPatientsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Patient Table Row with Expandable Details
const PatientTableRow = ({ patient }: { patient: any }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const {
    PATIENT_ID,
    AGE,
    GENDER,
    Predicted_Suicide_risk,
    Prediction_Confidence,
    Top_Feature_Contributions,
  } = patient;

  const topFeature: any = Top_Feature_Contributions
    ? Object.entries(Top_Feature_Contributions)[0]
    : null;

  return (
    <>
      <tr
        className={`hover:bg-gray-50 transition-colors ${
          Predicted_Suicide_risk?.toLowerCase() === "high"
            ? "bg-red-50"
            : Predicted_Suicide_risk?.toLowerCase() === "moderate"
            ? "bg-yellow-50"
            : ""
        }`}
      >
        <td className="px-6 py-4">
          <span className="font-medium text-gray-800">{PATIENT_ID}</span>
        </td>
        <td className="px-6 py-4">
          <span className="text-gray-700">
            {AGE} / {GENDER}
          </span>
        </td>
        <td className="px-6 py-4">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(
              Predicted_Suicide_risk
            )}`}
          >
            {getRiskIcon(Predicted_Suicide_risk, "h-4 w-4 mr-1")}
            {Predicted_Suicide_risk} Risk
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <span className="font-semibold text-gray-800">
            {(Prediction_Confidence * 100).toFixed(1)}%
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="text-gray-700">
            {topFeature
              ? `${formatFeatureName(topFeature[0])}: ${
                  topFeature[1] > 0 ? "+" : ""
                }${topFeature[1]}`
              : "N/A"}
          </span>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            <span>View Details</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td
            colSpan={6}
            className="px-6 py-4 bg-gray-50 border-t border-gray-200"
          >
            <PatientDetails patient={patient} />
          </td>
        </tr>
      )}
    </>
  );
};

// Patient Details for Expanded View
const PatientDetails = ({ patient }: { patient: any }) => {
  const {
    AGE,
    GENDER,
    BMI,
    HEART_RATE,
    HBA1C,
    DIABETES,
    MARITAL_STATUS,
    JOB_TITLE,
    BP_SYSTOLIC,
    TOBACCO,
    Predicted_Suicide_risk,
    Prediction_Confidence,
    Top_Feature_Contributions,
  } = patient;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Patient Demographics */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">
          Patient Demographics
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries({
            AGE,
            GENDER,
            BMI,
            MARITAL_STATUS,
            JOB_TITLE,
            TOBACCO,
          }).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-lg border border-gray-200 p-3"
            >
              <div className="text-xs text-gray-500 font-medium mb-1">
                {formatFeatureName(key)}
              </div>
              <div className="text-sm font-semibold text-gray-800">
                {value || "N/A"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Metrics */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Medical Metrics</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries({
            HEART_RATE,
            HBA1C,
            BP_SYSTOLIC,
            DIABETES,
          }).map(([key, value]) => (
            <div
              key={key}
              className="bg-white rounded-lg border border-gray-200 p-3"
            >
              <div className="text-xs text-gray-500 font-medium mb-1">
                {formatFeatureName(key)}
              </div>
              <div className="text-sm font-semibold text-gray-800">
                {value || "N/A"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Contributions */}
      {Top_Feature_Contributions && (
        <div className="lg:col-span-2">
          <h4 className="font-semibold text-gray-800 mb-3">
            Feature Contributions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.entries(Top_Feature_Contributions).map(
              ([feature, value]: any) => {
                // Simple fix: cap the progress at 100% and use logarithmic scaling
                const absoluteValue = Math.abs(value);
                const progressWidth = Math.min(absoluteValue * 50, 100); // Scale down large values

                return (
                  <div
                    key={feature}
                    className={`p-3 rounded-lg border ${
                      value > 0
                        ? "bg-red-50 border-red-200"
                        : "bg-green-50 border-green-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {formatFeatureName(feature)}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          value > 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {value > 0 ? "+" : ""}
                        {value.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          value > 0 ? "bg-red-500" : "bg-green-500"
                        }`}
                        style={{ width: `${progressWidth}%` }}
                      ></div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      )}

      {/* Risk Assessment Summary */}
      <div className="lg:col-span-2">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">
            Risk Assessment Summary
          </h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="px-3 py-2 rounded-md bg-white border text-gray-800">
              <strong>Risk Level:</strong> {Predicted_Suicide_risk}
            </div>
            <div className="px-3 py-2 rounded-md bg-white border text-gray-800">
              <strong>Confidence:</strong>{" "}
              {(Prediction_Confidence * 100).toFixed(1)}%
            </div>
            <div className="px-3 py-2 rounded-md bg-white border text-gray-800">
              <strong>Age/Gender:</strong> {AGE} / {GENDER}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format feature names
const formatFeatureName = (name: string) => {
  return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
};

// Helper function to get risk icon with custom classes
const getRiskIcon = (risk: string, className: string = "h-8 w-8") => {
  switch (risk?.toLowerCase()) {
    case "high":
      return <XCircle className={`${className} text-red-600`} />;
    case "moderate":
      return <AlertTriangle className={`${className} text-yellow-600`} />;
    case "low":
      return <CheckCircle className={`${className} text-green-600`} />;
    default:
      return <Shield className={`${className} text-gray-600`} />;
  }
};

// Helper function to get risk color classes
const getRiskColor = (risk: string) => {
  switch (risk?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200";
    case "moderate":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default PsychometricTestAnalytics;
