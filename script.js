/**
 * VIBE CODE - Premium Portfolio JavaScript
 * A comprehensive interactive experience
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initStarfield();
    initFloatingElements();
    initNavigation();
    initCounters();
    initTypewriter();
    initCustomCursor();
    initThemeToggle();
    initScrollAnimations();
    initSkillsFilter();
    initProjectsFilter();
    initContactForm();
    initBackToTop();
    initParallaxEffects();
    initIntersectionObserver();
    initHeroOrb();
    initSmoothScroll();
    initMobileMenu();
    
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
});

// ============================================
// STARFIELD BACKGROUND
// ============================================

function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 100;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Star class
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.twinkle = Math.random() * 1000;
        }
        
        update() {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
            this.twinkle += 0.1;
        }
        
        draw() {
            const theme = document.documentElement.getAttribute('data-theme');
            const color = theme === 'light' ? '#6366f1' : '#ffffff';
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = this.opacity * (0.5 + 0.5 * Math.sin(this.twinkle));
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create stars
    function createStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme !== 'light') {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.05)');
            gradient.addColorStop(1, 'rgba(236, 72, 153, 0.05)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Draw and update stars
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        createStars();
    });
    
    // Initialize
    resizeCanvas();
    createStars();
    animate();
}

// ============================================
// FLOATING ELEMENTS
// ============================================

function initFloatingElements() {
    const container = document.getElementById('floatingElements');
    if (!container) return;
    
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        createFloatingElement(container);
    }
}

function createFloatingElement(container) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    // Random properties
    const size = Math.random() * 100 + 50;
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 20 + 15;
    
    element.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    container.appendChild(element);
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll effect for navbar
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                const hamburger = document.getElementById('hamburger');
                if (mobileMenu && hamburger) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// ============================================
// COUNTERS
// ============================================

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// TYPEWRITER EFFECT
// ============================================

function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--primary)';
        
        let i = 0;
        const typeSpeed = 50;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, typeSpeed);
            }
        }
        
        // Start typing with delay
        setTimeout(type, 1000);
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower follows with delay
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .testimonial-card, .social-link');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
        });
    });
    
    // Hide cursor on touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

// ============================================
// THEME TOGGLE
// ============================================

function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Toggle theme
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const moonIcon = toggle.querySelector('.fa-moon');
        const sunIcon = toggle.querySelector('.fa-sun');
        
        if (moonIcon && sunIcon) {
            if (newTheme === 'light') {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        }
        
        // Recreate starfield for theme change
        const canvas = document.getElementById('starfield');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
    
    // Set initial icon state
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const moonIcon = toggle.querySelector('.fa-moon');
    const sunIcon = toggle.querySelector('.fa-sun');
    
    if (moonIcon && sunIcon) {
        if (currentTheme === 'light') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .skill-card, .project-card, .testimonial-card, .about-image-card, .about-content, .contact-info, .contact-form-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ============================================
// SKILLS FILTER
// ============================================

function initSkillsFilter() {
    const tabs = document.querySelectorAll('.skill-tab');
    const cards = document.querySelectorAll('.skill-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            // Filter cards
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// PROJECTS FILTER
// ============================================

function initProjectsFilter() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            // Filter cards
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.filter === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset grid for featured items
            if (filter === 'all') {
                const featured = document.querySelector('.project-card.featured');
                if (featured && window.innerWidth > 768) {
                    featured.style.gridColumn = 'span 2';
                }
            }
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'var(--gradient-6)';
        
        // Reset form
        setTimeout(() => {
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
    
    // Input focus effects
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ============================================
// BACK TO TOP
// ============================================

function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    const codeSnippet = document.querySelector('.code-snippet');
    
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        // Parallax for hero elements
        if (scrolled < heroHeight) {
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            if (codeSnippet) {
                codeSnippet.style.transform = `perspective(1000px) rotateY(${scrolled * 0.1}deg) rotateX(${scrolled * 0.1}deg) translateY(${scrolled * 0.2}px)`;
            }
        }
    });
}

// ============================================
// INTERSECTION OBSERVER
// ============================================

function initIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);
    
    // Observe all hidden elements
    document.querySelectorAll('.hidden').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// HERO ORB ANIMATION
// ============================================

function initHeroOrb() {
    const orb = document.getElementById('heroOrb');
    if (!orb) return;
    
    // Mouse move effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orb.style.transform = `translate(${(x - 0.5) * 50}px, ${(y - 0.5) * 50}px)`;
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');
        if (mobileMenu && hamburger) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => observer.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ============================================
// TOUCH SUPPORT
// ============================================

// Add touch support for hover effects
function initTouchSupport() {
    const touchElements = document.querySelectorAll('[data-hover]');
    
    touchElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.classList.add('hover');
        });
        
        el.addEventListener('touchend', () => {
            el.classList.remove('hover');
        });
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log(`
%c Vibe Code Portfolio %c

Built with passion and precision.

%c Interested in collaborating? %c
contact@vibecode.dev

%c Technologies: %c HTML5, CSS3, JavaScript, React, Vue, Node.js

`, 
'background: linear-gradient(135deg, #6366f1, #ec4899); color: #fff; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
'',
'color: #6366f1; font-weight: bold;',
'',
'color: #6366f1; font-weight: bold;',
'color: #ec4899;'
);

// ============================================
// SERVICE WORKER REGISTRATION (PWA Ready)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added for offline capabilities
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ============================================
// PREVENT RIGHT-CLICK (Optional - Commented out)
// ============================================

// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ============================================
// FINAL INITIALIZATION
// ============================================

// Run additional initializations
initLazyLoading();
initTouchSupport();
