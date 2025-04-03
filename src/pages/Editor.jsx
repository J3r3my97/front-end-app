// src/pages/Editor.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditableContent from '../components/EditableContent';
import mcpService from '../services/mcpService';

const Editor = () => {
    const [content, setContent] = useState(null);
    const [savedEdits, setSavedEdits] = useState([]);
    const [activeEditId, setActiveEditId] = useState(null);
    const [isModified, setIsModified] = useState(false);
    const navigate = useNavigate();

    // Load content from localStorage on component mount
    useEffect(() => {
        // Load the content that was sent for editing
        const storedContent = localStorage.getItem('editingContent');

        if (storedContent) {
            try {
                const parsedContent = JSON.parse(storedContent);
                setContent(parsedContent);
            } catch (err) {
                console.error('Failed to parse stored content:', err);
            }
        }

        // Load previously saved edits
        const storedEdits = localStorage.getItem('savedEdits');

        if (storedEdits) {
            try {
                const parsedEdits = JSON.parse(storedEdits);
                setSavedEdits(parsedEdits);
            } catch (err) {
                console.error('Failed to parse saved edits:', err);
            }
        }
    }, []);

    // Handle content changes
    const handleContentChange = () => {
        setIsModified(true);
    };

    // Save edited content
    const handleSaveContent = (updatedContent) => {
        // Update the active content
        setContent(updatedContent);
        setIsModified(false);

        // Update the saved edits list
        const updatedEdits = [...savedEdits];
        const existingIndex = updatedEdits.findIndex(edit =>
            edit.provider === updatedContent.provider &&
            edit.topic === updatedContent.topic &&
            edit.timestamp === updatedContent.timestamp
        );

        if (existingIndex >= 0) {
            updatedEdits[existingIndex] = updatedContent;
        } else {
            updatedEdits.push(updatedContent);
        }

        setSavedEdits(updatedEdits);
        localStorage.setItem('savedEdits', JSON.stringify(updatedEdits));
    };

    // Load a saved edit
    const handleLoadSavedEdit = (editContent) => {
        // Check if there are unsaved changes
        if (isModified) {
            if (!window.confirm('You have unsaved changes. Are you sure you want to switch to another edit?')) {
                return;
            }
        }

        setContent(editContent);
        setActiveEditId(editContent.timestamp);
        setIsModified(false);
    };

    // Generate refinement suggestions
    const handleGenerateRefinements = async () => {
        if (!content) return;

        try {
            // Call the MCP server to get refinement suggestions
            const result = await mcpService.generateContent(
                'claude', // Using Claude for refinement suggestions
                `Here is a piece of content that needs refinement:
        
        "${content.content}"
        
        Please provide 3-5 specific suggestions to improve this ${content.contentType}. 
        Focus on enhancing clarity, engagement, and persuasiveness.
        For each suggestion, include a brief explanation of why it would improve the content.`,
                {
                    contentType: 'analysis',
                    temperature: 0.7,
                    maxTokens: 1000
                }
            );

            // Display the suggestions
            alert(`Refinement Suggestions:\n\n${result.content}`);

        } catch (err) {
            console.error('Failed to generate refinements:', err);
            alert('Failed to generate refinement suggestions. Please try again later.');
        }
    };

    // Go back to generator
    const handleBackToGenerator = () => {
        if (isModified) {
            if (!window.confirm('You have unsaved changes. Are you sure you want to go back?')) {
                return;
            }
        }

        navigate('/');
    };

    return (
        <div className="editor-page">
            <div className="page-header">
                <h1>Content Editor</h1>
                <p>Edit and refine your generated content</p>
            </div>

            <div className="editor-actions">
                <button onClick={handleBackToGenerator} className="back-button">
                    ← Back to Generator
                </button>

                {content && (
                    <button
                        onClick={handleGenerateRefinements}
                        className="refinement-button"
                    >
                        Get Refinement Suggestions
                    </button>
                )}
            </div>

            <div className="editor-layout">
                {/* Sidebar with saved edits */}
                <div className="saved-edits-sidebar">
                    <h3>Saved Edits</h3>

                    {savedEdits.length === 0 ? (
                        <p className="no-edits-message">No saved edits yet.</p>
                    ) : (
                        <ul className="saved-edits-list">
                            {savedEdits.map((edit) => (
                                <li
                                    key={edit.timestamp}
                                    className={`saved-edit-item ${activeEditId === edit.timestamp ? 'active' : ''}`}
                                    onClick={() => handleLoadSavedEdit(edit)}
                                >
                                    <div className="edit-title">
                                        {edit.title || `${edit.contentType} - ${edit.topic}`}
                                    </div>
                                    <div className="edit-meta">
                                        <span className="edit-date">
                                            {new Date(edit.lastEdited || edit.timestamp).toLocaleDateString()}
                                        </span>
                                        <span className="edit-model">{edit.provider}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Main editor area */}
                <div className="main-editor-area">
                    <EditableContent
                        content={content}
                        onContentChange={handleContentChange}
                        onSaveContent={handleSaveContent}
                    />
                </div>
            </div>
        </div>
    );
};

export default Editor;