// Dummy Data
const coaches = [
    {
        id: 'coach1',
        name: 'Ricky Hartono',
        experience: '8 years',
        specialty: 'Beginner & Technique',
        rating: 4.9,
        price: 'Rp 250.000',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
    },
    {
        id: 'coach2',
        name: 'Sari Wijaya',
        experience: '12 years',
        specialty: 'Advanced & Competition',
        rating: 5.0,
        price: 'Rp 350.000',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
        id: 'coach3',
        name: 'Budi Santoso',
        experience: '10 years',
        specialty: 'Intermediate & Fitness',
        rating: 4.8,
        price: 'Rp 300.000',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    }
];

const scheduleData = [
    {
        time: '08:00 AM',
        coach: 'Ricky Hartono',
        level: 'Beginner',
        slots: '8/10',
        price: 'Rp 150.000'
    },
    {
        time: '10:00 AM',
        coach: 'Sari Wijaya',
        level: 'Intermediate',
        slots: '5/10',
        price: 'Rp 175.000'
    },
    {
        time: '06:00 PM',
        coach: 'Budi Santoso',
        level: 'Advanced',
        slots: '3/10',
        price: 'Rp 200.000'
    }
];

const buddies = [
    {
        name: 'Dina P.',
        level: 'Intermediate',
        location: 'GOR Senayan',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
        name: 'Rudi K.',
        level: 'Advanced',
        location: 'GOR Rawamangun',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const bookingForm = document.getElementById('bookingForm');
const availableSlots = document.getElementById('availableSlots');
const bookBtn = document.getElementById('bookBtn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Render dynamic content
    renderSchedule();
    renderCoaches();
    renderBuddies();

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Booking form
    bookingForm.addEventListener('submit', handleBooking);
    document.getElementById('bookingDate').valueAsDate = new Date();
});

// Mobile Navbar
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scroll
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    navMenu.classList.remove('active');
}

window.scrollToBooking = () => scrollToSection('classes');
window.scrollToCoaches = () => scrollToSection('coaches');

// Render Functions
function renderSchedule() {
    const scheduleGrid = document.getElementById('scheduleGrid');
    scheduleGrid.innerHTML = scheduleData.map(item => `
        <div class="schedule-card">
            <h4>${item.time}</h4>
            <p><strong>Coach:</strong> ${item.coach}</p>
            <p><strong>Level:</strong> ${item.level}</p>
            <p><strong>Slots:</strong> ${item.slots}</p>
            <p class="price">${item.price}</p>
            <button class="btn-primary" onclick="bookClass('${item.time}')">Book Now</button>
        </div>
    `).join('');
}

function renderCoaches() {
    const coachesGrid = document.getElementById('coachesGrid');
    coachesGrid.innerHTML = coaches.map(coach => `
        <div class="coach-card">
            <div class="coach-avatar">
                <img src="${coach.image}" alt="${coach.name}">
            </div>
            <div class="coach-info">
                <h3 class="coach-name">${coach.name}</h3>
                <div class="coach-specialty">${coach.specialty}</div>
                <div class="coach-rating">
                    <div class="stars">${'★'.repeat(Math.floor(coach.rating))}${coach.rating % 1 !== 0 ? '☆' : ''}</div>
                    <span>(${coach.rating})</span>
                </div>
                <div class="coach-price">${coach.price}/session</div>
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                    <button class="btn-primary" style="flex: 1;">Book Coach</button>
                    <button class="btn-secondary" style="flex: 1;">Profile</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderBuddies() {
    const buddiesGrid = document.getElementById('buddiesGrid');
    buddiesGrid.innerHTML = buddies.map(buddy => `
        <div class="coach-card" style="max-width: 320px;">
            <div class="coach-avatar" style="height: 200px;">
                <img src="${buddy.image}" alt="${buddy.name}">
            </div>
            <div class="coach-info">
                <h3>${buddy.name}</h3>
                <p><strong>Level:</strong> ${buddy.level}</p>
                <p><strong>Location:</strong> ${buddy.location}</p>
                <div class="coach-rating">
                    <div class="stars">${'★'.repeat(Math.floor(buddy.rating))}${buddy.rating % 1 !== 0 ? '☆' : ''}</div>
                </div>
                <button class="btn-primary" style="width: 100%; margin-top: 1rem;">Send Request</button>
            </div>
        </div>
    `).join('');
}

// Booking System
let currentSlots = 8;
let maxSlots = 10;

function updateSlots() {
    availableSlots.textContent = `${currentSlots}/${maxSlots}`;
    if (currentSlots === 0) {
        bookBtn.textContent = 'Class Full';
        bookBtn.disabled = true;
        bookBtn.style.opacity = '0.6';
    }
}

function handleBooking(e) {
    e.preventDefault();
    
    if (currentSlots === 0) {
        showNotification('Class is full! Join waitlist?', 'warning');
        return;
    }

    const formData = new FormData(bookingForm);
    const bookingData = Object.fromEntries(formData);
    
    showBookingModal(bookingData);
    currentSlots--;
    updateSlots();
}

function bookClass(time) {
    showNotification(`Booking class at ${time}...`, 'success');
    // Simulate booking
    setTimeout(() => {
        showBookingModal({ time });
    }, 500);
}

function showBookingModal(data) {
    const modal = document.getElementById('bookingModal');
    const content = document.getElementById('bookingModalContent');
    
    content.innerHTML = `
        <h3>Booking Confirmation</h3>
        <div style="background: var(--gray-100); padding: 2rem; border-radius: 15px; margin: 2rem 0;">
            <p><strong>Date:</strong> ${data.date || new Date().toLocaleDateString('id-ID')}</p>
            <p><strong>Time:</strong> ${data.time || '10:00 AM'}</p>
            <p><strong>Coach:</strong> ${data.coach || 'Ricky Hartono'}</p>
            <p><strong>Level:</strong> ${data.level || 'Beginner'}</p>
            <p><strong>Location:</strong> ${data.location || 'GOR Senayan'}</p>
            <hr style="margin: 1.5rem 0;">
            <div style="text-align: right;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-green); margin-bottom: 1rem;">
                    Total: Rp 150.000
                </div>
            </div>
        </div>
        <h4>Payment Method</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
            <button class="btn-primary" onclick="processPayment('QRIS')">
                <i class="fas fa-qrcode"></i> QRIS
            </button>
            <button class="btn-primary" onclick="processPayment('GoPay')">
                <i class="fab fa-get-pocket"></i> GoPay
            </button>
            <button class="btn-primary" onclick="processPayment('OVO')">
                <i class="fas fa-wallet"></i> OVO
            </button>
            <button class="btn-secondary" onclick="processPayment('Bank Transfer')">
                <i class="fas fa-university"></i> Bank Transfer
            </button>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button class="btn-secondary" onclick="closeModal('bookingModal')">Cancel</button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Modal Functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function showSignupModal() {
    document.getElementById('signupModal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    navMenu.classList.remove('active');
}

// Close modals on outside click
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function processPayment(method) {
    showNotification(`Processing payment via ${method}...`, 'success');
    setTimeout(() => {
        showNotification('Payment successful! Check your email for confirmation.', 'success');
        closeModal('bookingModal');
        // Reset form
        bookingForm.reset();
        currentSlots = 8;
        updateSlots();
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        ${message}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--green-light)' : type === 'warning' ? '#FF9800' : 'var(--primary-green)'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: var(--shadow);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.dataset.theme = 'dark';
}

// Filter functionality
document.addEventListener('change', function(e) {
    if (e.target.id.includes('booking')) {
        // Update price based on selection
        const level = document.getElementById('bookingLevel').value;
        const coach = document.getElementById('bookingCoach').value;
        let price = 150000;
        
        if (level === 'advanced') price += 50000;
        if (coach === 'coach2') price += 25000;
        
        document.querySelector('.price').textContent = `Rp ${price.toLocaleString()}`;
    }
});

// Leaderboard simulation
function updateLeaderboard() {
    // Simulate real-time updates
    console.log('Leaderboard updated');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.schedule-card, .coach-card, .pricing-card, .dashboard-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Auto-update slots every 30 seconds (simulation)
setInterval(() => {
    if (currentSlots > 0 && Math.random() > 0.7) {
        currentSlots--;
        updateSlots();
    }
}, 30000);

// Initialize slots
updateSlots();

// ================================
// HANYA BISA BOOKING SABTU & MINGGU
// ================================

const bookingDate = document.getElementById("bookingDate");

bookingDate.addEventListener("change", function () {

    const selectedDate = new Date(this.value);

    // 0 = Minggu
    // 6 = Sabtu
    const day = selectedDate.getDay();

    if (day !== 0 && day !== 6) {

        alert("Booking hanya tersedia pada hari Sabtu dan Minggu!");

        this.value = "";

    }

});