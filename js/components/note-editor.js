import { store } from '../store.js';
import { CONFIG, escapeHtml } from '../utils.js';

export class NoteEditor {
    constructor() {
        this.container = document.getElementById('main-content');
        this.unsubscribe = store.subscribe(this.render.bind(this));
        this.editId = null;
    }

    setEditId(id) {
        this.editId = id;
        this.render();
    }

    render(state = store.state) {
        if (!this.container || state.filter !== 'new') return;

        let note = {
            baslik: '',
            icerik: '',
            kategori: '',
            renk: '#ffffff',
            favori: false
        };

        if (this.editId && state.notes[this.editId]) {
            note = state.notes[this.editId];
        }

        const categoriesOptions = Object.values(state.categories).map(cat => `
            <option value="${cat.id}" ${note.kategori === cat.id ? 'selected' : ''}>${escapeHtml(cat.name)}</option>
        `).join('');

        this.container.innerHTML = `
            <div class="content-wrapper">
                <header class="page-header">
                    <div class="header-content">
                        <svg class="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        <div>
                            <h1 class="page-title">${this.editId ? 'Notu Düzenle' : 'Yeni Not Oluştur'}</h1>
                            <p class="page-subtitle">Düşüncelerinizi kaydedin</p>
                        </div>
                    </div>
                </header>
                
                <div class="card">
                    <form id="noteForm">
                        <div class="form-row">
                            <div class="form-group form-group-flex">
                                <label class="form-label">Başlık <span class="label-optional">(İsteğe bağlı)</span></label>
                                <input type="text" id="noteTitle" class="form-input" placeholder="Not başlığı..." value="${escapeHtml(note.baslik || '')}">
                            </div>
                            <div class="form-group form-group-flex">
                                <label class="form-label">Kategori</label>
                                <select id="noteCategory" class="form-input">
                                    <option value="">Kategori Seç</option>
                                    ${categoriesOptions}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">İçerik</label>
                            <textarea id="noteContent" class="form-textarea" placeholder="Buraya yazmaya başlayın..." style="min-height: 300px;">${escapeHtml(note.icerik || '')}</textarea>
                            <div class="form-hint">
                                <span id="characterCount">${(note.icerik || '').length}</span> / ${CONFIG.MAX_CONTENT_LENGTH} karakter
                            </div>
                        </div>
                        
                        <div class="form-row" style="align-items: center;">
                            <div class="form-group form-group-flex">
                                <label class="form-label">Renk</label>
                                <div class="color-picker-wrapper" style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.2); border: 2px solid #fff;">
                                        <input type="color" id="noteColor" class="form-input form-color-input" value="${note.renk}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 150%; height: 150%; padding: 0; border: none; cursor: pointer;">
                                    </div>
                                    <span style="font-size: 13px; color: var(--text-secondary); font-family: monospace;">${note.renk}</span>
                                </div>
                            </div>
                            <div class="form-group form-group-flex">
                                <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-top: 28px;">
                                    <input type="checkbox" id="noteFavorite" ${note.favori ? 'checked' : ''}>
                                    <span>Favorilere Ekle</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-actions" style="justify-content: flex-end; gap: 12px; margin-top: 24px;">
                            <button type="button" class="btn btn-secondary" data-action="cancel-edit">İptal</button>
                            <button type="submit" class="btn btn-primary">Kaydet</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Event Listeners
        const form = document.getElementById('noteForm');
        const contentInput = document.getElementById('noteContent');
        const charCount = document.getElementById('characterCount');

        if (contentInput) {
            contentInput.addEventListener('input', () => {
                charCount.textContent = contentInput.value.length;
            });
        }

        if (form) {
            const colorInput = document.getElementById('noteColor');
            if (colorInput) {
                colorInput.addEventListener('input', (e) => {
                    // input is inside a div, so we need to go up to the wrapper div, then find the span
                    colorInput.parentElement.nextElementSibling.textContent = e.target.value;
                });
            }

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('noteTitle').value;
                const content = document.getElementById('noteContent').value;
                const category = document.getElementById('noteCategory').value;
                const color = document.getElementById('noteColor').value;
                const favorite = document.getElementById('noteFavorite').checked;

                if (!content.trim()) {
                    alert('Lütfen içerik girin');
                    return;
                }

                const noteData = {
                    baslik: title,
                    icerik: content,
                    kategori: category || null,
                    renk: color,
                    favori: favorite
                };

                if (this.editId) {
                    store.updateNote(this.editId, noteData);
                } else {
                    store.addNote(noteData);
                }

                store.setFilter('all'); // Go back to list
                this.editId = null; // Reset edit mode
            });
        }
    }
}
