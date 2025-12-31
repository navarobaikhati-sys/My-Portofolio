document.addEventListener('DOMContentLoaded', () => {
    // 1. Magnetic Cursor
    const cursor = document.querySelector('.magnetic-cursor');
    if (cursor && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animate() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(animate);
        }
        animate();

        const targets = document.querySelectorAll('a, button, .skill-item, .project-card');
        targets.forEach(t => {
            t.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            t.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 2. Mobile Nav
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // 3. Scroll Reveal & Highlight Trigger
    const observerOptions = {
        threshold: 0.25 // Memulai animasi saat 25% section terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu
                nav.classList.remove('nav-active');
            }
        });
    });
});
