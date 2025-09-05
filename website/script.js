// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// Animate cards on scroll
document.querySelectorAll('.experience-card, .skill-category, .timeline-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:fredbissih@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your message! Your email client should open now.');
        
        // Reset form
        this.reset();
    });
}

// Typing effect for hero title
function typeEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Add hover effects to stats
document.querySelectorAll('.stat').forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    stat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Counter animation for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target === 18 || target === 80 ? '%' : target === 7 ? '+' : '');
    }, 50);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            animateCounter(statNumber, number);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2c5aa0 !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.5s ease';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// CV Download Function
function downloadCV() {
    // Create the exact same download function as the CV page
    // Convert profile image to base64 for embedding
    function getImageAsBase64(callback) {
        const img = document.querySelector('.profile-photo');
        if (!img) {
            callback(null);
            return;
        }
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            try {
                const dataURL = canvas.toDataURL('image/png');
                callback(dataURL);
            } catch (e) {
                console.log('Could not convert image to base64:', e);
                callback(null);
            }
        };
        image.onerror = function() {
            callback(null);
        };
        image.src = img.src;
    }
    
    getImageAsBase64(function(base64Image) {
        // Create the CV content with the embedded image
        const profileImageHTML = base64Image 
            ? `<img src="${base64Image}" alt="Bissih Fred">`
            : `<i class="fas fa-user-circle" style="font-size: 3rem; color: rgba(255,255,255,0.7);"></i>`;
        
        const cvContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bissih Fred - Curriculum Vitae</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            background: #f5f5f5;
        }

        .cv-container {
            display: flex;
            max-width: 1000px;
            margin: 20px auto;
            background: white;
            box-shadow: 0 0 30px rgba(0,0,0,0.1);
            min-height: calc(100vh - 40px);
        }

        .sidebar {
            width: 300px;
            background: #2c5f88;
            color: white;
            padding: 0;
            display: flex;
            flex-direction: column;
        }

        .profile-section {
            text-align: center;
            padding: 40px 30px 30px;
            background: #1e4a6b;
        }

        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 20px;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }

        .profile-image i {
            font-size: 3rem;
            color: rgba(255,255,255,0.7);
        }

        .profile-name {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #fff;
        }

        .profile-title {
            font-size: 0.9rem;
            color: #87ceeb;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .sidebar-section {
            padding: 30px 30px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar-section:last-child {
            border-bottom: none;
            flex: 1;
        }

        .sidebar-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #fff;
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .sidebar-content {
            font-size: 0.9rem;
            line-height: 1.8;
        }

        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            color: #000000;
            font-weight: 500;
            text-shadow: 0 1px 2px rgba(255,255,255,0.5);
        }

        .contact-item i {
            width: 20px;
            margin-right: 15px;
            color: #87ceeb;
            text-shadow: 0 1px 2px rgba(255,255,255,0.3);
        }

        .skills-list {
            list-style: none;
        }

        .skills-list li {
            margin-bottom: 8px;
            color: rgba(255,255,255,0.85);
            position: relative;
            padding-left: 15px;
        }

        .skills-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #87ceeb;
        }

        .reference-item-sidebar {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .reference-item-sidebar:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        .reference-name {
            font-weight: 600;
            color: #fff;
            margin-bottom: 5px;
        }

        .reference-title {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.7);
            margin-bottom: 5px;
        }

        .reference-contact {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.6);
        }

        .main-content {
            flex: 1;
            padding: 40px 50px;
        }

        .header-section {
            margin-bottom: 40px;
        }

        .main-name {
            font-size: 2.5rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .main-title {
            font-size: 1rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 30px;
        }

        .contact-info-main {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
            font-size: 0.9rem;
            color: #555;
        }

        .contact-info-main .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .section {
            margin-bottom: 40px;
        }

        .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #2c5f88;
            margin-bottom: 20px;
            padding-bottom: 5px;
            border-bottom: 2px solid #87ceeb;
        }

        .experience-item, .education-item {
            display: flex;
            margin-bottom: 30px;
        }

        .date-column {
            width: 120px;
            flex-shrink: 0;
            padding-right: 20px;
        }

        .date-range {
            font-weight: 600;
            color: #333;
            font-size: 0.9rem;
        }

        .location {
            font-size: 0.8rem;
            color: #666;
            font-style: italic;
        }

        .content-column {
            flex: 1;
        }

        .job-title, .degree-title {
            font-weight: 600;
            color: #2c5f88;
            margin-bottom: 5px;
        }

        .company, .institution {
            color: #666;
            margin-bottom: 10px;
            font-style: italic;
        }

        .description ul {
            padding-left: 20px;
            margin-top: 10px;
        }

        .description li {
            margin-bottom: 5px;
            color: #555;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        .skill-category h4 {
            font-weight: 600;
            color: #2c5f88;
            margin-bottom: 10px;
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 1px;
        }

        .skill-bar {
            margin-bottom: 15px;
        }

        .skill-name {
            font-size: 0.9rem;
            color: #555;
            margin-bottom: 5px;
        }

        .skill-progress {
            height: 4px;
            background: #e8f4f8;
            border-radius: 2px;
            overflow: hidden;
        }

        .skill-fill {
            height: 100%;
            background: linear-gradient(90deg, #2c5f88 0%, #87ceeb 100%);
            transition: width 0.3s ease;
        }

        .research-item {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }

        .research-item:last-child {
            border-bottom: none;
        }

        .research-title {
            font-weight: 600;
            color: #2c5f88;
            margin-bottom: 5px;
            line-height: 1.4;
        }

        .research-status {
            font-style: italic;
            color: #666;
            font-size: 0.9rem;
        }

        @media print {
            .cv-container {
                box-shadow: none;
                margin: 0;
                max-width: none;
            }
            
            body {
                background: white;
            }
            
            .sidebar {
                background: #2c5f88 !important;
                color: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .sidebar h1,
            .sidebar h2,
            .sidebar h3,
            .sidebar p,
            .sidebar li {
                color: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .skill-fill {
                background: linear-gradient(90deg, #2c5f88 0%, #87ceeb 100%) !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }

        @media (max-width: 768px) {
            .cv-container {
                flex-direction: column;
                margin: 10px;
            }
            
            .sidebar {
                width: 100%;
            }
            
            .main-content {
                padding: 30px 20px;
            }
            
            .skills-grid {
                grid-template-columns: 1fr;
            }
            
            .experience-item, .education-item {
                flex-direction: column;
            }
            
            .date-column {
                width: auto;
                padding-right: 0;
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        <div class="sidebar">
            <div class="profile-section">
                <div class="profile-image">
                    ${profileImageHTML}
                </div>
                <h1 class="profile-name">Bissih<br>Fred</h1>
                <p class="profile-title">PhD Candidate</p>
            </div>

            <div class="sidebar-section">
                <h3 class="sidebar-title">About Me</h3>
                <div class="sidebar-content">
                    Innovative and results-driven aquaculture nutritionist and feed technologist with strong academic and industrial experience in fish feed formulation, nutritional requirement studies, and aquaculture systems.
                </div>
            </div>

            <div class="sidebar-section">
                <h3 class="sidebar-title">Contact</h3>
                <div class="sidebar-content">
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Zhanjiang, China</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>+86 132 4651 6503</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>fredbissih@gmail.com</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-researchgate"></i>
                        <a href="https://www.researchgate.net/profile/Fred-Bissih" target="_blank" style="color: #87ceeb; text-decoration: underline; font-size: 0.8rem;">Profile</a>
                    </div>
                </div>
            </div>

            <div class="sidebar-section">
                <h3 class="sidebar-title">Languages</h3>
                <div class="sidebar-content">
                    <ul class="skills-list">
                        <li>English (Fluent)</li>
                        <li>French (Native)</li>
                        <li>Chinese (Intermediate)</li>
                    </ul>
                </div>
            </div>

            <div class="sidebar-section">
                <h3 class="sidebar-title">Hobbies</h3>
                <div class="sidebar-content">
                    <ul class="skills-list">
                        <li>Research & Innovation</li>
                        <li>Reading Scientific Literature</li>
                        <li>Aquaculture Consulting</li>
                        <li>Technology & Data Analysis</li>
                        <li>Swimming</li>
                        <li>Traveling</li>
                    </ul>
                </div>
            </div>

            <div class="sidebar-section">
                <h3 class="sidebar-title">References</h3>
                <div class="sidebar-content">
                    <div class="reference-item-sidebar">
                        <div class="reference-name">Prof. Qinghui Ai</div>
                        <div class="reference-title">Professor & PhD Supervisor</div>
                        <div class="reference-contact">Ocean University of China<br>Email: qhai@ouc.edu.cn<br>Phone: +86 532 8203 2786</div>
                    </div>
                    <div class="reference-item-sidebar">
                        <div class="reference-name">Dr. Kangsen Mai</div>
                        <div class="reference-title">Professor</div>
                        <div class="reference-contact">Ocean University of China<br>Email: kmai@ouc.edu.cn<br>Phone: +86 532 8203 2787</div>
                    </div>
                    <div class="reference-item-sidebar">
                        <div class="reference-name">Dr. Samwel Mchele Limbu</div>
                        <div class="reference-title">Senior Lecturer</div>
                        <div class="reference-contact">Sokoine University of Agriculture<br>Email: samwel.limbu@sua.ac.tz<br>Phone: +255 754 309 368</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-content">
            <div class="header-section">
                <h1 class="main-name">BISSIH FRED</h1>
                <p class="main-title">Aquaculture Nutritionist & Feed Technologist</p>
            </div>

            <div class="section">
                <h2 class="section-title">Career Objective</h2>
                <p>Innovative and results-driven aquaculture nutritionist and feed technologist with strong academic and industrial experience in fish feed formulation, nutritional requirement studies, and aquaculture systems. Proven expertise in developing cost-effective feeds using alternative protein sources and conducting large-scale feeding trials. Seeking to leverage advanced knowledge in feed technology to improve fish growth, sustainability, and profitability in Kenya's aquafeed industry.</p>
            </div>

            <div class="section">
                <h2 class="section-title">Education</h2>
                <div class="education-item">
                    <div class="date-column">
                        <div class="date-range">2020 - Present</div>
                        <div class="location">Qingdao, China</div>
                    </div>
                    <div class="content-column">
                        <h3 class="degree-title">PhD in Aquaculture Nutrition</h3>
                        <p class="institution">Ocean University of China (OUC)</p>
                        <div class="description">
                            <p>Specialization: Fish feed formulation and nutritional requirement studies</p>
                            <ul>
                                <li>Research focus on alternative protein sources in aquaculture feeds</li>
                                <li>Advanced coursework in fish nutrition, feed technology, and aquaculture systems</li>
                                <li>Laboratory experience in feed formulation and nutritional analysis</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="education-item">
                    <div class="date-column">
                        <div class="date-range">2017 - 2019</div>
                        <div class="location">Dschang, Cameroon</div>
                    </div>
                    <div class="content-column">
                        <h3 class="degree-title">Master of Science in Animal Production</h3>
                        <p class="institution">University of Dschang</p>
                        <div class="description">
                            <p>Specialization: Aquaculture and fisheries management</p>
                            <ul>
                                <li>Thesis: Alternative protein sources for tilapia feed formulation</li>
                                <li>Research methodology and statistical analysis</li>
                                <li>Aquaculture pond management and fish health</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="education-item">
                    <div class="date-column">
                        <div class="date-range">2013 - 2016</div>
                        <div class="location">Dschang, Cameroon</div>
                    </div>
                    <div class="content-column">
                        <h3 class="degree-title">Bachelor of Science in Animal Production</h3>
                        <p class="institution">University of Dschang</p>
                        <div class="description">
                            <p>Major: Animal Production and Technology</p>
                            <ul>
                                <li>Foundation in animal nutrition and feed technology</li>
                                <li>Livestock and aquaculture production systems</li>
                                <li>Animal health and disease management</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Professional Experience</h2>
                <div class="experience-item">
                    <div class="date-column">
                        <div class="date-range">2020 - Present</div>
                        <div class="location">Qingdao, China</div>
                    </div>
                    <div class="content-column">
                        <h3 class="job-title">PhD Research Assistant</h3>
                        <p class="company">Ocean University of China</p>
                        <div class="description">
                            <ul>
                                <li>Conduct advanced research in fish nutrition and feed formulation</li>
                                <li>Design and execute feeding trials with various fish species</li>
                                <li>Analyze nutritional composition and digestibility of feed ingredients</li>
                                <li>Collaborate with international research teams on aquaculture projects</li>
                                <li>Mentor undergraduate students in laboratory techniques</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="experience-item">
                    <div class="date-column">
                        <div class="date-range">2019 - 2020</div>
                        <div class="location">Douala, Cameroon</div>
                    </div>
                    <div class="content-column">
                        <h3 class="job-title">Aquaculture Consultant</h3>
                        <p class="company">Independent Consultant</p>
                        <div class="description">
                            <ul>
                                <li>Provided technical guidance to fish farmers on feed formulation</li>
                                <li>Developed cost-effective feeding strategies for small-scale farmers</li>
                                <li>Conducted training workshops on aquaculture best practices</li>
                                <li>Assisted in pond design and management optimization</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="experience-item">
                    <div class="date-column">
                        <div class="date-range">2018 - 2019</div>
                        <div class="location">Foumban, Cameroon</div>
                    </div>
                    <div class="content-column">
                        <h3 class="job-title">Research Assistant</h3>
                        <p class="company">IRAD - Institute of Agricultural Research for Development</p>
                        <div class="description">
                            <ul>
                                <li>Supported research projects on alternative protein sources</li>
                                <li>Conducted field trials and data collection</li>
                                <li>Assisted in laboratory analysis of feed samples</li>
                                <li>Contributed to research publications and reports</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>Technical Skills</h4>
                        <div class="skill-bar">
                            <div class="skill-name">Feed Formulation</div>
                            <div class="skill-progress">
                                <div class="skill-fill" style="width: 95%;"></div>
                            </div>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-name">Nutritional Analysis</div>
                            <div class="skill-progress">
                                <div class="skill-fill" style="width: 90%;"></div>
                            </div>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-name">Aquaculture Systems</div>
                            <div class="skill-progress">
                                <div class="skill-fill" style="width: 85%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="skill-category">
                        <h4>Research Skills</h4>
                        <div class="skill-bar">
                            <div class="skill-name">Data Analysis</div>
                            <div class="skill-progress">
                                <div class="skill-fill" style="width: 90%;"></div>
                            </div>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-name">Statistical Software</div>
                            <div class="skill-progress">
                                <div class="skill-fill" style="width: 85%;"></div>
                            </div>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-name">Scientific Writing</div>
                            <div class="skill-progress">
                                <div class="skill-fill" style="width: 88%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Research & Publications</h2>
                <h4 style="margin-bottom: 15px; color: #333;">Published Manuscripts</h4>
                
                <div class="research-item">
                    <h3 class="research-title">Effects of replacing fish meal by plant protein sources in fish feed on serum and muscle cholesterol levels, cholesterol metabolism-related enzyme activity and gene expression of fish.</h3>
                    <p class="research-status">(Published) DOI: 10.2478/aoas-2025-0065</p>
                </div>
                <div class="research-item">
                    <h3 class="research-title">One-step and two-step qPCR assays for CAPRV2023: development and application in full-cycle epidemiological surveillance of golden pompano.</h3>
                    <p class="research-status">(Published) DOI: 10.3389/fvets.2025.1620997</p>
                </div>
                <div class="research-item">
                    <h3 class="research-title">Investigating the effect of acute toxicity exposure to combined FeSO4 and FeCl3 in Litopenaeus vannamei through analysis of survival, metal accumulation, oxidative stress, and intestinal flora.</h3>
                    <p class="research-status">(Published) DOI: 10.1016/j.ecoenv.2025.117923</p>
                </div>
                <div class="research-item">
                    <h3 class="research-title">Probiotics and paraprobiotics in aquaculture: a sustainable strategy for enhancing fish growth, health and disease prevention - a review.</h3>
                    <p class="research-status">(Published) DOI: 10.3389/fmars.2024.1499228</p>
                </div>
                <div class="research-item">
                    <h3 class="research-title">Advancements in Sensor Fusion for Underwater SLAM: A Review on Enhanced Navigation and Environmental Perception.</h3>
                    <p class="research-status">(Published) DOI: 10.3390/s24237490</p>
                </div>
                <div class="research-item">
                    <h3 class="research-title">Enhancing Underwater SLAM Navigation and Perception: A Comprehensive Review of Deep Learning Integration.</h3>
                    <p class="research-status">(Published) DOI: 10.3390/s24217034</p>
                </div>
                
                <h4 style="margin: 30px 0 15px; color: #333;">Project Contributions</h4>
                <div class="research-item">
                    <h3 class="research-title">Evaluation of Fisheries and Coastal Management Capacity Building Support Project Final Performance Evaluation Report (USAID)</h3>
                    <p class="research-status">Published 2020</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

        // Create download
        const blob = new Blob([cvContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'BISSIH_FRED_CV.html';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

function downloadPDF() {
    // Open CV page in a new window and trigger PDF download
    const cvWindow = window.open('../cv.html', '_blank');
    
    // Wait for the page to load then trigger PDF download
    cvWindow.addEventListener('load', function() {
        setTimeout(() => {
            cvWindow.alert('Please select "Save as PDF" in the print dialog that will open next.');
            setTimeout(() => {
                cvWindow.print();
            }, 500);
        }, 1000);
    });
}

// Add keyboard shortcut for CV download
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        downloadCV();
    }
});
