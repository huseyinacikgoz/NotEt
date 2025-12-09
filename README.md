# NotEt

<div align="center">

**Tarayıcı Tabanlı, Minimalist ve %100 Yerel Not Alma Uygulaması**

[🌐 Canlı Demo](https://huseyinacikgoz.com.tr/notet/) • [📧 İletişim](mailto:mail@huseyinacikgoz.com.tr) • [🐦 Twitter/X](https://x.com/huseyinacikgoz_) • [💻 GitHub](https://github.com/huseyinacikgoz)

[![Sürüm](https://img.shields.io/badge/sürüm-v0.0.1-black?style=flat-square)](https://huseyinacikgoz.com.tr/notet/)
[![Lisans](https://img.shields.io/badge/lisans-MIT-blue?style=flat-square)](LICENSE)
[![Durum](https://img.shields.io/badge/durum-Yayında-green?style=flat-square)](https://huseyinacikgoz.com.tr/notet/)

</div>

## 📖 Hakkında

**NotEt**, verilerinizi asla bir sunucuya göndermeden, tamamen tarayıcınızın yerel hafızasında (LocalStorage) saklayan, açık kaynaklı ve modern bir not defteridir.

Ekstra hiçbir kurulum gerektirmeden, sadece tarayıcınızı kullanarak notlarınızı alabilir, şifreleyerek yedekleyebilir ve güvenle saklayabilirsiniz. Minimalist tasarımı sayesinde odağınız sadece notlarınızda olur.

## ✨ Özellikler

### 🔒 Mahremiyet ve Güvenlik
- **Yerel Depolama**: Tüm verileriniz cihazınızda, tarayıcınızın güvenli hafızasında (LocalStorage) tutulur.
- **Sunucusuz**: Hiçbir veriniz dışarıdaki bir sunucuya gönderilmez.
- **İzleyicisiz**: Rahatsız edici takip kodları veya analitik araçları (tracker) içermez.

### ⚡ Performans
- **Anında Erişim**: Bekleme veya yükleme süresi yoktur, saniyeler içinde not almaya başlayın.
- **Çevrimdışı Mod**: İnternet bağlantınız olmasa bile tam fonksiyonel çalışır.
- **Hafif**: Modern web teknolojileri ile geliştirilmiş, kaynak tüketmeyen yapı.

### 📂 Kullanım Kolaylığı
- **Bölünmüş Yapı**: Kategori sistemi ile iş, okul veya kişisel notlarınızı ayırın.
- **Güvenli Yedekleme**: AES-GCM şifreleme algoritmasıyla notlarınızın yedeğini alın.
- **Responsive Tasarım**: Telefondan tablete, tüm cihazlarda kusursuz görünüm.

## 🚀 Kullanım

### Canlı Versiyon
Uygulamayı indirmeden kullanmak için: [huseyinacikgoz.com.tr/notet](https://huseyinacikgoz.com.tr/notet/)

### Yerel Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/huseyinacikgoz/notet.git
   cd notet
   ```

2. **Yerel sunucu başlatın:**
   LocalStorage ve modül sisteminin düzgün çalışması için basit bir HTTP sunucusu önerilir.
   ```bash
   # Python ile
   python3 -m http.server

   # Veya Node.js ile (varsa)
   npx serve .
   ```

3. **Tarayıcıda açın:**
   ```
   http://localhost:8000
   ```

## 🛠️ Teknolojiler

- **HTML5** & **CSS3** (Semantik yapı ve modern stil)
- **Vanilla JavaScript** (ES6+ Modülleri)
- **TailwindCSS** (Hızlı UI geliştirme)
- **LocalStorage API** (Persistent veri depolama)
- **Web Crypto API** (Güvenlik)

## 📁 Proje Yapısı

```
notet/
├── css/
│   └── styles.css         # Ana stil dosyası
├── js/
│   ├── app.js             # Uygulama giriş noktası
│   ├── store.js           # Veri ve durum yönetimi
│   ├── crypto-utils.js    # Şifreleme fonksiyonları
│   └── utils.js           # Yardımcı araçlar
├── components/            # UI bileşenleri
├── index.html             # Karşılama sayfası (Landing)
├── notes.html             # Ana uygulama arayüzü
├── privacy.html           # Gizlilik politikası
└── README.md              # Proje dokümantasyonu
```

## 🎯 Nasıl Kullanılır?

1. **Başlangıç**: Ana sayfadaki "Hemen Başla" butonuna tıklayarak not alma arayüzüne geçin.
2. **Not Ekleme**: Sağ alttaki veya menüdeki "+" butonunu kullanarak yeni not oluşturun.
3. **Kategoriler**: Notlarınızı renklere ve kategorilere göre ayırarak düzeni sağlayın.
4. **Yedekleme**: Ayarlar menüsünden "Yedeği İndir" diyerek verilerinizi şifreli bir dosya (.json) olarak bilgisayarınıza kaydedin.
5. **Geri Yükleme**: İndirdiğiniz yedek dosyasını "Yedeği Yükle" seçeneği ile geri yükleyerek notlarınıza tekrar erişin.

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.

## 👨‍💻 Geliştirici

**Hüseyin Açıkgöz**

- 🌐 Website: [huseyinacikgoz.com.tr](https://huseyinacikgoz.com.tr)
- 📧 Email: [mail@huseyinacikgoz.com.tr](mailto:mail@huseyinacikgoz.com.tr)
- 🐦 Twitter: [@huseyinacikgoz_](https://x.com/huseyinacikgoz_)
- 💻 GitHub: [@huseyinacikgoz](https://github.com/huseyinacikgoz)

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/harika-ozellik`)
5. Pull Request açın

## 🔗 Bağlantılar

- [🌐 Canlı Demo](https://huseyinacikgoz.com.tr/notet/)
- [🐞 Hata Bildir](https://github.com/huseyinacikgoz/notet/issues)

---

<div align="center">

**⭐ Beğendiyseniz yıldız vermeyi unutmayın! ⭐**

Made with ❤️ by [Hüseyin Açıkgöz](https://huseyinacikgoz.com.tr)

</div>
