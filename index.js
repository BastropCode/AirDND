/* ═══════════════════════════════════════════════════
   AirDND — Kaili's Beachfront Condo
   Interactive Logic
   ═══════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Property Data ───
    const PROPERTY = {
        price: 147,
        cleaningFee: 85,
        serviceFeeRate: 0.14,
        maxGuests: 6,
        rating: 4.86,
        reviewCount: 22,
        images: [
            { src: 'images/condo/livingroom/livingarea.avif', alt: 'Main living area' },
            { src: 'images/condo/livingroom/couch.avif', alt: 'Couch seating' },
            { src: 'images/condo/livingroom/balcony.avif', alt: 'Balcony view' },
            { src: 'images/condo/livingroom/balc.avif', alt: 'Balcony sunset' },
            { src: 'images/condo/livingroom/couchagain.avif', alt: 'Living room' },
            { src: 'images/condo/livingroom/tent.avif', alt: 'Cozy tent area' },
        ],
    };

    const REVIEWS = [
        {
            name: 'Sarah',
            date: 'March 2026',
            text: 'Absolutely stunning views! The condo was exactly as described and Kaili was an amazing host. We loved waking up to the sound of the waves every morning. Will definitely be coming back!',
            color: '#6366f1',
        },
        {
            name: 'Marcus',
            date: 'February 2026',
            text: 'Great location right on the beach. The smartlock made check-in super easy. The condo was clean and had everything we needed. Perfect for our family getaway.',
            color: '#ec4899',
        },
        {
            name: 'Jessica',
            date: 'January 2026',
            text: 'The sunsets from the balcony are unreal! Kaili is a wonderful host who responds quickly to any questions. The kitchen is well-stocked and the beds were comfortable.',
            color: '#f59e0b',
        },
        {
            name: 'David',
            date: 'December 2025',
            text: 'Had an incredible time in Corpus Christi. This condo is in the perfect spot — close to restaurants and right on the water. Kaili thought of everything.',
            color: '#10b981',
        },
        {
            name: 'Amanda',
            date: 'November 2025',
            text: 'We stayed here for Thanksgiving and it was perfect. Enough room for our group of 5, the views were amazing, and Kaili was so responsive. Highly recommend!',
            color: '#8b5cf6',
        },
        {
            name: 'Tyler',
            date: 'October 2025',
            text: 'Came for a surf trip and this place delivered. Beach access is steps away, the condo is super clean, and the balcony is the perfect spot to wind down after a day on the water.',
            color: '#ef4444',
        },
    ];

    // ─── DOM References ───
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // ─── Navbar Scroll Effect ───
    function initNavScroll() {
        const navbar = $('#navbar');
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    navbar.classList.toggle('scrolled', window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ─── Photo Gallery & Lightbox ───
    function initGallery() {
        const overlay = $('#lightbox-overlay');
        const lightboxImg = $('#lightbox-img');
        const lightboxCounter = $('#lightbox-counter');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            updateLightbox();
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        function updateLightbox() {
            const img = PROPERTY.images[currentIndex];
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCounter.textContent = `${currentIndex + 1} / ${PROPERTY.images.length}`;
            // Trigger re-animation
            lightboxImg.style.animation = 'none';
            lightboxImg.offsetHeight; // Force reflow
            lightboxImg.style.animation = '';
        }

        function navigate(dir) {
            currentIndex = (currentIndex + dir + PROPERTY.images.length) % PROPERTY.images.length;
            updateLightbox();
        }

        // Gallery tile clicks
        const galleryMain = $('#gallery-main');
        const gallerySides = $$('.gallery-side');

        galleryMain.addEventListener('click', () => openLightbox(0));
        gallerySides.forEach((el, i) => {
            el.addEventListener('click', () => openLightbox(i + 1));
        });

        // Show all photos button
        $('#btn-show-all-photos').addEventListener('click', () => openLightbox(0));

        // Lightbox controls
        $('#lightbox-close').addEventListener('click', closeLightbox);
        $('#lightbox-prev').addEventListener('click', () => navigate(-1));
        $('#lightbox-next').addEventListener('click', () => navigate(1));

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    }

    // ─── Show More About Text ───
    function initShowMore() {
        const btn = $('#btn-show-more-about');
        const hidden = $('#about-text-extra');

        btn.addEventListener('click', () => {
            const isShowing = hidden.classList.contains('show');
            hidden.classList.toggle('show');
            btn.innerHTML = isShowing
                ? 'Show more <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9,18 15,12 9,6"/></svg>'
                : 'Show less <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9,6 15,12 9,18"/></svg>';
        });
    }

    // ─── Reviews Rendering ───
    function initReviews() {
        const container = $('#reviews-list');
        REVIEWS.forEach((review) => {
            const el = document.createElement('div');
            el.className = 'review-item';
            el.innerHTML = `
                <div class="review-author">
                    <div class="review-avatar" style="background: linear-gradient(135deg, ${review.color}, ${review.color}dd)">
                        ${review.name.charAt(0)}
                    </div>
                    <div class="review-author-info">
                        <h4>${review.name}</h4>
                        <p>${review.date}</p>
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
            `;
            container.appendChild(el);
        });
    }

    // ─── Booking Calculator ───
    function initBooking() {
        const checkinInput = $('#checkin-date');
        const checkoutInput = $('#checkout-date');
        const nightlyLabel = $('#nightly-label');
        const nightlyTotal = $('#nightly-total');
        const serviceFeeEl = $('#service-fee');
        const totalPriceEl = $('#total-price');

        // Set min dates
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        checkinInput.min = todayStr;

        // Default: 5-night stay starting tomorrow
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const checkout = new Date(tomorrow);
        checkout.setDate(checkout.getDate() + 5);

        checkinInput.value = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = checkout.toISOString().split('T')[0];
        checkoutInput.min = checkinInput.value;

        function recalculate() {
            const checkin = new Date(checkinInput.value);
            const checkoutDate = new Date(checkoutInput.value);
            const diffMs = checkoutDate - checkin;
            const nights = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));

            const nightly = PROPERTY.price * nights;
            const serviceFee = Math.round(nightly * PROPERTY.serviceFeeRate);
            const total = nightly + PROPERTY.cleaningFee + serviceFee;

            nightlyLabel.textContent = `$${PROPERTY.price} x ${nights} night${nights !== 1 ? 's' : ''}`;
            nightlyTotal.textContent = `$${nightly.toLocaleString()}`;
            serviceFeeEl.textContent = `$${serviceFee.toLocaleString()}`;
            totalPriceEl.textContent = `$${total.toLocaleString()}`;
        }

        checkinInput.addEventListener('change', () => {
            checkoutInput.min = checkinInput.value;
            const checkin = new Date(checkinInput.value);
            const existingCheckout = new Date(checkoutInput.value);
            if (existingCheckout <= checkin) {
                const newCheckout = new Date(checkin);
                newCheckout.setDate(newCheckout.getDate() + 1);
                checkoutInput.value = newCheckout.toISOString().split('T')[0];
            }
            recalculate();
        });

        checkoutInput.addEventListener('change', recalculate);

        recalculate();
    }

    // ─── Save & Share Buttons ───
    function initActions() {
        const saveBtn = $('#btn-save');
        let saved = false;

        saveBtn.addEventListener('click', () => {
            saved = !saved;
            const heart = saveBtn.querySelector('svg path');
            if (saved) {
                heart.setAttribute('fill', '#e91e63');
                heart.setAttribute('stroke', '#e91e63');
            } else {
                heart.setAttribute('fill', 'none');
                heart.setAttribute('stroke', 'currentColor');
            }
        });

        $('#btn-share').addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: "Kaili's Beachfront Condo",
                        text: 'Check out this amazing condo in Corpus Christi!',
                        url: window.location.href,
                    });
                } catch (e) {
                    // User cancelled share
                }
            } else {
                navigator.clipboard.writeText(window.location.href);
                const originalText = $('#btn-share').textContent;
                // Show feedback
                const shareBtn = $('#btn-share');
                const svgEl = shareBtn.querySelector('svg');
                shareBtn.textContent = ' Link copied!';
                shareBtn.prepend(svgEl);
                setTimeout(() => {
                    shareBtn.textContent = ' Share';
                    shareBtn.prepend(svgEl);
                }, 2000);
            }
        });
    }

    // ─── Scroll Animations ───
    function initScrollAnimations() {
        const sections = $$('.section-divider, .highlight-item, .sleep-card, .amenity-item, .review-item');
        sections.forEach((el) => el.classList.add('animate-on-scroll'));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        sections.forEach((el) => observer.observe(el));
    }

    // ─── Rating Bars Animation ───
    function initRatingBars() {
        const bars = $$('.rating-bar-fill');
        bars.forEach((bar) => {
            const finalWidth = bar.style.width;
            bar.style.width = '0%';

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                bar.style.width = finalWidth;
                            }, 200);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            observer.observe(bar);
        });
    }

    // ─── Reserve Button Interaction ───
    function initReserveButton() {
        const reserveBtn = $('#btn-reserve');
        const mobileReserveBtn = $('#mobile-btn-reserve');

        function handleReserve() {
            const checkin = $('#checkin-date').value;
            const checkout = $('#checkout-date').value;
            const guests = $('#guest-count').value;

            if (!checkin || !checkout) {
                // Highlight date inputs
                $('#booking-inputs').style.border = '2px solid #e91e63';
                setTimeout(() => {
                    $('#booking-inputs').style.border = '1px solid var(--color-border)';
                }, 2000);
                return;
            }

            // Animate button
            reserveBtn.textContent = 'Reserving...';
            reserveBtn.style.opacity = '0.7';
            setTimeout(() => {
                reserveBtn.textContent = '✓ Reserved!';
                reserveBtn.style.opacity = '1';
                reserveBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                setTimeout(() => {
                    reserveBtn.textContent = 'Reserve';
                    reserveBtn.style.background = 'var(--color-accent-gradient)';
                }, 3000);
            }, 1500);
        }

        reserveBtn.addEventListener('click', handleReserve);
        
        mobileReserveBtn.addEventListener('click', () => {
            // Scroll to booking section on larger screens or handle directly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ─── Initialize Everything ───
    function init() {
        initNavScroll();
        initGallery();
        initShowMore();
        initReviews();
        initBooking();
        initActions();
        initScrollAnimations();
        initRatingBars();
        initReserveButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
