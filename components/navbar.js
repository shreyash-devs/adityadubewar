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

    // Set active state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;

    if (currentPage === 'index.html') {
        if (!currentHash) {
            document.getElementById('nav-home').classList.add('active');
            document.getElementById('nav-home').innerHTML = '<span class="nav-dot"></span>Home';
        } else if (currentHash === '#about') {
            document.getElementById('nav-about').classList.add('active');
            document.getElementById('nav-about').innerHTML = '<span class="nav-dot"></span>About';
        } else if (currentHash === '#projects') {
            document.getElementById('nav-projects').classList.add('active');
            document.getElementById('nav-projects').innerHTML = '<span class="nav-dot"></span>Projects';
        }
    } else if (currentPage === 'contact.html') {
        document.getElementById('nav-contact').classList.add('active');
        document.getElementById('nav-contact').innerHTML = '<span class="nav-dot"></span>Contact';
    }

    // Update active state on scroll for index page sections
    if (currentPage === 'index.html') {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    const currentId = section.getAttribute('id');
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        link.innerHTML = link.textContent;
                    });
                    const activeLink = document.querySelector(`a[href="#${currentId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                        activeLink.innerHTML = `<span class="nav-dot"></span>${activeLink.textContent}`;
                    }
                }
            });
        });
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', createNavbar); 