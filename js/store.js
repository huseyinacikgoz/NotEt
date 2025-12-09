import { CONFIG, generateId } from './utils.js';
import { CryptoUtils } from './crypto-utils.js';

class Store {
    constructor() {
        this.subscribers = [];
        this.state = {
            notes: {},
            categories: {},
            filter: 'all',
            filterId: null,
            searchQuery: ''
        };

        this.loadData();
    }

    loadData() {
        try {
            const notes = localStorage.getItem(CONFIG.STORAGE_KEY);
            const cats = localStorage.getItem(CONFIG.CATEGORIES_KEY);

            if (notes) this.state.notes = JSON.parse(notes);
            if (cats) this.state.categories = JSON.parse(cats);
        } catch (e) {
            console.error("Load failed", e);
        }
    }

    persist() {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.state.notes));
        localStorage.setItem(CONFIG.CATEGORIES_KEY, JSON.stringify(this.state.categories));
    }

    // --- Actions ---

    getNotes() {
        let notes = Object.values(this.state.notes);

        if (this.state.searchQuery) {
            const query = this.state.searchQuery.toLowerCase();
            notes = notes.filter(note =>
                (note.baslik && note.baslik.toLowerCase().includes(query)) ||
                (note.icerik && note.icerik.toLowerCase().includes(query))
            );
        }

        switch (this.state.filter) {
            case 'favorites': return notes.filter(n => n.favori && !n.silindi && !n.arsiv);
            case 'archived': return notes.filter(n => n.arsiv && !n.silindi);
            case 'trash': return notes.filter(n => n.silindi);
            case 'category': return notes.filter(n => n.kategori === this.state.filterId && !n.silindi && !n.arsiv);
            default: return notes.filter(n => !n.silindi && !n.arsiv);
        }
    }

    addNote(noteData) {
        const id = generateId();
        const newNote = {
            id,
            ...noteData,
            olusturma_tarihi: new Date().toISOString(),
            guncelleme_tarihi: new Date().toISOString(),
            silindi: false,
            arsiv: false
        };
        this.state.notes[id] = newNote;
        this.persist();
        this.notify();
        return newNote;
    }

    updateNote(id, updates) {
        if (!this.state.notes[id]) return null;
        this.state.notes[id] = {
            ...this.state.notes[id],
            ...updates,
            guncelleme_tarihi: new Date().toISOString()
        };
        this.persist();
        this.notify();
        return this.state.notes[id];
    }

    deleteNote(id) {
        if (!this.state.notes[id]) return;
        if (this.state.filter === 'trash') {
            delete this.state.notes[id];
        } else {
            this.state.notes[id].silindi = true;
            this.state.notes[id].silinme_tarihi = new Date().toISOString();
        }
        this.persist();
        this.notify();
    }

    restoreNote(id) {
        if (!this.state.notes[id]) return;
        this.state.notes[id].silindi = false;
        this.state.notes[id].silinme_tarihi = null;
        this.persist();
        this.notify();
    }

    toggleFavorite(id) {
        if (!this.state.notes[id]) return;
        this.state.notes[id].favori = !this.state.notes[id].favori;
        this.persist();
        this.notify();
    }

    toggleArchive(id) {
        if (!this.state.notes[id]) return;
        this.state.notes[id].arsiv = !this.state.notes[id].arsiv;
        this.persist();
        this.notify();
    }

    addCategory(name, color, aciklama) {
        const id = generateId();
        this.state.categories[id] = { id, name: name.trim(), color, aciklama: aciklama?.trim() };
        this.persist();
        this.notify();
        return this.state.categories[id];
    }

    updateCategory(id, updates) {
        if (!this.state.categories[id]) return;
        this.state.categories[id] = { ...this.state.categories[id], ...updates };
        this.persist();
        this.notify();
    }

    deleteCategory(id) {
        if (!this.state.categories[id]) return;
        Object.values(this.state.notes).forEach(note => {
            if (note.kategori === id) note.kategori = null;
        });
        delete this.state.categories[id];
        this.persist();
        this.notify();
    }

    setFilter(filter, filterId = null) {
        this.state.filter = filter;
        this.state.filterId = filterId;
        this.state.searchQuery = '';
        this.notify();
    }

    setSearchQuery(query) {
        this.state.searchQuery = query;
        this.notify();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => { this.subscribers = this.subscribers.filter(cb => cb !== callback); };
    }

    notify() {
        this.subscribers.forEach(cb => cb(this.state));
    }

    // --- Export / Import ---

    async exportData(password) {
        const data = {
            notes: this.state.notes,
            categories: this.state.categories,
            exportedAt: new Date().toISOString(),
            version: "1.0"
        };
        // Encrypt with ephemeral key
        return await CryptoUtils.encryptData(data, password);
    }

    async importData(encryptedJson, password) {
        try {
            const data = await CryptoUtils.decryptData(encryptedJson, password);
            if (!data || !data.notes) throw new Error("Geçersiz yedek dosyası.");

            this.state.notes = data.notes;
            this.state.categories = data.categories || {};
            this.persist();
            this.notify();
        } catch (e) {
            console.error("Import failed:", e);
            throw e;
        }
    }
}

export const store = new Store();
