/* ==========================================
   FUTURISTIC NEON DUST - CONTROLLER JS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initCanvasBackground();
    initTypewriter();
    initConsoleTabs();
    initMobileNav();
    initContactTerminal();
    initScrollReveal();
    initLiveTimers();
});

/* ==========================================
   1. CUSTOM CURSOR GLOW
   ========================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });

    // Handle Project Cards hover glow effect
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================
   2. NEURAL NETWORK CANVAS BACKGROUND
   ========================================== */
function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
            ctx.fill();
        }

        update() {
            // Bounce on boundaries
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;

            this.x += this.vx;
            this.y += this.vy;

            // Mouse interaction (gentle attraction)
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 0.5;
                    this.y += (dy / dist) * force * 0.5;
                }
            }
            this.draw();
        }
    }

    function createParticles() {
        particles = [];
        // Scale particle density with screen width
        const count = Math.floor((width * height) / 11000);
        for (let i = 0; i < count; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            particles.push(new Particle(x, y));
        }
    }

    function connect() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    // Lines fade out as particles drift apart
                    const alpha = (100 - dist) / 100 * 0.15;
                    ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.update());
        connect();
        animationId = requestAnimationFrame(animate);
    }

    createParticles();
    animate();
}

/* ==========================================
   3. TYPEWRITER EFFECT
   ========================================== */
function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (!target) return;

    const titles = [
        "AI ENGINEER.",
        "PhD RESEARCHER.",
        "DATA SCIENTIST.",
        "PROBLEM SOLVER."
    ];
    
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIdx];
        
        if (isDeleting) {
            target.textContent = currentTitle.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            target.textContent = currentTitle.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIdx === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of title
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/* ==========================================
   4. CONSOLE TAB NAVIGATION (SKILLS MATRIX)
   ========================================== */
function initConsoleTabs() {
    const tabs = document.querySelectorAll('.console-tab');
    const displays = document.querySelectorAll('.skill-category-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            
            // Toggle tab active state
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Toggle content display
            displays.forEach(disp => {
                disp.classList.remove('active');
                if (disp.id === `skills-${category}`) {
                    disp.classList.add('active');
                }
            });
        });
    });
}

/* ==========================================
   5. MOBILE MENU TOGGLE
   ========================================== */
function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        const icon = toggle.querySelector('i');
        if (menu.classList.contains('active')) {
            icon.classList.remove('fa-bars-staggered');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars-staggered');
        }
    });

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const icon = toggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars-staggered');
        });
    });
}

/* ==========================================
   6. CONTACT TERMINAL TRANSMISSION CONSOLE
   ========================================== */
function initContactTerminal() {
    const form = document.getElementById('contact-form');
    const statusLine = document.getElementById('form-status');
    if (!form || !statusLine) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById('name').value.trim();
        const emailVal = document.getElementById('email').value.trim();
        const msgVal = document.getElementById('message').value.trim();
        
        statusLine.classList.remove('hidden');
        statusLine.innerHTML = `<span class="prompt">guest@kpal:~$</span> <span class="system-output">PACKETIZING DATA...</span>`;
        
        setTimeout(() => {
            statusLine.innerHTML += `<br><span class="prompt">guest@kpal:~$</span> <span class="system-output">ESTABLISHING ENCRYPTED CONNECTION...</span>`;
            
            setTimeout(() => {
                statusLine.innerHTML += `<br><span class="prompt">guest@kpal:~$</span> <span class="success-message">CONNECTION SECURED. TRANSMITTING PAYLOAD...</span>`;
                
                setTimeout(() => {
                    statusLine.innerHTML += `<br><span class="prompt">guest@kpal:~$</span> <span class="success-message">TRANSMISSION COMPLETED SUCCESSFULLY!</span>`;
                    
                    // Reset Form
                    form.reset();
                    
                    // Launch mail client so recruiter can complete transmission natively
                    const mailtoUrl = `mailto:palkrishnendu2@gmail.com?subject=Contact from Portfolio: ${encodeURIComponent(nameVal)}&body=${encodeURIComponent(msgVal)}%0A%0A---%0ASent by: ${encodeURIComponent(emailVal)}`;
                    setTimeout(() => {
                        window.location.href = mailtoUrl;
                    }, 1200);
                    
                }, 1000);
            }, 1000);
        }, 800);
    });
}

/* ==========================================
   7. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================== */
function initScrollReveal() {
    // Collect elements we want to reveal
    const targetElements = document.querySelectorAll(
        '.project-card, .timeline-item, .stat-card, .record-card, .cert-item, .section-header'
    );
    
    // Fallback: apply intersection observer manually if view timelines are unsupported
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    targetElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ==========================================
   8. DYNAMIC LIVE TIMERS FOR PRESENT POSITIONS
   ========================================== */
function initLiveTimers() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const dateEl = item.querySelector('.timeline-date');
        const contentEl = item.querySelector('.timeline-content');
        if (!dateEl || !contentEl) return;
        
        const dateText = dateEl.textContent.trim().toUpperCase();
        if (dateText.includes('- PRESENT')) {
            const parts = dateText.split('-');
            if (parts.length < 2) return;
            
            const startStr = parts[0].trim(); // e.g. "05/2025"
            const dateParts = startStr.split('/');
            if (dateParts.length !== 2) return;
            
            const month = parseInt(dateParts[0], 10);
            const year = parseInt(dateParts[1], 10);
            
            // Create start date (set to 1st day of the month)
            const startDate = new Date(year, month - 1, 1);
            
            // Create dynamic container
            const timerContainer = document.createElement('div');
            timerContainer.className = 'live-timer-badge';
            timerContainer.innerHTML = `<span class="live-timer-dot"></span> <span class="live-timer-text">INITIALIZING TRACKING...</span>`;
            
            // Insert right after the timeline-header or prepend
            const headerEl = contentEl.querySelector('.timeline-header');
            if (headerEl) {
                headerEl.insertAdjacentElement('afterend', timerContainer);
            } else {
                contentEl.prepend(timerContainer);
            }
            
            function updateTimer() {
                const now = new Date();
                let diffMs = now - startDate;
                if (diffMs < 0) diffMs = 0;
                
                // Calculate elapsed time parameters
                let years = now.getFullYear() - startDate.getFullYear();
                let months = now.getMonth() - startDate.getMonth();
                let days = now.getDate() - startDate.getDate();
                let hours = now.getHours() - startDate.getHours();
                let minutes = now.getMinutes() - startDate.getMinutes();
                let seconds = now.getSeconds() - startDate.getSeconds();
                
                // Adjustment logic for date math
                if (seconds < 0) {
                    minutes--;
                    seconds += 60;
                }
                if (minutes < 0) {
                    hours--;
                    minutes += 60;
                }
                if (hours < 0) {
                    days--;
                    hours += 24;
                }
                if (days < 0) {
                    months--;
                    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                    days += prevMonth.getDate();
                }
                if (months < 0) {
                    years--;
                    months += 12;
                }
                
                let durationStr = "";
                if (years > 0) durationStr += `${years}y `;
                if (months > 0 || years > 0) durationStr += `${months}m `;
                if (days > 0 || months > 0 || years > 0) durationStr += `${days}d `;
                durationStr += `${hours}h ${minutes}m ${seconds}s`;
                
                timerContainer.querySelector('.live-timer-text').textContent = `ACTIVE DURATION: ${durationStr}`;
            }
            
            updateTimer();
            setInterval(updateTimer, 1000);
        }
    });
}
