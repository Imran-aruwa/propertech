# Propertech Chrome Extension

A Chrome extension for quick access to your Propertech property management dashboard with an integrated AI assistant.

## Features

- **Quick Dashboard Access**: View your property stats directly from the browser toolbar
- **Real-time Notifications**: Get notified about payments, maintenance requests, and more
- **AI Assistant**: Chat with the Propertech AI for property management help
- **One-Click Actions**: Quick links to properties, tenants, payments, and more

## Installation (Development)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `chrome-extension` folder

## Installation (Production)

1. Visit the Chrome Web Store
2. Search for "Propertech Assistant"
3. Click "Add to Chrome"

## Publishing to Chrome Web Store

### Prerequisites

1. Create a [Chrome Web Store Developer Account](https://chrome.google.com/webstore/devconsole/) ($5 one-time fee)
2. Prepare promotional images:
   - Icon: 128x128px PNG
   - Small promo tile: 440x280px
   - Large promo tile: 920x680px
   - Screenshots: 1280x800px or 640x400px

### Steps to Publish

1. **Prepare the package**:
   ```bash
   # Create a ZIP file of the extension
   cd chrome-extension
   zip -r propertech-extension.zip . -x "*.git*" -x "README.md"
   ```

2. **Upload to Web Store**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Click "New Item"
   - Upload the ZIP file
   - Fill in the store listing details

3. **Required Information**:
   - Extension name: Propertech Assistant
   - Description (short & detailed)
   - Category: Productivity
   - Privacy policy URL
   - Support URL

4. **Submit for Review**:
   - Google reviews extensions within 1-3 business days
   - Address any feedback from the review team

## Configuration

The extension is pre-configured for production:

```javascript
const API_BASE = 'https://propertechsoftware.com/api';
const APP_BASE = 'https://propertechsoftware.com';
```

For development, update these URLs in `src/popup.js`, `src/background.js`, and `src/content.js`.

## File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html             # Popup UI
├── public/
│   └── icons/             # Extension icons
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       └── icon128.png
└── src/
    ├── popup.js           # Popup logic
    ├── background.js      # Background service worker
    ├── content.js         # Content script (chatbot injection)
    └── content.css        # Content styles
```

## Permissions Explained

- `storage`: Store authentication tokens locally
- `notifications`: Display desktop notifications
- `alarms`: Schedule periodic notification checks
- `activeTab`: Access the current tab for chatbot injection

## Privacy

This extension:
- Only communicates with Propertech servers at propertechsoftware.com
- Stores authentication tokens locally
- Does not collect or share personal data
- Does not track browsing activity

## Support

For issues or feature requests:
- Email: support@propertechsoftware.com
- Website: https://propertechsoftware.com/contact
