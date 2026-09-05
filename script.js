/* ═══════════════════════════════════════════════════════
   Quamcrete Coatings — concept site behaviour
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── Financing assumptions ───────────────────────────
     PLACEHOLDER VALUES. Confirm the real APR and terms with
     Quamcrete's lender or finance partner before this goes live.
     ─────────────────────────────────────────────────── */
  var APR = 0.1199;           // 11.99% annual percentage rate
  // terms offered live in the markup (12 / 24 / 36 months)

  var body = document.body;
  var toggle = document.getElementById('langToggle');

  /* ── language toggle ── */
  function applyLang(lang) {
    var attr = lang === 'es' ? 'data-es' : 'data-en';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute(attr);
      if (val === null) return;
      if (el.children.length === 0) {
        el.textContent = val;
      } else {
        for (var i = 0; i < el.childNodes.length; i++) {
          var n = el.childNodes[i];
          if (n.nodeType === 3 && n.textContent.trim()) { n.textContent = val; return; }
        }
      }
    });
    body.classList.toggle('es', lang === 'es');
    document.documentElement.lang = lang;
    if (toggle) {
      toggle.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
    }
    try { localStorage.setItem('qc-lang', lang); } catch (e) {}
    if (typeof renderCalc === 'function') renderCalc();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyLang(body.classList.contains('es') ? 'en' : 'es');
    });
  }
  var saved = null;
  try { saved = localStorage.getItem('qc-lang'); } catch (e) {}
  if (saved === 'es') applyLang('es');

  /* ── before / after slider ──
     Pointer drag is handled on .ba directly (more reliable than an
     invisible range input). The range input stays for keyboard users. */
  var ba = document.getElementById('ba');
  var baRange = document.getElementById('baRange');
  var baBefore = document.querySelector('.ba-before');
  var baDivider = document.getElementById('baDivider');

  function renderBA() {
    if (!baRange || !baBefore || !baDivider) return;
    var v = Number(baRange.value);
    baBefore.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
    baDivider.style.left = v + '%';
  }

  function baSetFromX(clientX) {
    var rect = ba.getBoundingClientRect();
    var v = ((clientX - rect.left) / rect.width) * 100;
    baRange.value = Math.max(0, Math.min(100, v));
    renderBA();
  }

  if (ba && baRange) {
    renderBA();
    baRange.addEventListener('input', renderBA); // arrow keys

    var baDragging = false;
    ba.addEventListener('pointerdown', function (e) {
      baDragging = true;
      try { ba.setPointerCapture(e.pointerId); } catch (_) {}
      baSetFromX(e.clientX);
      e.preventDefault();
    });
    ba.addEventListener('pointermove', function (e) {
      if (baDragging) baSetFromX(e.clientX);
    });
    function baEnd(e) {
      baDragging = false;
      try { ba.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    ba.addEventListener('pointerup', baEnd);
    ba.addEventListener('pointercancel', baEnd);
  }

  /* ── financing calculator ── */
  var amount = document.getElementById('calcAmount');
  var amountOut = document.getElementById('calcAmount-out');
  var monthlyEl = document.getElementById('calcMonthly');
  var aprEl = document.getElementById('calcApr');
  var termLabel = document.getElementById('calcTermLabel');
  var termBtns = Array.prototype.slice.call(document.querySelectorAll('.term-opt'));
  var months = 24;

  function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }

  // amortized payment: P·r / (1 − (1+r)^−n)
  function payment(principal, annualRate, n) {
    var r = annualRate / 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }

  function renderCalc() {
    if (!amount) return;
    var p = parseFloat(amount.value);
    if (amountOut) amountOut.textContent = money(p);
    if (monthlyEl) monthlyEl.textContent = Math.round(payment(p, APR, months)).toLocaleString('en-US');
    if (aprEl) aprEl.textContent = (APR * 100).toFixed(2) + '% APR';
    if (termLabel) {
      var unit = body.classList.contains('es') ? 'meses' : 'months';
      termLabel.textContent = months + ' ' + unit;
    }
    var pct = ((p - amount.min) / (amount.max - amount.min)) * 100;
    amount.style.background =
      'linear-gradient(90deg, var(--accent) ' + pct + '%, rgba(255,255,255,.2) ' + pct + '%)';
  }

  if (amount) {
    amount.addEventListener('input', renderCalc);
    termBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        months = parseInt(btn.dataset.months, 10);
        termBtns.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-on', on);
          b.setAttribute('aria-checked', String(on));
        });
        renderCalc();
      });
    });
    renderCalc();
  }

  /* ── quote form ── */
  var form = document.getElementById('quoteForm');
  var success = document.getElementById('quoteSuccess');

  function setInvalid(input, bad) {
    var field = input.closest('.field');
    if (field) field.classList.toggle('invalid', bad);
  }
  function validPhone(v) { return v.replace(/\D/g, '').length >= 10; }

  if (form) {
    form.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('input', function () { setInvalid(el, false); });
      el.addEventListener('change', function () { setInvalid(el, false); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('qName');
      var phone = document.getElementById('qPhone');
      var project = document.getElementById('qProject');
      var ok = true;

      if (!name.value.trim()) { setInvalid(name, true); ok = false; }
      if (!validPhone(phone.value)) { setInvalid(phone, true); ok = false; }
      if (!project.value) { setInvalid(project, true); ok = false; }

      if (!ok) {
        var firstBad = form.querySelector('.field.invalid input, .field.invalid select');
        if (firstBad) firstBad.focus();
        return;
      }

      // DEMO ONLY — no backend. Wire to email / CRM before launch.
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  }

  /* ── work carousel ── */
  var carousel = document.getElementById('workCarousel');
  if (carousel) {
    var viewport = document.getElementById('carouselViewport');
    var track = document.getElementById('carouselTrack');
    var dotsWrap = document.getElementById('carouselDots');
    var slides = Array.prototype.slice.call(track.children);
    var count = slides.length;
    var index = 0;
    var timer = null;
    var INTERVAL = 4800;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // build dot controls
    var dots = slides.map(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Project ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      dotsWrap.appendChild(b);
      return b;
    });

    function render() {
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function (d, i) {
        d.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }
    function go(i, userAction) {
      index = (i + count) % count;
      render();
      if (userAction) restart();
    }
    function next() { go(index + 1); }
    function prev() { go(index - 1); }

    function start() {
      if (reduce || timer) return;
      timer = setInterval(next, INTERVAL);
    }
    function stop() { clearInterval(timer); timer = null; }
    function restart() { stop(); start(); }

    carousel.querySelector('.carousel-next').addEventListener('click', function () { go(index + 1, true); });
    carousel.querySelector('.carousel-prev').addEventListener('click', function () { go(index - 1, true); });

    // pause while the visitor is looking / interacting
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    // keyboard
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(index + 1, true); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { go(index - 1, true); e.preventDefault(); }
    });

    // swipe / drag
    var dragX0 = 0, dragging = false;
    viewport.addEventListener('pointerdown', function (e) {
      dragging = true;
      dragX0 = e.clientX;
      stop();
      track.classList.add('no-anim');
      viewport.classList.add('is-grabbing');
      try { viewport.setPointerCapture(e.pointerId); } catch (_) {}
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = (e.clientX - dragX0) / viewport.offsetWidth * 100;
      track.style.transform = 'translateX(' + (-index * 100 + dx) + '%)';
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('no-anim');
      viewport.classList.remove('is-grabbing');
      try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
      var dx = e.clientX - dragX0;
      if (dx <= -45) go(index + 1, true);
      else if (dx >= 45) go(index - 1, true);
      else { render(); start(); }
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);

    render();
    start();
  }

  /* ── footer year ── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
