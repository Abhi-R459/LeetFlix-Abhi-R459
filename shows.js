document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('navButton');
    const profileDropdown = document.getElementById('profileDropdown'); // dropdown container, optional
    const logoutButton = document.getElementById('logoutButton');

    // =====================
    // Fade-in on page load
    // =====================
    setTimeout(() => {
        document.body.classList.add('visible');
    }, 50);

    // =====================
    // Function to update nav button / dropdown
    // =====================
    function updateNav() {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (user) {
            // Logged in → show My Profile with dropdown
            navButton.textContent = 'My Profile';
            navButton.href = '#';

            if (profileDropdown) {
                profileDropdown.innerHTML = '';
                const logoutItem = document.createElement('a');
                logoutItem.href = "#";
                logoutItem.textContent = 'Logout';
                logoutItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.body.classList.add('fade-out');

                    setTimeout(() => {
                        localStorage.removeItem('loggedInUser');
                        updateNav();
                        document.body.classList.remove('fade-out');
                        document.body.classList.add('visible');
                    }, 500);
                });
                profileDropdown.appendChild(logoutItem);
            }

        } else {
            // Not logged in → show Login button (no dropdown)
            navButton.textContent = 'Login';
            navButton.href = 'login.html';

            if (profileDropdown) {
                profileDropdown.innerHTML = '';
                profileDropdown.style.display = 'none';
            }
        }
    }

    updateNav();

    // =====================
    // Dropdown toggle logic (only if dropdown exists and user is logged in)
    // =====================
    if (profileDropdown) {
        let dropdownOpen = false;

        navButton.addEventListener('click', (e) => {
            if (JSON.parse(localStorage.getItem('loggedInUser'))) {
                e.preventDefault();
                dropdownOpen = !dropdownOpen;
                profileDropdown.style.display = dropdownOpen ? 'block' : 'none';
            }
        });

        navButton.parentElement.addEventListener('mouseenter', () => {
            if (JSON.parse(localStorage.getItem('loggedInUser'))) {
                profileDropdown.style.display = 'block';
            }
        });
        navButton.parentElement.addEventListener('mouseleave', () => {
            if (JSON.parse(localStorage.getItem('loggedInUser'))) {
                profileDropdown.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!navButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                dropdownOpen = false;
                profileDropdown.style.display = 'none';
            }
        });
    }

    // =====================
    // Fade-out on page refresh
    // =====================
    window.addEventListener('beforeunload', () => {
        document.body.classList.add('fade-out');
    });

    // =====================
    // Tag Filter Logic (persistent across reloads)
    // =====================
    const buttons = document.querySelectorAll(".filters .tags button:not(#clearFilters)");

    buttons.forEach((btn, index) => {
        const storageKey = `tagButton_${index}`;

        // Restore previous state
        if (localStorage.getItem(storageKey) === "true") {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }

        // Toggle and save state on click
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            localStorage.setItem(storageKey, btn.classList.contains("active"));
        });
    });

    // "Remove All Filters" button logic
    const clearBtn = document.getElementById("clearFilters");
    clearBtn.addEventListener("click", () => {
        buttons.forEach((btn, index) => {
            btn.classList.remove("active");
            localStorage.setItem(`tagButton_${index}`, "false");
        });
    });
});