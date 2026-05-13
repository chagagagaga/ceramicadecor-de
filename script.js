/* ===== CeramicaDecor DE - Main Script ===== */

/* ----- Microsoft Clarity ----- */
(function(c,l,a,r,i,t,y) {
  c[a] = c[a] || function() {
    (c[a].q = c[a].q || []).push(arguments);
  };
  t = l.createElement(r);
  t.async = 1;
  t.src = 'https://www.clarity.ms/tag/' + i;
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script', 'wn9tvhnw8i');

/* ----- Active WhatsApp destination by Moscow time ----- */
(function() {
  var PHONE_WEEK    = '77788657733';   // Mon 19:00 – Sat 19:00 MSK
  var PHONE_WEEKEND = '77788639911';   // Sat 19:00 – Mon 19:00 MSK

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

  window.ACTIVE_PHONE = isWeekend() ? PHONE_WEEKEND : PHONE_WEEK;

  var OLD_RAW = '77027352130';

  document.addEventListener('DOMContentLoaded', function() {
    var newRaw = window.ACTIVE_PHONE;

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

  /* ----- Hero lead modal ----- */
  function sendLeadForm(form, sourceLabel) {
    var nameInput = form.querySelector('input[name="name"]');
    var phoneInput = form.querySelector('input[name="phone"]');
    var emailInput = form.querySelector('input[name="email"]');
    var commentInput = form.querySelector('textarea[name="comment"]');

    if (!nameInput.value.trim()) {
      nameInput.focus();
      nameInput.style.borderColor = '#cb3b25';
      return false;
    }

    var phoneValue = phoneInput ? phoneInput.value.trim() : '';
    var emailValue = emailInput ? emailInput.value.trim() : '';

    if (!phoneValue && !emailValue) {
      var fieldToFocus = emailInput || phoneInput;
      if (fieldToFocus) {
        fieldToFocus.focus();
        fieldToFocus.style.borderColor = '#cb3b25';
        var inputGroup = fieldToFocus.closest('.input-group');
        if (inputGroup) inputGroup.style.borderColor = '#cb3b25';
      }
      return false;
    }

    if (typeof fbq === 'function') {
      fbq('track', 'Lead', {
        content_name: 'Contact Form',
        content_category: sourceLabel || 'Kamine'
      });
    }

    var tgText = '\uD83D\uDCCB Neue Anfrage von der Website!\n\uD83D\uDC64 Name: ' + nameInput.value.trim();
    tgText += '\n\u2709\uFE0F E-Mail: ' + (emailValue || '-');
    tgText += '\n\uD83D\uDCDE Telefon: ' + (phoneValue || '-');
    if (commentInput && commentInput.value.trim()) {
      tgText += '\n\uD83D\uDCDD Kommentar: ' + commentInput.value.trim();
    }
    tgText += '\n\uD83D\uDCC4 Seite: ' + document.title;
    tgText += '\n\uD83D\uDCCD Quelle: ' + (sourceLabel || 'Website-Formular');
    fetch('https://api.telegram.org/bot8724536509:AAGgAWOhsJ2n8T0xRmb3dOt7vQY3WwHVq3A/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '-1003871745435', text: tgText })
    });

    return true;
  }

  function ensureLeadModal() {
    if (document.getElementById('leadModal')) return;

    var style = document.createElement('style');
    style.textContent =
      '.lead-modal{position:fixed;inset:0;z-index:10001;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.62);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:18px}' +
      '.lead-modal.active{display:flex}' +
      '.lead-modal__dialog{position:relative;width:min(430px,100%);border-radius:18px;background:#151515;color:#fff;box-shadow:0 24px 80px rgba(0,0,0,.42);padding:28px 24px 24px;border:1px solid rgba(255,255,255,.12)}' +
      '.lead-modal__close{position:absolute;top:10px;right:10px;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:26px;line-height:1;cursor:pointer}' +
      '.lead-modal__title{margin:0 32px 8px 0;font-size:28px;line-height:1.08;font-weight:700;letter-spacing:0;font-family:inherit}' +
      '.lead-modal__text{margin:0 0 20px;color:rgba(255,255,255,.72);font-size:16px;line-height:1.35;letter-spacing:0}' +
      '.lead-modal .input-group{margin-bottom:14px}' +
      '.lead-modal label{display:block;margin-bottom:7px;color:rgba(255,255,255,.72);font-size:14px}' +
      '.lead-modal input{width:100%;height:52px;border-radius:10px;border:1px solid rgba(255,255,255,.18);background:#fff;color:#111;padding:0 14px;font-size:17px;outline:none}' +
      '.lead-modal input:focus{border-color:#e54836;box-shadow:0 0 0 3px rgba(229,72,54,.18)}' +
      '.lead-modal__privacy{margin:4px 0 18px;color:rgba(255,255,255,.55);font-size:12px;line-height:1.35}' +
      '.lead-modal__privacy a{color:rgba(255,255,255,.78);text-decoration:underline;text-underline-offset:2px}' +
      '.lead-modal__submit{width:100%;height:56px;border:0;border-radius:10px;background:#e54836;color:#fff;font-size:17px;font-weight:700;cursor:pointer}' +
      '.lead-modal__success{display:none;margin:14px 0 0;color:#25D366;font-size:16px;line-height:1.35}' +
      '@media(max-width:480px){.lead-modal__dialog{padding:24px 20px 20px}.lead-modal__title{font-size:24px}}';
    document.head.appendChild(style);

    var modal = document.createElement('div');
    modal.className = 'lead-modal';
    modal.id = 'leadModal';
    modal.innerHTML =
      '<div class="lead-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="leadModalTitle">' +
        '<button class="lead-modal__close" type="button" aria-label="Schliessen" data-lead-close>&times;</button>' +
        '<h2 class="lead-modal__title" id="leadModalTitle">Kostenloser 3D-Entwurf und Kostenschätzung in 2-3 Tagen</h2>' +
        '<p class="lead-modal__text">Hinterlassen Sie Ihre Kontaktdaten. Wir melden uns mit den nächsten Schritten.</p>' +
        '<form class="lead-modal__form" id="leadModalForm">' +
          '<div class="input-group"><label>Ihr Name</label><input type="text" name="name" placeholder="Name eingeben"></div>' +
          '<div class="input-group"><label>E-Mail</label><input type="email" name="email" autocomplete="email" placeholder="name@example.de"></div>' +
          '<div class="input-group"><label>Telefon (optional)</label><input type="tel" name="phone" inputmode="tel" autocomplete="tel" placeholder="+49 ..."></div>' +
          '<div class="lead-modal__privacy">Mit dem Absenden stimmen Sie unserer <a href="privacy.html" target="_blank">Datenschutzerklärung</a> zu.</div>' +
          '<button class="lead-modal__submit" type="submit">Anfrage senden</button>' +
          '<p class="lead-modal__success">Danke! Wir melden uns in Kürze bei Ihnen.</p>' +
        '</form>' +
      '</div>';
    document.body.appendChild(modal);

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    modal.addEventListener('click', function (event) {
      if (event.target === modal || event.target.closest('[data-lead-close]')) {
        closeModal();
      }
    });

    modal.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('focus', function () {
        this.style.borderColor = '';
        var inputGroup = this.closest('.input-group');
        if (inputGroup) inputGroup.style.borderColor = '';
      });
    });

    modal.querySelector('form').addEventListener('submit', function (event) {
      event.preventDefault();
      var submitBtn = this.querySelector('button[type="submit"]');
      var success = this.querySelector('.lead-modal__success');

      if (!sendLeadForm(this, 'Modalfenster')) return;

      submitBtn.textContent = 'Gesendet';
      submitBtn.disabled = true;
      submitBtn.style.background = '#2a8a2a';
      success.style.display = 'block';

      setTimeout(function () {
        closeModal();
        submitBtn.textContent = 'Anfrage senden';
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        success.style.display = 'none';
        modal.querySelector('form').reset();
      }, 2200);
    });
  }

  ensureLeadModal();

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a.btn[href="#contact"], button.btn[data-open-contact]');
    if (!link) return;
    if (!link.classList.contains('btn--primary')) return;
    if (link.classList.contains('header__nav-link') || link.closest('.footer')) return;

    event.preventDefault();
    event.stopPropagation();
    document.getElementById('leadModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var input = document.querySelector('#leadModal input[name="name"]');
      if (input) input.focus();
    }, 80);
  }, true);

  /* ----- Contact form handling ----- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameInput = this.querySelector('input[name="name"]');
      var phoneInput = this.querySelector('input[name="phone"]');
      var emailInput = this.querySelector('input[name="email"]');

      if (!nameInput.value.trim()) {
        nameInput.focus();
        nameInput.style.borderColor = '#cb3b25';
        return;
      }

      if (!((emailInput && emailInput.value.trim()) || (phoneInput && phoneInput.value.trim()))) {
        var fieldToFocus = emailInput || phoneInput;
        if (fieldToFocus) {
          fieldToFocus.focus();
          var inputGroup = fieldToFocus.closest('.input-group');
          if (inputGroup) inputGroup.style.borderColor = '#cb3b25';
        }
        return;
      }

      sendLeadForm(this, 'Website-Formular');

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

  /* ----- Meta Pixel: qualify WhatsApp clicks before Lead ----- */
  var pendingWhatsAppUrl = '';

  function getLeadDate() {
    var now = new Date();
    return String(now.getFullYear()) +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');
  }

  function getLeadNumber() {
    var stored = sessionStorage.getItem('ceramicadecor_lead_number');
    if (stored) return stored;

    var number = Math.random().toString(36).slice(2, 6).toUpperCase();

    sessionStorage.setItem('ceramicadecor_lead_number', number);
    sessionStorage.setItem('ceramicadecor_lead_date', getLeadDate());
    return number;
  }

  function getLeadCode() {
    var date = sessionStorage.getItem('ceramicadecor_lead_date') || getLeadDate();
    return 'CD-' + date + '-' + getLeadNumber();
  }

  function getWhatsAppUrl(link) {
    var href = link.href;
    var phoneMatch = href.match(/wa\.me\/(\d+)/);
    var phone = phoneMatch ? phoneMatch[1] : (window.ACTIVE_PHONE || '77027352130');
    var text = [
      'Guten Tag! Ich interessiere mich fur einen kostenlosen 3D-Entwurf und eine Kostenschatzung.',
      '',
      'Stadt / Region:',
      'Projektart:',
      'Ungefahre Masse:',
      'Fotos oder Plan: sende ich bei Bedarf mit',
      '',
      'Anfrage #' + getLeadNumber()
    ].join('\n');

    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text);
  }

  function ensureWhatsAppPopup() {
    if (document.getElementById('waSystemPopup')) return;

    var style = document.createElement('style');
    style.textContent =
      '.wa-system-popup{position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.42);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:20px}' +
      '.wa-system-popup.active{display:flex}' +
      '.wa-system-popup__dialog{width:min(320px,100%);overflow:hidden;border-radius:14px;background:rgba(245,245,247,.94);box-shadow:0 20px 60px rgba(0,0,0,.28);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Inter",Arial,sans-serif;text-align:center;color:#111}' +
      '.wa-system-popup__body{padding:22px 18px 20px}' +
      '.wa-system-popup__title{margin:0;font-size:17px;line-height:1.25;font-weight:600;letter-spacing:0}' +
      '.wa-system-popup__actions{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(60,60,67,.28)}' +
      '.wa-system-popup__button{appearance:none;border:0;background:transparent;min-height:44px;font:400 17px/1 -apple-system,BlinkMacSystemFont,"SF Pro Text","Inter",Arial,sans-serif;color:#007aff;cursor:pointer;letter-spacing:0}' +
      '.wa-system-popup__button + .wa-system-popup__button{border-left:1px solid rgba(60,60,67,.28)}' +
      '.wa-system-popup__button--confirm{font-weight:600}' +
      '@media (hover:hover){.wa-system-popup__button:hover{background:rgba(0,0,0,.04)}}';
    document.head.appendChild(style);

    var popup = document.createElement('div');
    popup.className = 'wa-system-popup';
    popup.id = 'waSystemPopup';
    popup.innerHTML =
      '<div class="wa-system-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="waSystemPopupTitle">' +
        '<div class="wa-system-popup__body">' +
          '<p class="wa-system-popup__title" id="waSystemPopupTitle">WhatsApp öffnen?</p>' +
        '</div>' +
        '<div class="wa-system-popup__actions">' +
          '<button type="button" class="wa-system-popup__button" data-wa-cancel>Abbrechen</button>' +
          '<button type="button" class="wa-system-popup__button wa-system-popup__button--confirm" data-wa-confirm>Öffnen</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(popup);

    popup.addEventListener('click', function (event) {
      if (event.target === popup || event.target.closest('[data-wa-cancel]')) {
        popup.classList.remove('active');
        pendingWhatsAppUrl = '';
      }
    });

    popup.querySelector('[data-wa-confirm]').addEventListener('click', function () {
      var url = pendingWhatsAppUrl;
      popup.classList.remove('active');
      pendingWhatsAppUrl = '';

      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'WhatsApp Confirmed Open',
          content_category: '3D Project Request',
          lead_code: getLeadCode()
        });
      }

      if (url) window.location.href = url;
    });
  }

  ensureWhatsAppPopup();

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;

    e.preventDefault();
    pendingWhatsAppUrl = getWhatsAppUrl(link);

    if (typeof fbq === 'function') {
      fbq('trackCustom', 'WhatsAppIntent', {
        content_name: 'WhatsApp Button Click',
        lead_code: getLeadCode()
      });
    }

    document.getElementById('waSystemPopup').classList.add('active');
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
