// Sprawdzanie stanu zalogowania (można przechowywać w Local Storage)
const isLoggedIn = () => {
    return localStorage.getItem('loggedIn') === 'true';
};

// Logowanie
const login = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Tutaj można dodać logikę walidacji użytkownika
    if (username === 'admin' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        showDashboard();
    } else {
        alert('Nieprawidłowa nazwa użytkownika lub hasło.');
    }
};

// Wylogowywanie
const logout = () => {
    localStorage.removeItem('loggedIn');
    showLoginPage();
};

// Pokaż ekran logowania
const showLoginPage = () => {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
};

// Pokaż główny dashboard
const showDashboard = () => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
};

// Sprawdź stan zalogowania przy załadowaniu strony
window.onload = () => {
    if (isLoggedIn()) {
        showDashboard();
    } else {
        showLoginPage();
    }
};
