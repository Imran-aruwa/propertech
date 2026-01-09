// Propertech Chrome Extension - Content Script

// Production URL
const APP_BASE = 'https://propertechsoftware.com';

// Listen for messages from background script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'openChatbot') {
    openChatbot();
    sendResponse({ success: true });
    return true;
  }

  if (message.action === 'syncAuth') {
    // Get auth data from localStorage and send back
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('auth_user');
    if (token && user) {
      sendResponse({ token, user: JSON.parse(user) });
    } else {
      sendResponse({ token: null });
    }
    return true;
  }

  if (message.action === 'closeChatbot') {
    closeChatbot();
    sendResponse({ success: true });
    return true;
  }
});

// Chatbot state
let chatbotInjected = false;
let chatbotOpen = false;

// Inject chatbot widget
function injectChatbot() {
  if (chatbotInjected) return;

  // Create chatbot container
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'propertech-chatbot-container';
  chatbotContainer.innerHTML = `
    <div id="propertech-chatbot-widget">
      <button id="propertech-chatbot-toggle" aria-label="Open chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
      <div id="propertech-chatbot-window">
        <div id="propertech-chatbot-header">
          <div class="header-info">
            <div class="header-avatar">🤖</div>
            <div class="header-text">
              <span class="header-title">Propertech AI</span>
              <span class="header-status">Online</span>
            </div>
          </div>
          <button id="propertech-chatbot-close" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div id="propertech-chatbot-messages">
          <div class="message bot-message">
            <div class="message-content">
              Hi! I'm the Propertech AI assistant. How can I help you with your property management today?
            </div>
          </div>
        </div>
        <div id="propertech-chatbot-input-container">
          <input type="text" id="propertech-chatbot-input" placeholder="Type your message..." />
          <button id="propertech-chatbot-send" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(chatbotContainer);
  chatbotInjected = true;

  // Add event listeners
  const toggleBtn = document.getElementById('propertech-chatbot-toggle');
  const closeBtn = document.getElementById('propertech-chatbot-close');
  const sendBtn = document.getElementById('propertech-chatbot-send');
  const input = document.getElementById('propertech-chatbot-input');

  toggleBtn.addEventListener('click', openChatbot);
  closeBtn.addEventListener('click', closeChatbot);
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Inject styles
  injectStyles();
}

// Inject chatbot styles
function injectStyles() {
  const style = document.createElement('style');
  style.id = 'propertech-chatbot-styles';
  style.textContent = `
    #propertech-chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    #propertech-chatbot-toggle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    #propertech-chatbot-toggle:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5);
    }

    #propertech-chatbot-toggle svg {
      width: 24px;
      height: 24px;
      color: white;
    }

    #propertech-chatbot-window {
      display: none;
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 380px;
      height: 520px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      flex-direction: column;
    }

    #propertech-chatbot-window.open {
      display: flex;
    }

    #propertech-chatbot-header {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-avatar {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .header-title {
      font-weight: 600;
      font-size: 16px;
      display: block;
    }

    .header-status {
      font-size: 12px;
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .header-status::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #4ade80;
      border-radius: 50%;
    }

    #propertech-chatbot-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #propertech-chatbot-close svg {
      width: 20px;
      height: 20px;
      color: white;
    }

    #propertech-chatbot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #f9fafb;
    }

    .message {
      max-width: 85%;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .bot-message {
      align-self: flex-start;
    }

    .user-message {
      align-self: flex-end;
    }

    .message-content {
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
    }

    .bot-message .message-content {
      background: white;
      color: #1f2937;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .user-message .message-content {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .typing-indicator {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
      background: white;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      width: fit-content;
    }

    .typing-dot {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }

    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0.8); }
      40% { transform: scale(1.2); }
    }

    #propertech-chatbot-input-container {
      padding: 16px;
      background: white;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }

    #propertech-chatbot-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    #propertech-chatbot-input:focus {
      border-color: #8b5cf6;
    }

    #propertech-chatbot-send {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }

    #propertech-chatbot-send:hover {
      transform: scale(1.05);
    }

    #propertech-chatbot-send svg {
      width: 18px;
      height: 18px;
      color: white;
    }

    @media (max-width: 480px) {
      #propertech-chatbot-window {
        width: calc(100vw - 40px);
        height: calc(100vh - 140px);
        bottom: 80px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Open chatbot
function openChatbot() {
  if (!chatbotInjected) injectChatbot();
  const chatWindow = document.getElementById('propertech-chatbot-window');
  chatWindow.classList.add('open');
  chatbotOpen = true;
  document.getElementById('propertech-chatbot-input').focus();
}

// Close chatbot
function closeChatbot() {
  const chatWindow = document.getElementById('propertech-chatbot-window');
  chatWindow.classList.remove('open');
  chatbotOpen = false;
}

// Send message
async function sendMessage() {
  const input = document.getElementById('propertech-chatbot-input');
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, 'user');
  input.value = '';

  // Show typing indicator
  showTypingIndicator();

  try {
    // Get AI response (you can integrate with your backend AI endpoint)
    const response = await getAIResponse(message);
    hideTypingIndicator();
    addMessage(response, 'bot');
  } catch (error) {
    hideTypingIndicator();
    addMessage("I apologize, but I'm having trouble connecting right now. Please try again later or visit the Propertech dashboard.", 'bot');
  }
}

// Add message to chat
function addMessage(content, type) {
  const messagesContainer = document.getElementById('propertech-chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}-message`;
  messageDiv.innerHTML = `<div class="message-content">${escapeHtml(content)}</div>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
  const messagesContainer = document.getElementById('propertech-chatbot-messages');
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typing-indicator';
  typingDiv.className = 'message bot-message';
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) typingIndicator.remove();
}

// Get AI response (basic implementation - connect to your AI backend)
async function getAIResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Basic responses for common queries
  const responses = {
    'hello': 'Hello! How can I help you with your property management today?',
    'hi': 'Hi there! What can I assist you with?',
    'help': 'I can help you with:\n- Property information\n- Tenant management\n- Payment tracking\n- Maintenance requests\n\nWhat would you like to know more about?',
    'property': 'You can manage your properties from the dashboard. Would you like me to help you add a new property or view existing ones?',
    'tenant': 'I can help with tenant management. You can add tenants, view their information, or track their payments through the Tenants section.',
    'payment': 'For payment tracking, visit the Payments section in your dashboard. You can view pending payments, record new payments, and generate payment reports.',
    'maintenance': 'To submit or view maintenance requests, go to the Maintenance section. You can track the status of ongoing repairs there.',
    'rent': 'You can track rent payments and view collection rates in the Payments or Analytics section of your dashboard.',
    'report': 'You can generate various reports including occupancy rates, payment history, and financial summaries from the Reports section.'
  };

  // Find matching response
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  // Default response
  return "I understand you're asking about property management. For more specific help, you can:\n\n1. Visit your Dashboard for an overview\n2. Check the Properties section for unit details\n3. View Payments for financial tracking\n\nIs there something specific I can help you find?";
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/\n/g, '<br>');
}

// Auto-inject chatbot after page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(injectChatbot, 1000);
  });
} else {
  setTimeout(injectChatbot, 1000);
}

// Check URL params for chatbot
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('chatbot') === 'open') {
  setTimeout(openChatbot, 1500);
}
