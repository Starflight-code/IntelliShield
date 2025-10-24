class AuthManager {
  constructor() {
    this.sessionCookieName = 'intellishield_session';
    this.sessionExpiryDays = 7;
    
    this.testCredentials = { // Over here we have our hardcoded credentials to test the login functionality
      'user': 'testpass'
    };
    
    this.activeSessions = new Map();
    
    this.init();
  }
  
  init() {
    this.checkExistingSession();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
  }
  
  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
  
  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
  
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
  
  isAuthenticated() {
    const sessionId = this.getCookie(this.sessionCookieName);
    if (!sessionId) return false;
    
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      this.deleteCookie(this.sessionCookieName);
      return false;
    }
    
    if (new Date() > new Date(session.expires)) {
      this.activeSessions.delete(sessionId);
      this.deleteCookie(this.sessionCookieName);
      return false;
    }
    
    return true;
  }
  
  getCurrentUser() {
    const sessionId = this.getCookie(this.sessionCookieName);
    if (!sessionId) return null;
    
    const session = this.activeSessions.get(sessionId);
    return session ? session.user : null;
  }
  
  handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.classList.add('d-none');
    
    if (this.validateCredentials(username, password)) {
      this.createSession(username);
      this.redirectAfterLogin();
    } else {
      this.showError('Invalid username or password');
    }
  }
  
  validateCredentials(username, password) {
    return this.testCredentials[username] === password;
  }
  
  createSession(username) {
    const sessionId = this.generateSessionId();
    const expires = new Date();
    expires.setTime(expires.getTime() + (this.sessionExpiryDays * 24 * 60 * 60 * 1000));
    
    this.activeSessions.set(sessionId, {
      user: username,
      created: new Date().toISOString(),
      expires: expires.toISOString()
    });
    
    this.setCookie(this.sessionCookieName, sessionId, this.sessionExpiryDays);
    
    console.log(`Session created for user: ${username}`);
  }
  
  logout() {
    const sessionId = this.getCookie(this.sessionCookieName);
    if (sessionId) {
      this.activeSessions.delete(sessionId);
    }
    this.deleteCookie(this.sessionCookieName);
    window.location.href = 'login.html';
  }
  
  checkExistingSession() {
    if (this.isAuthenticated()) {
      if (window.location.pathname.includes('login.html')) {
        this.redirectAfterLogin();
      }
    } else {
      if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
      }
    }
  }
  
  redirectAfterLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('return');
    
    if (returnUrl) {
      window.location.href = returnUrl;
    } else {
      window.location.href = 'index.html';
    }
  }
  
  showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
  }
  
  requireAuth() {
    if (!this.isAuthenticated()) {
      const currentUrl = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `login.html?return=${currentUrl}`;
      return false;
    }
    return true;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.authManager = new AuthManager();
});

function logout() {
  if (window.authManager) {
    window.authManager.logout();
  }
}
