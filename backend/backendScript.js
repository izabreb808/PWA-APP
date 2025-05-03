// script.js

const apiUrl = 'http://localhost:3000/api/users';

const createUser = async (username, password) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data.message); // Komunikat z serwera
    } catch (error) {
        console.error('Błąd podczas tworzenia użytkownika:', error);
    }
};

const register = () => {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    if (username && password) {
        createUser(username, password);
    } else {
        alert('Proszę wypełnić wszystkie pola.');
    }
}