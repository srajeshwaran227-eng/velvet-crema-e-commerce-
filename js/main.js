/* ============================================
   VELVET CREMA — Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Premium Features Init ──────────────── */
  // 1. Loading Screen
  window.addEventListener('load', () => {
    const loader = document.getElementById('vc-loader');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 500); // Small delay for branding
    }
  });

  // 2. Custom Cursor
  const cursor = document.getElementById('custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    const interactiveSelectors = 'a, button, .product-card, .btn, .bento-cell, .side-card, .category-pill, .tier-card, .benefit-card, .vc-result-card';
    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactiveSelectors)) {
        cursor.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', e => {
      if (!e.relatedTarget || !e.relatedTarget.closest(interactiveSelectors)) {
        cursor.classList.remove('hover');
      }
    });
  }

  // 3. Theme Toggle
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  
  // Set initial theme
  const savedTheme = localStorage.getItem('vc-theme') || 'dark';
  if (savedTheme === 'light') {
    html.classList.replace('dark', 'light');
    if(themeToggle) themeToggle.querySelector('span').textContent = 'dark_mode';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        html.classList.replace('dark', 'light');
        localStorage.setItem('vc-theme', 'light');
        themeToggle.querySelector('span').textContent = 'dark_mode';
      } else {
        html.classList.replace('light', 'dark');
        localStorage.setItem('vc-theme', 'dark');
        themeToggle.querySelector('span').textContent = 'light_mode';
      }
    });
  }

  // 4. Three.js 3D Coffee Animation (Flowing Liquid Gold)
  const canvasContainer = document.getElementById('coffee-3d-canvas');
  if (canvasContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    canvasContainer.appendChild(renderer.domElement);

    // Create a "Liquid Swirl" shape
    const geometry = new THREE.TorusKnotGeometry(3, 0.8, 150, 20);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xe9c349, // Gold
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      transmission: 0.2, // Subtle glass/liquid effect
      thickness: 1.0
    });
    
    const swirl = new THREE.Mesh(geometry, material);
    swirl.rotation.x = Math.PI / 4;
    scene.add(swirl);

    // Lighting (Cinematic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const blueLight = new THREE.PointLight(0x4444ff, 1);
    blueLight.position.set(-10, -10, -10);
    scene.add(blueLight);

    camera.position.z = 15;

    // Mouse Parallax
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    });

    // Handle Resize
    window.addEventListener('resize', () => {
      if (!canvasContainer) return;
      camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      
      // Complex Rotation
      swirl.rotation.z = time * 0.1;
      swirl.rotation.y = time * 0.15;
      
      // Follow mouse subtly
      swirl.position.x += (mouseX - swirl.position.x) * 0.05;
      swirl.position.y += (-mouseY - swirl.position.y) * 0.05;
      
      // Floating pulse
      swirl.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
      
      renderer.render(scene, camera);
    }
    animate();
  }

  // 5. Scroll Reveal Utility (Intersection Observer)
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // We reuse 'animate-fade-up' components and define a 'visible' class in CSS
  document.querySelectorAll('.animate-fade-up, .animate-fade-in, .story-block, .product-card').forEach(el => {
    revealObserver.observe(el);
  });

  /* ─── Active Nav Link ─────────────────────── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.top-nav__link, .bottom-nav__item').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ─── Scroll-aware navbar ─────────────────── */
  const topNav = document.querySelector('.top-nav');
  if (topNav) {
    window.addEventListener('scroll', () => {
      topNav.style.background = window.scrollY > 20
        ? 'rgba(14,14,14,0.97)'
        : 'rgba(14,14,14,0.85)';
    }, { passive: true });
  }

  /* ─── Category Pills ─────────────────────── */
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      const cards = document.querySelectorAll('.product-grid .product-card');

      cards.forEach(card => {
        // Ensure initial transition properties are set dynamically
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          // use small timeout to trigger CSS transition post display block
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          // wait for opacity jump
          setTimeout(() => { 
            if (card.style.opacity === '0') card.style.display = 'none'; 
          }, 300);
        }
      });
    });
  });

  /* ─── Quantity Controls ───────────────────── */
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const minus = ctrl.querySelector('[data-action="minus"]');
    const plus  = ctrl.querySelector('[data-action="plus"]');
    const qty   = ctrl.querySelector('[data-qty]');
    if (!qty) return;
    let val = parseInt(qty.textContent, 10) || 1;

    minus?.addEventListener('click', () => {
      if (val > 1) { val--; qty.textContent = String(val).padStart(2, '0'); updateTotal(); }
    });
    plus?.addEventListener('click', () => {
      val++;
      qty.textContent = String(val).padStart(2, '0');
      updateTotal();
    });
  });

  /* ─── Favourite Toggle ───────────────────── */
  document.querySelectorAll('.product-card__fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const icon = btn.querySelector('.material-symbols-outlined');
      if (!icon) return;
      if (icon.classList.contains('filled')) {
        icon.classList.remove('filled');
        icon.style.color = '';
      } else {
        icon.classList.add('filled');
        icon.style.color = 'var(--primary)';
      }
    });
  });

  /* ─── Cart Total Update ───────────────────── */
  function updateTotal() {
    const subtotalEl = document.querySelector('[data-subtotal]');
    const totalEl    = document.querySelector('[data-total]');
    if (!subtotalEl) return;

    let sum = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
      const priceText = item.querySelector('.cart-item__price')?.textContent || '$0';
      const price = parseFloat(priceText.replace('$','')) || 0;
      const qtyEl = item.querySelector('[data-qty]');
      const qty   = parseInt(qtyEl?.textContent, 10) || 1;
      sum += price * qty;
    });

    subtotalEl.textContent = `$${sum.toFixed(2)}`;
    if (totalEl) {
      const shipping = 18;
      const tax = sum * 0.098;
      totalEl.textContent = `$${(sum + shipping + tax).toFixed(2)}`;
    }
  }

  /* ─── Remove Cart Item ───────────────────── */
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cart-item');
      if (item) {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.opacity = '0';
        item.style.transform = 'translateX(-1rem)';
        setTimeout(() => { item.remove(); updateTotal(); }, 320);
      }
    });
  });

  /* ─── Newsletter Form ─────────────────────── */
  document.querySelectorAll('form[data-newsletter]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button[type="submit"]');
      if (!input || !btn) return;
      btn.textContent = 'Subscribed ✓';
      btn.style.color = 'var(--primary)';
      input.value = '';
      setTimeout(() => { btn.textContent = 'Subscribe'; }, 3000);
    });
  });

  /* ─── Quick Add Toast ─────────────────────── */
  document.querySelectorAll('[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      window.showToast('Added to bag');
    });
  });

  window.showToast = function(msg) {
    const existing = document.querySelector('.vc-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'vc-toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '6.5rem',
      left: '50%',
      transform: 'translateX(-50%) translateY(1rem)',
      background: 'var(--surface-container-high)',
      color: 'var(--on-surface)',
      padding: '0.75rem 2rem',
      borderRadius: 'var(--radius)',
      fontSize: '0.75rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontFamily: 'var(--font-body)',
      fontWeight: '600',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      zIndex: '999',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: '0',
      borderLeft: '2px solid var(--primary)',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(1rem)';
      setTimeout(() => toast.remove(), 320);
    }, 2500);
  }

  /* ─── Intersection Observer – Fade Up ────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.animate-fade-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    io.observe(el);
  });

  /* ─── SEARCH OVERLAY ──────────────────────── */
  // Static product catalogue — covers all pages
  const SEARCH_CATALOGUE = [
    { name: 'Velvet Noir',          tag: 'Dark Roast',         price: 32, url: 'pages/boutique.html', img: 'images/coffee_bag_1775375120850.png' },
    { name: 'Copper Frother',       tag: 'Artisanal Hardware',  price: 58, url: 'pages/boutique.html', img: 'https://i.pinimg.com/736x/96/74/f0/9674f0be033382c620eca0e63e6e97f2.jpg' },
    { name: 'Basalt Vessel',        tag: 'Hand-thrown Ceramic', price: 45, url: 'pages/boutique.html', img: 'https://i.pinimg.com/1200x/96/42/8e/96428e091a41fbb5747c5f6e29f601e9.jpg' },
    { name: 'Golden Crema',         tag: 'Honey & Almond Blend',price: 34, url: 'pages/boutique.html', img: 'https://i.pinimg.com/1200x/35/75/cf/3575cfc5a40e5fccad168a1514b09ed3.jpg' },
    { name: 'Ethiopian Yirgacheffe G1', tag: 'Origin Spotlight',price: 42, url: 'pages/boutique.html', img: 'https://i.pinimg.com/1200x/21/e4/41/21e441d6af58f64c8d082ffc69fbd3b0.jpg' },
    { name: 'The Monarch Kettle',   tag: 'Brewing Hardware',   price: 185, url: 'pages/boutique.html', img: 'https://i.pinimg.com/736x/e9/b7/e5/e9b7e596d74785a154e8634f7f841937.jpg' },
    { name: 'Midnight Taster Set',  tag: 'Gift Set',           price: 68,  url: 'pages/boutique.html', img: 'https://i.pinimg.com/1200x/ed/ab/28/edab28b203767e5f00a326b33bd5bb87.jpg' },
    { name: 'Monsooned Malabar',    tag: 'India · Earthy & Deep',price: 42, url: 'pages/boutique.html', img: 'https://i.pinimg.com/736x/b5/9b/04/b59b044fe9f483ff7b7bfb2b6d59f9c8.jpg' },
    { name: 'Coorg Coffee',         tag: 'India · Peaberry Bean',price: 38, url: 'pages/boutique.html', img: 'images/coffee_bag_1775375120850.png' },
    { name: 'Yunnan Coffee',        tag: 'China · Sweet & Tea-Like',price: 48, url: 'pages/boutique.html', img: 'https://i.pinimg.com/736x/63/0e/b0/630eb0cae89a3c69256d074cf6e077f1.jpg' },
    { name: 'Seattle Blend',        tag: 'America · Bold Roaster',price: 35, url: 'pages/boutique.html', img: 'images/coffee_hero_1775374671404.png' },
    { name: 'Cold Brew Reserve',    tag: 'America · 24Hr Steep',price: 28, url: 'pages/boutique.html', img: 'https://i.pinimg.com/736x/76/fd/12/76fd12962ed0b18f93b1baa67f456a5a.jpg' },
    { name: 'Kyoto Coffee',         tag: 'Japan · Slow Drip',  price: 55,  url: 'pages/boutique.html', img: 'images/coffee_accessories_1775375095577.png' },
    { name: 'V60 Pour Over Kit',    tag: 'Japan · Precision Brewer',price: 85, url: 'pages/boutique.html', img: 'https://i.pinimg.com/1200x/5d/ad/db/5daddb28f95bee839de5dd97c6e9533b.jpg' },
    { name: 'Russian Black',        tag: 'Russia · Dark & Bold',price: 32, url: 'pages/boutique.html', img: 'https://i.pinimg.com/1200x/6a/e4/82/6ae482a0690b8ca89fd3acd554a36d66.jpg' },
    { name: 'Raf Coffee',           tag: 'Russia · Vanilla Sweetened',price: 40, url: 'pages/boutique.html', img: 'images/coffee_hero_1775374671404.png' },
  ];

  // Resolve relative image paths based on current page depth
  function resolveImg(src) {
    if (src.startsWith('http')) return src;
    const depth = location.pathname.includes('/pages/') ? '../' : '';
    return depth + src;
  }

  // Build the overlay DOM once
  function buildSearchOverlay() {
    if (document.getElementById('vc-search-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'vc-search-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search products');

    overlay.innerHTML = `
      <style>
        #vc-search-overlay {
          position: fixed; inset: 0; z-index: 20000;
          background: rgba(8,7,5,0.96);
          backdrop-filter: blur(12px);
          display: flex; flex-direction: column;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s ease;
          overflow-y: auto;
        }
        #vc-search-overlay.open { opacity: 1; pointer-events: all; }

        .vc-search-header {
          display: flex; align-items: center; gap: 1rem;
          padding: 2rem clamp(1.5rem, 5vw, 4rem) 1.5rem;
          border-bottom: 1px solid rgba(212,175,85,0.15);
          position: sticky; top: 0;
          background: rgba(8,7,5,0.97);
          z-index: 1;
        }
        .vc-search-icon {
          color: rgba(212,175,85,0.7);
          font-size: 1.5rem; flex-shrink: 0;
          font-family: 'Material Symbols Outlined'; font-weight: 100;
        }
        #vc-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-size: clamp(1.25rem, 3vw, 2rem);
          font-family: 'Noto Serif', serif; font-weight: 300;
          color: #fff; caret-color: #d4af55;
          letter-spacing: 0.02em;
        }
        #vc-search-input::placeholder { color: rgba(255,255,255,0.2); }
        .vc-search-close {
          background: rgba(255,255,255,0.06); border: none; border-radius: 50%;
          color: rgba(255,255,255,0.5); cursor: pointer;
          width: 2.5rem; height: 2.5rem; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Material Symbols Outlined'; font-size: 1.25rem;
          transition: background 0.2s, color 0.2s;
        }
        .vc-search-close:hover { background: rgba(212,175,85,0.15); color: #d4af55; }

        .vc-search-body { padding: 2rem clamp(1.5rem, 5vw, 4rem); flex: 1; }

        .vc-search-meta {
          font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(212,175,85,0.6); margin-bottom: 1.5rem;
        }

        .vc-search-results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.25rem;
        }

        .vc-result-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212,175,85,0.1);
          border-radius: 0.75rem; overflow: hidden;
          cursor: pointer;
          transition: border-color 0.25s, transform 0.25s, background 0.25s;
          text-decoration: none; display: block;
        }
        .vc-result-card:hover {
          border-color: rgba(212,175,85,0.4);
          background: rgba(212,175,85,0.05);
          transform: translateY(-3px);
        }
        .vc-result-img {
          width: 100%; aspect-ratio: 4/3; object-fit: cover;
          opacity: 0.8; display: block;
          background: rgba(255,255,255,0.03);
        }
        .vc-result-body { padding: 1rem; }
        .vc-result-tag {
          font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #c07d28; margin-bottom: 0.35rem;
        }
        .vc-result-name {
          font-family: 'Noto Serif', serif; font-weight: 300;
          font-size: 1rem; color: #fff; margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .vc-result-name mark {
          background: transparent; color: #d4af55; font-style: italic;
        }
        .vc-result-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 0.75rem;
        }
        .vc-result-price {
          font-size: 0.9rem; font-weight: 600; color: #d4af55;
        }
        .vc-result-add {
          background: rgba(212,175,85,0.12); border: 1px solid rgba(212,175,85,0.25);
          color: #d4af55; border-radius: 999px; font-size: 0.6rem;
          letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer;
          padding: 0.3rem 0.75rem;
          font-family: 'Manrope', sans-serif; font-weight: 600;
          transition: background 0.2s, border-color 0.2s;
        }
        .vc-result-add:hover { background: rgba(212,175,85,0.25); border-color: #d4af55; }

        .vc-search-empty {
          text-align: center; padding: 4rem 2rem;
          color: rgba(255,255,255,0.25);
        }
        .vc-search-empty-icon {
          font-family: 'Material Symbols Outlined'; font-size: 3rem;
          font-weight: 100; display: block; margin-bottom: 1rem;
          color: rgba(212,175,85,0.2);
        }
        .vc-search-empty p { font-size: 1rem; font-weight: 300; margin: 0; }

        .vc-search-hint {
          padding: 1.5rem clamp(1.5rem, 5vw, 4rem);
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; gap: 2rem; flex-wrap: wrap;
        }
        .vc-hint-item {
          font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .vc-hint-key {
          display: inline-block; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 3px; padding: 0.1rem 0.45rem;
          font-size: 0.6rem; margin-right: 0.4rem; color: rgba(255,255,255,0.35);
        }
      </style>

      <!-- Header with input -->
      <div class="vc-search-header">
        <span class="vc-search-icon">search</span>
        <input
          id="vc-search-input"
          type="search"
          placeholder="Search coffees, gear, origins…"
          autocomplete="off"
          spellcheck="false"
          aria-label="Search"
        />
        <button class="vc-search-close" id="vc-search-close-btn" aria-label="Close search">close</button>
      </div>

      <!-- Results body -->
      <div class="vc-search-body">
        <div class="vc-search-meta" id="vc-search-meta">— Start typing to explore —</div>
        <div class="vc-search-results" id="vc-search-results"></div>
        <div class="vc-search-empty" id="vc-search-empty" style="display:none">
          <span class="vc-search-empty-icon">search_off</span>
          <p>No products matched your search.</p>
        </div>
      </div>

      <!-- Keyboard hints -->
      <div class="vc-search-hint">
        <span class="vc-hint-item"><span class="vc-hint-key">Esc</span> to close</span>
        <span class="vc-hint-item"><span class="vc-hint-key">Enter</span> to visit first result</span>
      </div>
    `;

    document.body.appendChild(overlay);

    const input    = document.getElementById('vc-search-input');
    const results  = document.getElementById('vc-search-results');
    const meta     = document.getElementById('vc-search-meta');
    const empty    = document.getElementById('vc-search-empty');
    const closeBtn = document.getElementById('vc-search-close-btn');

    function highlight(str, query) {
      if (!query) return str;
      const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return str.replace(re, '<mark>$1</mark>');
    }

    function renderResults(query) {
      const q = query.trim().toLowerCase();
      results.innerHTML = '';

      if (!q) {
        meta.textContent = '— Start typing to explore —';
        empty.style.display = 'none';
        return;
      }

      const hits = SEARCH_CATALOGUE.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );

      meta.textContent = hits.length
        ? `${hits.length} result${hits.length !== 1 ? 's' : ''} for "${query}"`
        : '';
      empty.style.display = hits.length ? 'none' : 'block';

      hits.forEach(product => {
        // Resolve URL relative to current page
        const isInPages = location.pathname.includes('/pages/');
        const href = isInPages
          ? product.url.replace('pages/', '')
          : product.url;

        const card = document.createElement('div');
        card.className = 'vc-result-card';

        card.innerHTML = `
          <img class="vc-result-img" src="${resolveImg(product.img)}" alt="${product.name}" loading="lazy" />
          <div class="vc-result-body">
            <div class="vc-result-tag">${product.tag}</div>
            <div class="vc-result-name">${highlight(product.name, query.trim())}</div>
            <div class="vc-result-footer">
              <span class="vc-result-price">$${product.price.toFixed(2)}</span>
              <button class="vc-result-add" data-name="${product.name}" data-price="${product.price}">Add to Bag</button>
            </div>
          </div>
        `;

        // Navigate to boutique on card click
        card.addEventListener('click', (e) => {
          if (e.target.classList.contains('vc-result-add')) return;
          closeSearch();
          window.location.href = href;
        });

        // Add to cart on button click
        card.querySelector('.vc-result-add').addEventListener('click', (e) => {
          e.stopPropagation();
          addToCart(product.name, product.price, null);
          e.currentTarget.textContent = 'Added ✓';
          e.currentTarget.style.color = '#d4af55';
          setTimeout(() => {
            e.currentTarget.textContent = 'Add to Bag';
            e.currentTarget.style.color = '';
          }, 1800);
        });

        results.appendChild(card);
      });
    }

    // Live search
    input.addEventListener('input', () => renderResults(input.value));

    // Enter → visit first result
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = results.querySelector('.vc-result-card');
        if (first) first.click();
      }
    });

    // Close
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });
  }

  function openSearch() {
    buildSearchOverlay();
    const overlay = document.getElementById('vc-search-overlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('vc-search-input')?.focus(), 50);
  }

  function closeSearch() {
    const overlay = document.getElementById('vc-search-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    const input = document.getElementById('vc-search-input');
    if (input) {
      input.value = '';
      document.getElementById('vc-search-results').innerHTML = '';
      document.getElementById('vc-search-meta').textContent = '— Start typing to explore —';
      document.getElementById('vc-search-empty').style.display = 'none';
    }
  }

  // Wire all search buttons on the page
  document.querySelectorAll('[aria-label="Search"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  // Global keyboard shortcut — Escape closes, "/" opens
  document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('vc-search-overlay');
    if (e.key === 'Escape' && overlay?.classList.contains('open')) {
      closeSearch();
    }
    if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    }
  });

});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Walk up the DOM from the clicked button to find the product card,
  // then grab its first <img> src so every item carries its own image.
  let image = '';
  if (event && event.target) {
    const card = event.target.closest('.product-card, .side-card, .b-featured');
    if (card) {
      const img = card.querySelector('img');
      if (img) image = img.src;
    }
  }

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));

  if (window.showToast) {
    window.showToast(name + " added to bag");
  } else {
    alert(name + " added to bag");
  }
}
function loadCart() {
  const container = document.getElementById("cart-items");
  const subtotalEl = document.querySelector("[data-subtotal]");
  const totalEl = document.getElementById("total");
  const taxEl = document.getElementById("tax-amount");

  if (!container) return;

  let total = 0;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      const qty = item.qty || 1;
      total += item.price * qty;
      const imgSrc = item.image || '../assets/images/coffee_bag_1775375120850.png';
      container.innerHTML += `
        <article class="cart-item">
          <div class="cart-item__img-wrap">
            <img src="${imgSrc}" alt="${item.name}" />
          </div>
          <div class="cart-item__body">
            <div>
              <h3 class="cart-item__title">${item.name}</h3>
              <p class="cart-item__meta">Qty: ${qty}</p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <span class="cart-item__price">$${(item.price * qty).toFixed(2)}</span>
              <button class="remove-btn" onclick="removeFromCart(${index})">Remove All</button>
            </div>
          </div>
        </article>
      `;
    });
  }

  if (subtotalEl) subtotalEl.innerText = "$" + total.toFixed(2);
  const shipping = total > 0 ? 18 : 0;
  const tax = total * 0.098;
  if (taxEl) taxEl.innerText = "$" + tax.toFixed(2);
  if (totalEl) totalEl.innerText = "$" + (total + shipping + tax).toFixed(2);
}

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
};

loadCart();
window.currentOrderData = null;

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = 18;
  const tax = subtotal * 0.098;
  const total = subtotal + shipping + tax;

  const order = {
    shop: "Velvet Crema",
    id: "VC-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    date: new Date().toLocaleString("en-IN", {
      weekday: "long", year: "numeric", month: "long",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    }),
    items: cart.map(i => ({ name: i.name, price: i.price, image: i.image })),
    subtotal,
    shipping,
    tax,
    total
  };

  window.currentOrderData = order;
  showReceipt(order);

  cart.length = 0;
  localStorage.removeItem("cart");
  loadCart();
}

function showReceipt(order) {
  /* ── Remove any existing modal ── */
  document.querySelector(".checkout-modal-overlay")?.remove();

  const itemsHtml = order.items.map(i => `
    <div class="receipt-row">
      <span class="receipt-row__name">${i.name}</span>
      <span class="receipt-row__price">$${i.price.toFixed(2)}</span>
    </div>
  `).join("");

  const modal = document.createElement("div");
  modal.className = "checkout-modal-overlay";
  modal.innerHTML = `
    <div class="checkout-modal receipt-modal">

      <!-- Header gradient band -->
      <div class="receipt-header">
        <div class="receipt-brand-icon">☕</div>
        <h2 class="receipt-brand">Velvet Crema</h2>
        <p class="receipt-tagline">The Sensory Sommelier</p>
        <div class="receipt-badge">Order Confirmed</div>
      </div>

      <!-- Order meta -->
      <div class="receipt-meta">
        <div class="receipt-meta__col">
          <span class="receipt-meta__label">Order ID</span>
          <span class="receipt-meta__val">${order.id}</span>
        </div>
        <div class="receipt-meta__col">
          <span class="receipt-meta__label">Date</span>
          <span class="receipt-meta__val">${order.date}</span>
        </div>
      </div>

      <!-- Items -->
      <div class="receipt-items">
        <p class="receipt-section-label">Items Ordered</p>
        ${itemsHtml}
      </div>

      <!-- Totals breakdown -->
      <div class="receipt-totals">
        <div class="receipt-total-row">
          <span>Subtotal</span><span>$${order.subtotal.toFixed(2)}</span>
        </div>
        <div class="receipt-total-row">
          <span>Shipping</span><span>$${order.shipping.toFixed(2)}</span>
        </div>
        <div class="receipt-total-row">
          <span>Tax (9.8%)</span><span>$${order.tax.toFixed(2)}</span>
        </div>
        <div class="receipt-grand">
          <span>Total Paid</span><span>$${order.total.toFixed(2)}</span>
        </div>

      <!-- Thank-you note -->
      <p class="receipt-thankyou">✨ Thank you for your order! Your coffee is being lovingly prepared.</p>

      <!-- Actions -->
      <div class="receipt-actions">
        <button class="btn btn-primary receipt-btn" onclick="downloadBill()">
          <span class="material-symbols-outlined" style="font-size:1.1rem;vertical-align:middle">download</span>
          Download Receipt
        </button>
        <button class="btn receipt-btn receipt-btn--ghost" onclick="closeReceiptModal()">
          Return to Shop
        </button>
      </div>

      <!-- Close X -->
      <button class="receipt-close" onclick="closeReceiptModal()" aria-label="Close">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>

    <style>
      .checkout-modal-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
        z-index: 10000;
        opacity: 0; transition: opacity 0.35s ease;
        padding: 1rem;
      }
      .checkout-modal-overlay.open { opacity: 1; }

      .receipt-modal {
        background: #1a1008;
        border-radius: 1.5rem;
        width: 100%; max-width: 480px;
        max-height: 90vh; overflow-y: auto;
        position: relative;
        box-shadow: 0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,85,0.15);
        transform: translateY(2rem) scale(0.97);
        transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease;
        scrollbar-width: thin;
        scrollbar-color: rgba(212,175,85,0.3) transparent;
      }
      .checkout-modal-overlay.open .receipt-modal {
        transform: translateY(0) scale(1);
      }

      .receipt-header {
        background: linear-gradient(135deg, #6b3a1f 0%, #c07d28 40%, #d4af55 70%, #8b5e1a 100%);
        padding: 2.5rem 2rem 2rem;
        text-align: center;
        border-radius: 1.5rem 1.5rem 0 0;
        position: relative;
        overflow: hidden;
      }
      .receipt-header::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.12) 0%, transparent 60%),
                    radial-gradient(circle at 80% 20%, rgba(255,200,80,0.15) 0%, transparent 50%);
      }
      .receipt-brand-icon { font-size: 2.5rem; margin-bottom: 0.5rem; display: block; }
      .receipt-brand {
        font-family: 'Noto Serif', serif;
        font-size: 1.75rem; font-weight: 300;
        color: #fff; letter-spacing: 0.05em;
        margin: 0 0 0.25rem;
      }
      .receipt-tagline {
        font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
        color: rgba(255,255,255,0.7); margin: 0 0 1rem;
      }
      .receipt-badge {
        display: inline-block;
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.35);
        color: #fff;
        font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
        padding: 0.35rem 1rem; border-radius: 999px;
        font-weight: 600;
      }

      .receipt-meta {
        display: flex; gap: 1rem;
        padding: 1.25rem 1.75rem;
        background: rgba(212,175,85,0.06);
        border-bottom: 1px solid rgba(212,175,85,0.12);
      }
      .receipt-meta__col { flex: 1; }
      .receipt-meta__label {
        display: block; font-size: 0.6rem; letter-spacing: 0.18em;
        text-transform: uppercase; color: #c07d28; margin-bottom: 0.25rem;
      }
      .receipt-meta__val {
        font-size: 0.8rem; color: rgba(255,255,255,0.85); font-weight: 500;
        word-break: break-all;
      }

      .receipt-items {
        padding: 1.5rem 1.75rem;
        border-bottom: 1px solid rgba(212,175,85,0.12);
      }
      .receipt-section-label {
        font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
        color: #c07d28; margin: 0 0 1rem;
      }
      .receipt-row {
        display: flex; justify-content: space-between; align-items: center;
        padding: 0.6rem 0;
        border-bottom: 1px dashed rgba(255,255,255,0.06);
      }
      .receipt-row:last-child { border-bottom: none; }
      .receipt-row__name { font-size: 0.9rem; color: rgba(255,255,255,0.85); }
      .receipt-row__price { font-size: 0.9rem; color: #d4af55; font-weight: 600; }

      .receipt-totals {
        padding: 1.25rem 1.75rem;
        border-bottom: 1px solid rgba(212,175,85,0.12);
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .receipt-total-row {
        display: flex; justify-content: space-between;
        font-size: 0.85rem; color: rgba(255,255,255,0.55);
      }
      .receipt-grand {
        display: flex; justify-content: space-between; align-items: center;
        margin-top: 0.75rem; padding-top: 0.75rem;
        border-top: 1px solid rgba(212,175,85,0.25);
        font-family: 'Noto Serif', serif;
        font-size: 1.3rem; font-weight: 300;
        color: #d4af55;
      }

      .receipt-thankyou {
        text-align: center; font-size: 0.82rem;
        color: rgba(255,255,255,0.5);
        padding: 1.25rem 1.75rem 0.5rem;
        line-height: 1.5;
      }

      .receipt-actions {
        display: flex; gap: 0.75rem; padding: 1.25rem 1.75rem 1.75rem;
        flex-wrap: wrap;
      }
      .receipt-btn { flex: 1; min-width: 130px; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
      .receipt-btn--ghost {
        background: transparent;
        border: 1px solid rgba(212,175,85,0.35);
        color: #d4af55;
        border-radius: var(--radius, 0.5rem);
        cursor: pointer;
        padding: 0.75rem 1.5rem;
        font-family: var(--font-body, sans-serif);
        font-size: 0.8rem;
        transition: background 0.2s, border-color 0.2s;
      }
      .receipt-btn--ghost:hover { background: rgba(212,175,85,0.1); border-color: #d4af55; }

      .receipt-close {
        position: absolute; top: 1rem; right: 1rem;
        background: rgba(0,0,0,0.35); border: none; border-radius: 50%;
        color: rgba(255,255,255,0.75); cursor: pointer;
        width: 2rem; height: 2rem;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s;
      }
      .receipt-close:hover { background: rgba(0,0,0,0.6); color: #fff; }
      .receipt-close .material-symbols-outlined { font-size: 1.1rem; }
    </style>
  `;

  document.body.appendChild(modal);
  requestAnimationFrame(() => modal.classList.add("open"));
}

window.closeReceiptModal = function () {
  const modal = document.querySelector(".checkout-modal-overlay");
  if (modal) {
    modal.classList.remove("open");
    setTimeout(() => {
      modal.remove();
      // Navigate back to boutique if on cart page
      if (location.pathname.includes("cart")) {
        window.location.href = "boutique.html";
      }
    }, 350);
  }
};

window.downloadBill = function () {
  if (!window.currentOrderData) return;
  const order = window.currentOrderData;

  if (typeof window.jspdf === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => generatePDF(order);
    document.head.appendChild(script);
  } else {
    generatePDF(order);
  }
};

function generatePDF(order) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a5", orientation: "portrait" });
  const W = doc.internal.pageSize.getWidth();

  /* ── Gradient-style header band ── */
  // Deep brown background
  doc.setFillColor(43, 18, 5);
  doc.rect(0, 0, W, 148, "F"); // fill full page dark

  // Header amber band
  doc.setFillColor(107, 58, 31);
  doc.rect(0, 0, W, 42, "F");
  doc.setFillColor(192, 125, 40);
  doc.rect(0, 28, W, 14, "F");
  doc.setFillColor(212, 175, 85);
  doc.rect(0, 36, W, 6, "F");

  /* Brand name */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Velvet Crema", W / 2, 16, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(255, 220, 150);
  doc.text("THE SENSORY SOMMELIER", W / 2, 22, { align: "center" });

  /* ✔ Order Confirmed badge */
  doc.setFillColor(255, 255, 255, 0.15);
  doc.roundedRect(W / 2 - 22, 25, 44, 8, 4, 4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(43, 18, 5);
  doc.text("✔  ORDER CONFIRMED", W / 2, 30.5, { align: "center" });

  /* ── Meta box ── */
  let y = 50;
  doc.setFillColor(60, 30, 10);
  doc.roundedRect(8, y, W - 16, 18, 3, 3, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(192, 125, 40);
  doc.text("ORDER ID", 13, y + 5);
  doc.text("DATE", W / 2 + 2, y + 5);
  doc.setTextColor(230, 210, 160);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text(order.id, 13, y + 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  const dateParts = order.date.split(",");
  doc.text((dateParts[1] || order.date).trim(), W / 2 + 2, y + 12);

  /* ── Items ── */
  y += 26;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(192, 125, 40);
  doc.text("ITEMS ORDERED", 8, y);

  y += 5;
  doc.setDrawColor(212, 175, 85, 0.4);
  doc.setLineWidth(0.3);
  doc.line(8, y, W - 8, y);

  order.items.forEach((item, idx) => {
    y += 7;
    // alternate row tint
    if (idx % 2 === 0) {
      doc.setFillColor(55, 28, 8);
      doc.rect(8, y - 4.5, W - 16, 7, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(220, 200, 160);
    doc.text(item.name, 12, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(212, 175, 85);
    doc.text(`$${item.price.toFixed(2)}`, W - 12, y, { align: "right" });
  });

  y += 5;
  doc.setDrawColor(212, 175, 85);
  doc.setLineWidth(0.3);
  doc.line(8, y, W - 8, y);

  /* ── Totals ── */
  y += 7;
  const totals = [
    ["Subtotal", `$${order.subtotal.toFixed(2)}`],
    ["Shipping", `$${order.shipping.toFixed(2)}`],
    ["Tax (9.8%)", `$${order.tax.toFixed(2)}`],
  ];
  totals.forEach(([label, val]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(160, 140, 110);
    doc.text(label, 12, y);
    doc.text(val, W - 12, y, { align: "right" });
    y += 6;
  });

  // Grand total
  y += 2;
  doc.setFillColor(192, 125, 40);
  doc.roundedRect(8, y - 4, W - 16, 11, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(43, 18, 5);
  doc.text("TOTAL PAID", 14, y + 3.5);
  doc.text(`$${order.total.toFixed(2)}`, W - 14, y + 3.5, { align: "right" });

  /* ── Thank you ── */
  y += 18;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(140, 120, 80);
  doc.text("Thank you for your order. Your coffee is being lovingly prepared.", W / 2, y, { align: "center" });

  /* ── Footer line ── */
  y += 8;
  doc.setDrawColor(80, 50, 15);
  doc.setLineWidth(0.5);
  doc.line(8, y, W - 8, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(100, 80, 50);
  doc.text("velvetcrema.com  ·  hello@velvetcrema.com", W / 2, y, { align: "center" });

  doc.save(`VelvetCrema_Receipt_${order.id}.pdf`);
}