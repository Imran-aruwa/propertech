/**
 * Propertech AI Chatbot Widget
 * Embeddable chatbot for property management assistance
 *
 * Usage:
 * <script src="https://cdn.propertechsoftware.com/chatbot.js"></script>
 * <script>
 *   PropertechChatbot.init({
 *     apiKey: 'your-api-key',
 *     position: 'bottom-right',
 *     theme: 'purple'
 *   });
 * </script>
 */

(function(window, document) {
  'use strict';

  // Default configuration
  const DEFAULT_CONFIG = {
    apiKey: null,
    apiUrl: 'https://api.propertechsoftware.com/chatbot',
    position: 'bottom-right', // bottom-right, bottom-left
    theme: 'purple', // purple, blue, green
    greeting: 'Hi! How can I help you with property management today?',
    placeholder: 'Type your message...',
    title: 'Propertech AI',
    subtitle: 'Property Assistant',
    autoOpen: false,
    delay: 3000, // Delay before auto-opening (if enabled)
    containerSelector: null, // Custom container selector
    onOpen: null,
    onClose: null,
    onMessage: null
  };

  // Theme colors
  const THEMES = {
    purple: {
      primary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      primaryHover: '#6d28d9',
      shadow: 'rgba(139, 92, 246, 0.4)'
    },
    blue: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      primaryHover: '#1d4ed8',
      shadow: 'rgba(59, 130, 246, 0.4)'
    },
    green: {
      primary: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      primaryHover: '#047857',
      shadow: 'rgba(16, 185, 129, 0.4)'
    }
  };

  // Chatbot class
  class PropertechChatbot {
    constructor(config) {
      this.config = { ...DEFAULT_CONFIG, ...config };
      this.isOpen = false;
      this.messages = [];
      this.sessionId = this.generateSessionId();
      this.container = null;
      this.theme = THEMES[this.config.theme] || THEMES.purple;
    }

    // Initialize the chatbot
    init() {
      this.injectStyles();
      this.createWidget();
      this.attachEventListeners();

      if (this.config.autoOpen) {
        setTimeout(() => this.open(), this.config.delay);
      }

      // Add initial greeting
      this.addMessage(this.config.greeting, 'bot');
    }

    // Generate unique session ID
    generateSessionId() {
      return 'session_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

    // Inject CSS styles
    injectStyles() {
      if (document.getElementById('propertech-chatbot-widget-styles')) return;

      const style = document.createElement('style');
      style.id = 'propertech-chatbot-widget-styles';
      style.textContent = `
        .propertech-widget {
          position: fixed;
          ${this.config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
          bottom: 20px;
          z-index: 999999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .propertech-widget * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .propertech-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: ${this.theme.primary};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px ${this.theme.shadow};
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .propertech-toggle:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 20px ${this.theme.shadow};
        }

        .propertech-toggle svg {
          width: 28px;
          height: 28px;
          color: white;
          transition: transform 0.3s ease;
        }

        .propertech-toggle.open svg {
          transform: rotate(180deg);
        }

        .propertech-window {
          position: absolute;
          bottom: 75px;
          ${this.config.position.includes('right') ? 'right: 0;' : 'left: 0;'}
          width: 380px;
          height: 550px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          display: none;
          flex-direction: column;
          animation: slideUp 0.3s ease;
        }

        .propertech-window.open {
          display: flex;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .propertech-header {
          background: ${this.theme.primary};
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .propertech-header-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .propertech-avatar {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .propertech-header-title {
          font-weight: 600;
          font-size: 17px;
        }

        .propertech-header-status {
          font-size: 13px;
          opacity: 0.9;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        .propertech-status-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .propertech-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .propertech-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .propertech-close svg {
          width: 22px;
          height: 22px;
          color: white;
        }

        .propertech-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #f9fafb;
        }

        .propertech-message {
          max-width: 85%;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .propertech-message.bot {
          align-self: flex-start;
        }

        .propertech-message.user {
          align-self: flex-end;
        }

        .propertech-message-content {
          padding: 14px 18px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
        }

        .propertech-message.bot .propertech-message-content {
          background: white;
          color: #1f2937;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .propertech-message.user .propertech-message-content {
          background: ${this.theme.primary};
          color: white;
          border-bottom-right-radius: 6px;
        }

        .propertech-typing {
          display: flex;
          gap: 5px;
          padding: 14px 18px;
          background: white;
          border-radius: 18px;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          width: fit-content;
        }

        .propertech-typing-dot {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out both;
        }

        .propertech-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .propertech-typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); }
          40% { transform: scale(1.2); }
        }

        .propertech-input-container {
          padding: 16px 20px;
          background: white;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 10px;
        }

        .propertech-input {
          flex: 1;
          padding: 14px 18px;
          border: 2px solid #e5e7eb;
          border-radius: 25px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .propertech-input:focus {
          border-color: ${this.config.theme === 'purple' ? '#8b5cf6' : this.config.theme === 'blue' ? '#3b82f6' : '#10b981'};
          box-shadow: 0 0 0 3px ${this.theme.shadow};
        }

        .propertech-send {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${this.theme.primary};
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, opacity 0.2s;
        }

        .propertech-send:hover {
          transform: scale(1.05);
        }

        .propertech-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .propertech-send svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        .propertech-powered {
          text-align: center;
          padding: 8px;
          font-size: 11px;
          color: #9ca3af;
          background: #f9fafb;
        }

        .propertech-powered a {
          color: #6b7280;
          text-decoration: none;
        }

        .propertech-powered a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .propertech-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 150px);
            bottom: 85px;
            ${this.config.position.includes('right') ? 'right: 0;' : 'left: 0;'}
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Create the widget HTML
    createWidget() {
      const container = document.createElement('div');
      container.id = 'propertech-chatbot-widget';
      container.className = 'propertech-widget';
      container.innerHTML = `
        <button class="propertech-toggle" aria-label="Open chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <div class="propertech-window">
          <div class="propertech-header">
            <div class="propertech-header-info">
              <div class="propertech-avatar">🤖</div>
              <div>
                <div class="propertech-header-title">${this.escapeHtml(this.config.title)}</div>
                <div class="propertech-header-status">
                  <span class="propertech-status-dot"></span>
                  ${this.escapeHtml(this.config.subtitle)}
                </div>
              </div>
            </div>
            <button class="propertech-close" aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="propertech-messages"></div>
          <div class="propertech-input-container">
            <input type="text" class="propertech-input" placeholder="${this.escapeHtml(this.config.placeholder)}" />
            <button class="propertech-send" aria-label="Send message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
            </button>
          </div>
          <div class="propertech-powered">
            Powered by <a href="https://propertech.co.ke" target="_blank" rel="noopener">Propertech</a>
          </div>
        </div>
      `;

      if (this.config.containerSelector) {
        const customContainer = document.querySelector(this.config.containerSelector);
        if (customContainer) {
          customContainer.appendChild(container);
        } else {
          document.body.appendChild(container);
        }
      } else {
        document.body.appendChild(container);
      }

      this.container = container;
    }

    // Attach event listeners
    attachEventListeners() {
      const toggle = this.container.querySelector('.propertech-toggle');
      const close = this.container.querySelector('.propertech-close');
      const send = this.container.querySelector('.propertech-send');
      const input = this.container.querySelector('.propertech-input');

      toggle.addEventListener('click', () => this.toggle());
      close.addEventListener('click', () => this.close());
      send.addEventListener('click', () => this.sendMessage());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }

    // Toggle chatbot
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    // Open chatbot
    open() {
      this.isOpen = true;
      const window = this.container.querySelector('.propertech-window');
      const toggle = this.container.querySelector('.propertech-toggle');
      window.classList.add('open');
      toggle.classList.add('open');
      this.container.querySelector('.propertech-input').focus();

      if (typeof this.config.onOpen === 'function') {
        this.config.onOpen();
      }
    }

    // Close chatbot
    close() {
      this.isOpen = false;
      const window = this.container.querySelector('.propertech-window');
      const toggle = this.container.querySelector('.propertech-toggle');
      window.classList.remove('open');
      toggle.classList.remove('open');

      if (typeof this.config.onClose === 'function') {
        this.config.onClose();
      }
    }

    // Add message to chat
    addMessage(content, type) {
      const messagesContainer = this.container.querySelector('.propertech-messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = `propertech-message ${type}`;
      messageDiv.innerHTML = `<div class="propertech-message-content">${this.escapeHtml(content).replace(/\n/g, '<br>')}</div>`;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      this.messages.push({ content, type, timestamp: new Date().toISOString() });

      if (typeof this.config.onMessage === 'function') {
        this.config.onMessage({ content, type });
      }
    }

    // Show typing indicator
    showTyping() {
      const messagesContainer = this.container.querySelector('.propertech-messages');
      const typingDiv = document.createElement('div');
      typingDiv.id = 'propertech-typing-indicator';
      typingDiv.className = 'propertech-message bot';
      typingDiv.innerHTML = `
        <div class="propertech-typing">
          <div class="propertech-typing-dot"></div>
          <div class="propertech-typing-dot"></div>
          <div class="propertech-typing-dot"></div>
        </div>
      `;
      messagesContainer.appendChild(typingDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Hide typing indicator
    hideTyping() {
      const typingIndicator = this.container.querySelector('#propertech-typing-indicator');
      if (typingIndicator) typingIndicator.remove();
    }

    // Send message
    async sendMessage() {
      const input = this.container.querySelector('.propertech-input');
      const message = input.value.trim();
      if (!message) return;

      this.addMessage(message, 'user');
      input.value = '';

      this.showTyping();

      try {
        const response = await this.getResponse(message);
        this.hideTyping();
        this.addMessage(response, 'bot');
      } catch (error) {
        this.hideTyping();
        this.addMessage("I'm sorry, I couldn't process your request. Please try again or contact support.", 'bot');
      }
    }

    // Get bot response
    async getResponse(message) {
      // If API key is provided, use the backend
      if (this.config.apiKey && this.config.apiUrl) {
        try {
          const response = await fetch(this.config.apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
              message,
              sessionId: this.sessionId,
              history: this.messages.slice(-10)
            })
          });

          if (response.ok) {
            const data = await response.json();
            return data.response || data.message;
          }
        } catch (error) {
          console.error('Chatbot API error:', error);
        }
      }

      // Fallback to basic responses
      return this.getBasicResponse(message);
    }

    // Basic response logic
    getBasicResponse(message) {
      const lowerMessage = message.toLowerCase();

      const responses = {
        'hello': 'Hello! How can I help you with your property management today?',
        'hi': 'Hi there! What can I assist you with?',
        'help': 'I can help you with:\n• Property information\n• Tenant management\n• Payment tracking\n• Maintenance requests\n\nWhat would you like to know more about?',
        'property': 'You can manage your properties from the dashboard. Would you like me to help you add a new property or view existing ones?',
        'tenant': 'I can help with tenant management. You can add tenants, view their information, or track their payments.',
        'payment': 'For payment tracking, visit the Payments section. You can view pending payments, record new payments, and generate reports.',
        'maintenance': 'To submit or view maintenance requests, go to the Maintenance section. You can track the status of ongoing repairs there.',
        'rent': 'You can track rent payments and view collection rates in the Payments or Analytics section.',
        'report': 'You can generate various reports including occupancy rates, payment history, and financial summaries.',
        'contact': 'You can reach our support team at support@propertech.co.ke or through the Contact page.',
        'thank': 'You\'re welcome! Is there anything else I can help you with?'
      };

      for (const [keyword, response] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
          return response;
        }
      }

      return "I understand you're looking for help. For specific assistance, you can:\n\n1. Visit your Dashboard for an overview\n2. Check Properties for unit details\n3. View Payments for financial tracking\n\nIs there something specific I can help you find?";
    }

    // Escape HTML
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Destroy widget
    destroy() {
      if (this.container) {
        this.container.remove();
      }
      const styles = document.getElementById('propertech-chatbot-widget-styles');
      if (styles) styles.remove();
    }
  }

  // Global API
  window.PropertechChatbot = {
    instance: null,

    init(config) {
      if (this.instance) {
        this.instance.destroy();
      }
      this.instance = new PropertechChatbot(config);
      this.instance.init();
      return this.instance;
    },

    open() {
      if (this.instance) this.instance.open();
    },

    close() {
      if (this.instance) this.instance.close();
    },

    toggle() {
      if (this.instance) this.instance.toggle();
    },

    sendMessage(message) {
      if (this.instance) {
        this.instance.container.querySelector('.propertech-input').value = message;
        this.instance.sendMessage();
      }
    },

    destroy() {
      if (this.instance) {
        this.instance.destroy();
        this.instance = null;
      }
    }
  };

})(window, document);
