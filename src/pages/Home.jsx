// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Generate Amazing Content with AI</h1>
                <p className="hero-subtitle">
                    Compare different models, edit results, and find the perfect content for your needs
                </p>
                <Link to="/generator" className="cta-button">
                    Start Generating
                </Link>
            </div>

            <div className="features-section">
                <h2>Features</h2>

                <div className="feature-cards">
                    <div className="feature-card">
                        <div className="feature-icon">🤖</div>
                        <h3>Multiple AI Models</h3>
                        <p>
                            Switch between Claude, DeepSeek, and other leading AI models
                            to find the one that works best for your specific content needs.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Model Comparison</h3>
                        <p>
                            Generate content with different models side-by-side to compare
                            styles, quality, and insights from each AI.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">✏️</div>
                        <h3>Content Editing</h3>
                        <p>
                            Edit and refine AI-generated content with our built-in editor.
                            Save multiple versions and get AI-powered refinement suggestions.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Multiple Content Types</h3>
                        <p>
                            Generate blog posts, social media content, product descriptions,
                            email newsletters, and advertising copy with specialized prompts.
                        </p>
                    </div>
                </div>
            </div>

            <div className="how-it-works">
                <h2>How It Works</h2>

                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Choose Content Type</h3>
                        <p>Select the type of content you want to generate</p>
                    </div>

                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Pick Your AI Model</h3>
                        <p>Select from different LLMs to generate your content</p>
                    </div>

                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Generate & Compare</h3>
                        <p>Create content and compare outputs from different models</p>
                    </div>

                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Edit & Refine</h3>
                        <p>Perfect your content with the built-in editor</p>
                    </div>
                </div>

                <Link to="/generator" className="start-button">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default Home;