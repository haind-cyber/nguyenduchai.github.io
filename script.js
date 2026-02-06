// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = this.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            
            // Smooth scroll
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const interest = this.querySelector('select').value;
    
    // Simple validation
    if (!name || !email) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For GitHub Pages, you can use a service like Formspree
    
    // Show success message
    const interestText = {
        'mc': 'MC Tiệc Cưới',
        'it': 'Tư vấn CNTT',
        'biometric': 'Sinh Trắc Vân Tay',
        'investment': 'Tư vấn Đầu tư',
        'other': 'dịch vụ khác'
    }[interest] || 'dịch vụ của tôi';
    
    alert(`Cảm ơn ${name}! Tôi đã nhận được yêu cầu tư vấn về ${interestText}. Tôi sẽ liên hệ lại với bạn qua email ${email} trong thời gian sớm nhất.`);
    
    // Reset form
    this.reset();
});

// Add fade-in animation to sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 150) {
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

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary) !important;
        font-weight: 600;
    }
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Video placeholder interaction
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function() {
        alert('Trong phiên bản thực tế, đây sẽ là video MC trực tiếp. Bạn có thể upload video lên YouTube và chèn link vào đây.');
    });
}

// Banner placeholder interaction
const bannerPlaceholder = document.querySelector('.banner-placeholder');
if (bannerPlaceholder) {
    bannerPlaceholder.addEventListener('click', function() {
        alert('Đây là vị trí cho ảnh MC chuyên nghiệp của bạn. Hãy thay thế bằng ảnh thật với kích thước lớn (ít nhất 2000px chiều rộng).');
    });
}

// Initialize with first section visible
window.addEventListener('load', function() {
    document.querySelector('section').classList.add('fade-in');
});
