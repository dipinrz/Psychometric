import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Image as ImageIcon,
  Activity,
  TrendingUp,
  ChevronDown,
  Upload,
  FileUp,
  Loader2,
} from "lucide-react";
import { useState } from "react";

const AnomalyDetectionAnalytics = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Added useRef

   const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await fetch("http://51.112.148.129:8089/predict", {
        method: "POST",
        body: formData,
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
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

  // Added function to handle button click
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
            Anomaly Detection Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your CSV file to detect anomalies in medical data using
            advanced machine learning algorithms
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
              onClick={handleChooseFileClick} // Added onClick handler
            >
              <input
                id="file-upload"
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={handleFileUpload}
                ref={fileInputRef} // Added ref
              />

              <div className="flex flex-col items-center justify-center space-y-4">
                {loading ? (
                  <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                ) : (
                  <FileUp className="h-16 w-16 text-gray-400" />
                )}

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {loading ? "Processing File..." : "Upload CSV File"}
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    {loading
                      ? "Analyzing your data with our anomaly detection model..."
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
                    type="button" // Added type="button" to prevent form submission behavior
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
                    • Columns: lab_hematology_hba1c,
                    lab_chemistry_&_immunoassay_glucose, etc.
                  </li>
                  <li>• File should contain medical test results and vitals</li>
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
          <AnomalyDetectionResults response={response} loading={loading} />
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

// Results Component (same as before but without upload logic)
const AnomalyDetectionResults = ({ response, loading = false }: any) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-3 text-gray-700">Processing results...</p>
      </div>
    );
  }

  if (!response) return null;

  const { results, s3_url, explanation } = response;
  const isSingleEntry = !Array.isArray(results) || results.length === 1;
  const entries = isSingleEntry ? [results] : results;

  const getStatusBgColor = (isAnomaly: boolean) => {
    return isAnomaly
      ? "bg-red-100 border-red-200"
      : "bg-green-100 border-green-200";
  };

  const getStatusIcon = (isAnomaly: boolean) => {
    return isAnomaly ? (
      <XCircle className="h-8 w-8 text-red-600" />
    ) : (
      <CheckCircle className="h-8 w-8 text-green-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center justify-center p-6 rounded-xl ${getStatusBgColor(
          entries.some((entry) => entry.is_anomaly)
        )} border-2`}
      >
        <div className="flex items-center space-x-4">
          {getStatusIcon(entries.some((entry) => entry.is_anomaly))}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Analysis Complete
            </h1>
            <p className="text-xl font-semibold mt-2 text-gray-700">
              {entries.length} {isSingleEntry ? "entry" : "entries"} analyzed •{" "}
              {entries.filter((entry) => entry.is_anomaly).length} anomalies
              detected
            </p>
          </div>
        </div>
      </motion.div>

      {/* Explanation Section */}
      {explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Analysis Explanation
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{explanation}</p>
        </motion.div>
      )}

      {/* Visualization Image */}
      {s3_url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <ImageIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Feature Importance Visualization
            </h2>
          </div>
          <div className="flex justify-center">
            <img
              src={s3_url}
              alt="Feature importance visualization"
              className="max-w-full h-auto rounded-lg border border-gray-200 max-h-96 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Results Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {isSingleEntry ? (
          <SingleEntryView entry={entries[0]} />
        ) : (
          <MultipleEntriesView entries={entries} />
        )}
      </motion.div>
    </div>
  );
};

// Single Entry Detailed View
const SingleEntryView = ({ entry }: { entry: any }) => {
  const {
    input_row,
    anomaly_score,
    is_anomaly,
    most_influential_feature,
    most_influential_original_feature,
  } = entry;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Header with anomaly status */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {is_anomaly ? (
            <XCircle className="h-8 w-8 text-red-600" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-600" />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Entry Analysis</h2>
            <p
              className={`text-lg font-semibold ${
                is_anomaly ? "text-red-600" : "text-green-600"
              }`}
            >
              {is_anomaly ? "Anomaly Detected" : "Normal"}
            </p>
          </div>
        </div>
        <div
          className={`px-4 py-2 rounded-full ${
            is_anomaly
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          } font-semibold`}
        >
          Score: {anomaly_score?.toFixed(4)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Data */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">Input Data</h3>
          </div>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {Object.entries(input_row || {}).map(([key, value]) => (
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

        {/* Analysis Results */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800">
              Analysis Results
            </h3>
          </div>

          {/* Most Influential Feature */}
          {most_influential_feature && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-5 w-5 text-red-600" />
                <h4 className="font-semibold text-gray-800">
                  Most Influential Feature
                </h4>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2">
                  {formatFeatureName(most_influential_feature)}
                </p>
                {most_influential_original_feature && (
                  <div className="space-y-2">
                    {Object.entries(most_influential_original_feature).map(
                      ([key, value]: any) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {formatFeatureName(key)}:
                          </span>
                          <span className="font-medium text-gray-800">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Score Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Score Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Anomaly Score:</span>
                <span className="font-mono font-semibold">
                  {anomaly_score?.toFixed(6)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Threshold:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="text-gray-700 mt-2">
                {is_anomaly
                  ? "This entry has been flagged as an anomaly based on the detection model."
                  : "This entry appears normal based on the detection model."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Multiple Entries Summary View
const MultipleEntriesView = ({ entries }: { entries: any[] }) => {
  const anomalyCount = entries.filter((entry) => entry.is_anomaly).length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {entries.length}
            </div>
            <div className="text-gray-600 text-sm mt-1">Total Entries</div>
          </div>
          <div className="text-center">
            <div
              className={`text-3xl font-bold ${
                anomalyCount > 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {anomalyCount}
            </div>
            <div className="text-gray-600 text-sm mt-1">Anomalies Detected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {(
                ((entries.length - anomalyCount) / entries.length) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="text-gray-600 text-sm mt-1">Normal Entries</div>
          </div>
        </div>
      </div>

      {/* Entries Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Entry
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                  Anomaly Score
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Most Influential Feature
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map((entry, index) => (
                <TableRow key={index} entry={entry} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Table Row with Expandable Details
const TableRow = ({ entry, index }: { entry: any; index: number }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const {
    input_row,
    anomaly_score,
    is_anomaly,
    most_influential_feature,
    most_influential_original_feature,
  } = entry;

  return (
    <>
      <tr
        className={`hover:bg-gray-50 transition-colors ${
          is_anomaly ? "bg-red-50" : ""
        }`}
      >
        <td className="px-6 py-4">
          <span className="font-medium text-gray-800">Entry {index + 1}</span>
        </td>
        <td className="px-6 py-4">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              is_anomaly
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {is_anomaly ? (
              <XCircle className="h-4 w-4 mr-1" />
            ) : (
              <CheckCircle className="h-4 w-4 mr-1" />
            )}
            {is_anomaly ? "Anomaly" : "Normal"}
          </div>
        </td>
        <td className="px-6 py-4 text-right">
          <span
            className={`font-mono font-semibold ${
              is_anomaly ? "text-red-600" : "text-green-600"
            }`}
          >
            {anomaly_score?.toFixed(4)}
          </span>
        </td>
        <td className="px-6 py-4">
          <span className="text-gray-700">
            {most_influential_feature
              ? formatFeatureName(most_influential_feature)
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
            colSpan={5}
            className="px-6 py-4 bg-gray-50 border-t border-gray-200"
          >
            <EntryDetails entry={entry} />
          </td>
        </tr>
      )}
    </>
  );
};

// Entry Details for Expanded View

const EntryDetails = ({ entry }: { entry: any }) => {
  const {
    input_row,
    most_influential_original_feature,
    explanation,
    anomaly_score,
    is_anomaly,
    most_influential_feature,
  } = entry;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Input Values */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Key Input Values</h4>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(input_row || {})
            .filter(
              ([key]) => !key.includes("Unnamed") && input_row[key] !== null
            )
            .slice(0, 6)
            .map(([key, value]: any) => (
              <div
                key={key}
                className="bg-white rounded-lg border border-gray-200 p-3"
              >
                <div className="text-xs text-gray-500 font-medium mb-1">
                  {formatFeatureName(key)}
                </div>
                <div className="text-sm font-semibold text-gray-800">
                  {value}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Influential Feature Details */}
      {most_influential_original_feature && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">
            Influential Feature Details
          </h4>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="space-y-2">
              {Object.entries(most_influential_original_feature).map(
                ([key, value]: any) => (
                  <div
                    key={key}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-gray-700 font-medium">
                      {formatFeatureName(key)}:
                    </span>
                    <span className="text-sm font-semibold text-gray-800 bg-white px-2 py-1 rounded border">
                      {value}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Explanation + Anomaly Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 lg:col-span-2"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Eye className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">
            Analysis Explanation
          </h2>
        </div>

        <p className="text-gray-700 leading-relaxed mb-4">
          {explanation}
        </p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="px-3 py-2 rounded-md bg-gray-50 border text-gray-800">
            <strong>Anomaly Score:</strong> {anomaly_score?.toFixed(4)}
          </div>
          <div
            className={`px-3 py-2 rounded-md border ${
              is_anomaly
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            <strong>Status:</strong>{" "}
            {is_anomaly ? "Potential Fraud" : "Normal"}
          </div>
          {most_influential_feature && (
            <div className="px-3 py-2 rounded-md bg-blue-50 border border-blue-200 text-blue-700">
              <strong>Most Influential Feature:</strong>{" "}
              {formatFeatureName(most_influential_feature)}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Helper function to format feature names
const formatFeatureName = (name: string) => {
  return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .replace(/&/g, " & ")
    .replace(/\s+/g, " ")
    .trim();
};

export default AnomalyDetectionAnalytics;
