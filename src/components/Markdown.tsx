import React from "react";
import ReactMarkdown from "react-markdown";




const data ={
  "prediction": {
    "Predicted_Risk_Category": "High Risk",
    "Confidence": 0.9999
  },
  "Explainability": {
    "top_features": [
      {
        "feature": "Age (years)",
        "value": 60,
        "contribution": 1.9725,
        "percentage_contribution": 31.86,
        "direction": "increases_risk"
      },
      {
        "feature": "HbA1c (%)",
        "value": 7.5,
        "contribution": 0.7313,
        "percentage_contribution": 11.81,
        "direction": "increases_risk"
      },
      {
        "feature": "Systolic_BP (mmHg)",
        "value": 185,
        "contribution": 0.5411,
        "percentage_contribution": 8.74,
        "direction": "increases_risk"
      },
      {
        "feature": "Fasting_Glucose (mg/dL)",
        "value": 140,
        "contribution": 0.5094,
        "percentage_contribution": 8.23,
        "direction": "increases_risk"
      },
      {
        "feature": "Triglycerides (mg/dL)",
        "value": 250,
        "contribution": 0.4925,
        "percentage_contribution": 7.96,
        "direction": "increases_risk"
      }
    ]
  },
  "feedback": "# Medical Checkup Recommendations\n\n## 1. Recommended Checkup Frequency\nThe patient should schedule a medical checkup **every 3 months**.\n\n## 2. Reason for This Timing\nGiven the patient's high-risk status, the following factors contribute to the need for frequent monitoring:\n\n- **Age (60 years)**: Older adults are at a higher risk for various health conditions, including cardiovascular diseases and diabetes.\n- **HbA1c (7.5%)**: This indicates that the patient has elevated blood sugar levels, which may suggest poorly controlled diabetes. Regular monitoring is essential to prevent complications.\n- **Systolic Blood Pressure (185 mmHg)**: This level indicates hypertension, which significantly increases the risk of heart disease and stroke. Frequent assessments are necessary to manage and adjust treatment as needed.\n- **Fasting Glucose (140 mg/dL)**: Elevated fasting glucose levels can lead to or indicate diabetes. Regular checkups can help monitor and manage blood sugar levels effectively.\n- **Triglycerides (250 mg/dL)**: High triglyceride levels can contribute to cardiovascular risk. Regular monitoring can help in making necessary lifestyle or medication adjustments.\n\n### Conclusion\nRegular checkups every 3 months will allow for timely interventions and adjustments to the patient's treatment plan, helping to manage these risk factors effectively and improve overall health outcomes.",
  "Recommendation": "```markdown\nTo manage your high-risk status, consider the following recommendations:\n\n1. **Dietary Changes**: Adopt a balanced diet rich in whole grains, lean proteins, fruits, and vegetables. Limit sugar, saturated fats, and processed foods to help control your HbA1c and triglyceride levels.\n\n2. **Regular Exercise**: Aim for at least 150 minutes of moderate-intensity aerobic activity each week, such as walking or swimming, to help lower your blood pressure and improve overall cardiovascular health.\n\n3. **Monitor Blood Pressure and Glucose**: Keep track of your blood pressure and blood glucose levels regularly, and consult with your healthcare provider to adjust any medications if necessary.\n\n4. **Stay Hydrated**: Drink plenty of water and limit alcohol intake, as dehydration can affect blood pressure and glucose levels.\n\n5. **Routine Check-ups**: Schedule regular check-ups with your healthcare provider to monitor your health and discuss any changes in your condition.\n```"
}
export const FeedbackDisplay: React.FC<{ feedback: string }> = ({ feedback }) => {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{feedback}</ReactMarkdown>
    </div>
  );
};



// Example usage:
<FeedbackDisplay feedback={data.feedback} />;


