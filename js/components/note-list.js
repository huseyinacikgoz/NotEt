import { store } from '../store.js';
import { escapeHtml, formatDate } from '../utils.js';

export class NoteList {
    constructor() {
        this.container = document.getElementById('main-content');
        this.unsubscribe = store.subscribe(this.render.bind(this));
        this.render();
    }

    render(state = store.state) {
        if (!this.container || state.filter === 'new') return;

        const notes = store.getNotes();
        const categories = state.categories;

        let title = 'Tüm Notlar';
        let description = `${notes.length} not listeleniyor`;
        if (state.filter === 'favorites') title = 'Favoriler';
        else if (state.filter === 'archived') title = 'Arşiv';
        else if (state.filter === 'trash') title = 'Çöp Kutusu';
        else if (state.filter === 'category') {
            const cat = categories[state.filterId];
            if (cat) {
                title = cat.name;
                if (cat.aciklama) {
                    description = escapeHtml(cat.aciklama);
                }
            } else {
                title = 'Kategori';
            }
        }

        const notesHtml = notes.length > 0 ? notes.map(note => {
            const category = note.kategori ? categories[note.kategori] : null;
            const isTrash = state.filter === 'trash';

            return `
                <div class="note-card" style="${note.renk !== '#ffffff' ? `border: 1px solid ${note.renk};` : ''}">
                    <div class="note-header">
                        <div style="flex: 1; text-align: left;">
                            ${note.baslik ? `<div class="note-title">${escapeHtml(note.baslik)}</div>` : ''}
                            <div class="note-meta">
                                <span class="note-date">${formatDate(note.guncelleme_tarihi)}</span>
                                ${category ? `<span class="note-category" style="background-color: ${category.color}20; color: ${category.color}">
                                    <span class="note-category-dot" style="background-color: ${category.color}"></span>
                                    ${escapeHtml(category.name)}
                                </span>` : ''}
                            </div>
                        </div>
                        ${!isTrash ? `
                            <svg class="note-favorite ${note.favori ? 'active' : ''}" 
                                 data-action="toggle-favorite" data-id="${note.id}"
                                 fill="${note.favori ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                        ` : ''}
                    </div>
                    <div class="note-content">${escapeHtml(note.icerik)}</div>
                    <div class="note-actions">
                        ${isTrash ? `
                            <button class="note-btn note-btn-restore" data-action="restore-note" data-id="${note.id}" title="Geri Yükle">
                                <svg class="note-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                                </svg>
                            </button>
                            <button class="note-btn note-btn-delete" data-action="delete-note" data-id="${note.id}" title="Kalıcı Sil">
                                <svg class="note-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        ` : `
                            <button class="note-btn note-btn-edit" data-action="edit-note" data-id="${note.id}" title="Düzenle">
                                <svg class="note-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </button>
                            <button class="note-btn note-btn-archive" data-action="toggle-archive" data-id="${note.id}" title="${note.arsiv ? 'Arşivden Çıkar' : 'Arşivle'}">
                                <svg class="note-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    ${note.arsiv ? `
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                                    ` : `
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                                    `}
                                </svg>
                            </button>
                            <button class="note-btn note-btn-delete" data-action="delete-note" data-id="${note.id}" title="Sil">
                                <svg class="note-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('') : `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${getEmptyStateIcon(state.filter)}
                    </svg>
                </div>
                <h3 class="empty-title">${getEmptyStateTitle(state.filter)}</h3>
                <p class="empty-text">${getEmptyStateMessage(state.filter)}</p>
                ${state.filter !== 'trash' && state.filter !== 'archived' ?
            `<button class="btn btn-primary" data-action="new-note">Yeni Not Ekle</button>` : ''}
            </div>
        `;

        function getEmptyStateIcon(filter) {
            switch (filter) {
                case 'favorites':
                    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>';
                case 'archived':
                    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>';
                case 'trash':
                    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>';
                case 'category':
                    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>';
                default:
                    return '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>';
            }
        }

        function getEmptyStateTitle(filter) {
            switch (filter) {
                case 'favorites': return 'Favori Not Yok';
                case 'archived': return 'Arşiv Boş';
                case 'trash': return 'Çöp Kutusu Boş';
                case 'category': return 'Bu Kategoride Not Yok';
                default: return 'Not Bulunamadı';
            }
        }

        function getEmptyStateMessage(filter) {
            switch (filter) {
                case 'favorites': return 'Henüz favorilere eklenmiş bir notunuz bulunmuyor.';
                case 'archived': return 'Arşivlenmiş notunuz bulunmuyor.';
                case 'trash': return 'Silinen notlar burada görünür.';
                case 'category': return 'Bu kategoriye henüz not eklenmemiş.';
                default: return 'Henüz hiç notunuz yok. Yeni bir not ekleyerek başlayın.';
            }
        }

        this.container.innerHTML = `
            <div class="content-wrapper">
                <header class="page-header">
                    <div class="header-content">
                        <svg class="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            ${getEmptyStateIcon(state.filter)}
                        </svg>
                        <div>
                            <h1 class="page-title">${title}</h1>
                            <p class="page-subtitle">${description}</p>
                        </div>
                    </div>
                    <div class="header-actions">
                        <input type="text" id="searchInput" class="form-input" placeholder="Notlarda ara..." value="${state.searchQuery || ''}">
                    </div>
                </header>
                
                <div class="notes-grid">
                    ${notesHtml}
                </div>
            </div>
        `;

        // Re-attach search listener
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                store.setSearchQuery(e.target.value);
            });

            // Only focus if there is an active search query (to maintain focus while typing)
            // Otherwise, do not auto-focus (e.g. on navigation)
            if (state.searchQuery) {
                searchInput.focus();
                // Cursor'ı sona al
                const val = searchInput.value;
                searchInput.value = '';
                searchInput.value = val;
            }
        }
    }
}
