// Mobile Menu Functionality
const mobileMenuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    mobileMenuButton.querySelector('i').classList.toggle('fa-bars');
    mobileMenuButton.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuButton.querySelector('i').classList.add('fa-bars');
        mobileMenuButton.querySelector('i').classList.remove('fa-times');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Form Submission Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Mulțumim pentru mesaj! Vom reveni cu un răspuns în curând.');
        this.reset();
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    let lastScroll = 0;
    let isMouseNearTop = false;

    // Function to handle mouse movement
    function handleMouseMove(e) {
        const mouseY = e.clientY;
        isMouseNearTop = mouseY <= 100;
        updateNavbarVisibility();
    }

    // Function to handle scroll
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        const isScrollingUp = currentScroll < lastScroll;
        lastScroll = currentScroll;

        if (isScrollingUp || currentScroll === 0) {
            navbar.classList.add('visible');
        } else if (!isMouseNearTop) {
            navbar.classList.remove('visible');
        }
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Keep header visible when hovering over it
    navbar.addEventListener('mouseenter', () => {
        navbar.classList.add('visible');
    });

    navbar.addEventListener('mouseleave', () => {
        if (!isMouseNearTop && window.pageYOffset > 0) {
            navbar.classList.remove('visible');
        }
    });

    // Function to update active link
    function updateActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSection = null;
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;
            const distance = Math.abs(scrollPosition - sectionMiddle);
            
            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const currentSectionId = currentSection.getAttribute('id');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Handle click on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    document.querySelector('.nav-links').classList.remove('active');
                    document.querySelector('.mobile-menu').classList.remove('active');
                }
                
                targetSection.classList.add('highlight');
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 1000);
            }
        });
    });
    
    // Initial update of active link
    updateActiveLink();

    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinksContainer.contains(event.target) && !mobileMenu.contains(event.target)) {
            navLinksContainer.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Array of image paths - replace with your actual image paths
const images = [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80'
];

let currentIndex = 0;

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize carousel with shuffled images
function initializeCarousel() {
    const shuffledImages = shuffleArray([...images]);
    carouselTrack.innerHTML = '';
    
    shuffledImages.forEach(imagePath => {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Gallery Image';
        img.className = 'carousel-image';
        carouselTrack.appendChild(img);
    });
}

// Update carousel position
function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
}

// Event listeners for buttons
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

// Auto-rotate images every 5 seconds
let autoRotateInterval;

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }, 5000);
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    startAutoRotate();
    
    // Pause auto-rotate when hovering over carousel
    carouselTrack.addEventListener('mouseenter', stopAutoRotate);
    carouselTrack.addEventListener('mouseleave', startAutoRotate);
}); 