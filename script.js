// Starfield background.
(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const STAR_COLORS = ['#ffffff', '#ffffff', '#e4dcff', '#d3e9ff', '#ffecc9'];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Background sky ---------- */
  const sky = document.getElementById('sky');
  const sctx = sky.getContext('2d');
  let W = 0, H = 0, skyStars = [], shooting = null;

  function sizeSky() {
    W = innerWidth; H = innerHeight;
    sky.width = W * dpr; sky.height = H * dpr;
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((W * H) / 3200);
    skyStars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() < 0.08 ? 1.2 + Math.random() * 0.8 : 0.3 + Math.random() * 0.8,
      a: 0.25 + Math.random() * 0.65,
      depth: Math.random(),          // farther stars move less on scroll
      speed: 0.4 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      color: pick(STAR_COLORS),
    }));
  }

  function drawSky(t) {
    sctx.clearRect(0, 0, W, H);
    const scroll = scrollY;
    for (const s of skyStars) {
      const y = (((s.y - scroll * (0.05 + s.depth * 0.15)) % H) + H) % H;
      const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(t * 0.001 * s.speed + s.phase);
      sctx.globalAlpha = s.a * twinkle;
      sctx.fillStyle = s.color;
      sctx.beginPath();
      sctx.arc(s.x, y, s.r, 0, Math.PI * 2);
      sctx.fill();
    }
    sctx.globalAlpha = 1;
    if (!reduceMotion) drawShootingStar();
  }

  function drawShootingStar() {
    if (!shooting && Math.random() < 0.003) {
      const angle = Math.PI * (0.15 + Math.random() * 0.15);
      shooting = {
        x: Math.random() * W * 0.8, y: Math.random() * H * 0.4,
        vx: Math.cos(angle) * 11, vy: Math.sin(angle) * 11, life: 1,
      };
    }
    if (!shooting) return;
    const s = shooting;
    const tailX = s.x - s.vx * 8, tailY = s.y - s.vy * 8;
    const grad = sctx.createLinearGradient(s.x, s.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255,255,255,${0.9 * s.life})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    sctx.strokeStyle = grad;
    sctx.lineWidth = 1.5;
    sctx.beginPath();
    sctx.moveTo(s.x, s.y);
    sctx.lineTo(tailX, tailY);
    sctx.stroke();
    s.x += s.vx; s.y += s.vy; s.life -= 0.018;
    if (s.life <= 0 || s.x > W + 100 || s.y > H + 100) shooting = null;
  }

  /* ---------- Run ---------- */
  function frame(t) {
    drawSky(t);
    requestAnimationFrame(frame);
  }

  let resizeTimer;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      sizeSky();
      if (reduceMotion) drawSky(0);
    }, 150);
  });
  if (reduceMotion) addEventListener('scroll', () => drawSky(0), { passive: true });

  sizeSky();
  if (reduceMotion) drawSky(0);
  else requestAnimationFrame(frame);
})();

// Journey wave: draws a wave through each stop and opens one story card at a time.
(() => {
  const journey = document.querySelector('[data-journey]');
  if (!journey) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track = journey.querySelector('.journey-track');
  const svg = journey.querySelector('.journey-wave');
  const paths = svg.querySelectorAll('path');
  const stops = [...journey.querySelectorAll('.stop')];
  const AMP = 48;          // wave height above/below the middle
  const GAP = 30;          // space between a dot and its card
  let current = -1;

  function layout() {
    // Make the track tall enough for the tallest card above and below the wave.
    const tallest = Math.max(...stops.map((s) => s.querySelector('.stop-card').offsetHeight));
    const h = 2 * (tallest + AMP + GAP + 12);
    track.style.height = `${h}px`;

    const w = track.clientWidth, mid = h / 2;
    const step = w / stops.length;
    const waveY = (x) => mid - AMP * Math.cos((Math.PI * (x - step / 2)) / step);

    // Crests line up with even stops, troughs with odd stops.
    let d = '';
    for (let x = 0; x < w; x += 6) d += `${x ? 'L' : 'M'}${x.toFixed(1)} ${waveY(x).toFixed(1)}`;
    d += `L${w} ${waveY(w).toFixed(1)}`;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    paths.forEach((p) => p.setAttribute('d', d));

    stops.forEach((stop, i) => {
      const x = step / 2 + i * step;
      stop.style.left = `${x}px`;
      stop.style.top = `${waveY(x)}px`;
      stop.style.setProperty('--i', i);
      stop.classList.toggle('stop-up', i % 2 === 0);
      stop.classList.toggle('stop-down', i % 2 === 1);
      // Keep cards near the edges from spilling off the track.
      const card = stop.querySelector('.stop-card');
      const cw = card.offsetWidth, left = x - cw / 2;
      const clamped = Math.min(Math.max(left, 8), w - cw - 8);
      card.style.setProperty('--shift', `${clamped - left}px`);
    });

    const scrollable = journey.scrollWidth > journey.clientWidth + 1;
    journey.classList.toggle('is-scrollable', scrollable);
    const hint = journey.parentElement.querySelector('.journey-hint');
    if (hint) hint.hidden = !scrollable;
  }

  function open(i, { focus = false, scroll = true } = {}) {
    current = i;
    stops.forEach((stop, j) => {
      const on = j === i;
      stop.classList.toggle('is-open', on);
      stop.querySelector('.stop-dot').setAttribute('aria-expanded', String(on));
    });
    if (i < 0) return;
    const dot = stops[i].querySelector('.stop-dot');
    if (focus) dot.focus({ preventScroll: true });
    if (!scroll) return;
    const behavior = reduceMotion ? 'auto' : 'smooth';
    if (journey.scrollWidth > journey.clientWidth) {
      const x = parseFloat(stops[i].style.left);
      journey.scrollTo({ left: x - journey.clientWidth / 2, behavior });
    }
    revealCard(stops[i].querySelector('.stop-card'), behavior);
  }

  // Scroll the page up or down just enough to show the whole card (below the sticky nav).
  function revealCard(card, behavior) {
    const r = card.getBoundingClientRect();
    const top = (document.querySelector('.nav')?.offsetHeight || 0) + 16;
    const bottom = innerHeight - 16;
    let dy = 0;
    if (r.bottom > bottom) dy = r.bottom - bottom;
    if (r.top - dy < top) dy = r.top - top;   // if the card is taller than the screen, show its top
    if (Math.abs(dy) > 1) scrollBy({ top: dy, behavior });
  }

  stops.forEach((stop, i) => {
    stop.querySelector('.stop-dot').addEventListener('click', () => open(current === i ? -1 : i));
  });

  journey.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') open(-1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = Math.min(Math.max((current < 0 ? 0 : current + dir), 0), stops.length - 1);
      open(next, { focus: true });
      e.preventDefault();
    }
  });

  // Draw the wave when it scrolls into view.
  if (reduceMotion) {
    journey.classList.add('is-visible');
    svg.querySelector('.wave-comet')?.remove();
  } else {
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { journey.classList.add('is-visible'); obs.disconnect(); }
    }, { threshold: 0.35 }).observe(journey);
  }

  let resizeTimer;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(layout, 150); });
  document.fonts.ready.then(layout);
  layout();
  open(0, { scroll: false });   // start with the first chapter open
})();

// Research missions: each spacecraft flies its trajectory once, stops, and its name fades in.
// Set data-trajectory="polar" or "flyby" on each .mission in index.html.
(() => {
  const missions = [...document.querySelectorAll('.mission')];
  if (!missions.length) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 5000;   // ms for the whole trajectory
  const deg = (d) => (d * Math.PI) / 180;
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Near-polar orbit: a tall, narrow ellipse that crosses over the poles.
  // The satellite starts and stops just above the north pole after one full orbit.
  function polarOrbit({ cx, cy, r }) {
    const rx = r * 1.25, ry = r * 0.3, tilt = deg(-80);   // ~10° off vertical
    const at = (a) => {
      const dx = rx * Math.cos(a), dy = ry * Math.sin(a);
      return {
        x: cx + dx * Math.cos(tilt) - dy * Math.sin(tilt),
        y: cy + dx * Math.sin(tilt) + dy * Math.cos(tilt),
        front: Math.sin(a) > 0,                // this half of the ellipse is nearer the viewer
        scale: 0.85 + 0.15 * Math.sin(a),      // a little smaller on the far side
      };
    };
    return {
      backPath: sample(at, Math.PI, 2 * Math.PI),
      frontPath: sample(at, 0, Math.PI),
      position: (u) => at(2 * Math.PI * easeInOut(u)),
      labelAt: (p, halfWidth) => ({ x: p.x + halfWidth + 10, y: p.y + 6, anchor: 'start' }),
    };
  }

  // Flyby: a hyperbolic path that swings past close to the moon, fastest at closest approach.
  function flyby({ cx, cy, r }) {
    const e = 2.2, q = r * 1.15, p = q * (1 + e);   // eccentricity, closest-approach distance
    const facing = deg(90);                          // closest approach is straight below the moon
    const at = (nu) => {
      const d = p / (1 + e * Math.cos(nu));
      return { x: cx + d * Math.cos(facing + nu), y: cy + d * Math.sin(facing + nu), front: true, scale: 1 };
    };
    // Kepler's equation for hyperbolas, so the speed changes the way a real flyby does.
    const k = Math.sqrt((e - 1) / (e + 1));
    const meanAnomaly = (nu) => { const F = 2 * Math.atanh(k * Math.tan(nu / 2)); return e * Math.sinh(F) - F; };
    const trueAnomaly = (M) => {
      let F = Math.asinh(M / e);
      for (let i = 0; i < 10; i++) F -= (e * Math.sinh(F) - F - M) / (e * Math.cosh(F) - 1);
      return 2 * Math.atan(Math.tanh(F / 2) / k);
    };
    const START = deg(70), STOP = deg(-70);   // symmetric, so closest approach is exactly halfway
    const M0 = meanAnomaly(START), M1 = meanAnomaly(STOP);
    return {
      backPath: '',
      frontPath: sample(at, deg(88), deg(-88)),
      position: (u) => at(trueAnomaly(M0 + (M1 - M0) * easeInOut(u))),
      labelAt: (p) => ({ x: p.x, y: p.y - 16, anchor: 'middle' }),   // name sits above the spacecraft
    };
  }

  function sample(at, a0, a1, n = 80) {
    let d = '';
    for (let i = 0; i <= n; i++) {
      const p = at(a0 + ((a1 - a0) * i) / n);
      d += `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    }
    return d;
  }

  const TRAJECTORIES = { polar: polarOrbit, flyby };

  missions.forEach((mission, index) => {
    const svg = mission.querySelector('.mission-art');
    const disc = svg.querySelector('.planet-disc');
    const body = { cx: +disc.getAttribute('cx'), cy: +disc.getAttribute('cy'), r: +disc.getAttribute('r') };
    const path = (TRAJECTORIES[mission.dataset.trajectory] || polarOrbit)(body);

    const back = svg.querySelector('.orbit-back'), front = svg.querySelector('.orbit-front');
    back.querySelector('.orbit-path').setAttribute('d', path.backPath);
    front.querySelector('.orbit-path').setAttribute('d', path.frontPath);
    const backSlot = back.querySelector('.sat-slot'), frontSlot = front.querySelector('.sat-slot');
    const sat = svg.querySelector('.sat');

    // Move the satellite, switching layers so it can pass behind the planet.
    const place = (u) => {
      const p = path.position(u);
      const slot = p.front ? frontSlot : backSlot;
      if (sat.parentNode !== slot) slot.appendChild(sat);
      sat.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(${p.scale.toFixed(3)})`);
    };

    // Put the name next to where the satellite stops.
    const label = svg.querySelector('.sat-label');
    const spot = path.labelAt(path.position(1), sat.getBBox().width / 2);
    label.setAttribute('x', spot.x.toFixed(1));
    label.setAttribute('y', spot.y.toFixed(1));
    label.setAttribute('text-anchor', spot.anchor);
    place(reduceMotion ? 1 : 0);

    mission.fly = () => {
      if (reduceMotion) { mission.classList.add('is-done'); return; }
      setTimeout(() => {
        const t0 = performance.now();
        const step = (t) => {
          const u = Math.min(1, (t - t0) / DURATION);
          place(u);
          if (u < 1) requestAnimationFrame(step);
          else mission.classList.add('is-done');
        };
        requestAnimationFrame(step);
      }, 300 + index * 500);
    };
  });

  // Start each trajectory once its card scrolls into view.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.fly(); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  missions.forEach((m) => observer.observe(m));
})();
