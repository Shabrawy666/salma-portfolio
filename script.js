(function () {
  'use strict';

  var S = window.SITE, A = window.ABOUT, C = window.SECTIONS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia('(hover: none)').matches;
  var body = document.body;
  var root = document.documentElement;

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function hexRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }
  function splitLetters(node, text) {
    node.textContent = '';
    text.split('').forEach(function (ch, i) {
      var s = el('span', 'ch', ch === ' ' ? '\u00a0' : ch);
      s.style.setProperty('--i', i);
      node.appendChild(s);
    });
  }

  var fullName = S.firstName + ' ' + S.lastName;
  var accentRGB = hexRgb(S.heroAccent);
  var currentAccent = '';

  function setAccent(hex) {
    if (!hex || hex === currentAccent) return;
    currentAccent = hex;
    accentRGB = hexRgb(hex);
    root.style.setProperty('--accent', hex);
    root.style.setProperty('--accent-rgb', accentRGB.join(','));
  }

  /* ------------------------------------------------------------
     Static content
  ------------------------------------------------------------ */
  document.title = fullName + ' — Video Game Writer, Scriptwriter & Short Story Author';
  $('#brand').textContent = fullName;
  $('#role').textContent = S.role;
  $('#tagline').textContent = S.tagline;
  $('#photo').src = S.photo;
  $('#photo').alt = S.photoAlt || fullName;
  $('#photo').addEventListener('error', function () { this.style.visibility = 'hidden'; });
  $('#heroName').setAttribute('aria-label', fullName);
  splitLetters($('#first'), S.firstName);
  splitLetters($('#last'), S.lastName);
  splitLetters($('#loaderName'), fullName);
  $('#top').dataset.accent = S.heroAccent;
  $('#contact').dataset.accent = S.heroAccent;
  setAccent(S.heroAccent);

  // size name so the longest word always fits
  var longest = Math.max(S.firstName.length, S.lastName.length);
  $('#heroName').style.setProperty('--size', Math.min(19, 86 / (longest * 0.44)) + 'vw');

  $('#notice').textContent = S.imageNotice || '';
  $('#email').textContent = S.email;
  $('#email').href = 'mailto:' + S.email;
  $('#copy').textContent = '© ' + new Date().getFullYear() + ' ' + fullName + '. All rights reserved.';
  $('#menuFoot').textContent = S.email;
  S.socials.forEach(function (s) {
    var li = el('li'), a = el('a', '', s.label);
    a.href = s.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    li.appendChild(a); $('#socials').appendChild(li);
  });

  // contact headline
  var ct = $('#contactTitle');
  'Let\u2019s write something unforgettable'.split(' ').forEach(function (w, i) {
    var span = el('span', 'w'), inner = el('i', '', w);
    inner.style.setProperty('--i', i);
    span.appendChild(inner); ct.appendChild(span); ct.appendChild(document.createTextNode(' '));
  });

  /* ------------------------------------------------------------
     About
  ------------------------------------------------------------ */
  var aboutEl = $('#about');
  aboutEl.dataset.accent = S.heroAccent;
  $('#aboutKicker').textContent = A.kicker;
  $('#aboutTitle').textContent = A.title;
  $('#aboutText').textContent = A.text;
  var facts = A.facts.slice();
  C.forEach(function (sec) { facts.push({ value: String(sec.works.length), label: sec.title }); });
  facts.forEach(function (f) {
    var d = el('div', 'fact'); d.appendChild(el('b', '', f.value)); d.appendChild(el('span', '', f.label));
    $('#aboutFacts').appendChild(d);
  });
  A.featuredIn.forEach(function (n) { $('#aboutFeat').appendChild(el('li', '', n)); });

  /* ------------------------------------------------------------
     Marquees
  ------------------------------------------------------------ */
  var marquees = [];
  function buildMarquee(id, dir) {
    var m = $(id), track = $('.marquee__track', m);
    function group() {
      var g = el('div', 'marquee__group');
      for (var r = 0; r < 2; r++) {
        C.forEach(function (sec) {
          g.appendChild(el('span', '', sec.title));
          g.appendChild(el('b', '', '\u2726'));
        });
      }
      return g;
    }
    track.appendChild(group()); track.appendChild(group());
    marquees.push({ track: track, dir: dir, off: 0, unit: 1 });
  }
  buildMarquee('#marqueeA', 1);
  buildMarquee('#marqueeB', -1);
  function measureMarquees() {
    marquees.forEach(function (m) { m.unit = m.track.firstChild.getBoundingClientRect().width || 1; });
  }

  /* ------------------------------------------------------------
     Chapters + showcase
  ------------------------------------------------------------ */
  var menuNav = $('#menuNav'), dots = $('#dots');
  var scrambleTargets = [];

  function navEntry(label, href, num) {
    var a = el('a', '');
    a.href = href;
    a.appendChild(document.createTextNode(label));
    if (num != null) a.appendChild(el('small', '', pad(num)));
    a.style.setProperty('--i', menuNav.children.length);
    a.addEventListener('click', function () { closeMenu(); });
    menuNav.appendChild(a);
    var d = el('a'); d.href = href; d.dataset.label = label; d.setAttribute('aria-label', label);
    dots.appendChild(d);
    return d;
  }
  var dotEls = [];
  dotEls.push(navEntry(fullName, '#top', 0));
  dotEls.push(navEntry(A.title, '#about', null));

  C.forEach(function (sec, idx) {
    var n = sec.works.length;
    var chapter = el('section', 'chapter');
    chapter.id = sec.id; chapter.dataset.accent = sec.accent;

    chapter.appendChild(el('div', 'chapter__num', pad(idx + 1)));

    var head = el('div', 'chapter__head reveal');
    head.appendChild(el('p', 'kicker', 'Chapter ' + pad(idx + 1) + ' — ' + (sec.kicker || '')));
    var h2 = el('h2', 'chapter__title', sec.title);
    scrambleTargets.push({ node: h2, text: sec.title, host: head });
    head.appendChild(h2);
    head.appendChild(el('p', 'chapter__intro', sec.intro));
    chapter.appendChild(head);

    var show = el('div', 'show reveal');
    var list = el('ol', 'show__list');
    var wrapEl = el('div', 'show__wrap');
    var stage = el('a', 'show__stage');
    stage.target = '_blank'; stage.rel = 'noopener noreferrer';
    var tilt = stage;
    var count = el('div', 'show__count');
    var go = el('div', 'show__go'); go.appendChild(el('span', '', '\u2197'));
    var items = [], slides = [];

    sec.works.forEach(function (w, i) {
      var li = el('li'), btn = el('button', 'show__item');
      btn.type = 'button';
      btn.appendChild(el('span', 'n', pad(i + 1)));
      btn.appendChild(el('span', 't', w.title));
      btn.appendChild(el('span', 'ty', w.type + (w.status ? ' · ' + w.status : '')));
      btn.appendChild(el('i', 'bar'));
      li.appendChild(btn); list.appendChild(li); items.push(btn);

      var slide = el('div', 'slide');
      var img = el('img'); img.src = w.image; img.alt = w.title + ' cover'; img.loading = 'lazy'; img.draggable = false;
      img.addEventListener('error', function () { img.style.visibility = 'hidden'; });
      slide.appendChild(img);
      var txt = el('div', 'slide__text');
      txt.appendChild(el('p', 'slide__type', w.type));
      txt.appendChild(el('h3', 'slide__title', w.title));
      txt.appendChild(el('p', 'slide__desc', w.description || ''));
      if (w.status) txt.appendChild(el('span', 'slide__status', w.status));
      slide.appendChild(txt);
      stage.appendChild(slide); slides.push(slide);
    });
    stage.appendChild(count); stage.appendChild(go);
    wrapEl.appendChild(stage);
    show.appendChild(list); show.appendChild(wrapEl);
    chapter.appendChild(show);
    if (S.imageNotice) chapter.appendChild(el('p', 'chapter__note', S.imageNotice));
    $('#chapters').appendChild(chapter);

    // behaviour
    var cur = -1, prevTimer;
    function goTo(i) {
      i = (i + n) % n;
      if (i === cur) return;
      clearTimeout(prevTimer);
      slides.forEach(function (s) { s.classList.remove('is-prev'); });
      if (cur >= 0) slides[cur].classList.add('is-prev');
      items.forEach(function (b) { b.classList.remove('is-active'); b.removeAttribute('aria-current'); });
      slides.forEach(function (s, k) { if (k !== i) s.classList.remove('is-active'); });
      void show.offsetWidth; // restart progress bar animation
      slides[i].classList.add('is-active');
      items[i].classList.add('is-active');
      items[i].setAttribute('aria-current', 'true');
      var u = sec.works[i].url;
      if (u) {
        stage.href = u; stage.dataset.cursor = sec.cta || 'Read'; stage.classList.remove('is-static');
        stage.setAttribute('aria-label', 'Open: ' + sec.works[i].title);
      } else {
        stage.removeAttribute('href'); delete stage.dataset.cursor; stage.classList.add('is-static');
        stage.setAttribute('aria-label', sec.works[i].title);
      }
      count.innerHTML = '<b>' + pad(i + 1) + '</b> / ' + pad(n);
      cur = i;
      prevTimer = setTimeout(function () { slides.forEach(function (s) { s.classList.remove('is-prev'); }); }, 1100);
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: items[i].parentNode.offsetLeft - 20, behavior: 'smooth' });
      }
    }
    items.forEach(function (b, i) {
      b.addEventListener('click', function () { goTo(i); });
      b.addEventListener('mouseenter', function () { if (!touch) goTo(i); });
      b.addEventListener('animationend', function (e) { if (e.animationName === 'fill') goTo(cur + 1); });
    });
    goTo(0);

    // pause autoplay while hovering the showcase, run only when visible
    show.addEventListener('mouseenter', function () { show.classList.add('paused'); show.dataset.hover = '1'; });
    show.addEventListener('mouseleave', function () { show.classList.remove('paused'); delete show.dataset.hover; });
    if (reduce) show.classList.add('paused');

    // mouse tilt + image parallax
    if (!touch && !reduce) {
      stage.addEventListener('mousemove', function (e) {
        var r = stage.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = 'rotateY(' + (x * 7) + 'deg) rotateX(' + (-y * 7) + 'deg)';
        stage.style.setProperty('--px', (x * -26) + 'px');
        stage.style.setProperty('--py', (y * -26) + 'px');
      });
      stage.addEventListener('mouseleave', function () {
        tilt.style.transform = '';
        stage.style.setProperty('--px', '0px'); stage.style.setProperty('--py', '0px');
      });
    }

    // swipe on touch
    var sx = 0, swiped = false;
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; swiped = false; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) { swiped = true; goTo(cur + (dx < 0 ? 1 : -1)); }
    });
    stage.addEventListener('click', function (e) { if (swiped) { e.preventDefault(); swiped = false; } });

    // keyboard arrows while hovering/focused
    show._next = function (d) { goTo(cur + d); };

    // nav + dots
    dotEls.push(navEntry(sec.title, '#' + sec.id, idx + 1));
  });
  dotEls.push(navEntry('Contact', '#contact', C.length + 1));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    var active = $$('.show').filter(function (s) { return s.dataset.hover || s.contains(document.activeElement); })[0];
    if (active && active._next) active._next(e.key === 'ArrowRight' ? 1 : -1);
  });

  /* ------------------------------------------------------------
     Menu
  ------------------------------------------------------------ */
  var burger = $('#burger'), menu = $('#menu');
  function openMenu() { body.classList.add('menu-open'); burger.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-hidden', 'false'); }
  function closeMenu() { body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); }
  burger.addEventListener('click', function () { body.classList.contains('menu-open') ? closeMenu() : openMenu(); });

  /* ------------------------------------------------------------
     Text scramble
  ------------------------------------------------------------ */
  function scramble(node, text) {
    if (reduce) { node.textContent = text; return; }
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+', frame = 0, total = text.length * 2 + 16;
    (function step() {
      var p = frame / total, out = '';
      for (var i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        out += (p * text.length * 1.4 > i + 1) ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      node.textContent = out;
      if (frame++ < total) requestAnimationFrame(step); else node.textContent = text;
    })();
  }

  /* ------------------------------------------------------------
     Observers: reveal, accent, dots, in-view
  ------------------------------------------------------------ */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      scrambleTargets.forEach(function (t) { if (t.host === en.target) scramble(t.node, t.text); });
      revealIO.unobserve(en.target);
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(function (n) { revealIO.observe(n); });
  var wordsIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); wordsIO.unobserve(en.target); } });
  }, { threshold: 0.3 });
  wordsIO.observe(ct);

  var sections = [$('#top'), aboutEl].concat($$('.chapter')).concat([$('#contact')]);
  var accentIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      setAccent(en.target.dataset.accent);
      var i = sections.indexOf(en.target);
      dotEls.forEach(function (d, k) { d.classList.toggle('is-on', k === i); });
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  sections.forEach(function (s) { accentIO.observe(s); });

  var viewIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { en.target.classList.toggle('in-view', en.isIntersecting); });
  }, { threshold: 0.45 });
  $$('.show').forEach(function (s) { viewIO.observe(s); });

  /* ------------------------------------------------------------
     Hero particle constellation
  ------------------------------------------------------------ */
  var hero = $('#top');
  (function stars() {
    var cv = $('#stars'), ctx = cv.getContext('2d'), w = 0, h = 0, pts = [];
    var mouse = { x: -9999, y: -9999 }, running = true;
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(120, Math.floor(w * h / 12000)); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.5 + .4 });
    }
    resize(); window.addEventListener('resize', resize);
    hero.addEventListener('mousemove', function (e) { var r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });
    new IntersectionObserver(function (en) { running = en[0].isIntersecting; }).observe(hero);
    function frame() {
      requestAnimationFrame(frame);
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      var c = accentRGB.join(',');
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!reduce) { p.x += p.vx; p.y += p.vy; }
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < 14400) { ctx.strokeStyle = 'rgba(255,255,255,' + (0.14 * (1 - d / 14400)) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        var mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
        if (md < 32400) {
          ctx.strokeStyle = 'rgba(' + c + ',' + (0.8 * (1 - md / 32400)) + ')'; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          p.x -= mx * 0.0012; p.y -= my * 0.0012;
        }
      }
    }
    frame();
  })();

  /* ------------------------------------------------------------
     Main loop: cursor, hero parallax, marquees, progress
  ------------------------------------------------------------ */
  var mouseX = innerWidth / 2, mouseY = innerHeight / 2, cx = mouseX, cy = mouseY;
  var nx = 0, ny = 0, tx = 0, ty = 0, lastScroll = scrollY;
  var cursor = $('#cursor'), cursorLabel = $('#cursorLabel');
  var stageEl = $('#heroStage'), lineA = $('#first'), lineB = $('#last'), photo = $('#photoWrap');
  var progress = $('#progress');

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX; mouseY = e.clientY;
    nx = e.clientX / innerWidth - 0.5; ny = e.clientY / innerHeight - 0.5;
    cursor.classList.add('on');
  });
  document.addEventListener('mouseleave', function () { cursor.classList.remove('on'); });

  if (!touch) {
    body.classList.add('has-cursor');
    document.addEventListener('mousemove', function (e) {
      var lab = e.target.closest && e.target.closest('[data-cursor]');
      var link = e.target.closest && e.target.closest('a[href],button');
      cursor.classList.toggle('is-label', !!lab);
      cursor.classList.toggle('is-link', !lab && !!link);
      var t = lab ? lab.dataset.cursor : '';
      if (cursorLabel.textContent !== t) cursorLabel.textContent = t;
    });
  }

  // magnetic elements
  $$('.magnetic').forEach(function (m) {
    if (touch) return;
    m.addEventListener('mousemove', function (e) {
      var r = m.getBoundingClientRect();
      m.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.25) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.35) + 'px)';
    });
    m.addEventListener('mouseleave', function () { m.style.transform = ''; });
  });

  function loop() {
    requestAnimationFrame(loop);
    var sy = window.scrollY, vh = innerHeight;

    // cursor
    cx += (mouseX - cx) * 0.2; cy += (mouseY - cy) * 0.2;
    if (!touch) cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';

    // progress
    var max = document.documentElement.scrollHeight - vh;
    progress.style.transform = 'scaleX(' + (max > 0 ? sy / max : 0) + ')';

    // hero parallax
    if (sy < vh * 1.3 && !reduce) {
      tx += (nx - tx) * 0.07; ty += (ny - ty) * 0.07;
      lineA.style.transform = 'translate3d(' + (tx * -70) + 'px,0,0)';
      lineB.style.transform = 'translate3d(' + (tx * 70) + 'px,0,0)';
      photo.style.transform = 'translate3d(' + (tx * 30) + 'px,' + (ty * 20) + 'px,0) rotateY(' + (tx * 8) + 'deg)';
      stageEl.style.transform = 'translate3d(0,' + (sy * 0.25) + 'px,0)';
      stageEl.style.opacity = clamp(1 - sy / (vh * 0.9), 0, 1);
    }

    // marquees: drift + scroll-driven
    var vel = sy - lastScroll; lastScroll = sy;
    marquees.forEach(function (m) {
      m.off += (reduce ? 0 : 0.6 * m.dir) + vel * 0.6 * m.dir;
      var x = ((m.off % m.unit) + m.unit) % m.unit;
      m.track.style.transform = 'translate3d(' + (-x) + 'px,0,0) skewX(' + clamp(-vel * 0.12, -8, 8) + 'deg)';
    });
  }

  /* ------------------------------------------------------------
     Intro loader
  ------------------------------------------------------------ */
  var finished = false;
  function finish() {
    if (finished) return; finished = true;
    $('#loader').classList.add('is-done');
    body.classList.remove('is-loading');
    body.classList.add('is-ready');
    setTimeout(function () { var l = $('#loader'); if (l) l.style.display = 'none'; }, 1300);
  }
  (function runLoader() {
    var start = performance.now(), dur = reduce ? 200 : 1900;
    var count = $('#count'), bar = $('#loaderBar');
    (function tick(now) {
      var p = clamp((now - start) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
      count.textContent = Math.round(e * 100);
      bar.style.transform = 'scaleX(' + e + ')';
      if (p < 1) requestAnimationFrame(tick); else setTimeout(finish, 250);
    })(start);
    setTimeout(finish, 5000); // safety net
  })();

  window.addEventListener('load', measureMarquees);
  window.addEventListener('resize', measureMarquees);
  measureMarquees();
  loop();
})();
