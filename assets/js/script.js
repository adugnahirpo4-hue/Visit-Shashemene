(function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    let lastId = '';
    let cur = [];

    const observerOptions = {
        rootMargin: '0px 0px -25% 0px'
    };

    const handleScroll = () => {
        let fromTop = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (sectionTop <= fromTop && sectionTop + sectionHeight > fromTop) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            navLinks.forEach(l => l.classList.remove('highlight'));
            this.classList.add('highlight');
        });

        link.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        const closeMenu = () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
            navbar.classList.remove('is-open');
        };

        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!isExpanded));
            menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
            navbar.classList.toggle('is-open', !isExpanded);
        });

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }
})();