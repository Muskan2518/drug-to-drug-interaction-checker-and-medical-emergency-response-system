import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

function MedicalChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('What are common symptoms of diabetes?');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput('');

      try {
        setLoading(true);
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCO_EQXCaDF59LJzw-1OSpRMCZixpigh4Q',
          {
            contents: [
              {
                parts: [
                  {
                    text: `Medical Query: ${input}`
                  }
                ]
              }
            ]
          }
        );
        const botResponse = response.data.candidates[0].content.parts[0].text;
        setLoading(false);
        setMessages([...newMessages, { text: botResponse, user: false }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setLoading(false);
        setMessages([...newMessages, { text: 'Error: Could not retrieve medical advice at the moment', user: false }]);
      }
    }
  };

  return (
    <div className="chat-container">
      <h1 className="title">Medical ChatBot</h1>
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user ? 'user' : 'bot'}`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="loading">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <span>Loading</span>
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Describe symptoms or ask about a condition..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-button" onClick={handleSendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicalChatBot;

// Inline CSS for the component
document.head.insertAdjacentHTML("beforeend", `<style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f3f4f6;
  }
  
  .chat-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    height: 100vh;
    background: linear-gradient(135deg, #6d83f2, #a47cf7);
  }
  
  .title {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .chat-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .messages {
    padding: 15px;
    height: 400px;
    overflow-y: auto;
  }
  
  .message {
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    font-size: 1rem;
    word-wrap: break-word;
  }
  
  .message.user {
    background: #007bff;
    color: #fff;
    align-self: flex-end;
  }
  
  .message.bot {
    background: #f1f1f1;
    color: #333;
    align-self: flex-start;
  }
  
  .input-container {
    display: flex;
    padding: 10px;
    border-top: 1px solid #eee;
    background: #fafafa;
  }
  
  .input-field {
    flex: 1;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 8px;
    outline: none;
  }
  
  .send-button {
    background: #007bff;
    border: none;
    padding: 10px;
    color: white;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .send-button:hover {
    background: #0056b3;
  }
  
  /* Loading animation */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  
  .loading .circle {
    width: 12px;
    height: 12px;
    margin: 0 4px;
    background-color: #3498db;
    border-radius: 50%;
    animation: bounce 0.6s infinite alternate;
  }
  
  .loading .circle:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .loading .circle:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-10px);
    }
  }
</style>`);
