document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       MOBILE MENU TOGGLE
       ========================================= */
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.querySelector('i').classList.toggle('fa-bars');
        mobileMenu.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.querySelector('i').classList.add('fa-bars');
            mobileMenu.querySelector('i').classList.remove('fa-times');
        });
    });

    /* =========================================
       SCROLL REVEAL ANIMATION
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       ACTIVE LINK HIGHLIGHTING
       ========================================= */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            
            // Highlight if link matches current page and current section
            if (href.includes(currentPage) && current !== '' && href.includes('#' + current)) {
                item.classList.add('active');
            } else if (href === currentPage && current === '') {
                // For base page link without section
                item.classList.add('active');
            }
        });

        /* =========================================
           BACK TO TOP BUTTON
           ========================================= */
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================
       PUBLICATION TABS
       ========================================= */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pubSections = document.querySelectorAll('.pub-section');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const target = btn.dataset.tab;
                pubSections.forEach(section => {
                    if (section.id === target) {
                        section.style.display = 'block';
                        setTimeout(() => section.classList.add('active'), 50);
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    /* =========================================
       VIDEO MODAL
       ========================================= */
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const closeModal = document.querySelector('.close-modal');

    if (videoModal && videoPlayer && closeModal) {
        window.openVideo = (url) => {
            videoPlayer.src = url;
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        closeModal.addEventListener('click', () => {
            videoModal.style.display = 'none';
            videoPlayer.src = '';
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.style.display = 'none';
                videoPlayer.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }

    /* =========================================
       LAZY LOADING IMAGES
       ========================================= */
    const lazyImages = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    }

});

/* =========================================
   CONTACT FORM EMAIL SENDING
   ========================================= */
function sendEmail() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formStatus = document.getElementById('formStatus');

    if (!name || !email || !message) {
        if (formStatus) {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.style.color = 'red';
        } else {
            alert('Please fill in all fields.');
        }
        return;
    }

    if (formStatus) {
        formStatus.textContent = '';
    }

    const recipient = 'yakubu.adam008@gmail.com';
    const subject = encodeURIComponent('Portfolio Contact Form');
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}
