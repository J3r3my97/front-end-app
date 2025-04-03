// src/pages/Comparison.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComparisonView from '../components/ComparisonView';
import ContentForm from '../components/ContentForm';
import mcpService from '../services/mcpService';

const Comparison = () => {
    const [originalContent, setOriginalContent] = useState(null);
    const [comparisonContent, setComparisonContent] = useState(null);
    const [loadingState, setLoadingState] = useState('idle');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Load the original content from localStorage on component mount
    useEffect(() => {
        const storedContent = localStorage.getItem('compareContent');

        if (storedContent) {
            try {
                const parsedContent = JSON.parse(storedContent);
                setOriginalContent(parsedContent);
            } catch (err) {
                setError('Failed to load content for comparison');
                console.error(err);
            }
        } else {
            // If no content was stored, go back to the generator
            navigate('/');
        }
    }, [navigate]);

    // Handle new content generation
    const handleContentGenerated = (newContent) => {
        setComparisonContent(newContent);
        setLoadingState('idle');
    };

    // Go back to generator page
    const handleBackToGenerator = () => {
        navigate('/');
    };

    // Auto-generate comparison with a different model
    const handleAutoCompare = async () => {
        if (!originalContent) return;

        setLoadingState('generating');
        setError('');

        try {
            // Choose a different provider than the original
            const differentProvider = originalContent.provider === 'claude' ? 'deepseek' : 'claude';

            const result = await mcpService.generateContent(
                differentProvider,
                originalContent.topic,
                {
                    contentType: originalContent.contentType,
                    temperature: 0.7,
                    maxTokens: 1000
                }
            );

            setComparisonContent({
                content: result.content,
                provider: result.provider,
                model: result.model,
                topic: originalContent.topic,
                contentType: originalContent.contentType,
                timestamp: new Date().toISOString()
            });

            setLoadingState('idle');
        } catch (err) {
            setError(`Failed to generate comparison: ${err.message}`);
            setLoadingState('idle');
            console.error(err);
        }
    }
}