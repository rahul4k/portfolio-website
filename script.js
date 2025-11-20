document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Staggered Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements for staggered reveal
    const revealElements = document.querySelectorAll('.skill-card, .timeline-item, .edu-card, .section-title');

    revealElements.forEach((el) => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // Add staggered delays to grid items
    const grids = document.querySelectorAll('.skills-grid, .edu-grid, .timeline');
    grids.forEach(grid => {
        const children = grid.querySelectorAll('.reveal-item');
        children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
        });
    });

    // Keep section fade-in for general sections if they don't have specific reveal items
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Check if section has reveal items, if so, don't fade the whole section to avoid double animation
        if (section.querySelectorAll('.reveal-item').length === 0) {
            section.classList.add('reveal-item');
            observer.observe(section);
        }
    });
});
