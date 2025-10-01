import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AnomalyDetectionResults from "./components/Test/Test.tsx";
import PsychometricTestAnalytics from "./components/Psycomatric.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App />
     */}
    <PsychometricTestAnalytics />
  </StrictMode>
);
