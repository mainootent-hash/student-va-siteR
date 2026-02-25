# Student Virtual Assistant - Complete Website

A modern, professional, and fully responsive website for a "Student Virtual Assistant" service. This project includes a beautiful React frontend with scroll animations and a Node.js/Express backend for handling form submissions with email and Telegram notifications.

## Features

### Frontend
- **Modern Design**: Clean, professional UI with blue/white color scheme
- **Scroll Animations**: Smooth GSAP-powered scroll animations
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop
- **Interactive Form**: Application form with validation
- **8 Sections**: Hero, About, Services, How it Works, and more

### Backend
- **Form Submission**: Handles application form submissions
- **Email Notifications**: Sends applications to Gmail via SMTP
- **Telegram Notifications**: Sends applications to Telegram via Bot API
- **File Upload**: Supports CV uploads (PDF, DOC, DOCX)
- **Rate Limiting**: Prevents spam with IP-based rate limiting
- **Validation**: Comprehensive form validation

## Project Structure

```
student-virtual-assistant/
├── frontend/          # React + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   ├── public/        # Images and assets
│   └── dist/          # Build output
├── backend/           # Node.js + Express
│   ├── server.js      # Main server file
│   ├── .env.example   # Environment variables template
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Gmail account (for email notifications)
- Telegram account (for Telegram notifications)

### Your Credentials (Already Configured)

Your credentials are already set up in `/mnt/okcomputer/output/backend/.env`:

```env
EMAIL_USER=BOOTHTERRI@gmail.com
EMAIL_PASS=pdhpklnsqqqkrzny
TELEGRAM_BOT_TOKEN=8765472196:AAE3yVt6fZ6UnAtpreh5zAzCyzHK4XDt1ug
TELEGRAM_CHAT_ID=6383025888
```

### 1. Frontend Setup

```bash
# Navigate to frontend directory
cd app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Edit .env with your credentials
# See Configuration section below

# Start server
npm start

# Or use nodemon for development
npm run dev
```

The backend will be available at `http://localhost:3001`

## Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
3. Add to your `.env` file:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-16-char-app-password
   ```

### Telegram Setup

1. Create a Telegram Bot:
   - Message @BotFather on Telegram
   - Use `/newbot` command
   - Follow instructions and copy the bot token
2. Get your Chat ID:
   - Send a message to your new bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Look for `"chat":{"id":123456789` - that's your chat ID
3. Add to your `.env` file:
   ```
   TELEGRAM_BOT_TOKEN=your-bot-token
   TELEGRAM_CHAT_ID=your-chat-id
   ```

## Deployment

### Backend Deployment (Required for Form Submissions)

Your credentials are already configured. You just need to deploy the backend:

**Option 1: Render (Recommended - FREE)**
1. Push backend code to GitHub
2. Connect to Render.com
3. Add environment variables (already in `.env` file)
4. Deploy!

**Option 2: Railway (FREE)**
1. Push backend code to GitHub
2. Connect to Railway.app
3. Deploy!

**Option 3: Heroku**
```bash
cd backend
heroku create your-app-name
heroku config:set GMAIL_USER=BOOTHTERRI@gmail.com
heroku config:set GMAIL_PASS=pdhpklnsqqqkrzny
heroku config:set TELEGRAM_BOT_TOKEN=8765472196:AAE3yVt6fZ6UnAtpreh5zAzCyzHK4XDt1ug
heroku config:set TELEGRAM_CHAT_ID=6383025888
git push heroku main
```

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

### Testing Your Setup

Test Telegram:
```bash
cd backend
npm install
node test-telegram.js
```

Test Email:
```bash
node test-email.js
```

## API Endpoints

### POST /api/apply
Submit a new application.

**Request Body (multipart/form-data):**
- `fullName` (required): Applicant's full name
- `email` (required): Applicant's email address
- `phone`: Phone number
- `country` (required): Country of residence
- `education`: Education level
- `skills`: Comma-separated skills
- `experience`: Work experience description
- `pitch` (required): Why should we hire you
- `cv`: CV file (PDF, DOC, DOCX) - optional

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully!"
}
```

### GET /api/health
Check server health and configuration status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "email": "configured",
    "telegram": "configured"
  }
}
```

## Deployment

### Frontend Deployment (Vercel)

1. Build the frontend:
   ```bash
   cd app
   npm run build
   ```

2. Deploy the `dist` folder to Vercel:
   ```bash
   npx vercel dist
   ```

3. Or connect your GitHub repository to Vercel for automatic deployments.

### Backend Deployment (Render/Railway/Heroku)

1. Push your code to GitHub
2. Connect your repository to Render, Railway, or Heroku
3. Add environment variables in the platform's dashboard
4. Deploy!

**Environment Variables for Production:**
- `PORT`: Usually set automatically by the platform
- `GMAIL_USER`: Your Gmail address
- `GMAIL_PASS`: Your Gmail App Password
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token
- `TELEGRAM_CHAT_ID`: Your Telegram chat ID

### Full-Stack Deployment (cPanel)

1. **Frontend:**
   - Build the frontend: `npm run build`
   - Upload `dist` folder contents to `public_html`

2. **Backend:**
   - Upload backend folder to a subdirectory (e.g., `api`)
   - Install Node.js on your cPanel account
   - Set up environment variables
   - Configure the application to run on a specific port
   - Set up a proxy if needed

## Customization

### Changing Colors
Edit `app/src/index.css`:
```css
:root {
  --bg-primary: #F6F4EF;    /* Main background */
  --bg-secondary: #0B1A3A;   /* Dark sections */
  --accent: #4B6DFF;         /* Buttons, highlights */
  --text-primary: #111827;   /* Main text */
  --text-secondary: #6B7280; /* Secondary text */
}
```

### Adding/Removing Services
Edit the services section in `app/src/App.tsx` around line 350.

### Modifying Form Fields
Edit the form in `app/src/App.tsx` and update the backend validation in `backend/server.js`.

## Security Features

1. **Rate Limiting**: Maximum 5 applications per IP per 15 minutes
2. **File Validation**: Only PDF, DOC, DOCX files allowed (max 5MB)
3. **Email Validation**: Regex validation for email format
4. **CORS**: Configurable CORS settings
5. **Input Sanitization**: All inputs are validated before processing

## Troubleshooting

### Email Not Sending
- Verify Gmail App Password is correct (not your regular password)
- Check that 2FA is enabled on your Gmail account
- Look for "Less secure app access" settings
- Check server logs for specific error messages

### Telegram Not Working
- Verify bot token is correct
- Make sure you've sent a message to the bot first
- Check that chat ID is correct (should be a number)
- Test the bot manually: `https://api.telegram.org/bot<TOKEN>/getMe`

### CORS Errors
- Ensure backend CORS is configured to allow your frontend domain
- For development, `cors()` middleware allows all origins
- For production, specify allowed origins in the CORS configuration

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- GSAP (animations)
- Lucide React (icons)

### Backend
- Node.js
- Express
- Nodemailer (email)
- Multer (file uploads)
- express-rate-limit (spam protection)
- dotenv (environment variables)

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:
1. Check the Troubleshooting section above
2. Review the server logs for error messages
3. Ensure all environment variables are set correctly
4. Verify your Gmail and Telegram configurations

---

**Built with ❤️ for students seeking remote work opportunities.**
