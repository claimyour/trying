// Theme Switching Logic
const themes = [
    { primary: '#C71585', secondary: '#FF6347', accent: '#FFF0F5', dark: '#2F0047', lightGray: '#E6E6FA' },
    { primary: '#800080', secondary: '#FF1493', accent: '#F8E1F4', dark: '#4B0082', lightGray: '#E0D2E8' }
];
let currentThemeIndex = 0;

function updateTheme(index) {
    const theme = themes[index];
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--dark', theme.dark);
    document.documentElement.style.setProperty('--light-gray', theme.lightGray);
    document.querySelector('.modal').style.background = `rgba(${parseInt(theme.primary.slice(1,3), 16)}, ${parseInt(theme.primary.slice(3,5), 16)}, ${parseInt(theme.primary.slice(5,7), 16)}, 0.6)`;
    document.querySelectorAll('.trust-badge').forEach(badge => {
        badge.style.background = `rgba(${parseInt(theme.primary.slice(1,3), 16)}, ${parseInt(theme.primary.slice(3,5), 16)}, ${parseInt(theme.primary.slice(5,7), 16)}, 0.2)`;
    });
    document.querySelector('.reviews-section:before').style.background = `rgba(${parseInt(theme.primary.slice(1,3), 16)}, ${parseInt(theme.primary.slice(3,5), 16)}, ${parseInt(theme.primary.slice(5,7), 16)}, 0.1)`;
    document.querySelector('.social-proof').style.background = `rgba(${parseInt(theme.primary.slice(1,3), 16)}, ${parseInt(theme.primary.slice(3,5), 16)}, ${parseInt(theme.primary.slice(5,7), 16)}, 0.1)`;
}

setInterval(() => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    updateTheme(currentThemeIndex);
}, 10000);

// Countdown Timer with Flipping Cards
const targetDate = new Date('March 15, 2025 23:59:59').getTime();
let prevDays = null, prevHours = null, prevMinutes = null, prevSeconds = null;

const updateTimer = () => {
    const now = new Date().getTime();
    const diff = Math.max(targetDate - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    flipCard('days', days, prevDays);
    flipCard('hours', hours, prevHours);
    flipCard('minutes', minutes, prevMinutes);
    flipCard('seconds', seconds, prevSeconds);

    prevDays = days;
    prevHours = hours;
    prevMinutes = minutes;
    prevSeconds = seconds;
};

const flipCard = (id, newValue, prevValue) => {
    const card = document.getElementById(`${id}-card`);
    const front = document.getElementById(`${id}-front`);
    const back = document.getElementById(`${id}-back`);

    const formattedValue = String(newValue).padStart(2, '0');

    if (prevValue === null || newValue !== prevValue) {
        back.textContent = formattedValue;
        card.classList.add('flipping');
        setTimeout(() => {
            front.textContent = formattedValue;
            card.classList.remove('flipping');
        }, 600);
    }
};

updateTimer();
setInterval(updateTimer, 1000);

// Enhanced FAQ Toggle
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.closest('.faq-item');
        faqItem.classList.toggle('active');
    });
});

// Smooth Scroll
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Social Proof Counter with Animation
let claimCount = 3000;
const claimCountElement = document.getElementById('claim-count');

const animateCounter = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
};

setInterval(() => {
    const newCount = claimCount + Math.floor(Math.random() * 5);
    animateCounter(claimCountElement, claimCount, newCount, 1000);
    claimCount = newCount;
}, 5000);

// Enhanced Review Slider
const slider = document.querySelector('.review-slider');
const slides = document.querySelectorAll('.review-card');
const dots = document.querySelectorAll('.slider-dot');
const prevArrow = document.getElementById('prev-slide');
const nextArrow = document.getElementById('next-slide');
let currentSlide = 0;

const updateSlider = () => {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
};

const goToSlide = (index) => {
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    updateSlider();
};

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

prevArrow.addEventListener('click', () => goToSlide(currentSlide - 1));
nextArrow.addEventListener('click', () => goToSlide(currentSlide + 1));

setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

window.addEventListener('resize', updateSlider);
updateSlider();

// Modal with persistent reappearance
const modal = document.getElementById('cta-modal');
const closeModal = document.querySelector('.close-modal');

const showModal = () => {
    modal.classList.add('active');
};

const hideModal = () => {
    modal.classList.remove('active');
    setTimeout(showModal, 5000);
};

setTimeout(showModal, 5000);

closeModal.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Contact Form
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! Our team will respond soon.');
});

// Back-to-Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Section Transitions
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Redirect with Disclosure
(function() {
    function isInAppBrowser() {
        let ua = navigator.userAgent || navigator.vendor || window.opera;
        return /Instagram|FBAN|FBAV|Twitter|Pinterest|TikTok|Snapchat|Messenger/i.test(ua);
    }

    function openInExternalBrowser() {
        if (sessionStorage.getItem("redirected")) return;
        sessionStorage.setItem("redirected", "true");
        alert("For the best experience, we’re redirecting you to an external browser.");
        let url = window.location.href;
        let isAndroid = /Android/i.test(navigator.userAgent);
        let isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isAndroid) {
            window.location.href = "intent://" + url.replace(/^https?:\/\//, "") + "#Intent;scheme=https;package=com.android.chrome;end;";
        } else if (isIOS) {
            setTimeout(() => { window.location.href = url; }, 500);
            window.location.href = "googlechrome://" + url.replace(/^https?:\/\//, "");
        } else {
            window.open(url, "_blank");
        }
    }

    if (isInAppBrowser()) {
        openInExternalBrowser();
    }
})();
