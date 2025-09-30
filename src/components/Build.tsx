import React, { useEffect, useRef, useState } from "react";

const Build: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const healthData = {
    score: 0.9,
    status: "Fit",

    diseases: [
      {
        name: "Diabetes Mellitus",
        risk_level: "High",
        explanation:
          "Section 4.2: Diabetes arises due to the inability of the body to regulate blood glucose levels. Persistent hyperglycemia damages blood vessels and organs, increasing the risk of cardiovascular disease, neuropathy, and renal failure.",
        parameters: [
          "Fasting blood glucose > 126 mg/dL (recommended < 100 mg/dL)",
          "HbA1c > 6.5% (recommended < 5.7%)",
          "BMI > 30 (recommended 18.5–24.9)",
          "Blood pressure > 140/90 mmHg (recommended < 120/80)",
        ],
      },
      {
        name: "Hypertension",
        risk_level: "High",
        explanation:
          "Section 5.1: Hypertension is defined by persistently elevated arterial blood pressure. It contributes to vascular injury, left ventricular hypertrophy, stroke, and renal impairment.",
        parameters: [
          "Systolic BP > 140 mmHg (recommended < 120 mmHg)",
          "Diastolic BP > 90 mmHg (recommended < 80 mmHg)",
          "LDL cholesterol > 130 mg/dL (recommended < 100 mg/dL)",
          "Sodium intake > 5 g/day (recommended < 2 g/day)",
        ],
      },
      {
        name: "Coronary Artery Disease",
        risk_level: "High",
        explanation:
          "Section 6.3: Coronary artery disease results from atherosclerotic plaque accumulation in coronary vessels, leading to ischemia and myocardial infarction.",
        parameters: [
          "LDL cholesterol > 160 mg/dL (recommended < 100 mg/dL)",
          "HDL cholesterol < 40 mg/dL (recommended > 50 mg/dL)",
          "Triglycerides > 200 mg/dL (recommended < 150 mg/dL)",
          "Resting heart rate > 100 bpm (recommended 60–80 bpm)",
        ],
      },
      {
        name: "Chronic Kidney Disease",
        risk_level: "High",
        explanation:
          "Section 7.2: Chronic kidney disease involves progressive decline in renal function, impairing waste elimination and electrolyte balance. It often coexists with diabetes and hypertension.",
        parameters: [
          "Glomerular filtration rate (GFR) < 60 mL/min/1.73m² (recommended > 90)",
          "Serum creatinine > 1.5 mg/dL (recommended 0.6–1.2)",
          "Urinary albumin > 300 mg/day (recommended < 30 mg/day)",
          "Blood pressure > 140/90 mmHg (recommended < 120/80)",
        ],
      },
      {
        name: "Osteoporosis",
        risk_level: "Medium",
        explanation:
          "Section 9.4: Osteoporosis is characterized by reduced bone mineral density, increasing fracture risk and reducing mobility in older populations.",
        parameters: [
          "Bone mineral density T-score < -2.5 (recommended > -1.0)",
          "Serum calcium < 8.5 mg/dL (recommended 8.5–10.5)",
          "Vitamin D < 20 ng/mL (recommended > 30)",
          "BMI < 18.5 (recommended 18.5–24.9)",
        ],
      },
    ],

    explanation:
      "The candidate has hypertension, which is a confirmed condition. The candidate's systolic blood pressure is 150 mmHg, which is above the threshold of 140 mmHg. According to the guidelines, hypertension above 140/90 requires review. The candidate's hypertension is also a job-specific risk factor for pilots, as they must maintain controlled blood pressure. Therefore, the candidate is not fit for the job and needs to be re-evaluated after treatment.",
  };

  const [data, setData] = useState<any>({
    classification: {
      status: "Re-Medical",
      diseases: [
        {
          summary:
            "Based on the guidelines, individuals with no additional conditions and who are asymptomatic can generally be deemed fit for occupational duties, provided they can meet the mobility requirements and perform necessary tasks. Regular reviews are essential to ensure ongoing fitness for work, especially in roles requiring physical demands or emergency response capabilities.",
          risk: "low",
          name: "No additional conditions",
          sections: {},
          parameters: [],
        },
        {
          summary:
            "Individuals with Type 2 Diabetes Mellitus (T2DM) on insulin treatment are generally unacceptable for high-risk occupations such as emergency response roles, while those with stable, well-controlled T2DM without complications may be considered for employment after thorough assessment. Regular monitoring and strict adherence to guidelines regarding hypoglycaemia awareness and blood glucose control are essential for maintaining occupational fitness in this population.",
          risk: "high",
          name: "Diabetes",
          sections: {
            "10.4.3.5": 20,
            "11.4.3.10": 58,
          },
          parameters: [],
        },
        {
          summary:
            "Individuals with well-controlled hypertension are generally acceptable for employment, provided there are no complications or uncontrolled symptoms. However, those with complicated or uncontrolled hypertension should undergo further assessment to determine their fitness for work, especially in roles requiring physical exertion or emergency response.",
          risk: "medium",
          name: "Hypertension",
          sections: {
            "10.6.3": 26,
          },
          parameters: [ 
          "LDL cholesterol > 160 mg/dL (recommended < 100 mg/dL)",
          "HDL cholesterol < 40 mg/dL (recommended > 50 mg/dL)",
          "Triglycerides > 200 mg/dL (recommended < 150 mg/dL)",
          "Resting heart rate > 100 bpm (recommended 60–80 bpm)",
        ],
        },
      ],
      explanation:
        "The candidate has suspected conditions of hypertension and diabetes that have not been confirmed, which necessitates further evaluation to determine their impact on fitness for duty. Without confirmation of these conditions and their management status, a final decision on fitness cannot be made. Additional tests or specialist reviews are required to assess the candidate's ability to safely perform the duties of a welder.",
    },
    cvd: {
      prediction: {
        Predicted_Risk_Category: "High Risk",
        Confidence: 0.98,
      },
      Explainability: {
        top_features: [
          {
            feature: "Age (years)",
            value: 60,
            contribution: 1.9725,
            percentage_contribution: 31.86,
            direction: "increases_risk",
          },
          {
            feature: "Systolic_BP (mmHg)",
            value: 185,
            contribution: 0.5412,
            percentage_contribution: 8.74,
            direction: "increases_risk",
          },
          {
            feature: "Fasting_Glucose (mg/dL)",
            value: 140,
            contribution: 0.5092,
            percentage_contribution: 8.22,
            direction: "increases_risk",
          },
          {
            feature: "Triglycerides (mg/dL)",
            value: 250,
            contribution: 0.4922,
            percentage_contribution: 7.95,
            direction: "increases_risk",
          },
          {
            feature: "BMI (kg/m2)",
            value: 32,  
            contribution: 0.3689,
            percentage_contribution: 5.96,
            direction: "increases_risk",
          },
        ],
      },
        feedback:
          "Based on the patient's high-risk status and the contributing factors you've provided, it is advisable for the patient to schedule a medical checkup every 3 months.\n\n### Reason for This Timing:\n1. **Age**: At 60 years old, the patient is at an increased risk for various health issues, including cardiovascular disease and diabetes. Regular checkups can help monitor these risks.\n  \n2. **High Systolic Blood Pressure**: A reading of 185 mmHg indicates hypertension, which requires close monitoring and management to prevent complications like heart disease or stroke.\n\n3. **Elevated Fasting Glucose**: A fasting glucose level of 140 mg/dL suggests the patient may be at risk for diabetes. Regular checkups will allow for monitoring of blood sugar levels and early intervention if necessary.\n\n4. **High Triglycerides**: With a level of 250 mg/dL, this can increase the risk of heart disease. Regular checkups can help manage and lower these levels through lifestyle changes or medications.\n\n5. **Increased BMI**: A BMI of 32 indicates obesity, which is a risk factor for many chronic conditions. Regular checkups can help track weight and provide guidance on healthy lifestyle changes.\n\nIn summary, coming in every 3 months will allow for timely monitoring and intervention, helping to manage these risk factors effectively.",
        Recommendation:
          "To help reduce your risk, focus on adopting a healthier lifestyle. Aim to maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins while reducing sugar and saturated fats. Regular exercise, such as walking for at least 30 minutes most days, can also be beneficial. Additionally, monitor your blood pressure, glucose, and lipid levels regularly, and consider discussing medication or supplements with your healthcare provider if necessary. Lastly, ensure you have regular check-ups to keep track of your overall health.",
    },
  });

  const sendDataToIframe = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify(data), "*");
      console.log("📤 Sent health data to iframe");
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const intervalId = setInterval(sendDataToIframe, 500); // send every 500ms
    const timeoutId = setTimeout(() => clearInterval(intervalId), 5000); // stop after 5s

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="w-full h-screen p-4">
      <iframe
        ref={iframeRef}
        src="http://localhost:5173/"
        title="Embedded React App"
        className="w-full h-full rounded-lg shadow-lg border"
      />
    </div>
  );
};

export default Build;
