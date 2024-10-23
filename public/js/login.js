

document.getElementById('loginForm').addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username, 
            password: password, 
        }),
    })
    .then(response => {
        if (response.status === 200) {
            return response.text();
        } else {
            document.getElementById('responseMessage').textContent = 'Hibás felhasználónév vagy jelszó!';
            document.getElementById('responseMessage').style.color = 'red';
        }
    })
    .then(response => {
        if(response)
        window.location.href = response;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseMessage').innerText = 'Sikertelen bejelentkezés. Kérjük, próbálja újra.'; // Hibaüzenet
    });
});
