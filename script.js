document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.getElementById('navButton');
    const profileDropdown = document.getElementById('profileDropdown'); // dropdown container, optional
    const logoutButton = document.getElementById('logoutButton');

    // Fade-in on page load
    setTimeout(() => {
        document.body.classList.add('visible');
    }, 50);

    // Function to update nav button
    function updateNav() {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (user) {
            // Logged in → show My Profile with dropdown
            navButton.textContent = 'My Profile';
            navButton.href = '#';

            // Populate dropdown
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

        } else {
            // Not logged in → show Login button with no dropdown
            navButton.textContent = 'Login';
            navButton.href = 'login.html';

            // Hide or clear dropdown if it exists
            if (profileDropdown) {
                profileDropdown.innerHTML = '';
                profileDropdown.style.display = 'none';
            }
        }
    }

    updateNav();

    // Toggle dropdown only if it exists
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

    // Fade-out on page refresh
    window.addEventListener('beforeunload', () => {
        document.body.classList.add('fade-out');
    });

    // Tag filter logic remains the same...
});
