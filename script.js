document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('navButton');
    const logoutButton = document.getElementById('logoutButton');

    // =====================
    // Page load fade-in
    // =====================
    setTimeout(() => {
        document.body.classList.add('visible'); // fade-in when page loads
    }, 50);

    // =====================
    // Login / My Profile / Logout Logic
    // =====================
    function updateNavButtons() {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (user) {
            navButton.textContent = 'My Profile';
            navButton.href = '#';
            logoutButton.style.display = 'inline-block';
        } else {
            navButton.textContent = 'Login';
            navButton.href = 'login.html';
            logoutButton.style.display = 'none';
        }
    }

    logoutButton.addEventListener('click', () => {
        document.body.classList.add('fade-out'); // fade-out before logout

        setTimeout(() => {
            localStorage.removeItem('loggedInUser');
            updateNavButtons();

            document.body.classList.remove('fade-out');
            document.body.classList.add('visible'); // fade back in
        }, 500);
    });

    updateNavButtons();

    // =====================
    // Fade-out on page refresh / navigation away
    // =====================
    window.addEventListener('beforeunload', (e) => {
        // Add fade-out class so browser triggers transition
        document.body.classList.add('fade-out');

        // Note: Most browsers ignore the delay for beforeunload, but transition will start
    });

    // =====================
    // Tag Filter Logic
    // =====================
    const buttons = document.querySelectorAll(".filters .tags button:not(#clearFilters)");

    buttons.forEach((btn, index) => {
        const storageKey = `tagButton_${index}`;
        if (localStorage.getItem(storageKey) === "true") btn.classList.add("active");

        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            localStorage.setItem(storageKey, btn.classList.contains("active"));
        });
    });

    const clearBtn = document.getElementById("clearFilters");
    clearBtn.addEventListener("click", () => {
        buttons.forEach((btn, index) => {
            btn.classList.remove("active");
            localStorage.setItem(`tagButton_${index}`, false);
        });
    });
});
