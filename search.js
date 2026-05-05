/* ===== CeramicaDecor — Site Search ===== */
(function() {
  'use strict';

  /* ----- Site pages ----- */
  var PAGES = [
    { title: 'Kamine', url: 'catalog.html?cat=kaminy', desc: 'Handgefertigte Kachelkamine' },
    { title: 'Outdoor-Küchen', url: 'catalog.html?cat=bbq', desc: 'Grill- und Sommerküchen' },
    { title: 'Ofenkacheln', url: 'izrazcy.html', desc: 'Kachelkatalog – über 1300 Artikel' },
    { title: 'Über uns', url: 'about.html', desc: 'CeramicaDecor – 14 Jahre Erfahrung' },
    { title: 'Unsere Werke', url: 'works.html', desc: 'Portfolio abgeschlossener Projekte' },
    { title: 'Rezensionen', url: 'reviews.html', desc: 'Bewertungen unserer Kunden' },
    { title: 'Kontakt', url: 'contacts.html', desc: 'Kontaktieren Sie uns' }
  ];

  /* ----- Catalog products (kaminy + bbq) ----- */
  var PRODUCTS = [
    {id:'kamin-albion',cat:'kaminy',name:'Kamin Albion',desc:'Klassischer weißer Albion-Kamin mit LISEO CASTIRON-Einsatz',price:'ab 7.400 €',img:'kamin_albion_new_1.jpg'},
    {id:'kamin-albion-bio',cat:'kaminy',name:'Biokamin Albion',desc:'Vor einem Biokamin mit Albion-Kacheln in Majolika-Glasur',price:'ab 7.400 €',img:'kamin_albion_bio_new_1.jpg'},
    {id:'kamin-tulpan',cat:'kaminy',name:'Kamin-Tulpe',desc:'Kamin in Tulip-Verkleidung mit L-förmigem Feuerraum Ecofireplace Alpha 1000 RB',price:'ab 11.000 €',img:'kamin_tulpan_new_1.jpg'},
    {id:'kamin-tulpan-arktika',cat:'kaminy',name:'Kamin Tulip Arctic',desc:'Kaminsims-Set Tulip in arktischer Farbe',price:'ab 7.900 €',img:'kamin_tulpan_arktika_new_1.jpg'},
    {id:'kamin-versal',cat:'kaminy',name:'Kamin Versailles',desc:'Versailles-Kachelkamin in der Farbe Arctic Lagoon',price:'ab 10.100 €',img:'kamin_versal_new_1.jpg'},
    {id:'kamin-bristol',cat:'kaminy',name:'Kamin Bristol',desc:'Kamin mit U-förmigem Feuerraum in Bristol-Verkleidung in der Farbe Nachtschwarz',price:'ab 9.700 €',img:'kamin_bristol_new_1.jpg'},
    {id:'kamin-dorf',cat:'kaminy',name:'Kamin Dorf',desc:'Biokamin Dorf mit Feuerstelle Airtone Andalle 1000',price:'ab 18.000 €',img:'kamin_dorf_new_1.jpg'},
    {id:'kamin-dorf-murav',cat:'kaminy',name:'Kamin Dorf Ant',desc:'Kaminsims-Set „Dorf“ in Muravleny-Farbe',price:'ab 12.500 €',img:'kamin_dorf_murav_new_1.jpg'},
    {id:'kamin-artnuvo',cat:'kaminy',name:'Kamin im Jugendstil',desc:'Jugendstil-Kaminsims in Pistazien-Dekorpalette',price:'ab 7.400 €',img:'kamin_artnuvo_new_1.jpg'},
    {id:'kamin-pticy',cat:'kaminy',name:'Kaminvögel',desc:'Kachelkamin mit Einsatz Astov P2S in Bird-Verkleidung',price:'ab 13.800 €',img:'kamin_pticy_new_1.jpg'},
    {id:'kamin-vizantiya',cat:'kaminy',name:'Kamin Byzanz',desc:'Kachelkamin Byzanz bemalt Oliva',price:'ab 12.500 €',img:'kamin_vizantiya_1.jpg'},
    {id:'kamin-rollers',cat:'kaminy',name:'Kaminrollen',desc:'Kamin mit Einsatz Astov P2S 8457, ausgekleidet mit Kacheln aus der Rollers-Kollektion',price:'ab 14.700 €',img:'kamin_rollers_new_1.jpg'},
    {id:'kamin-luna',cat:'kaminy',name:'Kaminmond',desc:'Kamin im klassischen Stil aus der Luna-Kollektion mit einem Spartherm Linear 4S Arte-Feuerraum',price:'ab 9.200 €',img:'kamin_luna_new_1.jpg'},
    {id:'kamin-universal',cat:'kaminy',name:'Kaminportal Universal',desc:'Kaminportal Kombi in arktischer Farbe',price:'ab 3.700 €',img:'kamin_universal_6.jpg'},
    {id:'kamin-universal-uglov',cat:'kaminy',name:'Eckkamin Universal',desc:'Verkleidung eines Eckkamins mit Universalfliesen',price:'ab 3.700 €',img:'kamin_universal_uglov_1.jpg'},
    {id:'kamin-provans',cat:'kaminy',name:'Kamin-Cameo',desc:'Kachelkamin aus der Cameo-Kollektion mit handgefertigter künstlerischer Bemalung',price:'ab 6.100 €',img:'kamin_kameya_new_1.jpg'},
    {id:'kamin-bravo',cat:'kaminy',name:'Kamin Bravo',desc:'Kamin mit bemalten Kacheln aus der Bravo-Kollektion',price:'ab 8.500 €',img:'kamin_bravo_4.jpg'},
    {id:'kamin-soho',cat:'kaminy',name:'Kamin Soho',desc:'Kaminverkleidung bis zum Kaminsims mit Holzbrennern an den Seiten in der Soho-Kollektion',price:'ab 15.600 €',img:'kamin_soho_new_1.jpg'},
    {id:'kamin-usadba',cat:'kaminy',name:'Kamin-Herrenhaus',desc:'Kachelofen Manor mit prismatischem Eckfeuerraum',price:'ab 9.400 €',img:'kamin_usadba_new_1.jpg'},
    {id:'kamin-ptichki',cat:'kaminy',name:'Kaminvögel',desc:'Kaminsims „Vögel“ in der dekorativen Palette „Lesnaya“.',price:'ab 8.100 €',img:'kamin_ptichki_new_1.jpg'},
    {id:'kamin-elegans',cat:'kaminy',name:'Kamin-Eleganz',desc:'Kaminsims-Set Elegance in der Farbe Forest Mist',price:'ab 9.400 €',img:'kamin_elegans_2.jpg'},
    {id:'kamin-minimalist',cat:'kaminy',name:'Kamin minimalistisch',desc:'Kaminsims im minimalistischen Stil',price:'ab 9.200 €',img:'kamin_minimalist_new_1.jpg'},
    {id:'kamin-venskaya',cat:'kaminy',name:'Kamin Wiener',desc:'Weißer Elektrokamin mit Kacheln aus der Vienna-Kollektion',price:'ab 8.100 €',img:'kamin_venskaya_1.jpg'},
    {id:'kamin-dorf-brunner',cat:'kaminy',name:'Wiener Kamin mit Brunner-Einsatz',desc:'Klassischer Kamin der Wiener Kollektion mit Brunner-Feuerraum',price:'ab 21.100 €',img:'kamin_venskaya_brunner_new2_1.jpg'},
    {id:'bbq-albion',cat:'bbq',name:'Outdoor-Küche Albion mit Grill und Kessel',desc:'Grillplatz mit Grill und Kessel in einem Landhaus',price:'ab 13.600 €',img:'bbq_albion_new_1.jpg'},
    {id:'bbq-albion-mini',cat:'bbq',name:'Outdoor-Küche Albion mit Grill',desc:'Verkleidung einer kleinen Ofenanlage mit Grill',price:'ab 11.900 €',img:'bbq_albion_mini_new_1.jpg'},
    {id:'bbq-versal',cat:'bbq',name:'Outdoor-Küche Versailles',desc:'Outdoor-Küche im gefliesten Versailles',price:'ab 34.200 €',img:'bbq_versal_new_1.jpg'},
    {id:'bbq-versal-siniy',cat:'bbq',name:'Sommerküche Versailles',desc:'Multifunktionale Sommerküche mit Versailles-Kacheln verkleidet',price:'ab 42.300 €',img:'bbq_versal_siniy_new_1.jpg'},
    {id:'bbq-tulpan',cat:'bbq',name:'Kohlenbecken-Tulpe',desc:'Weißer Grill mit Kacheln aus der Tulip-Kollektion',price:'ab 11.800 €',img:'bbq_tulpan_new_1.jpg'},
    {id:'bbq-dorf',cat:'bbq',name:'Exklusive Küche mit Ofenkachelnverkleidung',desc:'Ein groß angelegtes Premiumprojekt, verkleidet mit Kacheln aus der Dorf-Kollektion',price:'ab 46.000 €',img:'bbq_dorf_1.jpg'},
    {id:'bbq-dorf-mangal',cat:'bbq',name:'Grillanlage Dorf mit Grill und Backofen',desc:'Grillanlage mit leuchtend grünen Kacheln aus der Dorf-Kollektion',price:'ab 16.500 €',img:'bbq_dorf_mangal_new_1.jpg'},
    {id:'bbq-ptichki',cat:'bbq',name:'Outdoor-Küche Vögel',desc:'Outdoor-Küche in der hellen Verkleidung von Ptichki',price:'ab 12.100 €',img:'bbq_ptichki_new_1.jpg'},
    {id:'bbq-ptichki-elegans',cat:'bbq',name:'Outdoor-Küche Birds and Elegance',desc:'Ofenkomplex mit Grill und Kesselofen in Elegance und Ptichki-Verkleidung',price:'ab 19.100 €',img:'bbq_ptichki_elegans_1.jpg'},
    {id:'bbq-pticy',cat:'bbq',name:'Outdoor-Küche Vögel',desc:'Komplexer gemauerter Ofen aus der Birds-Kollektion',price:'ab 38.600 €',img:'bbq_pticy_new_1.jpg'},
    {id:'bbq-vizantiya',cat:'bbq',name:'Sommerküche Byzanz',desc:'Sommerküche mit Byzanz-Ofenkachelnverkleidung',price:'ab 8.500 €',img:'bbq_vizantiya_new_1.jpg'},
    {id:'bbq-vizantiya-kamin',cat:'bbq',name:'Outdoor-Küche Byzanz mit Kamin',desc:'Dem Ofenkomplex zugewandt ist ein hoher offener Kamin mit byzantinischen Kacheln',price:'ab 77.200 €',img:'bbq_vizantiya_kamin_new_1.jpg'},
    {id:'bbq-vizantiya-big',cat:'bbq',name:'Ofenkomplex mit byzantinischer Ofenkachelnverkleidung und Pavillon',desc:'Ofenkachelnverkleidung von Byzanz in der Türkis-Malpalette',price:'ab 52.400 €',img:'bbq_vizantiya_big_new_1.jpg'},
    {id:'bbq-azulezhu',cat:'bbq',name:'Azulejo grillen',desc:'Kohlenbecken in der Küche aus Kacheln aus der Azulejo-Kollektion',price:'ab 6.800 €',img:'bbq_azulezhu_new_1.jpg'},
    {id:'bbq-elegans',cat:'bbq',name:'Outdoor-Küche Eleganz',desc:'Verkleidung einer fertigen Ofenanlage mit Grill, Backofen und Herd',price:'ab 30.000 €',img:'bbq_elegans_new_1.jpg'},
    {id:'bbq-elegans-granit',cat:'bbq',name:'Sommerküche Eleganz',desc:'Sommerküche mit Ofenkachelnverkleidung aus der Elegance-Kollektion und Granit-Arbeitsplatten',price:'ab 8.600 €',img:'bbq_elegans_granit_new_1.jpg'},
    {id:'bbq-scenki',cat:'bbq',name:'Outdoor-Küche Cameo',desc:'Grillanlage mit Ofenkachelnverkleidung und kunstvoller Vogelmalerei',price:'ab 17.600 €',img:'bbq_scenki_new_1.jpg'}
  ];

  /* ----- State ----- */
  var izrazcyLoaded = false;
  var izrazcyLoading = false;
  var pendingQuery = null;
  var modalEl = null;
  var inputEl, resultsEl, clearBtnEl;
  var isOpen = false;
  var searchTimer;

  /* ----- Modal template ----- */
  var SEARCH_ICON_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

  function createModal() {
    var div = document.createElement('div');
    div.innerHTML =
      '<div class="search-modal" id="siteSearchModal" role="dialog" aria-modal="true" aria-label="Suchen">' +
        '<div class="search-modal__backdrop" id="siteSearchBackdrop"></div>' +
        '<div class="search-modal__panel">' +
          '<div class="search-modal__head">' +
            '<div class="search-modal__input-wrap">' +
              '<span class="search-modal__icon">' + SEARCH_ICON_SVG + '</span>' +
              '<input type="search" class="search-modal__input" id="siteSearchInput" placeholder="Durchsuchen Sie die Website..." autocomplete="off" spellcheck="false">' +
              '<button class="search-modal__clear" id="siteSearchClear" aria-label="Klar" style="display:none">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
              '</button>' +
            '</div>' +
            '<button class="search-modal__close" id="siteSearchClose" aria-label="Schließen">' +
              '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
          '<div class="search-modal__results" id="siteSearchResults"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(div.firstElementChild);

    modalEl = document.getElementById('siteSearchModal');
    inputEl = document.getElementById('siteSearchInput');
    resultsEl = document.getElementById('siteSearchResults');
    clearBtnEl = document.getElementById('siteSearchClear');

    document.getElementById('siteSearchClose').addEventListener('click', closeSearch);
    document.getElementById('siteSearchBackdrop').addEventListener('click', closeSearch);

    clearBtnEl.addEventListener('click', function() {
      inputEl.value = '';
      clearBtnEl.style.display = 'none';
      inputEl.focus();
      showDefault();
    });

    inputEl.addEventListener('input', onInput);
    document.addEventListener('keydown', onKeydown);
  }

  /* ----- Open / Close ----- */
  function openSearch() {
    if (!modalEl) createModal();
    // check if izrazcy is already available (e.g. on izrazcy.html)
    if (typeof window.izrazcyCatalog !== 'undefined') izrazcyLoaded = true;
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    isOpen = true;
    setTimeout(function() { inputEl.focus(); }, 50);
    showDefault();
    if (!izrazcyLoaded && !izrazcyLoading) loadIzrazcyData();
  }

  function closeSearch() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    document.body.style.overflow = '';
    isOpen = false;
    inputEl.value = '';
    clearBtnEl.style.display = 'none';
    pendingQuery = null;
  }

  /* ----- Lazy load izrazcy-data.js ----- */
  function loadIzrazcyData() {
    izrazcyLoading = true;
    // Determine base path (works both from root and potential subdirs)
    var scripts = document.getElementsByTagName('script');
    var base = '';
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('search.js') !== -1) {
        base = src.replace('search.js', '');
        break;
      }
    }
    var s = document.createElement('script');
    s.src = base + 'izrazcy-data.js';
    s.onload = function() {
      izrazcyLoaded = true;
      izrazcyLoading = false;
      if (pendingQuery && isOpen) doSearch(pendingQuery);
    };
    s.onerror = function() {
      izrazcyLoading = false;
    };
    document.head.appendChild(s);
  }

  /* ----- Input handler with debounce ----- */
  function onInput() {
    var q = inputEl.value.trim();
    clearBtnEl.style.display = q ? 'flex' : 'none';
    clearTimeout(searchTimer);
    if (!q) { showDefault(); return; }
    searchTimer = setTimeout(function() { doSearch(q); }, 200);
  }

  /* ----- Keyboard ----- */
  function onKeydown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape') closeSearch();
  }

  /* ----- Search logic ----- */
  function doSearch(q) {
    var ql = q.toLowerCase();
    pendingQuery = q;

    var pageResults = PAGES.filter(function (p) {
      return contains(p.title, ql) || contains(p.desc, ql);
    });

    var kaminyResults = PRODUCTS.filter(function (p) {
      return p.cat === 'kaminy' && (contains(p.name, ql) || contains(p.desc, ql));
    }).slice(0, 6);

    var bbqResults = PRODUCTS.filter(function (p) {
      return p.cat === 'bbq' && (contains(p.name, ql) || contains(p.desc, ql));
    }).slice(0, 6);

    var izrazcyResults = [];
    if (typeof window.izrazcyCatalog !== 'undefined') {
      izrazcyLoaded = true;
      izrazcyResults = window.izrazcyCatalog.filter(function (item) {
        return contains(item.n, ql) ||
               contains(item.a, ql) ||
               (item.colors && item.colors.join(' ').toLowerCase().indexOf(ql) !== -1) ||
               contains(item.style, ql) ||
               contains(item.type, ql) ||
               contains(item.surface, ql);
      }).slice(0, 8);
    }

    renderResults(q, pageResults, kaminyResults, bbqResults, izrazcyResults);
  }

  function contains(str, sub) {
    return str && str.toLowerCase().indexOf(sub) !== -1;
  }

  /* ----- Render results ----- */
  function renderResults(q, pages, kaminy, bbq, izrazcy) {
    var total = pages.length + kaminy.length + bbq.length + izrazcy.length;
    var html = '';

    if (total === 0) {
      html = '<div class="search-empty">' +
        '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<p>Auf Anfrage<b>«' + escHtml(q) + '»</b>nichts gefunden</p>' +
        (izrazcyLoading ? '<span class="search-loading-hint">Kacheln werden geladen...</span>' : '') +
      '</div>';
      resultsEl.innerHTML = html;
      return;
    }

    if (pages.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Abschnitte der Website</div>';
      pages.forEach(function (p) {
        html += '<a href="' + escHtml(p.url) + '" class="search-result-page">' +
          '<div class="search-result-page__icon">' + SEARCH_ICON_SVG + '</div>' +
          '<div>' +
            '<div class="search-result-page__title">' + highlight(p.title, q) + '</div>' +
            '<div class="search-result-page__desc">' + escHtml(p.desc) + '</div>' +
          '</div>' +
        '</a>';
      });
      html += '</div>';
    }

    if (kaminy.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Kamine</div>' +
        '<div class="search-products-grid">';
      kaminy.forEach(function (p) { html += productCard(p, q); });
      html += '</div></div>';
    }

    if (bbq.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Outdoor-Küchen</div>' +
        '<div class="search-products-grid">';
      bbq.forEach(function (p) { html += productCard(p, q); });
      html += '</div></div>';
    }

    if (izrazcy.length) {
      html += '<div class="search-section">' +
        '<div class="search-section__title">Ofenkacheln</div>' +
        '<div class="search-products-grid">';
      izrazcy.forEach(function (item) { html += izrazcyCard(item, q); });
      html += '</div></div>';
    } else if (izrazcyLoading) {
      html += '<div class="search-loading-hint">Laden des Kachelkatalogs...</div>';
    }

    resultsEl.innerHTML = html;
  }

  /* ----- Default state (no query) ----- */
  function showDefault() {
    var html = '<div class="search-section"><div class="search-section__title">Abschnitte der Website</div>';
    PAGES.forEach(function (p) {
      html += '<a href="' + escHtml(p.url) + '" class="search-result-page">' +
        '<div class="search-result-page__icon">' + SEARCH_ICON_SVG + '</div>' +
        '<div>' +
          '<div class="search-result-page__title">' + escHtml(p.title) + '</div>' +
          '<div class="search-result-page__desc">' + escHtml(p.desc) + '</div>' +
        '</div>' +
      '</a>';
    });
    html += '</div>';
    resultsEl.innerHTML = html;
  }

  /* ----- Product card ----- */
  function productCard(p, q) {
    var url = 'catalog.html?cat=' + p.cat + '&product=' + p.id;
    return '<a href="' + escHtml(url) + '" class="search-result-product">' +
      '<div class="search-result-product__img">' +
        '<img src="images/' + escHtml(p.img) + '" alt="' + escHtml(p.name) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="search-result-product__info">' +
        '<div class="search-result-product__name">' + highlight(p.name, q) + '</div>' +
        '<div class="search-result-product__price">' + escHtml(p.price) + '</div>' +
      '</div>' +
    '</a>';
  }

  /* ----- Izrazcy card ----- */
  function izrazcyCard(item, q) {
    var imgUrl = 'images/izrazcy/' + (item.img || '').replace(/\//g, '_') + '.jpg';
    var article = item.a || '';
    var url = 'izrazcy.html?article=' + encodeURIComponent(article);
    var cleanName = cleanIzrazcyText(item.n || '');
    return '<a href="' + escHtml(url) + '" class="search-result-product">' +
      '<div class="search-result-product__img">' +
        '<img src="' + escHtml(imgUrl) + '" alt="' + escHtml(cleanName) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="search-result-product__info">' +
        '<div class="search-result-product__name">' + highlight(cleanName, q) + '</div>' +
        '<div class="search-result-product__price">' + (item.p ? formatIzrazcyPrice(item.p) : '') + '</div>' +
        (article ? '<div class="search-result-product__art">Art.-Nr. ' + escHtml(article) + '</div>' : '') +
      '</div>' +
    '</a>';
  }

  /* ----- Helpers ----- */
  function formatIzrazcyPrice(p) {
    if (!p) return '';
    var eur = (Number(p) * 6.5) / 544;
    var rounded = eur >= 1000 ? Math.round(eur / 100) * 100 : Math.round(eur / 10) * 10;
    return rounded.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' €';
  }

  function cleanIzrazcyText(text) {
    return String(text || '')
      .replace(/Russian Ethnics/gi, 'Russische Ethno-Kollektion')
      .replace(/Russische Ethnien/gi, 'Russische Ethno-Kollektion')
      .replace(/Russische Ethno-Kollektion-Kollektion/g, 'Russische Ethno-Kollektion')
      .replace(/aus der Russische Ethno-Kollektion/g, 'aus der russischen Ethno-Kollektion')
      .replace(/Ofenkacheln mit dekorativen Gemälden von Wildschweinen/g, 'Ofenkachel mit handgemaltem Wildschweinmotiv')
      .replace(/Gschel/gi, 'Gzhel')
      .replace(/-Sammlung/g, '-Kollektion')
      .replace(/\bSammlung\s+/g, 'Kollektion ')
      .replace(/\bSammlung\b/g, 'Kollektion')
      .replace(/Tulpann/g, 'Tulpen')
      .replace(/Waldgrundstückmalerei/g, 'Waldmotiv')
      .replace(/Geschichtengemälde/g, 'Motivmalerei')
      .replace(/Grundstücksbäumen/g, 'Baum-Motiv')
      .replace(/Baumgrundstück/g, 'Baummotiv')
      .replace(/Handlung der Straße/g, 'Straßenmotiv')
      .replace(/\bHandlung\b/g, 'Motiv')
      .replace(/Sommerferienkollektion/g, 'Sommermotiv')
      .replace(/Stuckrelief/g, 'handgeformtem Relief')
      .replace(/geformtem Relief und Rumpf/g, 'handgeformtem Relief')
      .replace(/Reliefarchiv/g, 'Relief')
      .replace(/Ofenkachelnwalzen/g, 'Rollen-Ofenkachel')
      .replace(/Glatter Ofenkachelnpräsident/g, 'Glatte Ofenkachel Präsident')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlight(text, query) {
    var escaped = escHtml(text);
    if (!query) return escaped;
    var safeQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped.replace(new RegExp('(' + escHtml(safeQ) + ')', 'gi'), '<mark>$1</mark>');
  }

  /* ----- Wire up buttons ----- */
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('searchBtn');
    var btnMob = document.getElementById('searchBtnMobile');
    if (btn) btn.addEventListener('click', openSearch);
    if (btnMob) {
      btnMob.addEventListener('click', function (e) {
        e.preventDefault();
        openSearch();
      });
    }
  });

})();
