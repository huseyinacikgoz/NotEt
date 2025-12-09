export const CONFIG = {
    STORAGE_KEY: 'notely_notlar',
    CATEGORIES_KEY: 'notely_kategoriler',
    VAULT_KEY: 'notely_vault', // Şifreli tek dosya
    TAGS_KEY: 'notely_etiketler',
    THEME_KEY: 'notely_tema',
    VIEW_MODE_KEY: 'notely_viewMode',
    MAX_CONTENT_LENGTH: 10000,
    MAX_NOTES: 1000
};

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

export function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Az önce';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 7) return `${days} gün önce`;

    return d.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function generateAvatarGradient() {
    const colors = [
        ['#60a5fa', '#f59e0b'],
        ['#8b5cf6', '#ec4899'],
        ['#10b981', '#3b82f6'],
        ['#f59e0b', '#ef4444'],
        ['#06b6d4', '#8b5cf6']
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export function validateContent(content) {
    if (!content || !content.trim()) {
        return { valid: false, error: 'Lütfen not içeriği girin' };
    }

    if (content.length > CONFIG.MAX_CONTENT_LENGTH) {
        return {
            valid: false,
            error: `İçerik en fazla ${CONFIG.MAX_CONTENT_LENGTH} karakter olabilir`
        };
    }

    return { valid: true, content: content.trim() };
}
