
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function DD() {
    const [drugs, setDrugs] = useState('');
    const [interactions, setInteractions] = useState([]);
    const [message, setMessage] = useState('');

    const checkInteractions = async () => {
        const drugList = drugs.split(',').map(drug => drug.trim()).filter(drug => drug);
        if (drugList.length < 2) {
            setMessage("Please enter at least two drugs to check for interactions.");
            setInteractions([]);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5501/check-interactions', { drugs: drugList });
            console.log('Response Data:', response.data);  // Log response data for debugging

            // Check if the response contains an interactions array or a message
            if (Array.isArray(response.data)) {
                setInteractions(response.data);
                setMessage(response.data.length ? '' : 'No interactions found.');
            } else {
                setInteractions([]);
                setMessage(response.data.message || 'No interactions found.');
            }
        } catch (error) {
            console.error('Error:', error);  // Log error for debugging
            setMessage(error.response?.data?.message || "An error occurred. Please try again later.");
        }
    };

    return (
        <div className="App">
            <h1>Drug Interaction Checker</h1>
            <input
                type="text"
                placeholder="Enter drug names, separated by commas"
                value={drugs}
                onChange={(e) => setDrugs(e.target.value)}
            />
            <button onClick={checkInteractions}>Check Interactions</button>
            {message && <p className="message">{message}</p>}
            {interactions.length > 0 && (
                <div className="interaction-list">
                    <h2>Interactions Found:</h2>
                    {interactions.map((interaction, index) => (
                        <div className="interaction" key={index}>
                            <strong>{interaction["Drug 1"]}</strong> and <strong>{interaction["Drug 2"]}</strong>:
                            <p>{interaction["Interaction Description"]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DD;

/* CSS Styles */
document.head.insertAdjacentHTML("beforeend", `<style>
    * {
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
    }

    .App {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background: #f0f4f8;
        min-height: 100vh;
    }

    h1 {
        color: #333;
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    input[type="text"] {
        width: 100%;
        max-width: 400px;
        padding: 10px;
        margin: 10px 0;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        padding: 10px 20px;
        font-size: 1rem;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        margin-bottom: 1rem;
    }

    button:hover {
        background-color: #0056b3;
    }

    .message {
        font-size: 1rem;
        color: #d9534f;
        margin: 10px 0;
    }

    .interaction-list {
        width: 100%;
        max-width: 600px;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .interaction-list h2 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 1rem;
    }

    .interaction {
        margin-bottom: 15px;
        padding: 15px;
        border: 1px solid #e9ecef;
        border-radius: 5px;
        background-color: #f8f9fa;
    }

    .interaction strong {
        color: #007bff;
    }

    .interaction p {
        margin-top: 5px;
        color: #555;
    }

</style>`);
