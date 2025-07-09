// User management and authentication
let currentUser = null;
let users = {}; // In-memory user storage

// Page navigation function
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find and activate the corresponding nav link
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Add fade-in animation
    setTimeout(() => {
        if (selectedPage) {
            selectedPage.classList.add('fade-in');
        }
    }, 10);
}

// Authentication state management
function showAuthenticatedState() {
    const navLinks = document.getElementById('navLinks');
    const userActions = document.getElementById('userActions');
    
    // Show navigation links
    navLinks.classList.remove('hidden');
    
    // Update user actions to show welcome message and logout
    userActions.innerHTML = `
        <span style="color: #666; margin-right: 1rem; font-weight: 500;">Welcome, ${currentUser.name}!</span>
        <button class="btn btn-secondary" onclick="logout()">Logout</button>
    `;
    
    // Show home page after login
    showPage('home');
}

function showUnauthenticatedState() {
    const navLinks = document.getElementById('navLinks');
    const userActions = document.getElementById('userActions');
    
    // Hide navigation links
    navLinks.classList.add('hidden');
    
    // Show login/signup buttons
    userActions.innerHTML = `
        <a href="#" class="btn btn-secondary" onclick="showPage('login')">Login</a>
        <a href="#" class="btn btn-primary" onclick="showPage('signup')">Sign Up</a>
    `;
    
    // Show login page
    showPage('login');
}

// Logout function
function logout() {
    currentUser = null;
    showUnauthenticatedState();
    
    // Clear form data
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    
    // Show success message
    setTimeout(() => {
        alert('You have been logged out successfully!');
    }, 100);
}
// Login function
function login(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple authentication check
    if (users[email] && users[email].password === password) {
        currentUser = users[email];
        showAuthenticatedState();
        
        // Clear form data
        document.getElementById('loginForm').reset();
        
        // Show success message
        setTimeout(() => {
            alert('Login successful!');
        }, 100);
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Load users from localStorage on page load
window.onload = function() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }
    showUnauthenticatedState();
};

// Save users to localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Signup function
function signup(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;

    // Basic validation
    if (!name || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    if (users[email]) {
        alert('An account with this email already exists.');
        return;
    }

    // Register user
    users[email] = { name, email, password };
    saveUsers();

    alert('Signup successful! Please log in.');
    document.getElementById('signupForm').reset();
    showPage('login');
}

// Event listeners for login and signup forms

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', signup);
    }
});