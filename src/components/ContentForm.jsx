// src/components/ContentForm.jsx
import React, { useState, useEffect } from 'react';
import ModelSelector from './ModelSelector';
import mcpService from '../services/mcpService';

const ContentForm = ({ onContentGenerated, loadingState, setLoadingState }) => {
    const [topic, setTopic] = useState('');
    const [contentType, setContentType] = useState('blog-post');
    const [selectedProvider, setSelectedProvider] = useState('claude');
    const [selectedModel, setSelectedModel] = useState('');
    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(1000);
    const [providers, setProviders] = useState([]);
    const [error, setError] = useState('');

    // Content type options
    const contentTypes = [
        { value: 'blog-post', label: 'Blog Post' },
        { value: 'social-media', label: 'Social Media Post' },
        { value: 'product-description', label: 'Product Description' },
        { value: 'email-newsletter', label: 'Email Newsletter' },
        { value: 'ad-copy', label: 'Advertising Copy' }
    ];

    // Fetch available providers and models
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const data = await mcpService.getAvailableModels();
                setProviders(data.providers);

                // Set default model if available
                if (data.providers.length > 0) {
                    const defaultProvider = data.providers.find(p => p.name === 'claude') || data.providers[0];
                    setSelectedProvider(defaultProvider.name);

                    if (defaultProvider.models.length > 0) {
                        setSelectedModel(defaultProvider.models[0]);
                    }
                }
            } catch (err) {
                setError('Failed to load model providers. Please check your MCP server connection.');
                console.error(err);
            }
        };

        fetchProviders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!topic.trim()) {
            setError('Please enter a topic for content generation');
            return;
        }

        setError('');
        setLoadingState('generating');

        try {
            const result = await mcpService.generateContent(
                selectedProvider,
                topic,
                {
                    model: selectedModel,
                    contentType,
                    temperature,
                    maxTokens
                }
            );

            onContentGenerated({
                content: result.content,
                provider: result.provider,
                model: result.model,
                topic,
                contentType,
                timestamp: new Date().toISOString()
            });

            setLoadingState('idle');
        } catch (err) {
            setError(`Content generation failed: ${err.message}`);
            setLoadingState('idle');
            console.error(err);
        }
    };

    return (
        <div className="content-form-container">
            <h2>Generate Content</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                {/* Topic Input */}
                <div className="form-group">
                    <label htmlFor="topic">Topic or Theme</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter a topic, product, or theme for content generation"
                        required
                        className="form-control"
                    />
                </div>

                {/* Content Type Selector */}
                <div className="form-group">
                    <label htmlFor="contentType">Content Type</label>
                    <select
                        id="contentType"
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value)}
                        className="form-control"
                    >
                        {contentTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Model Selector Component */}
                <ModelSelector
                    providers={providers}
                    selectedProvider={selectedProvider}
                    selectedModel={selectedModel}
                    onProviderChange={setSelectedProvider}
                    onModelChange={setSelectedModel}
                />

                {/* Advanced Options */}
                <div className="advanced-options">
                    <h3>Advanced Options</h3>

                    {/* Temperature Slider */}
                    <div className="form-group">
                        <label htmlFor="temperature">
                            Temperature: {temperature}
                            <small>(Higher values = more creative, lower = more predictable)</small>
                        </label>
                        <input
                            type="range"
                            id="temperature"
                            min="0.1"
                            max="1.0"
                            step="0.1"
                            value={temperature}
                            onChange={(e) => setTemperature(parseFloat(e.target.value))}
                            className="form-control"
                        />
                    </div>

                    {/* Max Tokens Slider */}
                    <div className="form-group">
                        <label htmlFor="maxTokens">
                            Max Length: {maxTokens} tokens
                            <small>(Higher values = longer content)</small>
                        </label>
                        <input
                            type="range"
                            id="maxTokens"
                            min="100"
                            max="4000"
                            step="100"
                            value={maxTokens}
                            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                            className="form-control"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="generate-button"
                    disabled={loadingState === 'generating' || !topic.trim()}
                >
                    {loadingState === 'generating' ? 'Generating...' : 'Generate Content'}
                </button>
            </form>
        </div>
    );
};

export default ContentForm;