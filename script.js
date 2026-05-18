document.addEventListener('DOMContentLoaded', () => {
    /* ======= PRELOADER ======= */
    const preloader = document.getElementById('preloader');
    const introVideo = document.getElementById('intro-video');

    const removePreloader = () => {
        if (!preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }
    };

    // Remove preloader after 3 seconds (syncs with the CSS loading bar animation)
    setTimeout(removePreloader, 3000);

    // Optional: Also hide if the video itself ends (if it's a short intro clip)
    if(introVideo) {
        introVideo.addEventListener('ended', removePreloader);
    }

    /* ======= STICKY NAVBAR ======= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ======= MOBILE MENU TOGGLE ======= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ======= SCROLL ANIMATIONS ======= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Unobserve once animated
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    /* ======= CONTACT FORM HANDLING ======= */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent! (Demo)');
        });
    }
});
