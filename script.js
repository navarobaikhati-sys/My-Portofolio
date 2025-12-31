// Magnetic Cursor Effect
const cursor = document.querySelector('.magnetic-cursor');

if (cursor && window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        // Smooth follow effect
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        
        requestAnimationFrame(updateCursor);
    }
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Start animation
    updateCursor();
}

// Mobile Navigation Menu
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    if (!burger || !nav) return;
    
    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');
        
        // Burger animation
        burger.classList.toggle('toggle');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('nav-active')) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        
        // Animate links with staggered delay
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1 + 0.3}s`;
            }
        });
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('no-scroll');
            
            // Reset link animations
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('nav-active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.classList.remove('no-scroll');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
}

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll("section");
    
    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            section.classList.add("active");
        } else {
            // Optional: uncomment if you want sections to hide when scrolling up
            // section.classList.remove("active");
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav && nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    document.body.classList.remove('no-scroll');
                }
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    navSlide();
    
    // Animate skills on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    function animateSkills() {
        skillItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                item.style.animation = `skillItemAppear 0.6s ease forwards ${index * 0.1 + 0.3}s`;
            }
        });
    }
    
    // Trigger initial animation
    setTimeout(animateSkills, 300);
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkills);
    

    // Initial reveal check
    reveal();
    
    // Add scroll listener for reveal animations
    window.addEventListener("scroll", reveal);
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Add click effect to contact button
    const contactBtn = document.querySelector('#contact button');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            contactBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                contactBtn.style.transform = '';
                alert('Thank you for your interest! This is a demo contact button.');
            }, 150);
        });
    }
});

// Performance optimization with debounce
function debounce(func, wait = 20) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
    };
}

// Handle resize events
window.addEventListener('resize', debounce(() => {
    reveal();
}, 100));

// Add touch support for mobile
document.addEventListener('touchstart', () => {}, {passive: true});
