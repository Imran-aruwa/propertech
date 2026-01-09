// Propertech Chrome Extension - Popup Script

// Production URLs
const API_BASE = 'https://propertechsoftware.com/api';
const APP_BASE = 'https://propertechsoftware.com';

// DOM Elements
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginLoader = document.getElementById('loginLoader');
const errorMessage = document.getElementById('errorMessage');
const openAppBtn = document.getElementById('openAppBtn');
const logoutBtn = document.getElementById('logoutBtn');
const openChatbot = document.getElementById('openChatbot');

// User info elements
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');

// Stats elements
const propertiesCount = document.getElementById('propertiesCount');
const unitsCount = document.getElementById('unitsCount');
const occupancyRate = document.getElementById('occupancyRate');
const pendingPayments = document.getElementById('pendingPayments');

// Links
const dashboardLink = document.getElementById('dashboardLink');
const propertiesLink = document.getElementById('propertiesLink');
const tenantsLink = document.getElementById('tenantsLink');
const paymentsLink = document.getElementById('paymentsLink');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  const authData = await getAuthData();
  if (authData && authData.token) {
    showDashboard(authData);
    loadDashboardData(authData);
  } else {
    showLogin();
  }
});

// Show/Hide sections
function showLogin() {
  loginSection.classList.add('active');
  dashboardSection.classList.remove('active');
}

function showDashboard(authData) {
  loginSection.classList.remove('active');
  dashboardSection.classList.add('active');

  // Update user info
  userAvatar.textContent = authData.user?.full_name?.charAt(0) || 'U';
  userName.textContent = authData.user?.full_name || 'User';
  userRole.textContent = authData.user?.role || 'Owner';

  // Update links based on role
  const role = authData.user?.role || 'owner';
  dashboardLink.href = `${APP_BASE}/${role}`;
  propertiesLink.href = `${APP_BASE}/${role}/properties`;
  tenantsLink.href = `${APP_BASE}/${role}/tenants`;
  paymentsLink.href = `${APP_BASE}/${role}/payments`;
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

// Save auth data
async function saveAuthData(token, user) {
  return new Promise((resolve) => {
    chrome.storage.local.set({
      auth_token: token,
      auth_user: JSON.stringify(user)
    }, resolve);
  });
}

// Clear auth data
async function clearAuthData() {
  return new Promise((resolve) => {
    chrome.storage.local.remove(['auth_token', 'auth_user'], resolve);
  });
}

// Login handler
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showError('Please enter email and password');
    return;
  }

  setLoading(true);
  hideError();

  try {
    const response = await fetch(`${API_BASE}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Login failed');
    }

    // Handle response structure
    const authData = data.data || data;
    const token = authData.access_token;
    const user = {
      id: authData.user_id,
      email: authData.email,
      full_name: authData.full_name,
      role: (authData.role || 'owner').toLowerCase()
    };

    await saveAuthData(token, user);
    showDashboard({ token, user });
    loadDashboardData({ token, user });
  } catch (error) {
    showError(error.message || 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
});

// Load dashboard data
async function loadDashboardData(authData) {
  try {
    const role = authData.user?.role || 'owner';
    const response = await fetch(`${API_BASE}/${role}/dashboard/`, {
      headers: {
        'Authorization': `Bearer ${authData.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const stats = data.data || data;

      propertiesCount.textContent = stats.total_properties || 0;
      unitsCount.textContent = stats.total_units || 0;
      occupancyRate.textContent = `${stats.occupancy_rate || stats.vacancy_rate ? 100 - stats.vacancy_rate : 0}%`;
      pendingPayments.textContent = stats.pending_payments || 0;
    }

    // Load notifications
    loadNotifications(authData);
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
  }
}

// Load notifications
async function loadNotifications(authData) {
  try {
    const response = await fetch(`${API_BASE}/notifications/`, {
      headers: {
        'Authorization': `Bearer ${authData.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const notifications = data.data || data || [];

      const notificationList = document.getElementById('notificationList');
      if (Array.isArray(notifications) && notifications.length > 0) {
        notificationList.innerHTML = notifications.slice(0, 3).map(notif => `
          <div class="notification-item">
            <div class="notification-dot" style="${notif.read ? 'background: #d1d5db;' : ''}"></div>
            <div class="notification-content">
              <div class="notification-title">${notif.title || notif.message}</div>
              <div class="notification-time">${formatTime(notif.created_at)}</div>
            </div>
          </div>
        `).join('');
      }
    }
  } catch (error) {
    console.error('Failed to load notifications:', error);
  }
}

// Format time
function formatTime(dateString) {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Logout handler
logoutBtn.addEventListener('click', async () => {
  await clearAuthData();
  showLogin();
  emailInput.value = '';
  passwordInput.value = '';
});

// Open app button
openAppBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: APP_BASE });
});

// Quick action links
[dashboardLink, propertiesLink, tenantsLink, paymentsLink].forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: link.href });
  });
});

// Open chatbot
openChatbot.addEventListener('click', async () => {
  // Send message to content script to open chatbot
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    chrome.tabs.sendMessage(tab.id, { action: 'openChatbot' });
    window.close();
  } else {
    // Open app with chatbot
    chrome.tabs.create({ url: `${APP_BASE}?chatbot=open` });
  }
});

// Utility functions
function setLoading(loading) {
  loginBtn.disabled = loading;
  loginText.style.display = loading ? 'none' : 'inline';
  loginLoader.style.display = loading ? 'inline-block' : 'none';
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
}

function hideError() {
  errorMessage.classList.remove('show');
}
