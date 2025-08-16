import React from 'react';
import "../App.css";

const Spinner = () => (
    <div className="spinner"></div>
);

const InputComponent = ({inputType, transcript, setTranscript, handleFileChange, setInputType, handleGenerateSummary, isLoading, setPrompt, prompt}) => {
    return (
        <div className="form-column">
            <div className="input-type-selector">
                <label className={inputType === 'paste' ? 'active' : ''}>
                    <input type="radio" name="inputType" value="paste" checked={inputType === 'paste'} onChange={() => setInputType('paste')} />
                    <span>Paste Text</span>
                </label>
                <label className={inputType === 'upload' ? 'active' : ''}>
                    <input type="radio" name="inputType" value="upload" checked={inputType === 'upload'} onChange={() => setInputType('upload')} />
                    <span>Upload File</span>
                </label>
            </div>

            {inputType === 'paste' ? (
                <div>
                    <label htmlFor="transcript">1. Paste Meeting Transcript</label>
                    <textarea className="styled-textarea" name="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Paste the full text from your meeting here..." rows={12} />
                </div>
            ) : (
                <div>
                    <label>1. Upload Transcript File</label>
                    <div className="file-input-wrapper">
                        <label htmlFor="file-upload">
                            <p>Drag & drop your file here or <strong>browse</strong></p>
                            <p className="file-input-info">Supports .txt files</p>
                            <input id="file-upload" type="file" accept=".txt" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
            )}

            <div>
                <label htmlFor="prompt">2. Enter Custom Instruction</label>
                <input className='styled-input' type="text" name='prompt' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., 'Summarize for executives' or 'List all action items'" />
            </div>
            <button
                onClick={handleGenerateSummary}
                className={`action-button`}
            >
                {isLoading ? <Spinner /> : 'Generate Summary'}
            </button>
        </div>
    )
}

export default InputComponent;