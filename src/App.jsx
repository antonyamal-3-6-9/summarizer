import React, { useState } from 'react';
import InputComponent from './Components/InputComponent';
import OutputComponent from './Components/OutputComponent';
import './App.css';


// --- Main App Component ---

export default function App() {
  // --- State Management ---
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [inputType, setInputType] = useState('paste');
  const [hasGenerated, setHasGenerated] = useState(false);



  // --- Handlers ---
  const handleGenerateSummary = async () => {
    if (!transcript.trim() || !prompt.trim()) {
      setError('Please provide both a transcript and a custom prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setMessage(null);

    console.log("Prompt:", prompt);


    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, transcript }),
      });

      const data = await response.json();
      console.log("API Response:", data);
      console.log("Summary:", data.candidates[0].content.parts[0].text);
      setSummary(data.candidates[0].content.parts[0].text);
      setHasGenerated(true);
    } catch (err) {
      setError(err.message);
      setSummary('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareEmail = async () => {
    if (!summary.trim() || !recipientEmail.trim()) {
      setError('Please generate a summary and provide a recipient email.');
      return;
    }
    setIsSharing(true);
    setError(null);
    setMessage(null);
    try {

        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: recipientEmail,
            subject: "AI Generated Summary",
            html: summary,
          }),
        });

        const data = await response.json();
        console.log(data);


    } catch (err) {
      setError(err.message);
      setSummary('');
    } finally {
      setIsSharing(false);
    }
    console.log("Sharing summary to:", recipientEmail);
  };

  /**
   * Reads the content of a user-uploaded file.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    // Basic validation for text files
    if (file.type !== 'text/plain') {
      setError('Please upload a valid .txt file.');
      setMessage('');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setTranscript(text);
      setMessage(`Successfully loaded ${file.name}`);
      setError(null);
    };
    reader.onerror = (e) => {
      setError('Failed to read the file.');
      setMessage('');
      console.error("File reading error:", e);
    }
    reader.readAsText(file);
  };

  // --- Render ---
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>AI Meeting Summarizer</h1>
          <p>Upload a transcript, provide a prompt, and get your summary.</p>
        </header>

        {!hasGenerated ?

          <InputComponent inputType={inputType} transcript={transcript} setTranscript={setTranscript}
            handleFileChange={handleFileChange} setInputType={setInputType} handleGenerateSummary={handleGenerateSummary}
            isLoading={isLoading} setPrompt={setPrompt} prompt={prompt} />
          :
          <OutputComponent summary={summary} setSummary={setSummary} isLoading={isLoading} handleShareEmail={handleShareEmail}
            recipientEmail={recipientEmail} setRecipientEmail={setRecipientEmail} isSharing={isSharing}
          />
        }

      </div>
      <div className="notification-area">
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>

    </div>
  );
}
