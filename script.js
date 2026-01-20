// Improved Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Portfolio gallery hover effect
const imageCards = document.querySelectorAll('.image-card');
imageCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Image modal functionality
const projectImages = document.querySelectorAll('.project-img');
const modalImage = document.getElementById('modalImage');
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

projectImages.forEach(img => {
    img.addEventListener('click', function() {
        modalImage.src = this.src;
        modalImage.alt = this.alt;
        imageModal.show();
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            service: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Mohon lengkapi semua field yang wajib diisi!');
            return;
        }
        
        // Here you would normally send the data to a server
        console.log('Form data:', formData);
        
        // Show success message
        alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
        
        // Reset form
        this.reset();
    });
}

// Toggle project buttons
const toggleProjectBtn = document.getElementById('toggleProjectBtn');
const toggleSelesaiBtn = document.getElementById('toggleSelesaiBtn');

if (toggleProjectBtn) {
    toggleProjectBtn.addEventListener('click', function() {
        const icon = this.querySelector('.toggle-icon');
        const btnText = this.querySelector('#btnText');
        
        if (this.getAttribute('aria-expanded') === 'true') {
            btnText.textContent = 'Lihat Proyek Lainnya';
        } else {
            btnText.textContent = 'Tutup';
        }
    });
}

if (toggleSelesaiBtn) {
    toggleSelesaiBtn.addEventListener('click', function() {
        const toggleText = this.querySelector('.toggle-text');
        
        if (this.getAttribute('aria-expanded') === 'true') {
            toggleText.textContent = 'Lainnya';
        } else {
            toggleText.textContent = 'Tutup';
        }
    });
}

// Partner toggle button
const partnerToggleButton = document.getElementById('partnerToggleButton');
if (partnerToggleButton) {
    partnerToggleButton.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (this.getAttribute('aria-expanded') === 'true') {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
}

// Enhanced carousel auto-play with pause on hover
const carousels = document.querySelectorAll('.carousel');
carousels.forEach(carousel => {
    const carouselInstance = new bootstrap.Carousel(carousel);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', () => {
        carouselInstance.cycle();
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
});

lazyImages.forEach(img => imageObserver.observe(img));

// Service cards animation on scroll
const serviceCards = document.querySelectorAll('.service-card');
const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

serviceCards.forEach(card => cardObserver.observe(card));

// Active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        if (scrollY >= (sectionTop - navbarHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Video play on hover
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.addEventListener('mouseenter', function() {
        this.play().catch(e => console.log('Autoplay prevented:', e));
    });
    
    video.addEventListener('mouseleave', function() {
        this.pause();
        this.currentTime = 0;
    });
});

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Initialize counters if they exist
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target, 2000);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Back to top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTop.className = 'btn btn-primary back-to-top';
backToTop.style.position = 'fixed';
backToTop.style.bottom = '30px';
backToTop.style.right = '30px';
backToTop.style.zIndex = '1000';
backToTop.style.display = 'none';
backToTop.style.width = '50px';
backToTop.style.height = '50px';
backToTop.style.borderRadius = '50%';
backToTop.style.fontSize = '1.2rem';
backToTop.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)';

document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
        backToTop.style.alignItems = 'center';
        backToTop.style.justifyContent = 'center';
    } else {
        backToTop.style.display = 'none';
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
});

// Add preloader HTML if needed
const preloaderHTML = `
<div class="preloader" style="
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
">
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
`;

document.body.insertAdjacentHTML('afterbegin', preloaderHTML);