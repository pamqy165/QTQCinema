// const API_URL = 'http://localhost:5225';
const API_URL = 'https://qtqcinema.onrender.com';

// ==================== HÀM GỌI API CHUNG ====================
async function apiCall(endpoint, method = 'GET', body = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(API_URL + endpoint, options);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Lỗi server');
    return data;
}

// ==================== AUTH ====================
function register(username, fullName, phone, password) {
    return apiCall('/api/auth/register', 'POST', { username, fullName, phone, password });
}

function login(username, password) {
    return apiCall('/api/auth/login', 'POST', { username, password });
}

function adminLogin(username, password) {
    return apiCall('/api/auth/admin/login', 'POST', { username, password });
}

function getProfile() {
    return apiCall('/api/auth/me', 'GET', null, getToken());
}

// ==================== MOVIES ====================
function getMovies() {
    return apiCall('/api/movies');
}

function getMovie(id) {
    return apiCall('/api/movies/' + id);
}

function createMovie(data) {
    return apiCall('/api/movies', 'POST', data, adminGetToken());
}

function updateMovie(id, data) {
    return apiCall('/api/movies/' + id, 'PUT', data, adminGetToken());
}

function deleteMovie(id) {
    return apiCall('/api/movies/' + id, 'DELETE', null, adminGetToken());
}

// ==================== SHOWTIMES ====================
function getShowtimes(movieId) {
    return apiCall('/api/showtimes?movieId=' + movieId);
}

function createShowtime(data) {
    return apiCall('/api/showtimes', 'POST', data, adminGetToken());
}

function deleteShowtime(id) {
    return apiCall('/api/showtimes/' + id, 'DELETE', null, adminGetToken());
}

// ==================== SEATS ====================
function getSeats(showtimeId) {
    return apiCall('/api/seats?showtimeId=' + showtimeId);
}

// ==================== BOOKINGS ====================
function createBooking(showtimeId, seatIds) {
    return apiCall('/api/bookings', 'POST', { showtimeId, seatIds }, getToken());
}

function payBooking(id) {
    return apiCall('/api/bookings/' + id + '/pay', 'PUT', null, getToken());
}

function getMyBookings() {
    return apiCall('/api/bookings/my', 'GET', null, getToken());
}

function getBooking(code) {
    return apiCall('/api/bookings/' + code, 'GET', null, getToken());
}

// ==================== ADMIN ====================
function adminGetMovies() {
    return apiCall('/api/admin/movies', 'GET', null, adminGetToken());
}

function adminGetBookings(movieId = null, date = null) {
    let url = '/api/admin/bookings?';
    if (movieId) url += 'movieId=' + movieId + '&';
    if (date) url += 'date=' + date;
    return apiCall(url, 'GET', null, adminGetToken());
}

function adminGetDashboard() {
    return apiCall('/api/admin/dashboard', 'GET', null, adminGetToken());
}

// ==================== ADMIN USERS ====================
function adminGetUsers(search = '') {
    const url = '/api/admin/users' + (search ? '?search=' + encodeURIComponent(search) : '');
    return apiCall(url, 'GET', null, adminGetToken());
}

function adminGetUser(id) {
    return apiCall('/api/admin/users/' + id, 'GET', null, adminGetToken());
}

function adminToggleUser(id) {
    return apiCall('/api/admin/users/' + id + '/toggle-status', 'PUT', null, adminGetToken());
}

function adminDeleteUser(id) {
    return apiCall('/api/admin/users/' + id, 'DELETE', null, adminGetToken());
}