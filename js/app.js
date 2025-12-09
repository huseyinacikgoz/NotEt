import { store } from './store.js';
import { Sidebar } from './components/sidebar.js';
import { NoteList } from './components/note-list.js';
import { NoteEditor } from './components/note-editor.js';
import { Modal } from './components/modal.js';

class App {
    constructor() {
        this.sidebar = new Sidebar();
        this.noteList = new NoteList();
        this.noteEditor = new NoteEditor();
        this.modal = new Modal();

        this.initEventListeners();
        this.handleRouting();
    }

    initEventListeners() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const action = target.dataset.action;
            const id = target.dataset.id;

            switch (action) {
                case 'new-note':
                    store.setFilter('new');
                    this.noteEditor.setEditId(null);
                    break;
                case 'filter-all':
                    store.setFilter('all');
                    break;
                case 'filter-favorites':
                    store.setFilter('favorites');
                    break;
                case 'filter-archived':
                    store.setFilter('archived');
                    break;
                case 'filter-trash':
                    store.setFilter('trash');
                    break;
                case 'filter-category':
                    store.setFilter('category', id);
                    break;
                case 'edit-note':
                    store.setFilter('new');
                    this.noteEditor.setEditId(id);
                    break;
                case 'toggle-favorite':
                    store.toggleFavorite(id);
                    break;
                case 'toggle-archive':
                    store.toggleArchive(id);
                    break;
                case 'delete-note':
                    if (store.state.filter === 'trash') {
                        this.modal.showConfirmModal(
                            'Notu Kalıcı Olarak Sil',
                            'Bu notu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
                            () => store.deleteNote(id)
                        );
                    } else {
                        store.deleteNote(id);
                    }
                    break;
                case 'restore-note':
                    store.restoreNote(id);
                    break;
                case 'add-category-modal':
                    this.modal.showCategoryModal();
                    break;
                case 'edit-category':
                    this.modal.showCategoryModal(id);
                    break;
                case 'delete-category':
                    this.modal.showConfirmModal(
                        'Kategoriyi Sil',
                        'Bu kategoriyi silmek istediğinize emin misiniz? Notlar silinmeyecek, sadece kategorisiz kalacak.',
                        () => store.deleteCategory(id)
                    );
                    break;
                case 'settings-modal':
                    this.modal.showSettingsModal();
                    break;
            }
        });
    }

    handleRouting() {
        // Simple routing based on store state
        store.subscribe((state) => {
            // Update URL/History if needed in future
            // console.log('State updated:', state);
        });
    }


}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
