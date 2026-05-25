(function() {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // ============================================
  // THEME HELPERS
  // ============================================
  function isLightTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function getAccentRGB() {
    return isLightTheme() ? '0,180,216' : '232,0,26';
  }

  // ============================================
  // PARTICLE SYSTEM
  // ============================================
  function initParticles() {
    if (reducedMotion) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;';
    document.body.prepend(canvas);

    var ctx = canvas.getContext('2d');
    var particles = [];
    var animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle() {
      var light = isLightTheme();
      return {
        x: Math.random() * canvas.width,
        y: light ? canvas.height + 10 : canvas.height + 10,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * (light ? 0.25 : 0.5),
        speedY: -(Math.random() * (light ? 0.35 : 0.7) + 0.2),
        opacity: Math.random() * 0.4 + 0.15,
        life: 0,
        maxLife: Math.random() * 180 + 120,
        hue: light ? 195 + Math.random() * 25 : 0 + Math.random() * 18,
        sat: light ? 75 : 88,
        lightVal: light ? 60 + Math.random() * 20 : 48 + Math.random() * 20,
        pulse: Math.random() * Math.PI * 2
      };
    }

    function updateParticles() {
      var count = isLightTheme() ? 20 : 30;
      while (particles.length < count) {
        particles.push(createParticle());
      }
      if (particles.length > count) {
        particles.length = count;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        p.pulse += 0.025;

        var lifeRatio = p.life / p.maxLife;
        var fade = p.opacity;
        if (lifeRatio > 0.7) fade *= (1 - lifeRatio) / 0.3;
        var pulseOpacity = fade * (0.65 + 0.35 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ',' + p.sat + '%,' + p.lightVal + '%,' + pulseOpacity + ')';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(' + p.hue + ',' + p.sat + '%,' + p.lightVal + '%,' + (pulseOpacity * 0.12) + ')';
        ctx.fill();

        if (p.life > p.maxLife || p.y < -20 || p.x < -30 || p.x > canvas.width + 30) {
          particles[i] = createParticle();
        }
      }

      animId = requestAnimationFrame(updateParticles);
    }

    window.addEventListener('resize', resize);
    resize();
    updateParticles();

    var themeObs = new MutationObserver(function() { particles = []; });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // ============================================
  // CURSOR GLOW (desktop only)
  // ============================================
  function initCursorGlow() {
    if (reducedMotion || isTouch) return;

    var dot = document.createElement('div');
    dot.id = 'cursor-dot';
    dot.style.cssText = 'position:fixed;pointer-events:none;z-index:9999;width:8px;height:8px;border-radius:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity 0.2s;';
    document.body.appendChild(dot);

    var ring = document.createElement('div');
    ring.id = 'cursor-ring';
    ring.style.cssText = 'position:fixed;pointer-events:none;z-index:9998;width:36px;height:36px;border-radius:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity 0.3s;';
    document.body.appendChild(ring);

    var mouseX = -100, mouseY = -100;
    var ringX = -100, ringY = -100;
    var visible = false;

    function applyColors() {
      var rgb = getAccentRGB();
      dot.style.background = 'rgba(' + rgb + ',0.9)';
      dot.style.boxShadow = '0 0 8px rgba(' + rgb + ',0.5)';
      ring.style.border = '1.5px solid rgba(' + rgb + ',0.25)';
    }

    function animate() {
      if (!visible) return;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        ringX = mouseX; ringY = mouseY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        applyColors();
        animate();
      }
    });

    document.addEventListener('mouseleave', function() {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    var themeObs = new MutationObserver(function() { applyColors(); });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    applyColors();

    // Hide cursor effects over interactive elements
    document.addEventListener('mouseover', function(e) {
      var tag = e.target.tagName;
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        dot.style.width = '12px';
        dot.style.height = '12px';
        ring.style.width = '44px';
        ring.style.height = '44px';
      }
    });
    document.addEventListener('mouseout', function(e) {
      var tag = e.target.tagName;
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        dot.style.width = '8px';
        dot.style.height = '8px';
        ring.style.width = '36px';
        ring.style.height = '36px';
      }
    });
  }

  // ============================================
  // SYS MESSAGE CYCLE
  // ============================================
  function initSysMessages() {
    var label = document.getElementById('topbar-label');
    if (!label) return;

    var messages = {
      dark: [
        '// SYS: PORTFOLIO LOADED',
        '// SYS: PHANTOM THIEF ONLINE',
        '// SYS: AWAKE THE ARSENE',
        '// SYS: STEAL YOUR HEART',
        '// SYS: ALL-OUT ATTACK READY',
        '// SYS: VELVET ROOM SYNCED',
        '// SYS: PERSONA SUMMONED'
      ],
      light: [
        '// SYS: PORTFOLIO LOADED',
        '// SYS: DARK HOUR ACTIVE',
        '// SYS: SUMMONED PERSONA',
        '// SYS: TARTARUS DETECTED',
        '// SYS: FULL MOON OPERATION',
        '// SYS: SEES STANDING BY',
        '// SYS: ARCANE ENERGIES'
      ]
    };

    var index = 0;

    function cycle() {
      var list = isLightTheme() ? messages.light : messages.dark;
      index = (index + 1) % list.length;
      label.textContent = list[index];
    }

    if (!reducedMotion) {
      setInterval(cycle, 7000);
    }
  }

  // ============================================
  // SECTION MOUSE GLOW
  // ============================================
  function initSectionGlow() {
    if (reducedMotion) return;

    function handleMove(e) {
      var rect = e.currentTarget.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      e.currentTarget.style.setProperty('--mouse-x', x + '%');
      e.currentTarget.style.setProperty('--mouse-y', y + '%');
    }

    document.querySelectorAll('section, .cert-card').forEach(function(el) {
      el.addEventListener('mousemove', handleMove);
    });
  }

  // ============================================
  // THEME TOGGLE FEEDBACK
  // ============================================
  function initToggleFeedback() {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function() {
      btn.style.transform = 'scale(0.85)';
      setTimeout(function() { btn.style.transform = ''; }, 150);
    });
  }

  // ============================================
  // CLIPBOARD COPY
  // ============================================
  function initClipboardCopy() {
    var toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.textContent = 'COPIED';
    document.body.appendChild(toast);

    document.querySelectorAll('.sidebar-contact-item[data-copy]').forEach(function(el) {
      el.addEventListener('click', function() {
        var text = el.getAttribute('data-copy');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function() {
            showToast(toast);
          });
        } else {
          // Fallback
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showToast(toast);
        }
      });
    });
  }

  function showToast(toast) {
    toast.classList.remove('toast-show');
    void toast.offsetWidth;
    toast.classList.add('toast-show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function() {
      toast.classList.remove('toast-show');
    }, 1400);
  }

  // ============================================
  // INIT
  // ============================================
  function boot() {
    initParticles();
    initCursorGlow();
    initSysMessages();
    initSectionGlow();
    initToggleFeedback();
    initClipboardCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
