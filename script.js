// Video Model Interaction
let videoElement;
let playPauseBtn;
let resetBtn;

function initVideoModel() {
    videoElement = document.getElementById('model-video');
    playPauseBtn = document.getElementById('play-pause-btn');
    resetBtn = document.getElementById('reset-btn');
    
    if (!videoElement || !playPauseBtn || !resetBtn) return;
    
    // Play/Pause functionality
    playPauseBtn.addEventListener('click', togglePlayPause);
    videoElement.addEventListener('click', togglePlayPause);
    
    // Reset functionality
    resetBtn.addEventListener('click', resetVideo);
    
    // Update button text based on video state
    videoElement.addEventListener('play', updatePlayButton);
    videoElement.addEventListener('pause', updatePlayButton);
    
    // Initialize button state
    updatePlayButton();
    
    // Initialize touch controls
    initTouchControls();
}

function togglePlayPause() {
    if (videoElement.paused) {
        videoElement.play();
    } else {
        videoElement.pause();
    }
}

function resetVideo() {
    videoElement.currentTime = 0;
    videoElement.play();
}

function updatePlayButton() {
    if (videoElement.paused) {
        playPauseBtn.textContent = '▶';
    } else {
        playPauseBtn.textContent = '⏸';
    }
}

// Add keyboard controls
document.addEventListener('keydown', function(e) {
    if (videoElement && document.querySelector('.loading-screen').style.display !== 'none') {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'KeyR':
                e.preventDefault();
                resetVideo();
                break;
        }
    }
});

// Add touch gestures for mobile
let touchStartY = 0;
let touchStartTime = 0;

function initTouchControls() {
    if (!videoElement) return;
    
    videoElement.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    });
    
    videoElement.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        const touchDistance = Math.abs(touchEndY - touchStartY);
        
        // Short tap to play/pause
        if (touchDuration < 200 && touchDistance < 10) {
            togglePlayPause();
        }
    });
}

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
    initVideoModel(); // Initialize video model
    
    // Add click handler for resume button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            // Trigger Google Sign-In
            google.accounts.id.prompt();
        });
    }
}); 



javascript
// Initialize EmailJS
emailjs.init("mooFcbOB2PLPDcQXJ");

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        user_name: document.getElementById('fullName').value,
        user_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        download_date: new Date().toLocaleString(),
        to_email: 'shreyashdubewar.dump@gmail.com'
    };
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.send('service_080906', 'template_ck7tc3p', formData)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            
            // Show success message
            showContactNotification('Message sent successfully!', 'success');
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.log('Failed to send email:', error);
            
            // Show error message
            showContactNotification('Failed to send message. Please try again.', 'error');
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});
