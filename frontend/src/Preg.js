// PregnancyCheck.js
import React, { useState } from "react";
import axios from "axios";

function PregnancyCheck() {
  const [drugName, setDrugName] = useState("");
  const [safetyInfo, setSafetyInfo] = useState(null);

  const checkSafety = async () => {
    try {
      const response = await axios.get(`http://localhost:5501/check_pregnancy_safe`, {
        params: { drug_name: drugName }
      });
      setSafetyInfo(response.data);
    } catch (error) {
      console.error("Error fetching safety information", error);
    }
  };

  return (
    <div className="page-container">
      <style>
        {`
          body, html {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            color: #495057;
            margin: 0;
            padding: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .page-container {
            width: 100%;
            max-width: 800px;
            padding: 2rem;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #007bff;
          }

          input[type="text"] {
            width: 100%;
            padding: 12px;
            margin-top: 1rem;
            font-size: 18px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            outline: none;
            transition: border-color 0.3s ease;
          }

          input[type="text"]:focus {
            border-color: #007bff;
          }

          button {
            background-color: #007bff;
            color: #ffffff;
            border: none;
            padding: 14px 20px;
            font-size: 18px;
            border-radius: 4px;
            margin-top: 1rem;
            cursor: pointer;
            width: 100%;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #0056b3;
          }

          .safety-info {
            margin-top: 2rem;
            background-color: #f1f3f5;
            padding: 1.5rem;
            border-radius: 8px;
            color: #495057;
            line-height: 1.6;
          }

          .safety-info p {
            margin: 0.5rem 0;
            font-size: 18px;
            color: #333;
            font-weight: 500;
          }
        `}
      </style>
      <h1>Pregnancy Safety Check</h1>
      <input
        type="text"
        placeholder="Enter Drug Name"
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
      />
      <button onClick={checkSafety}>Check Pregnancy Safety</button>
      {safetyInfo && (
        <div className="safety-info">
          <p>Drug Name: {safetyInfo.drug_name}</p>
          <p>Pregnancy Safety Message: {safetyInfo.message}</p>
          <p>Pregnancy Category: {safetyInfo.pregnancy_category}</p>
        </div>
      )}
    </div>
  );
}

export default PregnancyCheck;
