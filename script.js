// Premium X - Interactive Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
            // Trigger initial animations after preloader
            triggerInitialAnimations();
        }, 500);
    }, 2500);

    // Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    navClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Sticky Navigation
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Tilt Effect for Collection Items
    const tiltItems = document.querySelectorAll('[data-tilt]');

    tiltItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });

    // Smooth Scroll for Navigation Links
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

    // Scroll Reveal Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const controls = document.querySelectorAll('.control-btn');
    
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.classList.add('active');
            } else {
                testimonial.classList.remove('active');
            }
        });
        
        controls.forEach((control, i) => {
            if (i === index) {
                control.classList.add('active');
            } else {
                control.classList.remove('active');
            }
        });
    }

    // Initialize first testimonial
    showTestimonial(0);

    // Auto-rotate testimonials
    function startTestimonialRotation() {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    function stopTestimonialRotation() {
        clearInterval(testimonialInterval);
    }

    // Control buttons
    controls.forEach((control, index) => {
        control.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(index);
            stopTestimonialRotation();
            startTestimonialRotation();
        });
    });

    // Pause on hover
    const testimonialSlider = document.getElementById('testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopTestimonialRotation);
        testimonialSlider.addEventListener('mouseleave', startTestimonialRotation);
    }

    startTestimonialRotation();

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObj = {};
        formData.forEach((value, key) => {
            formObj[key] = value;
        });
        
        // Show success message
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#28a745';
        submitBtn.style.color = '#fff';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            contactForm.reset();
        }, 3000);
    });

    // Parallax Effect for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateParallax() {
        if (heroTitle) {
            const scrollY = window.pageYOffset;
            const moveX = (mouseX - window.innerWidth / 2) * 0.03;
            const moveY = (mouseY - window.innerHeight / 2) * 0.03;
            
            heroTitle.style.transform = `translateY(${scrollY * 0.3}px) translateX(${moveX}px)`;
        }
        
        requestAnimationFrame(animateParallax);
    }

    animateParallax();

    // Pen model hover rotation
    const penModel = document.getElementById('pen-model');
    const modelContainer = document.querySelector('.model-viewer-container');
    
    if (penModel && modelContainer) {
        modelContainer.addEventListener('mousemove', (e) => {
            const rect = modelContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            penModel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        modelContainer.addEventListener('mouseleave', () => {
            penModel.style.transform = '';
        });
    }

    // Add gold line animation to section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'titleReveal 0.8s ease forwards';
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => titleObserver.observe(title));

    // Staggered animation for collection items
    const collectionItems = document.querySelectorAll('.collection-item');
    collectionItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // Staggered animation for steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Trigger initial animations for elements already in view
function triggerInitialAnimations() {
    const elementsInView = document.querySelectorAll('.animate-on-scroll');
    elementsInView.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        }
    });
}

// Add keyframe animation for section titles
const style = document.createElement('style');
style.textContent = `
    @keyframes titleReveal {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .section-title {
        opacity: 0;
    }
    
    .section-title.visible,
    .section-title[style*="titleReveal"] {
        opacity: 1;
    }
`;
document.head.appendChild(style);