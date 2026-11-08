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
    const revealElements = document.querySelectorAll('.skill-card, .timeline-item, .edu-card, .project-card, .section-title');

    revealElements.forEach((el) => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    // Add staggered delays to grid items
    const grids = document.querySelectorAll('.skills-grid, .edu-grid, .timeline, .projects-grid');
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

    // --- Theme Toggle Functionality ---
    const themeToggleBtn = document.getElementById('theme-toggle');

    const updateThemeUI = (isLight) => {
        if (isLight) {
            document.documentElement.classList.add('light-theme');
            document.body.classList.add('light-theme');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('title', 'Switch to dark theme');
                themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
            }
        } else {
            document.documentElement.classList.remove('light-theme');
            document.body.classList.remove('light-theme');
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('title', 'Switch to light theme');
                themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
            }
        }
    };

    // Determine initial state
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialIsLight = savedTheme ? savedTheme === 'light' : prefersLight;
    updateThemeUI(initialIsLight);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isCurrentlyLight = document.body.classList.contains('light-theme');
            const nextIsLight = !isCurrentlyLight;
            updateThemeUI(nextIsLight);
            localStorage.setItem('theme', nextIsLight ? 'light' : 'dark');
        });
    }

    // Listen for OS theme changes if user hasn't manually selected one
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                updateThemeUI(e.matches);
            }
        });
    }
});
