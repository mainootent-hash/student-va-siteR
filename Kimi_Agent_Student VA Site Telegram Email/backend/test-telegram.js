/**
 * Test script to verify Telegram bot configuration
 * Run: node test-telegram.js
 */

require('dotenv').config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function testTelegramBot() {
  console.log('Testing Telegram Bot Configuration...\n');
  
  if (!TELEGRAM_BOT_TOKEN) {
    console.log('❌ TELEGRAM_BOT_TOKEN is not set');
    return;
  }
  
  if (!TELEGRAM_CHAT_ID) {
    console.log('❌ TELEGRAM_CHAT_ID is not set');
    return;
  }
  
  console.log('✅ Credentials found');
  console.log(`   Bot Token: ${TELEGRAM_BOT_TOKEN.substring(0, 20)}...`);
  console.log(`   Chat ID: ${TELEGRAM_CHAT_ID}\n`);
  
  // Test 1: Get bot info
  console.log('Test 1: Getting bot info...');
  try {
    const meResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    const meData = await meResponse.json();
    
    if (meData.ok) {
      console.log('✅ Bot is working!');
      console.log(`   Bot Name: ${meData.result.first_name}`);
      console.log(`   Bot Username: @${meData.result.username}\n`);
    } else {
      console.log('❌ Failed to get bot info:', meData.description);
      return;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return;
  }
  
  // Test 2: Send test message
  console.log('Test 2: Sending test message...');
  try {
    const message = `
🧪 *Test Message from Student VA Backend*

This is a test to verify your Telegram bot is configured correctly.

✅ Bot is working
✅ Chat ID is valid

You're all set to receive application notifications!
    `;
    
    const sendResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    
    const sendData = await sendResponse.json();
    
    if (sendData.ok) {
      console.log('✅ Test message sent successfully!');
      console.log('   Check your Telegram for the test message.\n');
    } else {
      console.log('❌ Failed to send message:', sendData.description);
      console.log('\n💡 Make sure you:');
      console.log('   1. Started a conversation with your bot');
      console.log('   2. The Chat ID is correct');
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testTelegramBot();
