// ==================== USER TOKEN ====================
function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
}

// ==================== ADMIN TOKEN ====================
function adminGetToken() {
    return localStorage.getItem('adminToken');
}

function adminSetToken(token) {
    localStorage.setItem('adminToken', token);
}

function adminClearToken() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
}

// ==================== KIỂM TRA ĐĂNG NHẬP ====================
// Dùng cho trang User — nếu chưa login thì redirect về login.html
function requireLogin() {
    const token = getToken();
    if (!token) {
        const returnUrl = window.location.pathname;
        window.location.href = 'login.html?returnUrl=' + encodeURIComponent(returnUrl);
        return false;
    }
    return true;
}

// Dùng cho trang Admin — nếu chưa login thì redirect về login.html
function requireAdminLogin() {
    const token = adminGetToken();
    if (!token) {
        window.location.href = '../login.html';
        return false;
    }
    return true;
}

// ==================== ĐĂNG XUẤT ====================
function logout() {
    clearToken();
    window.location.href = 'index.html';
}

function adminLogout() {
    adminClearToken();
    window.location.href = '../login.html';
}
