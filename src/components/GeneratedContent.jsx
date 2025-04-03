// src/components/GeneratedContent.jsx
import React, { useState } from 'react';

const GeneratedContent = ({ generatedContent, onSaveContent, onCompare }) => {
    const [isCopied, setIsCopied] = useState(false);

    // If no content has been generated yet
    if (!generatedContent) {
        return (
            <div className="no-content-message">
                <p>Generated content will appear here.</p>
                <p>Fill out the form and click "Generate Content" to get started.</p>
            </div>
        );
    }

    const { content, provider, model, topic, contentType, timestamp } = generatedContent;

    // Format the content type for display
    const formatContentType = (type) => {
        return type.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Copy content to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(content).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    // Format timestamp
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="generated-content">
            <div className="content-header">
                <h2>Generated {formatContentType(contentType)}</h2>
                <div className="content-meta">
                    <span className="topic">Topic: <strong>{topic}</strong></span>
                    <span className="model">Model: <strong>{model}</strong></span>
                    <span className="provider">Provider: <strong>{provider}</strong></span>
                    <span className="timestamp">Generated: {formatDate(timestamp)}</span>
                </div>
            </div>

            <div className="content-actions">
                <button
                    className="copy-button"
                    onClick={copyToClipboard}
                >
                    {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                </button>

                <button
                    className="edit-button"
                    onClick={() => onSaveContent(generatedContent)}
                >
                    Edit Content
                </button>

                <button
                    className="compare-button"
                    onClick={() => onCompare(generatedContent)}
                >
                    Compare with Another Model
                </button>
            </div>

            <div className="content-display">
                {/* Use pre-wrap to preserve formatting */}
                <pre className="content-text">{content}</pre>
            </div>
        </div>
    );
};

export default GeneratedContent;