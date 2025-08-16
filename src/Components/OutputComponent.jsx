import React from "react";

const Spinner = () => (
    <div className="spinner"></div>
);


const OutputComponent = ({
    summary,
    setSummary,
    isLoading,
    handleShareEmail,
    recipientEmail,
    setRecipientEmail,
    isSharing,
}) => {
    return (
        <div className="form-column">
            <div>
                <label htmlFor="summary">3. Generated Summary (Editable)</label>
                <textarea
                    id="summary"
                    name="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Your AI-generated summary will appear here..."
                    rows={12}
                    disabled={!summary && !isLoading}
                    className="styled-textarea"
                />
            </div>
            <div>
                <label htmlFor="email">4. Share via Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="Enter recipient's email address"
                    className="styled-input"
                />
            </div>
            <button onClick={handleShareEmail} disabled={isSharing || !summary} className="action-button">
                {isSharing ? <Spinner /> : 'Share Summary'}
            </button>
        </div>
    );
};

export default OutputComponent;
