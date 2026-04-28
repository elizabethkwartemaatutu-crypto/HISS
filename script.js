// Slider functionality
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
}

// Video mute/unmute
const video = document.getElementById('security-video');
const muteBtn = document.getElementById('mute-btn');

if (video && muteBtn) {
    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? '🔇' : '🔊';
    });
}

// Mobile navigation dropdown
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links a');

if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Services split-view behavior (Our Services page)
const serviceList = document.getElementById('services-list');
const detailPanel = document.getElementById('service-detail-panel');

if (serviceList && detailPanel) {
    const serviceBlocks = serviceList.querySelectorAll('.service-block');
    const placeholder = detailPanel.querySelector('#detail-placeholder');
    const detailContent = detailPanel.querySelector('#detail-content');
    const detailSymbol = detailPanel.querySelector('[data-detail-symbol]');
    const detailTitle = detailPanel.querySelector('[data-detail-title]');
    const detailDescription = detailPanel.querySelector('[data-detail-description]');
    const detailList = detailPanel.querySelector('[data-detail-list]');

    const setDetails = (block) => {
        const symbol = block.querySelector('.service-symbol');
        const title = block.querySelector('h3');
        const description = block.querySelector('p');
        const list = block.querySelector('ul');

        if (!symbol || !title || !description || !list) {
            return;
        }

        serviceBlocks.forEach((item) => {
            const itemTitle = item.querySelector('h3');
            item.classList.remove('is-active');
            if (itemTitle) {
                itemTitle.setAttribute('aria-expanded', 'false');
            }
        });

        block.classList.add('is-active');
        title.setAttribute('aria-expanded', 'true');

        if (detailSymbol) {
            detailSymbol.textContent = symbol.textContent;
        }
        if (detailTitle) {
            detailTitle.textContent = title.textContent;
        }
        if (detailDescription) {
            detailDescription.textContent = description.textContent;
        }
        if (detailList) {
            detailList.innerHTML = list.innerHTML;
        }

        detailPanel.classList.remove('is-empty');
        if (placeholder) {
            placeholder.hidden = true;
        }
        if (detailContent) {
            detailContent.hidden = false;
        }
    };

    serviceBlocks.forEach((block) => {
        const heading = block.querySelector('h3');
        if (!heading) {
            return;
        }

        heading.setAttribute('role', 'button');
        heading.setAttribute('tabindex', '0');
        heading.setAttribute('aria-expanded', 'false');

        const handleSelect = () => setDetails(block);

        block.addEventListener('click', handleSelect);
        heading.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSelect();
            }
        });
    });
}

// =====================================================================
// Typewriter effect on hero slider
// =====================================================================
const typewriterEl = document.getElementById('typewriter-text');
if (typewriterEl) {
    const phrases = [
        'We Find The Truth.',
        'Surveillance Experts.',
        'Protecting What Matters.',
        'Discreet. Professional.',
        'Evidence You Can Trust.',
        'Licensed And Trusted.',
        'We Simplify The Complex.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 110;

    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 55;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 110;
        }
        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typeDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeDelay = 450;
        }
        setTimeout(type, typeDelay);
    }
    type();
}

// =====================================================================
// Scroll-down chevron — smooth scroll to next section
// =====================================================================
const scrollChevron = document.querySelector('.scroll-indicator');
if (scrollChevron) {
    scrollChevron.addEventListener('click', () => {
        const slider = document.querySelector('.slider');
        if (slider) {
            window.scrollTo({ top: slider.offsetTop + slider.offsetHeight, behavior: 'smooth' });
        }
    });
}

// =====================================================================
// Sticky nav — glass effect on scroll
// =====================================================================
const siteHeader = document.querySelector('header');
if (siteHeader) {
    window.addEventListener('scroll', () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

// =====================================================================
// Scroll reveal — fade-up elements with [data-reveal] / [data-reveal-stagger]
// =====================================================================
const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
if (revealEls.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach((el) => revealObserver.observe(el));
}

// =====================================================================
// Counter animation for stat numbers in Why Choose section
// =====================================================================
function animateValue(el, target, suffix, duration) {
    let start = null;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const whyStats = document.querySelector('.why-stats');
if (whyStats) {
    let counted = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                whyStats.querySelectorAll('.stat-value').forEach((el) => {
                    const raw = el.textContent.trim();
                    if (raw === '100%') animateValue(el, 100, '%', 1600);
                    else if (raw === '24/7') {
                        let s = null;
                        const fn = (ts) => {
                            if (!s) s = ts;
                            const p = Math.min((ts - s) / 1600, 1);
                            const e = 1 - Math.pow(1 - p, 3);
                            el.textContent = Math.floor(e * 24) + '/7';
                            if (p < 1) requestAnimationFrame(fn);
                        };
                        requestAnimationFrame(fn);
                    }
                    // Symbol entries (∞, 🔒) are left as-is
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    statsObserver.observe(whyStats);
}

// =====================================================================
// Homepage services split-view behavior
// =====================================================================
const homeServiceList = document.getElementById('home-services-list');
const homeDetailPanel = document.getElementById('home-service-detail-panel');

if (homeServiceList && homeDetailPanel) {
    const homeServiceCards = homeServiceList.querySelectorAll('.service-card');
    const homePlaceholder = homeDetailPanel.querySelector('#home-detail-placeholder');
    const homeDetailContent = homeDetailPanel.querySelector('#home-detail-content');
    const homeDetailSymbol = homeDetailPanel.querySelector('[data-home-detail-symbol]');
    const homeDetailTitle = homeDetailPanel.querySelector('[data-home-detail-title]');
    const homeDetailList = homeDetailPanel.querySelector('[data-home-detail-list]');
    const homeDetailNote = homeDetailPanel.querySelector('[data-home-detail-note]');

    const setHomeServiceDetails = (card) => {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('h3');
        const list = card.querySelector('ul');
        const note = card.querySelector('.service-note');

        if (!icon || !title || !list || !note) {
            return;
        }

        homeServiceCards.forEach((item) => {
            const itemTitle = item.querySelector('h3');
            item.classList.remove('is-active');
            if (itemTitle) {
                itemTitle.setAttribute('aria-expanded', 'false');
            }
        });

        card.classList.add('is-active');
        title.setAttribute('aria-expanded', 'true');

        if (homeDetailSymbol) {
            homeDetailSymbol.innerHTML = icon.innerHTML;
        }
        if (homeDetailTitle) {
            homeDetailTitle.textContent = title.textContent;
        }
        if (homeDetailList) {
            homeDetailList.innerHTML = list.innerHTML;
        }
        if (homeDetailNote) {
            homeDetailNote.textContent = note.textContent;
        }

        homeDetailPanel.classList.remove('is-empty');
        if (homePlaceholder) {
            homePlaceholder.hidden = true;
        }
        if (homeDetailContent) {
            homeDetailContent.hidden = false;
        }
    };

    homeServiceCards.forEach((card) => {
        const heading = card.querySelector('h3');
        if (!heading) {
            return;
        }

        heading.setAttribute('role', 'button');
        heading.setAttribute('tabindex', '0');
        heading.setAttribute('aria-expanded', 'false');

        const handleSelect = () => setHomeServiceDetails(card);
        card.addEventListener('click', handleSelect);

        heading.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSelect();
            }
        });
    });
}

// =====================================================================
// Page transition overlay for cross-page navigation
// =====================================================================
const pageTransitionLogo = document.querySelector('.logo img');

if (document.body) {
    const TRANSITION_MS = 680;
    const ENTRY_HOLD_MS = 160;

    const transitionLayer = document.createElement('div');
    transitionLayer.className = 'page-transition is-active';

    const mark = document.createElement('div');
    mark.className = 'page-transition-mark';

    const markLogo = document.createElement('img');
    markLogo.src = pageTransitionLogo ? pageTransitionLogo.getAttribute('src') : 'images/HARMONY LOGO 1.png';
    markLogo.alt = 'Harmony Logo';

    const markText = document.createElement('span');
    markText.textContent = 'Harmony';

    mark.appendChild(markLogo);
    mark.appendChild(markText);
    transitionLayer.appendChild(mark);
    document.body.appendChild(transitionLayer);

    window.setTimeout(() => {
        transitionLayer.classList.remove('is-active');
    }, ENTRY_HOLD_MS);

    let isLeavingPage = false;

    const isTransitionCandidate = (link, event) => {
        if (!link || isLeavingPage) {
            return false;
        }

        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return false;
        }

        const rawHref = link.getAttribute('href');
        if (!rawHref || rawHref.startsWith('#')) {
            return false;
        }

        if (link.target && link.target.toLowerCase() === '_blank') {
            return false;
        }

        if (link.hasAttribute('download')) {
            return false;
        }

        if (/^(mailto:|tel:|javascript:)/i.test(rawHref)) {
            return false;
        }

        let destination;
        try {
            destination = new URL(link.href, window.location.href);
        } catch (error) {
            return false;
        }

        if (destination.origin !== window.location.origin) {
            return false;
        }

        if (destination.pathname === window.location.pathname && destination.hash) {
            return false;
        }

        return /\.html?$/i.test(destination.pathname) || destination.pathname.endsWith('/');
    };

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');
        if (!isTransitionCandidate(link, event)) {
            return;
        }

        event.preventDefault();
        isLeavingPage = true;
        document.body.classList.add('is-transitioning');
        transitionLayer.classList.add('is-active');

        window.setTimeout(() => {
            window.location.assign(link.href);
        }, TRANSITION_MS);
    });

    window.addEventListener('pageshow', () => {
        isLeavingPage = false;
        document.body.classList.remove('is-transitioning');
        transitionLayer.classList.remove('is-active');
    });
}