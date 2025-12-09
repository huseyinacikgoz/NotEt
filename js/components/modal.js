import { store } from '../store.js';

export class Modal {
    constructor() {
        this.container = document.body;
    }

    showCategoryModal(editId = null) {
        const state = store.state;
        let category = { name: '', color: '#3b82f6', aciklama: '' };

        if (editId) {
            category = state.categories[editId];
        }

        const modalHtml = `
            <div class="modal-overlay modal" id="categoryModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-header-content">
                            <div class="modal-icon-wrapper primary">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                                </svg>
                            </div>
                            <div class="modal-title-wrapper">
                                <h3 class="modal-title">${editId ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}</h3>
                                <span class="modal-subtitle">${editId ? 'Kategori detaylarını güncelleyin' : 'Notlarınızı düzenlemek için yeni bir kategori oluşturun'}</span>
                            </div>
                        </div>
                        <button class="modal-close" data-action="close-modal">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="categoryForm">
                            <div class="form-group">
                                <label class="form-label">Kategori Adı</label>
                                <input type="text" id="catName" class="form-input" value="${category.name}" placeholder="Örn: İş, Kişisel, Fikirler" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Renk</label>
                                <div class="color-picker-wrapper" style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.2); border: 2px solid #fff;">
                                        <input type="color" id="catColor" class="form-input" value="${category.color}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 150%; height: 150%; padding: 0; border: none; cursor: pointer;">
                                    </div>
                                    <span style="font-size: 13px; color: var(--text-secondary); font-family: monospace;">${category.color}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Açıklama <span class="label-optional">(İsteğe bağlı)</span></label>
                                <input type="text" id="catDesc" class="form-input" value="${category.aciklama || ''}" placeholder="Kategori hakkında kısa bir açıklama...">
                            </div>
                        </form>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" data-action="close-modal">İptal</button>
                        <button type="submit" form="categoryForm" class="btn btn-primary">Kaydet</button>
                    </div>
                </div>
            </div>
        `;

        this.renderModal(modalHtml);

        const form = document.getElementById('categoryForm');
        const colorInput = document.getElementById('catColor');

        if (colorInput) {
            colorInput.addEventListener('input', (e) => {
                colorInput.parentElement.nextElementSibling.textContent = e.target.value;
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('catName').value;
            const color = document.getElementById('catColor').value;
            const desc = document.getElementById('catDesc').value;

            if (editId) {
                store.updateCategory(editId, { name, color, aciklama: desc });
            } else {
                store.addCategory(name, color, desc);
            }
            this.closeModal();
        });
    }

    showSettingsModal() {


        const modalHtml = `
            <div class="modal-overlay modal" id="settingsModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-header-content">
                            <div class="modal-icon-wrapper primary">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </div>
                            <div class="modal-title-wrapper">
                                <h3 class="modal-title">Ayarlar</h3>
                                <span class="modal-subtitle">Verilerinizi yönetin</span>
                            </div>
                        </div>
                        <button class="modal-close" data-action="close-modal">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="settings-tabs" style="display: flex; gap: 12px; margin-bottom: 24px; border-bottom: 1px solid var(--border-color);">
                            <button class="tab-btn active" data-tab="export" style="padding: 12px; border-bottom: 2px solid var(--primary); font-weight: 600; color: var(--primary); background: none; border-top: none; border-left: none; border-right: none; cursor: pointer;">Dışa Aktar</button>
                            <button class="tab-btn" data-tab="import" style="padding: 12px; border-bottom: 2px solid transparent; color: var(--text-secondary); background: none; border-top: none; border-left: none; border-right: none; cursor: pointer;">İçe Aktar</button>
                        </div>
                        
                        <!-- EXPORT TAB -->
                        <div id="exportTab" class="tab-content" style="display: block; padding: 16px;">
                            <form id="exportForm">
                                <p class="modal-message" style="margin-bottom: 16px;">Notlarınızı ve kategorilerinizi şifreli bir dosya olarak indirin.</p>
                                <div class="form-group">
                                    <label class="form-label">Şifreleme Parolası</label>
                                    <input type="password" id="exportPassword" class="form-input" placeholder="Parola belirleyin" autocomplete="new-password" required>
                                    <span class="form-hint">Bu parolayı unutmayın, dosyayı açmak için gereklidir.</span>
                                </div>
                                <button type="submit" id="exportBtn" class="btn btn-primary" style="width: 100%;">
                                    <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                    </svg>
                                    Yedekle ve İndir
                                </button>
                            </form>
                        </div>

                        <!-- IMPORT TAB -->
                        <div id="importTab" class="tab-content" style="display: none; padding: 16px;">
                            <form id="importForm">
                                <p class="modal-message" style="margin-bottom: 16px;">Yedeklediğiniz dosyayı seçerek verilerinizi geri yükleyin.</p>
                                <div class="form-group">
                                    <label class="form-label">Yedek Dosyası</label>
                                    <input type="file" id="importFile" class="form-input" accept=".json">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Şifre Çözme Parolası</label>
                                    <input type="password" id="importPassword" class="form-input" placeholder="Dosya parolasını girin" autocomplete="current-password">
                                </div>
                                <button type="submit" id="importBtn" class="btn btn-primary" style="width: 100%;">
                                    <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                    </svg>
                                    Verileri Geri Yükle
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.renderModal(modalHtml);

        // Tab switching logic
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = {
            'export': document.getElementById('exportTab'),
            'import': document.getElementById('importTab')
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.style.borderBottomColor = 'transparent';
                    t.style.color = 'var(--text-secondary)';
                });
                tab.classList.add('active');
                tab.style.borderBottomColor = 'var(--primary)';
                tab.style.color = 'var(--primary)';

                Object.values(contents).forEach(el => el.style.display = 'none');
                contents[tab.dataset.tab].style.display = 'block';
            });
        });

        // Export Logic
        document.getElementById('exportForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('exportPassword').value;
            if (!password) {
                alert('Lütfen bir parola belirleyin.');
                return;
            }

            try {
                const encryptedData = await store.exportData(password);
                const blob = new Blob([encryptedData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `notely-backup-${new Date().toISOString().slice(0, 10)}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                this.closeModal();
            } catch (error) {
                alert('Dışa aktarma başarısız: ' + error.message);
            }
        });

        // Import Logic
        document.getElementById('importForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('importFile');
            const password = document.getElementById('importPassword').value;
            const file = fileInput.files[0];

            if (!file || !password) {
                alert('Lütfen bir dosya seçin ve parolasını girin.');
                return;
            }

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    await store.importData(e.target.result, password);
                    alert('Veriler başarıyla geri yüklendi.');
                    this.closeModal();
                    window.location.reload(); // Refresh to show new data
                } catch (error) {
                    alert('İçe aktarma başarısız: ' + error.message);
                }
            };
            reader.readAsText(file);
        });
    }

    showConfirmModal(title, message, onConfirm) {
        const modalHtml = `
            <div class="modal-overlay modal" id="confirmModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-header-content">
                            <div class="modal-icon-wrapper warning">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                            </div>
                            <div class="modal-title-wrapper">
                                <h3 class="modal-title">${title}</h3>
                                <span class="modal-subtitle">Bu işlem geri alınamaz</span>
                            </div>
                        </div>
                        <button class="modal-close" data-action="close-modal">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="modal-message">${message}</p>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" data-action="close-modal">Vazgeç</button>
                        <button type="button" class="btn btn-error" id="confirmBtn">Sil</button>
                    </div>
                </div>
            </div>
        `;

        this.renderModal(modalHtml);

        document.getElementById('confirmBtn').addEventListener('click', () => {
            onConfirm();
            this.closeModal();
        });
    }

    renderModal(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        this.container.appendChild(div.firstElementChild);

        // Close listeners
        const overlay = document.querySelector('.modal-overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.closest('[data-action="close-modal"]')) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}
