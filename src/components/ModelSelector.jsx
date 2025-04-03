// src/components/ModelSelector.jsx
import React from 'react';

const ModelSelector = ({
    providers,
    selectedProvider,
    selectedModel,
    onProviderChange,
    onModelChange
}) => {
    // Find the currently selected provider object
    const currentProvider = providers.find(p => p.name === selectedProvider) || { models: [] };

    // Handle provider change
    const handleProviderChange = (e) => {
        const newProvider = e.target.value;
        onProviderChange(newProvider);

        // Set default model for the new provider
        const providerData = providers.find(p => p.name === newProvider);
        if (providerData && providerData.models.length > 0) {
            onModelChange(providerData.models[0]);
        } else {
            onModelChange('');
        }
    };

    return (
        <div className="model-selector">
            <h3>Select AI Model</h3>

            {/* Provider Selection */}
            <div className="form-group">
                <label htmlFor="provider">Provider</label>
                <select
                    id="provider"
                    value={selectedProvider}
                    onChange={handleProviderChange}
                    className="form-control"
                >
                    {providers.map(provider => (
                        <option key={provider.name} value={provider.name}>
                            {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Model Selection */}
            <div className="form-group">
                <label htmlFor="model">Model</label>
                <select
                    id="model"
                    value={selectedModel}
                    onChange={(e) => onModelChange(e.target.value)}
                    className="form-control"
                    disabled={currentProvider.models.length === 0}
                >
                    {currentProvider.models.map(model => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>

                {currentProvider.models.length === 0 && (
                    <div className="model-warning">
                        No models available for this provider. Please check your API key configuration.
                    </div>
                )}
            </div>

            {/* Provider Information */}
            <div className="provider-info">
                {selectedProvider === 'claude' && (
                    <div className="provider-description">
                        <strong>Claude:</strong> Anthropic's Claude excels at thoughtful, nuanced content with a more
                        human-like tone. Good for longer-form content, complex ideas, and creative writing.
                    </div>
                )}

                {selectedProvider === 'deepseek' && (
                    <div className="provider-description">
                        <strong>DeepSeek:</strong> DeepSeek models are optimized for technical content and instruction
                        following. They typically excel at structured content with factual information.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelSelector;