    <!-- JavaScript Libraries -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
    
    <script>
        // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Hide loading spinner after 1.5 seconds
            setTimeout(function() {
                document.getElementById('loading-spinner').classList.add('hidden');
            }, 1500);
            
            // Initialize AOS animation library
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
            
            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuClose = document.getElementById('mobile-menu-close');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            mobileMenuOverlay.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Close mobile menu when clicking on a link
            const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Header scroll effect
            const header = document.getElementById('header');
            const logoImg = document.getElementById('logo-img');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Show/hide back to top button
                const backToTop = document.getElementById('back-to-top');
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });
            
            // Animate stats counter
            function animateValue(id, start, end, duration) {
                const obj = document.getElementById(id);
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    obj.innerHTML = Math.floor(progress * (end - start) + start);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }
            
            // Start counter animation when stats section is in view
            const statsSection = document.getElementById('stats');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateValue('projects-completed', 0, 250, 2000);
                        animateValue('happy-clients', 0, 180, 2000);
                        animateValue('years-experience', 0, 12, 2000);
                        animateValue('awards-won', 0, 8, 2000);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
            
            // Portfolio filter
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const filterValue = button.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // Testimonials slider
            $('.testimonials-slider').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false
            });
            
            // Clients slider
            $('.clients-slider').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            });
            
            // Animate skill bars when about section is in view
            const aboutSection = document.getElementById('about');
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const skillBars = document.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width + '%';
                        });
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            skillObserver.observe(aboutSection);
            
            // Form submission
            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const service = document.getElementById('service').value;
                const message = document.getElementById('message').value;
                
                // Here you would typically send the data to a server using fetch or AJAX
                // For demo purposes, we'll just show an alert
                alert(`Thank you, ${name}! Your message has been sent. We'll contact you shortly about your ${service} requirements.`);
                
                // Reset the form
                contactForm.reset();
            });
            
            // Newsletter form submission
            const newsletterForm = document.getElementById('newsletterForm');
            
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
                newsletterForm.reset();
            });
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.getElementById('header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update URL without page jump
                        if (history.pushState) {
                            history.pushState(null, null, targetId);
                        } else {
                            location.hash = targetId;
                        }
                    }
                });
            });
            
            // Initialize Google Map
            function initMap() {
                const location = { lat: 51.5074, lng: -0.1278 }; // London coordinates
                const map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 14,
                    center: location,
                    styles: [
                        {
                            "featureType": "all",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "saturation": 36
                                },
                                {
                                    "color": "#333333"
                                },
                                {
                                    "lightness": 40
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "visibility": "on"
                                },
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#fefefe"
                                },
                                {
                                    "lightness": 17
                                },
                                {
                                    "weight": 1.2
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f5f5f5"
                                },
                                {
                                    "lightness": 21
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 29
                                },
                                {
                                    "weight": 0.2
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 18
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                },
                                {
                                    "lightness": 16
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                },
                                {
                                    "lightness": 19
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "color": "#e9e9e9"
                                },
                                {
                                    "lightness": 17
                                }
                            ]
                        }
                    ]
                });
                
                // Add marker
                new google.maps.Marker({
                    position: location,
                    map: map,
                    title: 'SA Design Services Office'
                });
            }
            
            // Project modal functionality
            const viewProjectButtons = document.querySelectorAll('.view-project');
            const projectModal = document.getElementById('project-modal');
            const modalClose = document.getElementById('modal-close');
            const modalBody = document.querySelector('.modal-body');
            
            viewProjectButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const projectId = button.getAttribute('data-project');
                    
                    // In a real implementation, you would fetch project details from a server
                    // For demo, we'll use static content
                    let projectContent = '';
                    
                    switch(projectId) {
                        case '1':
                            projectContent = `
                                <h2>Modern House Extension</h2>
                                <p><strong>Location:</strong> North London</p>
                                <p><strong>Project Type:</strong> Residential Extension</p>
                                <p><strong>Year:</strong> 2023</p>
                                <p>This contemporary rear extension features floor-to-ceiling glass bifold doors and a striking roof lantern that floods the new kitchen-diner with natural light. The design seamlessly blends modern elements with the existing period features of the Victorian property.</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                                    <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 1">
                                    <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 2">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 3">
                                    <img src="https://images.unsplash.com/photo-1600566752227-8f3b1a2a3a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 4">
                                </div>
                                <h3>Project Challenges</h3>
                                <p>The main challenge was obtaining planning permission in a conservation area while meeting the client's desire for a modern design. We worked closely with the local planning authority to develop a solution that satisfied all parties.</p>
                                <h3>Client Testimonial</h3>
                                <blockquote style="background: #f5f5f5; padding: 20px; border-left: 4px solid var(--secondary-color); margin: 20px 0;">
                                    "SA Design Services transformed our Victorian terrace with a stunning rear extension. Their attention to detail and creative solutions made the entire process smooth from planning to completion."
                                    <footer style="margin-top: 15px; font-weight: 600;">— Sarah Johnson, Homeowner</footer>
                                </blockquote>
                            `;
                            break;
                        case '2':
                            projectContent = `
                                <h2>Office Refurbishment</h2>
                                <p><strong>Location:</strong> Central London</p>
                                <p><strong>Project Type:</strong> Commercial</p>
                                <p><strong>Year:</strong> 2022</p>
                                <p>Complete redesign of a commercial office space in Central London, creating a modern, collaborative workspace that reflects the company's innovative culture while maximizing the available square footage.</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                                    <img src="https://images.unsplash.com/photo-1600566752227-8f3b1a2a3a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 1">
                                    <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 2">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 3">
                                    <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Project Image 4">
                                </div>
                            `;
                            break;
                        // Add more cases for other projects
                        default:
                            projectContent = `<h2>Project Details</h2><p>Detailed information about this project will be displayed here.</p>`;
                    }
                    
                    modalBody.innerHTML = projectContent;
                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            modalClose.addEventListener('click', () => {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            projectModal.addEventListener('click', (e) => {
                if (e.target === projectModal) {
                    projectModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Cookie consent functionality
            const cookieConsent = document.getElementById('cookie-consent');
            const cookieAccept = document.getElementById('cookie-accept');
            const cookieDecline = document.getElementById('cookie-decline');
            
            // Check if cookie consent was already given
            if (!localStorage.getItem('cookieConsent')) {
                setTimeout(() => {
                    cookieConsent.classList.add('active');
                }, 2000);
            }
            
            cookieAccept.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieConsent.classList.remove('active');
            });
            
            cookieDecline.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'declined');
                cookieConsent.classList.remove('active');
            });
            
            // Scroll reveal animations for elements
            const scrollReveal = ScrollReveal({
                origin: 'bottom',
                distance: '60px',
                duration: 1000,
                delay: 200,
                reset: false
            });
            
            scrollReveal.reveal('.service-card, .portfolio-item, .team-member', {
                interval: 200
            });
        });
    </script>
