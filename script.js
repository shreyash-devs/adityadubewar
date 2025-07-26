// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(300, 300);
document.getElementById('bim-model').appendChild(renderer.domElement);

// Create a simple building structure
function createBuilding() {
    const geometry = new THREE.BoxGeometry(2, 4, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0x4CAF50 });
    const building = new THREE.Mesh(geometry, material);
    
    // Add some details
    const roof = new THREE.ConeGeometry(1.5, 1, 4);
    const roofMesh = new THREE.Mesh(roof, material);
    roofMesh.position.y = 2.5;
    building.add(roofMesh);
    
    return building;
}

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Add building to scene
const building = createBuilding();
scene.add(building);

// Position camera
camera.position.z = 8;

// Animation
function animate() {
    requestAnimationFrame(animate);
    building.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Start animation
animate();

// Loading screen logic - only show on initial site load
function showLoadingAnimationIfNeeded() {
    if (sessionStorage.getItem('modelAnimationShown')) {
        // Hide the loading screen immediately if already shown in this session
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.querySelector('.main-content');
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainContent) mainContent.classList.remove('hidden');
        return;
    }
    
    // Show the animation as normal, then set the flag
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        const mainContent = document.querySelector('.main-content');
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (mainContent) mainContent.classList.remove('hidden');
        sessionStorage.setItem('modelAnimationShown', 'true');
    }, 2000);
}

// Handle active navigation state
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

function setActiveNavLink() {
    const currentScroll = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            const targetId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.nav-container');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// Progress bar functionality
const progressBar = document.querySelector('.progress-bar');
let progress = 0;

function updateProgress() {
    progress += (100 - progress) * 0.1;
    progressBar.style.width = `${progress}%`;

    if (progress < 99.9) {
        requestAnimationFrame(updateProgress);
    } else {
        setTimeout(() => {
            progressBar.style.width = '0%';
            progress = 0;
        }, 200);
    }
}

// Handle page transitions
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Don't handle hash links with special transition
        if (href.startsWith('#')) return;
        
        e.preventDefault();
        progress = 0;
        progressBar.style.width = '0%';
        updateProgress();

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});

// Show progress bar on page load
window.addEventListener('load', () => {
    progress = 0;
    progressBar.style.width = '0%';
    requestAnimationFrame(updateProgress);
});

// Experience Section Animation
// const experienceItems = document.querySelectorAll('.experience-item');
// const timelineLine = document.querySelector('.timeline-line');
// const sparkleDot = document.querySelector('.sparkle-dot');

// function updateTimeline() {
//     const scrollPosition = window.scrollY;
//     const timelineOffset = document.querySelector('.experience').offsetTop;
//     const timelineHeight = document.querySelector('.timeline').offsetHeight;
    
//     // Calculate the progress of the timeline
//     const progress = Math.min(Math.max((scrollPosition - timelineOffset) / timelineHeight, 0), 1);
    
//     // Update the sparkle dot position
//     const dotPosition = progress * timelineHeight;
//     sparkleDot.style.transform = `translateY(${dotPosition}px)`;
    
//     // Show/hide experience items based on scroll position
//     experienceItems.forEach((item, index) => {
//         const itemOffset = item.offsetTop;
//         const itemProgress = (scrollPosition - timelineOffset - itemOffset + window.innerHeight * 0.8) / (window.innerHeight * 0.8);
        
//         if (itemProgress > 0 && itemProgress < 1) {
//             item.classList.add('visible');
//         }
//     });
// }

// Modern fade-up animation for section titles and project tiles
function revealOnScroll() {
    const fadeUps = document.querySelectorAll('.fade-up');
    const observer = new window.IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    fadeUps.forEach(el => observer.observe(el));
}

// Project slider for first project tile
function initProjectSlider() {
    const slider = document.querySelector('.project-slider');
    if (!slider) return;
    const images = slider.querySelectorAll('.slider-img');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    let current = 0;
    let autoSlide;
    let autoSlideDelay = 3500;
    function showSlide(idx) {
        images.forEach((img, i) => img.classList.toggle('active', i === idx));
        current = idx;
    }
    function nextSlide() {
        showSlide((current + 1) % images.length);
    }
    function prevSlide() {
        showSlide((current - 1 + images.length) % images.length);
    }
    function startAutoSlide() {
        stopAutoSlide();
        autoSlide = setInterval(nextSlide, autoSlideDelay);
    }
    function stopAutoSlide() {
        if (autoSlide) clearInterval(autoSlide);
    }
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 6000);
    });
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        setTimeout(startAutoSlide, 6000);
    });
    showSlide(0);
    startAutoSlide();
}

// Smooth transition to contact page when 'Let's Talk' circular button is clicked
function setupLetsTalkTransition() {
    const letsTalkBtn = document.getElementById('lets-talk-btn');
    const pageTransition = document.getElementById('page-transition');
    if (!letsTalkBtn || !pageTransition) return;
    letsTalkBtn.style.cursor = 'pointer';
    letsTalkBtn.addEventListener('click', function(e) {
        // Get button center position
        const rect = letsTalkBtn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Position the transition circle
        pageTransition.style.left = `${cx}px`;
        pageTransition.style.top = `${cy}px`;
        pageTransition.classList.add('active');
        document.body.classList.add('transitioning');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            window.location.href = 'contact.html';
        }, 1100);
    });
}



// Google Sign-In and Resume Download functionality
function handleCredentialResponse(response) {
    // Decode the JWT token to get user info
    const responsePayload = decodeJwtResponse(response.credential);
    
    // Get user email
    const userEmail = responsePayload.email;
    const userName = responsePayload.name;
    
    console.log("User signed in:", userName, userEmail);
    
    // Download the resume
    downloadResume();
    
    // Send notification email (you'll need to set up EmailJS)
    sendDownloadNotification(userEmail, userName);
}

function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'Aditya_Dubewar_Resume.pdf'; // Make sure this file exists in your root directory
    link.download = 'Aditya_Dubewar_Resume.pdf';
    link.style.display = 'none';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('Resume downloaded successfully!', 'success');
}

function sendDownloadNotification(userEmail, userName) {
    // Initialize EmailJS with your actual User ID
    emailjs.init("mooFcbOB2PLPDcQXJ");
    
    // Send email notification
    const templateParams = {
        user_email: userEmail,
        user_name: userName,
        download_date: new Date().toLocaleString(),
        to_email: 'shreyashdubewar.dump@gmail.com' // Your email address
    };
    
    // Send the email with your actual Service ID and Template ID
    emailjs.send('service_080906', 'template_1z22ntf', templateParams)
        .then(function(response) {
            console.log('Email notification sent successfully:', response);
        }, function(error) {
            console.log('Failed to send email notification:', error);
        });
    
    console.log(`Resume downloaded by: ${userName} (${userEmail})`);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: 'Syne', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoadingAnimationIfNeeded();
    revealOnScroll();
    initProjectSlider();
    setupLetsTalkTransition();
    
    // Add click handler for resume button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // Trigger Google Sign-In
            google.accounts.id.prompt();
        });
    }
}); 