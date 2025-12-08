# Environment Variables Setup

This project uses environment variables to store sensitive configuration like API endpoints.

## Setup Instructions

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your webhook URL:
   ```
   REACT_APP_WEBHOOK_URL=https://your-webhook-url-here
   ```

3. Restart the development server after making changes to `.env`:
   ```bash
   npm start
   ```

## Important Notes

- The `.env` file is already in `.gitignore` and will not be committed to version control
- Environment variables must start with `REACT_APP_` to be accessible in the React app
- Never commit `.env` files with sensitive data
- Use `.env.example` as a template for other developers

## Current Configuration

The default webhook URL is set in `HomePage.js` as a fallback, but it's recommended to use environment variables for production.

