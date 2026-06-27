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
    setupFooterModals();
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

const termsText = `# 서비스 이용약관 (Terms of Service)

**제1조 (목적)**
본 약관은 사용자가 '랜덤 발표자 뽑기' 웹 애플리케이션(이하 "서비스")을 이용함에 있어 서비스 제공자와 사용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

**제2조 (서비스의 제공 및 변경)**
1. 본 서비스는 수업 시간 또는 기타 활동 시 무작위로 발표자(참여자)를 추첨하기 위한 목적으로 제공되는 유틸리티 도구입니다.
2. 서비스 제공자는 필요에 따라 서비스의 내용을 변경하거나 제공을 중단할 수 있으며, 이로 인해 사용자에게 발생한 불이익에 대해 책임을 지지 않습니다.

**제3조 (사용자의 의무)**
1. 사용자는 본 서비스를 이용함에 있어 타인의 명예를 훼손하거나 불법적인 목적(예: 불법 도박 등)으로 사용해서는 안 됩니다.
2. 사용자는 서비스 이용 시 건전한 목적에 맞게 활용해야 하며, 부적절한 텍스트나 데이터를 입력하여 타인에게 불쾌감을 주어서는 안 됩니다.

**제4조 (책임의 한계)**
1. 본 서비스는 브라우저 기반으로 동작하며, 추첨 결과의 완전한 무작위성이나 시스템의 무결성을 법적으로 보장하지 않습니다.
2. 추첨 결과로 인해 발생하는 사용자 간의 분쟁이나 금전적/정신적 손해에 대하여 서비스 제공자는 어떠한 책임도 지지 않습니다.

**제5조 (데이터의 관리)**
본 서비스는 사용자의 데이터를 외부 서버에 저장하지 않습니다. 입력된 모든 정보의 관리 책임은 사용자 본인의 기기 및 브라우저 환경에 있습니다.

**제6조 (약관의 효력 및 변경)**
본 약관은 사용자가 서비스를 이용하는 순간부터 효력이 발생하며, 서비스 제공자는 필요한 경우 약관을 수정할 수 있습니다.

*본 약관은 2026년 6월 27일부터 적용됩니다.*`;

const privacyText = `# 개인정보처리방침 (Privacy Policy)

**1. 개인정보의 수집 및 이용 목적**
본 '랜덤 발표자 뽑기' 웹 애플리케이션(이하 "서비스")은 사용자의 어떠한 개인정보도 서버로 전송하거나 외부에 수집, 저장하지 않습니다.
입력하신 학생(참여자)의 이름 정보는 오직 브라우저 내에서 무작위 추첨을 진행하기 위한 목적으로만 일시적으로 사용됩니다.

**2. 수집하는 개인정보의 항목**
- 수집 항목: 없음 (사용자가 입력하는 이름은 사용자의 로컬 브라우저 메모리 내에만 머뭅니다.)
- 개인정보 수집 방법: 해당 사항 없음

**3. 개인정보의 보유 및 이용 기간**
입력하신 데이터는 브라우저를 종료하거나 새로고침할 경우 소멸되며, 영구적으로 보관되지 않습니다.

**4. 개인정보의 제3자 제공 및 위탁**
본 서비스는 어떠한 데이터도 외부 서버로 전송하지 않으므로, 제3자에게 개인정보를 제공하거나 처리를 위탁하지 않습니다.

**5. 이용자의 권리**
사용자는 언제든지 서비스 이용을 중단하고 브라우저를 닫음으로써 입력된 모든 데이터를 파기할 수 있습니다.

**6. 개인정보 보호책임자**
본 서비스는 별도의 서버를 운영하지 않는 클라이언트 기반 애플리케이션이므로, 별도의 개인정보 보호책임자를 두지 않습니다. 서비스 이용과 관련된 문의사항은 서비스 제공자에게 문의해주시기 바랍니다.

*본 방침은 2026년 6월 27일부터 시행됩니다.*`;

function setupFooterModals() {
  const modal = document.getElementById('terms-modal');
  const closeBtn = document.getElementById('closeTermsBtn');
  const titleEl = document.getElementById('terms-modal-title');
  const bodyEl = document.getElementById('terms-modal-body');
  
  const btnTerms = document.getElementById('btn-terms');
  const btnPrivacy = document.getElementById('btn-privacy');
  
  const openModal = (title, text) => {
    titleEl.textContent = title;
    // 간단한 마크다운 파싱 (볼드체, 헤더 치환)
    let htmlContent = text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\*\*([^*]+)\*\*/gim, '<h2>$1</h2>')
      .replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>');
      
    bodyEl.innerHTML = htmlContent;
    modal.classList.remove('hidden');
  };
  
  const closeModal = () => {
    modal.classList.add('hidden');
  };
  
  btnTerms.addEventListener('click', () => openModal('서비스 이용약관', termsText));
  btnPrivacy.addEventListener('click', () => openModal('개인정보처리방침', privacyText));
  
  closeBtn.addEventListener('click', closeModal);
  
  // 모달 배경 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
