const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
    localStorage.clear();
    location.href = 'login.html';
});