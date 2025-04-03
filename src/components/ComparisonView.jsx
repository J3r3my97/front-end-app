// src/components/ComparisonView.jsx
import React from 'react';

const ComparisonView = ({ originalContent, comparisonContent }) => {
    if (!originalContent || !comparisonContent) {
        return (
            <div className="no-comparison-data">
                <p>Select two different model outputs to compare.</p>
            </div>
        );
    }

    // Format content type for display
    const formatContentType = (type) => {
        return type.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <div className="comparison-container">
            <div className="comparison-header">
                <h2>Model Comparison: {originalContent.topic}</h2>
                <div className="content-type">
                    Content Type: {formatContentType(originalContent.contentType)}
                </div>
            </div>

            <div className="comparison-content">
                {/* Left side: Original content */}
                <div className="comparison-panel original-content">
                    <div className="panel-header">
                        <h3>{originalContent.provider.toUpperCase()}: {originalContent.model}</h3>
                    </div>
                    <pre className="content-text">{originalContent.content}</pre>
                </div>

                {/* Right side: Comparison content */}
                <div className="comparison-panel comparison-content">
                    <div className="panel-header">
                        <h3>{comparisonContent.provider.toUpperCase()}: {comparisonContent.model}</h3>
                    </div>
                    <pre className="content-text">{comparisonContent.content}</pre>
                </div>
            </div>

            <div className="comparison-insights">
                <h3>AI Model Comparison Insights</h3>
                <div className="insight-cards">
                    <div className="insight-card">
                        <h4>Length Comparison</h4>
                        <div className="insight-data">
                            <div className="model-stat">
                                <span className="stat-label">{originalContent.provider}:</span>
                                <span className="stat-value">{originalContent.content.length} characters</span>
                            </div>
                            <div className="model-stat">
                                <span className="stat-label">{comparisonContent.provider}:</span>
                                <span className="stat-value">{comparisonContent.content.length} characters</span>
                            </div>
                            <div className="stat-difference">
                                Difference: {Math.abs(originalContent.content.length - comparisonContent.content.length)} characters
                            </div>
                        </div>
                    </div>

                    <div className="insight-card">
                        <h4>Word Count</h4>
                        <div className="insight-data">
                            <div className="model-stat">
                                <span className="stat-label">{originalContent.provider}:</span>
                                <span className="stat-value">
                                    {originalContent.content.split(/\s+/).filter(Boolean).length} words
                                </span>
                            </div>
                            <div className="model-stat">
                                <span className="stat-label">{comparisonContent.provider}:</span>
                                <span className="stat-value">
                                    {comparisonContent.content.split(/\s+/).filter(Boolean).length} words
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="insight-card">
                        <h4>Readability Estimate</h4>
                        <div className="insight-data">
                            <p>Compare the structure, tone, and complexity of both outputs.</p>
                            <p>Notice how different models may emphasize different aspects of the topic.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonView;