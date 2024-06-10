document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const loggedInForm = document.getElementById('loggedInForm');

    const users = [];

    const showNotification = (message) => {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    };

    document.getElementById('register').addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
        document.querySelector('.sign-up-container').style.zIndex = '5';
        document.querySelector('.forgot-password-container').style.zIndex = '1';
    });

    document.getElementById('backToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('right-panel-active');
        document.querySelector('.sign-up-container').style.zIndex = '1';
        document.querySelector('.forgot-password-container').style.zIndex = '1';
    });

    document.getElementById('forgotPassword').addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
        document.querySelector('.sign-up-container').style.zIndex = '1';
        document.querySelector('.forgot-password-container').style.zIndex = '5';
    });

    document.getElementById('backToLoginFromForgot').addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('right-panel-active');
        document.querySelector('.forgot-password-container').style.zIndex = '1';
        document.querySelector('.sign-up-container').style.zIndex = '1';
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            showNotification('Login realizado com sucesso!');
            container.classList.add('logged-in');
        } else {
            showNotification('Email ou senha incorretos!');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        if (users.some(user => user.email === email)) {
            showNotification('Email já cadastrado!');
            return;
        }

        users.push({ name, email, password });
        console.log('Usuários cadastrados:', users);
        showNotification('Cadastro realizado com sucesso!');
        container.classList.remove('right-panel-active');
        document.querySelector('.sign-up-container').style.zIndex = '1';
        document.querySelector('.forgot-password-container').style.zIndex = '1';
    });

    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotPasswordEmail').value;
        const user = users.find(user => user.email === email);

        if (user) {
            showNotification('Instruções para recuperação de senha foram enviadas para o seu email.');
        } else {
            showNotification('Email não encontrado!');
        }
    });

    document.getElementById('logoutButton').addEventListener('click', () => {
        container.classList.remove('logged-in');
        showNotification('Você deslogou com sucesso!');
    });

    document.getElementById('deleteAccountButton').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const index = users.findIndex(user => user.email === email);

        if (index !== -1) {
            users.splice(index, 1);
            console.log('Usuários cadastrados:', users);
            container.classList.remove('logged-in');
            showNotification('Conta apagada com sucesso!');
        } else {
            showNotification('Erro ao apagar conta!');
        }
    });
});
