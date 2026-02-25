/**
 * Test script to verify Email configuration
 * Run: node test-email.js
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.GMAIL_USER || process.env.EMAIL_USER;
const EMAIL_PASS = process.env.GMAIL_PASS || process.env.EMAIL_PASS;

async function testEmailConfig() {
  console.log('Testing Email Configuration...\n');
  
  if (!EMAIL_USER) {
    console.log('❌ EMAIL_USER / GMAIL_USER is not set');
    return;
  }
  
  if (!EMAIL_PASS) {
    console.log('❌ EMAIL_PASS / GMAIL_PASS is not set');
    return;
  }
  
  console.log('✅ Credentials found');
  console.log(`   Email: ${EMAIL_USER}\n`);
  
  console.log('Creating email transporter...');
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
  
  console.log('Verifying connection...');
  
  try {
    const verified = await transporter.verify();
    
    if (verified) {
      console.log('✅ Email transporter is working!\n');
      
      console.log('Sending test email...');
      
      const info = await transporter.sendMail({
        from: `"Student VA Test" <${EMAIL_USER}>`,
        to: EMAIL_USER,
        subject: 'Test Email from Student VA Backend',
        html: `
          <h2>🧪 Test Email</h2>
          <p>This is a test to verify your email configuration is working correctly.</p>
          <p>If you received this email, your backend is ready to receive application notifications!</p>
          <br>
          <p><strong>Configuration:</strong></p>
          <ul>
            <li>Email: ${EMAIL_USER}</li>
            <li>Time: ${new Date().toLocaleString()}</li>
          </ul>
        `,
      });
      
      console.log('✅ Test email sent successfully!');
      console.log(`   Message ID: ${info.messageId}`);
      console.log(`   Check your inbox at ${EMAIL_USER}\n`);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    console.log('\n💡 Common issues:');
    console.log('   1. Make sure you are using an App Password, not your regular Gmail password');
    console.log('   2. Enable 2-Factor Authentication on your Gmail account');
    console.log('   3. Generate App Password at: https://myaccount.google.com/apppasswords');
    console.log('\n📖 For more help, see:');
    console.log('   https://support.google.com/accounts/answer/185833\n');
  }
}

testEmailConfig();
