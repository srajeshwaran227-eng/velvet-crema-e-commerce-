/* ============================================
   VELVET CREMA — Navigation Component
   Call injectNav(activePage) in each HTML file
   ============================================ */

function injectNav(activePage = '') {
  const pages = [
    { href: '../index.html', label: 'Home',     icon: 'home_max',       key: 'home'     },
    { href: 'boutique.html', label: 'Boutique', icon: 'local_cafe',     key: 'boutique' },
    { href: 'journal.html',  label: 'Journal',  icon: 'menu_book',      key: 'journal'  },
    { href: 'cart.html',     label: 'Cart',     icon: 'shopping_cart',  key: 'cart', badge: '2' },
  ];

  const navLinks = [
    { href: '../index.html',      label: 'Home'      },
    { href: 'boutique.html',      label: 'Boutique'  },
    { href: 'product.html',       label: 'Origin'    },
    { href: 'journal.html',       label: 'Journal'   },
    { href: 'membership.html',    label: 'Membership'},
  ];

  /* Top Nav */
  const topEl = document.querySelector('.top-nav');
  if (topEl) {
    topEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:2.5rem">
        <button class="top-nav__icon-btn hamburger" aria-label="Menu">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <nav class="top-nav__links hide-mobile-flex">
          ${navLinks.slice(0,2).map(l => `
            <a href="${l.href}" class="top-nav__link ${activePage === l.label.toLowerCase() ? 'active' : ''}">${l.label}</a>
          `).join('')}
        </nav>
      </div>

      <a href="../index.html" class="top-nav__logo">Velvet Crema</a>

      <div style="display:flex;align-items:center;gap:1.5rem">
        <nav class="top-nav__links hide-mobile-flex">
          ${navLinks.slice(2).map(l => `
            <a href="${l.href}" class="top-nav__link ${activePage === l.label.toLowerCase() ? 'active' : ''}">${l.label}</a>
          `).join('')}
        </nav>
        <div class="top-nav__actions">
          <button class="top-nav__icon-btn" aria-label="Search">
            <span class="material-symbols-outlined">search</span>
          </button>
          <a href="cart.html" class="top-nav__icon-btn primary-icon" aria-label="Cart" style="position:relative">
            <span class="material-symbols-outlined">shopping_bag</span>
            <span style="position:absolute;top:-4px;right:-4px;background:var(--primary);color:var(--on-primary);font-size:0.5rem;font-weight:700;width:1rem;height:1rem;display:flex;align-items:center;justify-content:center;border-radius:50%">2</span>
          </a>
        </div>
      </div>
    `;
  }

  /* Bottom Nav */
  const bottomEl = document.querySelector('.bottom-nav');
  if (bottomEl) {
    bottomEl.innerHTML = pages.map(p => `
      <a href="${p.href}" class="bottom-nav__item ${activePage === p.key ? 'active' : ''}" aria-label="${p.label}">
        <span class="material-symbols-outlined">${p.icon}</span>
        ${p.label}
        ${p.badge ? `<span class="bottom-nav__badge">${p.badge}</span>` : ''}
      </a>
    `).join('');
  }

  /* FAB */
  const fab = document.querySelector('.fab');
  if (fab) {
    fab.innerHTML = `
      <span class="material-symbols-outlined">coffee_maker</span>
      <span class="fab__tooltip">Concierge</span>
    `;
  }
}
