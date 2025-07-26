// Create and inject the navbar
function createNavbar() {
    const navbar = `
        <div class="nav-container">
            <nav>
                <div class="logo">AD</div>
                <ul class="nav-links">
                    <li><a href="./index.html" id="nav-home">Home</a></li>
                    <li><a href="./index.html#about" id="nav-about">About</a></li>
                    <li><a href="./index.html#projects" id="nav-projects">Projects</a></li>
                    <li><a href="./contact.html" id="nav-contact">Contact</a></li>
                </ul>
                <div class="theme-toggle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                </div>
            </nav>
        </div>
        <div class="progress-bar"></div>
    `;

    // Create a container for the navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = navbar;

    // Insert at the beginning of the body
    document.body.insertBefore(navbarContainer, document.body.firstChild);

    // Handle scroll events
    const nav = document.querySelector('.nav-container');
    let lastScroll = 0;
    const maxScroll = 200; // Increased scroll range for smoother transition
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        // More granular scroll progress calculation
        const scrollProgress = Math.min(currentScroll / maxScroll, 1);
        
        // Apply the scroll progress smoothly
        requestAnimationFrame(() => {
            nav.style.setProperty('--scroll-progress', scrollProgress);
            
            if (currentScroll > 0) {
                nav.classList.add('has-scrolled');
            } else {
                nav.classList.remove('has-scrolled');
            }
        });
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Helper to set nav-dot for active link
    function setActiveNavDot(linkId) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            link.innerHTML = link.textContent;
        });
        const activeLink = document.getElementById(linkId);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.innerHTML = `<span class="nav-dot"></span>${activeLink.textContent}`;
        }
    }

    // Set active state based on current page/section
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash;
        if (currentPage === 'index.html') {
            // Section-based highlighting
            let found = false;
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.scrollY;
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (!found && scrollY >= sectionTop && scrollY < sectionBottom) {
                    found = true;
                    if (section.id === 'about') {
                        setActiveNavDot('nav-about');
                    } else if (section.id === 'projects') {
                        setActiveNavDot('nav-projects');
                    } else {
                        setActiveNavDot('nav-home');
                    }
                }
            });
            if (!found) setActiveNavDot('nav-home');
        } else if (currentPage === 'contact.html') {
            setActiveNavDot('nav-contact');
        }
    }

    // Initial highlight
    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('hashchange', updateActiveNav);

    // Also update on nav click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', e => {
            // For hash links, smooth scroll and update
            const href = link.getAttribute('href');
            const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
            if (href === './index.html' || href === 'index.html') {
                // Always go to home page
                window.location.href = 'index.html';
                return;
            }
            if (href === './contact.html' || href === 'contact.html') {
                // Always go to contact page
                window.location.href = 'contact.html';
                return;
            }
            if (href.includes('#about') || href.includes('#projects')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                if (isHome) {
                    // On home, smooth scroll
                    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                    setTimeout(updateActiveNav, 400);
                } else {
                    // Not on home, go to home and scroll after load
                    window.location.href = `index.html#${targetId}`;
                }
            }
        });
    });

    // If landing on home with a hash, scroll to section after load
    if ((window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') && window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        setTimeout(() => {
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    // Set active for contact page on load
    if (window.location.pathname.endsWith('contact.html')) {
        setActiveNavDot('nav-contact');
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', createNavbar); 