# Student Virtual Assistant - Deployment Guide

This guide will help you deploy the backend server so you can receive applications via email and Telegram.

---

## Quick Overview

Your credentials are already configured:
- **Email:** BOOTHTERRI@gmail.com
- **Telegram Bot:** @your_bot (token configured)
- **Telegram Chat ID:** 6383025888

---

## Option 1: Deploy to Render (Recommended - FREE)

### Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Name it `student-va-backend`
3. Make it private (recommended)
4. Upload your backend files:

```bash
cd /mnt/okcomputer/output/backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/student-va-backend.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to https://render.com and sign up (free)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** student-va-backend
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click "Advanced" and add Environment Variables:
   ```
   GMAIL_USER=BOOTHTERRI@gmail.com
   GMAIL_PASS=pdhpklnsqqqkrzny
   TELEGRAM_BOT_TOKEN=8765472196:AAE3yVt6fZ6UnAtpreh5zAzCyzHK4XDt1ug
   TELEGRAM_CHAT_ID=6383025888
   PORT=10000
   ```
6. Click "Create Web Service"

### Step 3: Update Frontend

1. Copy your Render URL (e.g., `https://student-va-backend.onrender.com`)
2. In your frontend code, update the API URL:
   ```typescript
   const API_BASE_URL = 'https://student-va-backend.onrender.com';
   ```
3. Rebuild and redeploy the frontend

---

## Option 2: Deploy to Railway (FREE)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in the "Variables" tab
5. Deploy!

---

## Option 3: Deploy to Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login and create app:
```bash
heroku login
heroku create student-va-backend
```
3. Set environment variables:
```bash
heroku config:set GMAIL_USER=BOOTHTERRI@gmail.com
heroku config:set GMAIL_PASS=pdhpklnsqqqkrzny
heroku config:set TELEGRAM_BOT_TOKEN=8765472196:AAE3yVt6fZ6UnAtpreh5zAzCyzHK4XDt1ug
heroku config:set TELEGRAM_CHAT_ID=6383025888
```
4. Deploy:
```bash
git push heroku main
```

---

## Testing Your Backend

### Test Telegram Bot

```bash
cd /mnt/okcomputer/output/backend
npm install
node test-telegram.js
```

You should receive a test message in Telegram.

### Test Email

```bash
node test-email.js
```

Check your Gmail inbox for the test email.

### Test Full Application Flow

1. Start the backend locally:
```bash
npm start
```

2. In another terminal, test the API:
```bash
curl -X POST http://localhost:3001/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "country": "USA",
    "pitch": "This is a test application"
  }'
```

---

## Updating Frontend API URL

After deploying your backend, update the frontend:

### Option A: Environment Variable (Recommended)

1. Create `.env` file in `/mnt/okcomputer/output/app/`:
```
VITE_API_URL=https://your-backend-url.com
```

2. Rebuild:
```bash
cd /mnt/okcomputer/output/app
npm run build
```

### Option B: Direct Edit

Edit `App.tsx` line ~324:
```typescript
const API_BASE_URL = 'https://your-backend-url.com';
```

---

## Troubleshooting

### Email Not Working

1. **Check App Password:** Make sure you're using an App Password, not your regular Gmail password
2. **Enable 2FA:** 2-Factor Authentication must be enabled on your Gmail account
3. **Generate App Password:** Visit https://myaccount.google.com/apppasswords
4. **Less Secure Apps:** If using older methods, enable "Less secure app access" (not recommended)

### Telegram Not Working

1. **Start Conversation:** Make sure you've sent at least one message to your bot
2. **Check Chat ID:** Verify the Chat ID is correct
3. **Test Bot:** Visit: `https://api.telegram.org/bot8765472196:AAE3yVt6fZ6UnAtpreh5zAzCyzHK4XDt1ug/getMe`

### CORS Errors

If you see CORS errors in the browser:
1. Make sure your backend CORS is configured to allow your frontend domain
2. The backend already has `app.use(cors())` which allows all origins in development
3. For production, update CORS settings in `server.js`

---

## Files Location

All your project files are in:
```
/mnt/okcomputer/output/
├── app/              # Frontend (React)
├── backend/          # Backend (Node.js)
└── README.md         # Full documentation
```

---

## Need Help?

1. Check server logs for error messages
2. Test individual components (email, Telegram)
3. Verify all environment variables are set correctly
4. Make sure your backend URL is accessible from the internet

---

**Your backend is ready to receive applications! 🎉**
