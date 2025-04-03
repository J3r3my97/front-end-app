// src/services/mcpService.js

const API_URL = process.env.REACT_APP_MCP_API_URL || 'http://localhost:8000/api';

class MCPService {
    /**
     * Generate content using a specific model provider
     * 
     * @param {string} provider - Provider name (e.g., 'claude', 'deepseek')
     * @param {string} model - Model name (optional)
     * @param {string} prompt - Content generation prompt
     * @param {Object} options - Additional generation options
     * @returns {Promise} - Generated content response
     */
    async generateContent(provider, prompt, options = {}) {
        const { model, contentType, maxTokens = 1000, temperature = 0.7 } = options;

        // Prepare the generation prompt based on content type
        const formattedPrompt = this.formatPromptForContentType(prompt, contentType);

        try {
            const response = await fetch(`${API_URL}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    provider,
                    model,
                    prompt: formattedPrompt,
                    max_tokens: maxTokens,
                    temperature,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate content');
            }

            return await response.json();
        } catch (error) {
            console.error('Content generation error:', error);
            throw error;
        }
    }

    /**
     * Get available LLM providers and their models
     * 
     * @returns {Promise} - List of available providers and models
     */
    async getAvailableModels() {
        try {
            const response = await fetch(`${API_URL}/providers`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch providers');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching providers:', error);
            throw error;
        }
    }

    /**
     * Format the user prompt based on the desired content type
     * 
     * @param {string} basePrompt - User's base prompt
     * @param {string} contentType - Type of content to generate (blog, social, etc.)
     * @returns {string} - Formatted prompt for the LLM
     */
    formatPromptForContentType(basePrompt, contentType) {
        const contentPrompts = {
            'blog-post': `Write a professional blog post about "${basePrompt}". Include a compelling headline, 
                    an introduction that hooks the reader, 3-5 main points with subheadings, and a conclusion. 
                    The tone should be informative yet conversational. Target length: 800-1200 words.`,

            'social-media': `Create a social media post about "${basePrompt}". 
                        The post should be engaging, concise, and include appropriate hashtags. 
                        Keep it under 280 characters for Twitter compatibility.`,

            'product-description': `Write a persuasive product description for "${basePrompt}". 
                              Highlight key features, benefits, and unique selling points. 
                              Use vivid language that appeals to the target audience.`,

            'email-newsletter': `Compose an email newsletter about "${basePrompt}". 
                          Include a catchy subject line, a personable greeting, 
                          valuable content that's easy to scan, and a clear call-to-action.`,

            'ad-copy': `Create compelling advertising copy for "${basePrompt}". 
                  The copy should be attention-grabbing, emphasize benefits, 
                  include a unique value proposition, and end with a strong call-to-action.`
        };

        return contentPrompts[contentType] || basePrompt;
    }
}

export default new MCPService();