// src/pages/Generator.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentForm from '../components/ContentForm';
import GeneratedContent from '../components/GeneratedContent';

const Generator = () => {
    const [generatedContent, setGeneratedContent] = useState(null);
    const [loadingState, setLoadingState] = useState('idle');
    const [savedContents, setSavedContents] = useState([]);
    const navigate = useNavigate();

    // Handle content generation
    const handleContentGenerated = (content) => {
        setGeneratedContent(content);

        // Optionally save to history or local storage
        const savedList = [content, ...savedContents].slice(0, 10); // Keep last 10 generations
        setSavedContents(savedList);

        // Save to local storage
        localStorage.setItem('savedContents', JSON.stringify(savedList));
    };

    // Save content for editing
    const handleSaveContent = (content) => {
        // Save the content to local storage or state management
        localStorage.setItem('editingContent', JSON.stringify(content));
        // Navigate to editor page
        navigate('/editor');
    };

    // Navigate to comparison page
    const handleCompare = (content) => {
        // Save the current content for comparison
        localStorage.setItem('compareContent', JSON.stringify(content));
        // Navigate to comparison page
        navigate('/comparison');
    };

    return (
        <div className="generator-page">
            <div className="page-header">
                <h1>Content Generation Tool</h1>
                <p>Generate various types of content using different AI models</p>
            </div>

            <div className="generator-layout">
                <div className="form-section">
                    <ContentForm
                        onContentGenerated={handleContentGenerated}
                        loadingState={loadingState}
                        setLoadingState={setLoadingState}
                    />

                    {/* Recent Generations Section */}
                    {savedContents.length > 0 && (
                        <div className="recent-generations">
                            <h3>Recent Generations</h3>
                            <ul className="history-list">
                                {savedContents.map((item, index) => (
                                    <li key={index} className="history-item">
                                        <div className="history-info">
                                            <strong>{item.topic}</strong>
                                            <span className="content-type-pill">
                                                {item.contentType.split('-').map(word =>
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')}
                                            </span>
                                            <span className="model-pill">
                                                {item.model}
                                            </span>
                                        </div>
                                        <div className="history-actions">
                                            <button onClick={() => setGeneratedContent(item)}>
                                                View
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="content-section">
                    {loadingState === 'generating' ? (
                        <div className="loading-indicator">
                            <div className="spinner"></div>
                            <p>Generating content...</p>
                            <p className="loading-tip">This may take a few seconds depending on the model and content length.</p>
                        </div>
                    ) : (
                        <GeneratedContent
                            generatedContent={generatedContent}
                            onSaveContent={handleSaveContent}
                            onCompare={handleCompare}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Generator;