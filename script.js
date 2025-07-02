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

// Loading screen logic
setTimeout(() => {
    document.querySelector('.loading-screen').style.display = 'none';
    document.querySelector('.main-content').classList.remove('hidden');
}, 2000);

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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // ... other initializations ...
}); 