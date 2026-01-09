// Propertech Chrome Extension - Background Service Worker

// Production URLs
const API_BASE = 'https://propertechsoftware.com/api';
const APP_BASE = 'https://propertechsoftware.com';

// Check for new notifications periodically
chrome.alarms.create('checkNotifications', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'checkNotifications') {
    await checkNotifications();
  }
});

// Check notifications
async function checkNotifications() {
  const authData = await getAuthData();
  if (!authData || !authData.token) return;

  try {
    const response = await fetch(`${API_BASE}/notifications/unread-count/`, {
      headers: {
        'Authorization': `Bearer ${authData.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const count = data.data?.count || data.count || 0;

      // Update badge
      if (count > 0) {
        chrome.action.setBadgeText({ text: count.toString() });
        chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
      } else {
        chrome.action.setBadgeText({ text: '' });
      }
    }
  } catch (error) {
    console.error('Failed to check notifications:', error);
  }
}

// Get stored auth data
async function getAuthData() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['auth_token', 'auth_user'], (result) => {
      if (result.auth_token && result.auth_user) {
        resolve({
          token: result.auth_token,
          user: JSON.parse(result.auth_user)
        });
      } else {
        resolve(null);
      }
    });
  });
}

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getAuthData') {
    getAuthData().then(sendResponse);
    return true; // Keep channel open for async response
  }

  if (message.action === 'saveAuthData') {
    chrome.storage.local.set({
      auth_token: message.token,
      auth_user: JSON.stringify(message.user)
    }, () => sendResponse({ success: true }));
    return true;
  }

  if (message.action === 'clearAuthData') {
    chrome.storage.local.remove(['auth_token', 'auth_user'], () => {
      chrome.action.setBadgeText({ text: '' });
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.action === 'openPropertytech') {
    chrome.tabs.create({ url: APP_BASE });
    sendResponse({ success: true });
    return true;
  }

  if (message.action === 'checkNotifications') {
    checkNotifications().then(() => sendResponse({ success: true }));
    return true;
  }
});

// Listen for tab updates to sync auth state
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.includes('localhost:3000') || tab.url.includes('propertech.co.ke')) {
      // Sync auth state from app to extension
      chrome.tabs.sendMessage(tabId, { action: 'syncAuth' }, (response) => {
        if (chrome.runtime.lastError) return;
        if (response && response.token) {
          chrome.storage.local.set({
            auth_token: response.token,
            auth_user: JSON.stringify(response.user)
          });
          checkNotifications();
        }
      });
    }
  }
});

// Install/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open welcome page or setup
    chrome.tabs.create({ url: `${APP_BASE}/login?from=extension` });
  }
});

// Initial notification check
checkNotifications();
