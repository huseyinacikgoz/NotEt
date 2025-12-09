import { store } from '../store.js';
import { escapeHtml } from '../utils.js';

export class Sidebar {
    constructor() {
        this.container = document.getElementById('sidebar-container');
        this.unsubscribe = store.subscribe(this.render.bind(this));
        this.render();
    }

    render(state = store.state) {
        if (!this.container) return;

        const categoriesHtml = Object.values(state.categories).map(cat => `
            <div class="nav-category-item-wrapper">
                <a href="#" class="nav-category-item ${state.filter === 'category' && state.filterId === cat.id ? 'active' : ''}" 
                   data-action="filter-category" data-id="${cat.id}">
                    <span class="nav-category-dot" style="background-color: ${cat.color}"></span>
                    <span>${escapeHtml(cat.name)}</span>
                </a>
                <div class="nav-category-actions">
                    <button class="nav-category-action-btn" data-action="edit-category" data-id="${cat.id}" title="Düzenle">
                        <svg class="nav-category-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button class="nav-category-action-btn" data-action="delete-category" data-id="${cat.id}" title="Sil">
                        <svg class="nav-category-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');

        // Calculate counts
        const allCount = Object.values(state.notes).filter(n => !n.silindi && !n.arsiv).length;

        this.container.innerHTML = `
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <div class="logo" data-action="filter-all" style="cursor: pointer;">
                        <div class="logo-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                        <span class="logo-text">NotEt</span>
                    </div>
                </div>
                
                <nav class="sidebar-nav">
                    <a href="#" class="nav-item ${state.filter === 'new' ? 'active' : ''}" data-action="new-note">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        <span>Yeni Not Ekle</span>
                    </a>
                    <a href="#" class="nav-item ${state.filter === 'all' ? 'active' : ''}" data-action="filter-all">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <span>Tüm Notlar</span>
                        <span class="nav-badge">${allCount}</span>
                    </a>
                    <a href="#" class="nav-item ${state.filter === 'favorites' ? 'active' : ''}" data-action="filter-favorites">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                        <span>Favoriler</span>
                    </a>
                    <a href="#" class="nav-item ${state.filter === 'archived' ? 'active' : ''}" data-action="filter-archived">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                        </svg>
                        <span>Arşiv</span>
                    </a>
                    <a href="#" class="nav-item ${state.filter === 'trash' ? 'active' : ''}" data-action="filter-trash">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        <span>Çöp Kutusu</span>
                    </a>
                    
                    <a href="#" class="nav-item" data-action="settings-modal" style="margin-top: auto;">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>Ayarlar</span>
                    </a>
                    
                    <div class="nav-section">
                        <div class="nav-section-title">Kategoriler</div>
                        <div class="nav-categories">
                            ${categoriesHtml}
                        </div>
                        <button class="nav-add-category" data-action="add-category-modal">
                            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                            </svg>
                            <span>Kategori Ekle</span>
                        </button>
                    </div>
                </nav>
                

            </aside>
        `;

        this.setupMobileEvents();
    }

    setupMobileEvents() {
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const overlay = document.getElementById('sidebar-overlay');
        const sidebar = document.getElementById('sidebar');

        if (mobileBtn && overlay && sidebar) {
            // Remove old listeners to prevent duplicates if re-rendered
            const newBtn = mobileBtn.cloneNode(true);
            mobileBtn.parentNode.replaceChild(newBtn, mobileBtn);

            const newOverlay = overlay.cloneNode(true);
            overlay.parentNode.replaceChild(newOverlay, overlay);

            newBtn.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
                newOverlay.classList.toggle('active');
            });

            newOverlay.addEventListener('click', () => {
                sidebar.classList.remove('mobile-open');
                newOverlay.classList.remove('active');
            });

            // Close sidebar when a link or logo is clicked on mobile
            const links = sidebar.querySelectorAll('a, button, .logo');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('mobile-open');
                        newOverlay.classList.remove('active');
                    }
                });
            });
        }
    }
}
