# Propertech AI Chatbot Widget

A lightweight, embeddable AI chatbot widget for property management assistance.

## Features

- Easy to embed on any website
- Customizable themes (purple, blue, green)
- Position control (bottom-right, bottom-left)
- Auto-open capability
- Mobile responsive
- AI-powered responses
- Callback hooks for integration

## Quick Start

Add the following code to your website:

```html
<script src="https://cdn.propertechsoftware.com/chatbot.js"></script>
<script>
  PropertechChatbot.init({
    apiKey: 'your-api-key', // Optional: for AI backend responses
    theme: 'purple',
    position: 'bottom-right'
  });
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | null | API key for backend AI responses |
| `apiUrl` | string | propertechsoftware.com API | Custom AI endpoint URL |
| `position` | string | 'bottom-right' | Widget position: 'bottom-right' or 'bottom-left' |
| `theme` | string | 'purple' | Color theme: 'purple', 'blue', or 'green' |
| `greeting` | string | 'Hi! How can I help...' | Initial greeting message |
| `placeholder` | string | 'Type your message...' | Input field placeholder |
| `title` | string | 'Propertech AI' | Header title |
| `subtitle` | string | 'Property Assistant' | Header subtitle |
| `autoOpen` | boolean | false | Auto-open chatbot on page load |
| `delay` | number | 3000 | Delay (ms) before auto-opening |
| `containerSelector` | string | null | Custom container CSS selector |
| `onOpen` | function | null | Callback when chatbot opens |
| `onClose` | function | null | Callback when chatbot closes |
| `onMessage` | function | null | Callback when message is sent/received |

## API Methods

```javascript
// Initialize chatbot
PropertechChatbot.init(config);

// Open chatbot
PropertechChatbot.open();

// Close chatbot
PropertechChatbot.close();

// Toggle chatbot
PropertechChatbot.toggle();

// Send a message programmatically
PropertechChatbot.sendMessage('Hello!');

// Destroy chatbot
PropertechChatbot.destroy();
```

## Examples

### Basic Usage

```html
<script src="https://cdn.propertechsoftware.com/chatbot.js"></script>
<script>
  PropertechChatbot.init({
    theme: 'blue',
    greeting: 'Welcome! How can I assist you with your property today?'
  });
</script>
```

### With Callbacks

```html
<script>
  PropertechChatbot.init({
    onOpen: function() {
      console.log('Chatbot opened');
      analytics.track('chatbot_opened');
    },
    onClose: function() {
      console.log('Chatbot closed');
    },
    onMessage: function(data) {
      console.log('Message:', data.content, 'Type:', data.type);
    }
  });
</script>
```

### Auto-Open After Delay

```html
<script>
  PropertechChatbot.init({
    autoOpen: true,
    delay: 5000, // Open after 5 seconds
    greeting: 'Hey there! Need help finding a property?'
  });
</script>
```

### Custom Container

```html
<div id="my-chatbot-container"></div>
<script>
  PropertechChatbot.init({
    containerSelector: '#my-chatbot-container'
  });
</script>
```

### Trigger from Custom Button

```html
<button onclick="PropertechChatbot.open()">Get Help</button>

<script>
  PropertechChatbot.init({
    autoOpen: false
  });
</script>
```

## Styling

The widget uses isolated CSS and should not conflict with your website styles. The widget is styled with:

- Smooth animations
- Rounded corners
- Clean typography
- Mobile-responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Self-Hosting

To host the widget yourself:

1. Copy `src/propertech-chatbot.js` to your server
2. Minify for production: `npx terser src/propertech-chatbot.js -o dist/chatbot.min.js`
3. Serve from your CDN

## Integration with Backend

To enable AI-powered responses, set up a backend endpoint that accepts:

**POST /chatbot**
```json
{
  "message": "User's question",
  "sessionId": "unique-session-id",
  "history": [/* recent message history */]
}
```

**Response:**
```json
{
  "response": "AI-generated response"
}
```

## Support

- Email: support@propertechsoftware.com
- Website: https://propertechsoftware.com

## License

Copyright Propertech Software. All rights reserved.
