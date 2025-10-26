let currentStatus = 'safe';

document.addEventListener('DOMContentLoaded', function() {
  if (window.authManager && window.authManager.isAuthenticated()) {
    const user = window.authManager.getCurrentUser();
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay && user) {
      userDisplay.textContent = user;
    }
  }

  generateRandomStats();
  updateStatusButtons();
});

function setStatus(status) {
  currentStatus = status;
  updateStatusButtons();

  const statusBadge = document.getElementById('statusBadge');
  if (status === 'safe') {
    statusBadge.className = 'badge bg-success fs-6';
    statusBadge.textContent = 'System Status: UP - Safe Mode';
  } else {
    statusBadge.className = 'badge bg-danger fs-6';
    statusBadge.textContent = 'System Status: UP - Danger Mode';
  }
}

function updateStatusButtons() {
  const safeBtn = document.getElementById('safeBtn');
  const dangerBtn = document.getElementById('dangerBtn');

  if (currentStatus === 'safe') {
    safeBtn.classList.add('active');
    dangerBtn.classList.remove('active');
  } else {
    dangerBtn.classList.add('active');
    safeBtn.classList.remove('active');
  }
}

function generateRandomStats() {
  document.getElementById('crimeReports').textContent = Math.floor(Math.random() * 15) + 1;
  document.getElementById('emergencyCalls').textContent = Math.floor(Math.random() * 8) + 1;
  document.getElementById('safetyScore').textContent = Math.floor(Math.random() * 30) + 70;
  document.getElementById('activeAlerts').textContent = Math.floor(Math.random() * 5);
}

function refreshStats() {
  generateRandomStats();

  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Refreshing...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }, 1000);
}
