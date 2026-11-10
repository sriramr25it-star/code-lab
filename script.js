/**
 * VIBE CODE - ULTRA 3D PORTFOLIO JAVASCRIPT
 * Next-generation portfolio with 3D graphics, animations, and interactivity
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoadingScreen();
    initThreeJS();
    initNavigation();
    initCounters();
    initCustomCursor();
    initThemeToggle();
    initScrollAnimations();
    initSkillsFilter();
    initProjectsFilter();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initMobileMenu();
    initProfile3D();
    initSkills3D();
    initProject3D();
    initEarth3D();
    
    // Add loaded class for initial animations
    document.body.classList.add('loaded');
});

// ============================================
// LOADING SCREEN
// ============================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingPercent = document.getElementById('loadingPercent');
    
    if (!loadingScreen) return;
    
    let progress = 0;
    const resourcesToLoad = [
        // List all resources that need to load
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    ];
    
    // Simulate loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            loadingPercent.textContent = '100%';
            clearInterval(interval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 500);
        } else {
            loadingPercent.textContent = Math.floor(progress) + '%';
        }
    }, 200);
}

// ============================================
// THREE.JS INITIALIZATION
// ============================================

let scene, camera, renderer, particles = [];

function initThreeJS() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas) return;
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create floating particles background
    createParticleBackground();
    
    // Create floating islands
    createFloatingIslands();
    
    // Animation loop
    animateThreeJS();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createParticleBackground() {
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    const colorOptions = [0x6366f1, 0xec4899, 0x06b6d4, 0x8b5cf6, 0xf59e0b];
    
    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        
        positions.push(x, y, z);
        
        const color = new THREE.Color(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
        colors.push(color.r, color.g, color.b);
    }
    
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

function createFloatingIslands() {
    // Create 3-5 floating islands
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(2 + Math.random() * 3, 0.2, 2 + Math.random() * 3);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(Math.random() * 0x6366f1 + 0x4f46e5),
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const island = new THREE.Mesh(geometry, material);
        
        island.position.x = (Math.random() - 0.5) * 50;
        island.position.y = (Math.random() - 0.5) * 20 - 10;
        island.position.z = (Math.random() - 0.5) * 30 - 10;
        
        island.rotation.x = Math.random() * Math.PI * 0.2 - 0.1;
        island.rotation.y = Math.random() * Math.PI * 0.2 - 0.1;
        island.rotation.z = Math.random() * Math.PI * 0.2 - 0.1;
        
        scene.add(island);
        particles.push(island);
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights
    for (let i = 0; i < 3; i++) {
        const light = new THREE.PointLight(
            new THREE.Color(Math.random() * 0x6366f1 + 0x4f46e5),
            0.5,
            50
        );
        light.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 30
        );
        scene.add(light);
    }
}

function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);
    
    // Rotate particles slowly
    particles.forEach((particle, index) => {
        if (particle instanceof THREE.Mesh) {
            particle.rotation.x += 0.005 * (index % 2 === 0 ? 1 : -1);
            particle.rotation.y += 0.003 * (index % 3 === 0 ? 1 : -1);
            particle.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
        }
    });
    
    // Slowly rotate camera
    camera.position.x = Math.sin(Date.now() * 0.0005) * 2;
    camera.position.y = Math.sin(Date.now() * 0.0003) * 1;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// ============================================
// 3D PROFILE
// ============================================

function initProfile3D() {
    const container = document.getElementById('profile3d');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create a 3D cube as placeholder for profile
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Add light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    });
    resizeObserver.observe(container);
}

// ============================================
// 3D SKILLS
// ============================================

function initSkills3D() {
    const container = document.getElementById('skills3d');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 8;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.prepend(renderer.domElement);
    
    // Create skill cubes
    const skillData = [
        { name: 'HTML5', color: 0xe34f26, position: { x: -3, y: 0, z: 0 } },
        { name: 'CSS3', color: 0x1572b6, position: { x: -1, y: 0, z: 0 } },
        { name: 'JavaScript', color: 0xf7df1e, position: { x: 1, y: 0, z: 0 } },
        { name: 'React', color: 0x61dafb, position: { x: 3, y: 0, z: 0 } },
        { name: 'Three.js', color: 0x000000, position: { x: -2, y: 2, z: 1 } },
        { name: 'TypeScript', color: 0x3178c6, position: { x: 0, y: 2, z: 1 } },
        { name: 'WebGL', color: 0x996600, position: { x: 2, y: 2, z: 1 } }
    ];
    
    const cubes = [];
    
    skillData.forEach((skill, index) => {
        const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
        const material = new THREE.MeshPhongMaterial({
            color: skill.color,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(skill.position.x, skill.position.y, skill.position.z);
        cube.userData = { skill: skill.name, index: index };
        scene.add(cube);
        cubes.push(cube);
    });
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add orbit controls simulation
    let targetX = 0, targetY = 0;
    
    // Mouse move interaction
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        targetX = x * 0.1;
        targetY = y * 0.1;
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate cubes
        cubes.forEach((cube, index) => {
            cube.rotation.x += 0.01 * (index % 2 === 0 ? 1 : -1);
            cube.rotation.y += 0.01 * (index % 3 === 0 ? 1 : -1);
        });
        
        // Slowly rotate the whole scene based on mouse
        scene.rotation.x += (targetY - scene.rotation.x) * 0.05;
        scene.rotation.y += (targetX - scene.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    });
    resizeObserver.observe(container);
}

// ============================================
// 3D PROJECTS
// ============================================

function initProject3D() {
    const containers = document.querySelectorAll('.project-3d-placeholder');
    
    containers.forEach((container, index) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 2;
        
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(200, 150);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        // Create different 3D objects for each project
        let geometry;
        const colors = [0x6366f1, 0xec4899, 0x06b6d4, 0x8b5cf6, 0xf59e0b, 0x10b981];
        
        switch(index % 6) {
            case 0:
                geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
                break;
            case 1:
                geometry = new THREE.SphereGeometry(0.5, 32, 32);
                break;
            case 2:
                geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
                break;
            case 3:
                geometry = new THREE.ConeGeometry(0.5, 1, 32);
                break;
            case 4:
                geometry = new THREE.CylinderGeometry(0.4, 0.4, 0.8, 32);
                break;
            case 5:
                geometry = new THREE.DodecahedronGeometry(0.5);
                break;
        }
        
        const material = new THREE.MeshPhongMaterial({
            color: colors[index % colors.length],
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        // Add light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.02;
            mesh.rotation.y += 0.02;
            renderer.render(scene, camera);
        }
        animate();
    });
}

// ============================================
// 3D EARTH
// ============================================

function initEarth3D() {
    const container = document.getElementById('earth3d');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create Earth (sphere with texture-like appearance)
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create gradient-like material
    const material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec2 vUv;
            void main() {
                vec3 color1 = vec3(0.1, 0.4, 0.8);
                vec3 color2 = vec3(0.2, 0.6, 0.3);
                vec3 color3 = vec3(0.8, 0.6, 0.2);
                
                float mix1 = smoothstep(0.0, 0.5, vUv.y + sin(time * 0.5 + vUv.x * 10.0) * 0.1);
                float mix2 = smoothstep(0.5, 1.0, vUv.y + sin(time * 0.3 + vUv.x * 15.0) * 0.1);
                
                vec3 color = mix(color1, color2, mix1);
                color = mix(color, color3, mix2);
                
                gl_FragColor = vec4(color, 0.9);
            }
        `,
        transparent: true
    });
    
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.1, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 }
        },
        vertexShader: `
            varying vec3 vNormal;
            void main() {
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec3 vNormal;
            void main() {
                float intensity = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                vec3 color = vec3(0.3, 0.6, 1.0) * intensity * 0.5;
                gl_FragColor = vec4(color, 0.3);
            }
        `,
        transparent: true,
        side: THREE.BackSide
    });
    
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        material.uniforms.time.value += 0.01;
        atmosphereMaterial.uniforms.time.value += 0.01;
        
        earth.rotation.y += 0.002;
        
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            const width = entry.contentRect.width;
            const height = entry.contentRect.height;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
    });
    resizeObserver.observe(container);
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
    const hoverElements = document.querySelectorAll('a, button, .skill-card-3d, .project-card, .testimonial-card, .social-link');
    
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
    const animatedElements = document.querySelectorAll('.section-header, .skill-card-3d, .project-card, .testimonial-card, .about-image-card, .about-content, .contact-info, .contact-form-container');
    
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
    const cards = document.querySelectorAll('.skill-card-3d');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            // Filter cards with animation
            cards.forEach((card, index) => {
                if (category === 'all') {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.classList.add('animate-fade-in');
                    }, index * 100);
                } else {
                    if (card.dataset.skill === category || category === 'frontend' || category === 'backend' || category === '3d') {
                        setTimeout(() => {
                            card.style.display = 'block';
                            card.classList.add('animate-fade-in');
                        }, index * 100);
                    } else {
                        card.style.display = 'none';
                    }
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
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
        
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
// CONSOLE MESSAGE
// ============================================

console.log(`
%c Vibe Code 3D Portfolio %c

Built with passion, Three.js, and cutting-edge web technologies.

%c Interested in collaborating? %c
contact@vibecode.dev

%c Technologies: %c HTML5, CSS3, JavaScript, Three.js, WebGL

`, 
'background: linear-gradient(135deg, #6366f1, #ec4899); color: #fff; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;',
'',
'color: #6366f1; font-weight: bold;',
'',
'color: #6366f1; font-weight: bold;',
'color: #ec4899;'
);

// ============================================
// FINAL INITIALIZATION
// ============================================

// Run additional initializations
setTimeout(() => {
    // Add any delayed initializations here
}, 1000);
