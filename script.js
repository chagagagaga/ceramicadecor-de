/* ===== CeramicaDecor DE - Main Script ===== */

/* ----- Active phone rotation by Moscow time ----- */
(function() {
  var PHONE_WEEK    = '77788657733';   // Mon 19:00 – Sat 19:00 MSK
  var PHONE_WEEKEND = '77788639911';   // Sat 19:00 – Mon 19:00 MSK
  var FMT_WEEK    = '+7 778 865 77 33';
  var FMT_WEEKEND = '+7 778 863 99 11';

  function getMoscowDate() {
    var now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() + 180) * 60000);
  }

  function isWeekend() {
    var msk = getMoscowDate();
    var d = msk.getDay();   // 0=Sun, 1=Mon, ..., 6=Sat
    var h = msk.getHours();
    return (d === 6 && h >= 19) || d === 0 || (d === 1 && h < 19);
  }

  window.ACTIVE_PHONE     = isWeekend() ? PHONE_WEEKEND : PHONE_WEEK;
  window.ACTIVE_PHONE_FMT = isWeekend() ? FMT_WEEKEND   : FMT_WEEK;

  var OLD_RAW = '77027352130';
  var OLD_FMT = '+7 702 735 21 30';

  document.addEventListener('DOMContentLoaded', function() {
    var newRaw = window.ACTIVE_PHONE;
    var newFmt = window.ACTIVE_PHONE_FMT;

    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      a.href = 'tel:+' + newRaw;
      if (a.textContent.trim() === OLD_FMT) a.textContent = newFmt;
    });

    document.querySelectorAll('a[href*="wa.me/' + OLD_RAW + '"]').forEach(function (a) {
      a.href = a.href.replace('wa.me/' + OLD_RAW, 'wa.me/' + newRaw);
    });
  });
})();

(function() {
  'use strict';

  /* ----- Header scroll effect ----- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Mobile menu ----- */
  const burger = document.getElementById('burgerBtn');
  const nav = document.getElementById('mainNav');
  let overlay = document.createElement('div');
  overlay.className = 'mobile-overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    const isOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', isOpen);
    burger.classList.toggle('active', isOpen);
    overlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) {
      nav.style.removeProperty('--drawer-correction');
      nav.style.removeProperty('margin-left');
      nav.style.removeProperty('width');
    } else {
      nav.style.removeProperty('--drawer-correction');
      nav.style.removeProperty('margin-left');
      nav.style.removeProperty('width');
    }
  }

  function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('active');
    overlay.classList.remove('active');
    nav.style.removeProperty('--drawer-correction');
    nav.style.removeProperty('margin-left');
    nav.style.removeProperty('width');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  // Close menu on nav link click
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href') || '';
      closeMenu();
      if (!href || href === '#') {
        e.preventDefault();
      }
    });
  });

  document.addEventListener('click', function(e) {
    var link = e.target.closest('#mainNav a');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    var target = link.getAttribute('target') || '';
    if (!href || href === '#' || href.charAt(0) === '#' || target) return;
    e.preventDefault();
    closeMenu();
    window.location.assign(new URL(href, window.location.href).href);
  }, true);

  /* ----- Smooth scroll for anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
        var y = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* ----- FAQ Accordion ----- */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function() {
      var item = this.parentElement;
      var isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq__item.active').forEach(function (openItem) {
        openItem.classList.remove('active');
        openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ----- Our Products: no slider needed, grid layout ----- */

  /* ----- Category Tabs ----- */
  /* Tabs on index.html are links to catalog.html — no preventDefault needed */

  /* ----- Intersection Observer for fade-up animations ----- */
  var fadeElements = document.querySelectorAll(
    'section:not(.hero) > .container > *,' +
    '.about__card, .quality__col, .our-products__block,' +
    '.process-steps__step, .stats__item, .team__inner,' +
    '.video-reviews__card, .catalog-preview__card,' +
    '.faq__item, .cta-section__inner,' +
    '.contact__form-side, .contact__info-side,' +
    '.showcase__gallery, .showcase__name, .showcase__bottom,' +
    '.footer__top, .footer__bottom,' +
    '.izrazcy-hero__title, .izrazcy-hero__subtitle'
  );

  fadeElements.forEach(function (el) {
    // Skip cat-cards section, catalog grid, ready grid, izrazcy catalog layout, and about-info — show immediately
    if (el.closest('.cat-cards') || el.closest('.catalog-grid') || el.classList.contains('ready-grid') || el.classList.contains('izrazcy-catalog__layout') || el.closest('.about-info')) return;
    if (!el.classList.contains('fade-up')) {
      el.classList.add('fade-up');
    }
  });

  // Add stagger delays for grouped items
  document.querySelectorAll('.about__cards .about__card').forEach(function (card, i) {
    card.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.quality__col').forEach(function (col, i) {
    col.setAttribute('data-delay', String(i + 1));
  });
  // cat-cards show immediately, no stagger
  document.querySelectorAll('.stats__item').forEach(function (item, i) {
    item.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.catalog-preview__card').forEach(function (card, i) {
    card.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.video-reviews__card').forEach(function (card, i) {
    card.setAttribute('data-delay', String(i + 1));
  });
  document.querySelectorAll('.faq__item').forEach(function (item, i) {
    item.setAttribute('data-delay', String(i + 1));
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----- Contact form handling ----- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = this.querySelector('input[name="name"]');
      var phoneInput = this.querySelector('input[name="phone"]');

      if (!nameInput.value.trim()) {
        nameInput.focus();
        nameInput.style.borderColor = '#cb3b25';
        return;
      }

      if (!phoneInput.value.trim() || phoneInput.value.trim().length < 7) {
        phoneInput.focus();
        var inputGroup = phoneInput.closest('.input-group');
        if (inputGroup) inputGroup.style.borderColor = '#cb3b25';
        return;
      }

      // Track Lead conversion (Facebook Pixel)
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'Contact Form',
          content_category: 'Kamine'
        });
      }

      // Send to Telegram
      var tgText = '\uD83D\uDCCB Neue Anfrage von der Website!\n\uD83D\uDC64 Name: ' + nameInput.value.trim() + '\n\uD83D\uDCDE Telefon: ' + phoneInput.value.trim();
      tgText += '\n\uD83D\uDCC4 Seite: ' + document.title;
      fetch('https://api.telegram.org/bot8724536509:AAGgAWOhsJ2n8T0xRmb3dOt7vQY3WwHVq3A/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: '-1003871745435', text: tgText })
      });

      // Visual feedback
      var submitBtn = this.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Gesendet!';
      submitBtn.style.background = '#2a8a2a';
      submitBtn.style.borderColor = '#2a8a2a';
      submitBtn.disabled = true;

      setTimeout(function() {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });

    // Reset input styles on focus
    contactForm.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('focus', function() {
        this.style.borderColor = '';
        var inputGroup = this.closest('.input-group');
        if (inputGroup) inputGroup.style.borderColor = '';
      });
    });
  }

  /* ----- Phone input mask (all tel inputs) ----- */
  document.querySelectorAll('input[type="tel"]').forEach(function (phoneInput) {
    phoneInput.addEventListener('focus', function() {
      if (!this.value || this.value === '+49') {
        this.value = '+49 ';
      }
    });
    phoneInput.addEventListener('input', function() {
      var val = this.value.replace(/\D/g, '');
      // Remove leading 49 if present
      if (val.indexOf('49') === 0) val = val.substring(2);
      this.value = '+49 ' + val.substring(0, 14);
    });
  });

  /* ----- Showcase Gallery Slider (multiple galleries) ----- */
  var allGalleries = document.querySelectorAll('.showcase__item .showcase__gallery');
  allGalleries.forEach(function (showcaseGallery) {
    var track = showcaseGallery.querySelector('.showcase__track');
    var slides = showcaseGallery.querySelectorAll('.showcase__slide');
    var leftArrow = showcaseGallery.querySelector('.showcase__arrow--left');
    var rightArrow = showcaseGallery.querySelector('.showcase__arrow--right');
    var dotsContainer = showcaseGallery.querySelector('.showcase__dots');
    var currentSlide = 0;
    var totalSlides = slides.length;

    // Create dots
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement('button');
      dot.className = 'showcase__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Gleiten ' + (i + 1));
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.showcase__dot');

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      dots.forEach(function (d, di) {
        d.classList.toggle('active', di === currentSlide);
      });
    }

    leftArrow.addEventListener('click', function() { goToSlide(currentSlide - 1); });
    rightArrow.addEventListener('click', function() { goToSlide(currentSlide + 1); });

    dotsContainer.addEventListener('click', function (e) {
      var dot = e.target.closest('.showcase__dot');
      if (dot) goToSlide(parseInt(dot.dataset.index));
    });

    // Touch/swipe support
    var touchStartX = 0;
    var touchEndX = 0;

    showcaseGallery.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    showcaseGallery.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
      }
    }, { passive: true });
  });

  /* ----- Lightbox ----- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('.lightbox__img');
    var lightboxClose = lightbox.querySelector('.lightbox__close');
    var lightboxLeft = lightbox.querySelector('.lightbox__arrow--left');
    var lightboxRight = lightbox.querySelector('.lightbox__arrow--right');
    var lightboxSlides = document.querySelectorAll('.showcase__slide img');
    var lightboxIndex = 0;

    function showLightbox(index) {
      if (index < 0) index = lightboxSlides.length - 1;
      if (index >= lightboxSlides.length) index = 0;
      lightboxIndex = index;
      lightboxImg.src = lightboxSlides[lightboxIndex].src;
      lightboxImg.alt = lightboxSlides[lightboxIndex].alt;
    }

    lightboxSlides.forEach(function (img, i) {
      img.addEventListener('click', function() {
        showLightbox(i);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxLeft.addEventListener('click', function() { showLightbox(lightboxIndex - 1); });
    lightboxRight.addEventListener('click', function() { showLightbox(lightboxIndex + 1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
    });

    // Swipe in lightbox
    var lbTouchStartX = 0;
    lightbox.addEventListener('touchstart', function (e) {
      lbTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    lightbox.addEventListener('touchend', function (e) {
      var diff = lbTouchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showLightbox(lightboxIndex + 1);
        else showLightbox(lightboxIndex - 1);
      }
    }, { passive: true });
  }

  /* ----- Meta Pixel: Track WhatsApp clicks as Lead ----- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (link && typeof fbq === 'function') {
      fbq('track', 'Lead', { content_name: 'WhatsApp Click' });
    }
  });

  /* ----- Facebook Pixel: Track catalog views ----- */
  document.querySelectorAll('a[href*="catalog.html"]').forEach(function (link) {
    link.addEventListener('click', function() {
      if (typeof fbq === 'function') {
        fbq('track', 'ViewContent', { content_type: 'product_group', content_name: 'Catalog' });
      }
    });
  });

  /* ----- YouTube video reviews ----- */
  document.querySelectorAll('.one_story--video').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var youtubeId = this.dataset.youtube;
      if (!youtubeId) return;
      var imageDiv = this.querySelector('.image');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + youtubeId + '?autoplay=1&rel=0';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.borderRadius = '12px';
      imageDiv.style.position = 'relative';
      imageDiv.innerHTML = '';
      imageDiv.appendChild(iframe);
    });
  });

  /* ----- Stories slider arrows & counter ----- */
  var storiesSlider = document.querySelector('.stories_slider');
  if (storiesSlider) {
    var storiesItems = storiesSlider.querySelectorAll('.one_story');
    var storiesCurrent = document.querySelector('.stories_current');
    var storiesLeftBtn = document.querySelector('.stories_arrow--left');
    var storiesRightBtn = document.querySelector('.stories_arrow--right');

    function updateStoriesCounter() {
      if (!storiesCurrent || !storiesItems.length) return;
      var scrollLeft = storiesSlider.scrollLeft;
      var itemWidth = storiesItems[0].offsetWidth + 15;
      var index = Math.round(scrollLeft / itemWidth) + 1;
      storiesCurrent.textContent = Math.min(index, storiesItems.length);
    }

    storiesSlider.addEventListener('scroll', updateStoriesCounter, { passive: true });

    if (storiesLeftBtn) {
      storiesLeftBtn.addEventListener('click', function() {
        var itemWidth = storiesItems[0].offsetWidth + 15;
        if (storiesSlider.scrollLeft <= 10) {
          storiesSlider.scrollTo({ left: storiesSlider.scrollWidth, behavior: 'smooth' });
        } else {
          storiesSlider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
      });
    }
    if (storiesRightBtn) {
      storiesRightBtn.addEventListener('click', function() {
        var itemWidth = storiesItems[0].offsetWidth + 15;
        var maxScroll = storiesSlider.scrollWidth - storiesSlider.clientWidth;
        if (storiesSlider.scrollLeft >= maxScroll - 10) {
          storiesSlider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          storiesSlider.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }
      });
    }
  }

  /* ----- Window resize ----- */
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    }, 200);
  });

})();
