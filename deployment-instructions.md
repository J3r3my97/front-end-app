# Deployment Guide: Content Generation Tool

This guide will help you deploy both the MCP server and the Content Generation Tool frontend.

## Prerequisites

- Node.js (v14+) and npm
- Docker and Docker Compose
- API keys for Claude, DeepSeek, or other LLM providers you want to use

## Step 1: Deploy the MCP Server

First, let's deploy your MCP server which will handle communication with the LLM APIs.

### Option 1: Local Deployment

1. Clone your MCP server repository:
   ```bash
   git clone https://github.com/yourusername/mcp-app.git
   cd mcp-app
   ```

2. Create a `.env` file with your API keys:
   ```
   ANTHROPIC_API_KEY=your_claude_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   ```

3. Build and start the Docker container:
   ```bash
   docker-compose up -d
   ```

4. Your MCP server will be running at `http://localhost:8000`

### Option 2: Cloud Deployment (Railway)

Railway is a simple and cost-effective platform for deploying containerized applications.

1. Sign up for a [Railway account](https://railway.app/)

2. Install the Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

3. Login to Railway:
   ```bash
   railway login
   ```

4. Initialize a new project in your MCP server directory:
   ```bash
   cd mcp-app
   railway init
   ```

5. Add your environment variables (API keys) through the Railway dashboard

6. Deploy your application:
   ```bash
   railway up
   ```

7. Your MCP server will be deployed with a public URL that Railway provides

## Step 2: Deploy the Content Generation Tool Frontend

Now let's deploy the Content Generation Tool frontend that will connect to your MCP server.

### Option 1: Local Development

1. Clone or create the frontend repository:
   ```bash
   git clone https://github.com/yourusername/content-generator.git
   cd content-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file to point to your MCP server:
   ```
   REACT_APP_MCP_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. The frontend will be running at `http://localhost:3000`

### Option 2: Deploy to Netlify

Netlify offers free hosting for static sites and is perfect for React applications.

1. Build your application:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

4. Initialize a new Netlify site:
   ```bash
   netlify init
   ```

5. Deploy your site:
   ```bash
   netlify deploy --prod
   ```

6. Configure environment variables in the Netlify dashboard, setting `REACT_APP_MCP_API_URL` to point to your deployed MCP server URL

## Step 3: Connecting the Frontend to your MCP Server

1. Ensure your MCP server has CORS enabled for your frontend domain
   - This is already configured in the MCP server code

2. Update the API URL in the Content Generation Tool:
   - If deployed, set the environment variable `REACT_APP_MCP_API_URL` in your hosting platform
   - If local, ensure your `.env` file has the correct URL

## Troubleshooting

### CORS Issues
If you're getting CORS errors:

1. Check that your MCP server's CORS settings include your frontend's domain
2. Verify that the API URLs in your frontend code are correct
3. For local development, ensure both servers are running on different ports

### API Connection Issues
If the frontend cannot connect to the MCP server:

1. Check that your MCP server is running and accessible
2. Verify your environment variables are set correctly
3. Check any firewall or network settings that might block connections

## Next Steps

Once your application is deployed:

1. Test generating content with different models
2. Compare the outputs of Claude vs DeepSeek
3. Try different content types to see how the models perform
4. Extend the application with new features:
   - User authentication
   - Persistent storage of generated content
   - Additional LLM providers

Congratulations! You now have a fully deployed Content Generation Tool that leverages your MCP server to interact with multiple LLM providers.
