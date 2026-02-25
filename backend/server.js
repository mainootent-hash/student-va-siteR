/**
 * Student Virtual Assistant - Backend Server
 * 
 * This server handles form submissions and sends notifications via:
 * 1. Email (Gmail SMTP)
 * 2. Telegram Bot
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install dependencies: npm install
 * 2. Configure environment variables in .env file
 * 3. Run server: node server.js
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only PDF, DOC, DOCX files
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

// Rate limiting to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many applications from this IP, please try again after 15 minutes.'
  }
});

// Apply rate limiting to application endpoint
app.use('/api/apply', limiter);

/**
 * Configure Gmail SMTP Transporter
 * 
 * To use Gmail:
 * 1. Enable 2-Factor Authentication on your Gmail account
 * 2. Generate an App Password: https://myaccount.google.com/apppasswords
 * 3. Use the App Password in GMAIL_PASS (not your regular password)
 */
const createEmailTransporter = () => {
  // Support both EMAIL_USER/PASS and GMAIL_USER/PASS for compatibility
  const emailUser = process.env.GMAIL_USER || process.env.EMAIL_USER;
  const emailPass = process.env.GMAIL_PASS || process.env.EMAIL_PASS;
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

/**
 * Send Telegram Notification
 * 
 * To get your Telegram Bot Token and Chat ID:
 * 1. Create a bot with @BotFather on Telegram
 * 2. Get the bot token from BotFather
 * 3. Send a message to your bot
 * 4. Visit: https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
 * 5. Find your chat_id in the response
 */
const sendTelegramNotification = async (applicationData) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!botToken || !chatId) {
    console.log('Telegram credentials not configured, skipping Telegram notification');
    return;
  }

  const message = `
📝 *New Application Received*

*Name:* ${applicationData.fullName}
*Email:* ${applicationData.email}
*Phone:* ${applicationData.phone || 'Not provided'}
*Country:* ${applicationData.country}
*Education:* ${applicationData.education || 'Not specified'}

*Skills:*
${applicationData.skills || 'Not provided'}

*Experience:*
${applicationData.experience || 'Not provided'}

*Why hire them:*
${applicationData.pitch}

📅 Submitted: ${new Date().toLocaleString()}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Telegram API error:', data.description);
    } else {
      console.log('Telegram notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
};

/**
 * Send Email Notification
 */
const sendEmailNotification = async (applicationData, filePath) => {
  const transporter = createEmailTransporter();
  const emailUser = process.env.GMAIL_USER || process.env.EMAIL_USER;
  
  const mailOptions = {
    from: `"Student VA Application" <${emailUser}>`,
    to: emailUser, // Send to yourself
    subject: `New Application: ${applicationData.fullName}`,
    html: `
      <h2>New Application Received</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Full Name</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.phone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.country}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Education</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.education || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Skills</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.skills || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Experience</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.experience || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Why Hire</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${applicationData.pitch}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #666;">
        Submitted: ${new Date().toLocaleString()}
      </p>
    `,
  };

  // Attach file if provided
  if (filePath) {
    mailOptions.attachments = [
      {
        filename: path.basename(filePath),
        path: filePath,
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Application Submission Endpoint
 * POST /api/apply
 */
app.post('/api/apply', upload.single('cv'), async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'country', 'pitch'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const applicationData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      country: req.body.country,
      education: req.body.education,
      skills: req.body.skills,
      experience: req.body.experience,
      pitch: req.body.pitch,
    };

    const filePath = req.file ? req.file.path : null;

    // Send notifications
    const emailPromise = sendEmailNotification(applicationData, filePath);
    const telegramPromise = sendTelegramNotification(applicationData);

    await Promise.allSettled([emailPromise, telegramPromise]);

    // Clean up uploaded file after sending
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully! We will review and get back to you within 2-3 business days.'
    });

  } catch (error) {
    console.error('Error processing application:', error);
    
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your application. Please try again later.'
    });
  }
});

/**
 * Health Check Endpoint
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  const emailConfigured = (process.env.GMAIL_USER || process.env.EMAIL_USER) && 
                          (process.env.GMAIL_PASS || process.env.EMAIL_PASS);
  
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      email: emailConfigured ? 'configured' : 'not configured',
      telegram: process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID ? 'configured' : 'not configured',
    }
  });
});

// Serve frontend static build if present (checks multiple common locations)
const possibleClientPaths = [
  path.join(__dirname, '..', 'app', 'dist'),
  path.join(__dirname, 'client'),
  path.join(__dirname, 'public'),
];

const clientBuildPath = possibleClientPaths.find(p => fs.existsSync(p));
if (clientBuildPath) {
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
  console.log('Serving frontend from:', clientBuildPath);
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 5MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║     Student Virtual Assistant - Backend Server             ║
╠════════════════════════════════════════════════════════════╣
║  Server running on port: ${PORT}                              ║
║  Health check: http://localhost:${PORT}/api/health            ║
╚════════════════════════════════════════════════════════════╝
  `);
  
  // Check configuration
  const emailConfigured = (process.env.GMAIL_USER || process.env.EMAIL_USER) && 
                          (process.env.GMAIL_PASS || process.env.EMAIL_PASS);
  
  if (!emailConfigured) {
    console.log('⚠️  WARNING: Email credentials not configured. Email notifications will be disabled.');
    console.log('   Set GMAIL_USER and GMAIL_PASS (or EMAIL_USER and EMAIL_PASS) in your .env file.\n');
  } else {
    console.log('✅ Email notifications configured\n');
  }
  
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.log('⚠️  WARNING: Telegram credentials not configured. Telegram notifications will be disabled.');
    console.log('   Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your .env file.\n');
  } else {
    console.log('✅ Telegram notifications configured\n');
  }
});

module.exports = app;
