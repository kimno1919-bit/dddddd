let apps = [];

async function init() {
  try {
    const res = await fetch('/apps.json');
    const data = await res.json();
    apps = data.apps;
    
    renderAllApps(apps);
    renderCategoryView(apps);
    setupTabs();
    setupSearch();
    setupLauncher();
  } catch (err) {
    console.error("앱 데이터를 불러오는데 실패했심더:", err);
  }
}

function getFallbackIcon(name, color) {
  const initial = name.charAt(0);
  return `<div class="product-card-icon" style="background-color: ${color}; color: #fff;">${initial}</div>`;
}

function createAppCard(app) {
  return `
    <a href="${app.url}" target="_blank" class="product-card">
      <div class="product-card-image">
        ${getFallbackIcon(app.name, app.color)}
        <div class="badge-promo">${app.category}</div>
      </div>
      <div class="product-card-meta">
        <div class="product-name">${app.name}</div>
        <div class="product-category">${app.tags.join(' · ')}</div>
        <div class="product-desc">${app.description}</div>
      </div>
    </a>
  `;
}

function renderAllApps(appList) {
  const container = document.getElementById('all-apps-grid');
  if (appList.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; padding: 48px 0; font-size: 24px; font-weight: bold;">앱이 없심더.</div>`;
    return;
  }
  container.innerHTML = appList.map(createAppCard).join('');
}

function renderCategoryView(appList) {
  const sidebar = document.getElementById('category-sidebar');
  const content = document.getElementById('category-content');
  
  const categories = [...new Set(appList.map(a => a.category))];
  
  // Sidebar
  sidebar.innerHTML = `
    <div class="filter-group-header">Shop by Category</div>
    ${categories.map((c, i) => `
      <a href="#cat-${i}" class="filter-item">${c} <span class="filter-count">(${appList.filter(a => a.category === c).length})</span></a>
    `).join('')}
  `;
  
  // Content Sections
  content.innerHTML = categories.map((c, i) => {
    const catApps = appList.filter(a => a.category === c);
    return `
      <div id="cat-${i}">
        <h2 class="category-section-title">${c}</h2>
        <div class="grid-container">
          ${catApps.map(createAppCard).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function setupTabs() {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.view-section');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update links
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Update sections
      const targetId = `view-${link.dataset.tab}`;
      sections.forEach(s => {
        s.classList.toggle('active', s.id === targetId);
      });
    });
  });
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = apps.filter(app => 
      app.name.toLowerCase().includes(q) || 
      app.description.toLowerCase().includes(q) ||
      app.tags.some(t => t.toLowerCase().includes(q))
    );
    
    // Update All Apps view
    renderAllApps(filtered);
    
    // Automatically switch to All Apps tab if searching
    if (q.length > 0) {
      document.querySelector('[data-tab="all"]').click();
    }
  });
}

function setupLauncher() {
  const modal = document.getElementById('launcher-modal');
  const closeBtn = document.getElementById('closeLauncherBtn');
  const input = document.getElementById('launcherSearchInput');
  const grid = document.getElementById('launcher-grid');
  
  const renderLauncherGrid = (appList) => {
    grid.innerHTML = appList.map(app => `
      <a href="${app.url}" target="_blank" class="launcher-tile">
        <div class="launcher-icon" style="background-color: ${app.color}; color: #fff;">${app.name.charAt(0)}</div>
        <div class="launcher-name">${app.name}</div>
      </a>
    `).join('');
  };
  
  const openLauncher = () => {
    modal.classList.remove('hidden');
    input.value = '';
    renderLauncherGrid(apps);
    setTimeout(() => input.focus(), 100);
  };
  
  const closeLauncher = () => {
    modal.classList.add('hidden');
  };
  
  closeBtn.addEventListener('click', closeLauncher);
  
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = apps.filter(app => app.name.toLowerCase().includes(q));
    renderLauncherGrid(filtered);
  });
  
  // Shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('hidden')) {
        openLauncher();
      } else {
        closeLauncher();
      }
    }
    if (e.key === 'Escape') {
      closeLauncher();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
