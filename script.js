document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // Page load fade-in transition
  // =========================
  document.body.classList.add('loaded');

  // =========================
  // Login / Premium / Logout Button Logic
  // =========================
  const navButton = document.getElementById('navButton');
  const logoutButton = document.getElementById('logoutButton');

  function updateNavButtons() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      navButton.textContent = 'Premium';
      navButton.href = '/premium.html';
      logoutButton.style.display = 'inline-block';
    } else {
      navButton.textContent = 'Login';
      navButton.href = '/LeetFlix-Abhi-R459/login.html';
      logoutButton.style.display = 'none';
    }
  }

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    updateNavButtons();
    window.location.reload();
  });

  updateNavButtons();

  // =========================
  // Tag Filter Logic
  // =========================
  const buttons = document.querySelectorAll(".filters .tags button:not(#clearFilters)");

  buttons.forEach((btn, index) => {
    const storageKey = `tagButton_${index}`;

    if (localStorage.getItem(storageKey) === "true") {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      localStorage.setItem(storageKey, btn.classList.contains("active"));
    });
  });

  // =========================
  // "Remove All Filters" Button Logic
  // =========================
  const clearBtn = document.getElementById("clearFilters");

  clearBtn.addEventListener("click", () => {
    buttons.forEach((btn, index) => {
      btn.classList.remove("active");
      localStorage.setItem(`tagButton_${index}`, false);
    });
  });
});
