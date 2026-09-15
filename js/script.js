(() => {
    document.documentElement.classList.add('js-enabled');

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -45px 0px' });
        reveals.forEach((section) => revealObserver.observe(section));
    } else {
        reveals.forEach((section) => section.classList.add('is-visible'));
    }

    const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        const navObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
            });
        }, { threshold: [0.15, 0.35, 0.6], rootMargin: '-18% 0px -62% 0px' });
        sections.forEach((section) => navObserver.observe(section));
    }
})();
