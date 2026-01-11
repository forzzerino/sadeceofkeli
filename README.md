# SADECE ÖFKELİ



## 1. GİRİŞ
**SADECE ÖFKELİ**, elektronik ve yazılım disiplinlerinin kesişim noktasında duran deneysel bir otonom sürüş projesidir. Bu proje, bir RC aracın kendi kendine karar verebilen bir varlığa dönüşüm sürecini ve bu sürecin dijital ikizini temsil eder.

Web platformu, aracın sadece bir tanıtım sitesi değil, aynı zamanda canlı telemetri verilerini, üretim süreçlerini ve karar verme algoritmalarını sergileyen interaktif bir gösterge panelidir.

---

## 2. PROJE KAPSAMI
Proje, fiziksel bir aracın modifiye edilerek otonom özellikler kazandırılması ve bu verilerin web ortamında görselleştirilmesi üzerine kuruludur.

*   **Hibrit Üretim**: 3D yazıcı ile üretilen parçaların (PLA-CF, TPU, ABS) endüstriyel bileşenlerle entegrasyonu.
*   **Otonom Sürüş**: Şerit takibi, trafik ışığı algılama ve engelden kaçınma.
*   **Dijital İkiz**: Web sitesinde aracın birebir 3D modeli ve sensör verilerinin simülasyonu.

---

## 3. DONANIM
Aracın sinir sistemi, dağıtık bir mimari üzerine kurulmuştur. Yüksek seviyeli kararlar merkezi bir işlemcide alınırken, motor kontrolü ve sensör okumaları mikrodenetleyiciler tarafından yönetilir.

| Bileşen | Model | Görevi |
| :--- | :--- | :--- |
| **Ana Beyin** | `Raspberry Pi 4` | Görüntü işleme, yapay zeka modellerinin çalıştırılması ve üst düzey mantık. |
| **Kontrolcü** | `Arduino Nano` | PWM sinyal üretimi, motor sürücü kontrolü ve sensör veri toplama. |
| **Motor Sürücü** | `L298N` | DC motorlara güç dağıtımı ve yön kontrolü. |
| **Güç Ünitesi** | `11.1V LiPo Batarya` | Tüm sisteme yüksek akım sağlayan ana güç kaynağı. |
| **Görüş** | `Pi Camera Module` | Şerit ve nesne tespiti için gerçek zamanlı görüntü akışı. |
| **Mesafe Sensörü** | `HC-SR04` | Ultrasonik dalgalar ile engel mesafesi ölçümü. |
| **Aktüatörler** | `Fırçalı DC Motor` & `Servo` | Tahrik ve yönlendirme (steering) mekanizmaları. |

---

## 4. ARACIN YAZILIMI 
Aracın "zihni", derin öğrenme modelleri ve klasik bilgisayarlı görme tekniklerinin birleşimidir.

### Şerit Takibi (Regression CNN)
*   **Model**: NVIDIA'nın otonom sürüş mimarisi temel alınarak optimize edilmiş Regresyon CNN.
*   **Görev**: Sınıflandırma yapmak yerine (Sağ/Sol), sürekli bir direksiyon açısı (float) üretir.
*   **Veri Seti**: 5.780 adet etiketli görsel (%60 Düz, %40 Dönüş).
*   **Performans**: 0.05 Ortalama Mutlak Hata (MAE).

### Trafik Işığı Algılama (Object Detection)
*   **Model**: Faster R-CNN.
*   **Görev**: Görüntüdeki trafik ışıklarını bulur ve durumlarını (Kırmızı, sarı, yeşil) sınıflandırır.
*   **Doğruluk**: %94.5 Doğruluk oranı.

---

## 5. WebSTACK
Web arayüzü, modern web teknolojileriyle inşa edilmiştir.

| Kategori | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Çekirdek** | `React 18`| Yüksek performanslı, tip güvenli bileşen mimarisi ve hızlı build süreci. |
| **Render** | `Three.js`, `Drei` | WebGL tabanlı 3D motoru. |
| **Animasyon** | `GSAP`| Kaydırma tabanlı (scroll-driven) sinematik zaman çizelgeleri. |
| **Etkileşim** | `Lenis` | WebGL ile senkronize, pürüzsüz kaydırma hissiyatı. |

---

## 6. DAĞITIM (DEPLOYMENT)

### Geliştirme Ortamı (Local)
Projeyi yerel makinenizde çalıştırmak için:

```bash
# 1. Depoyu klonlayın
git clone https://github.com/kullaniciadiniz/sadece-ofkeli.git

# 2. Proje dizinine girin
cd sadece-ofkeli

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirme sunucusunu başlatın
npm run dev
```