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

----


## 1. INTRODUCTION
**SADECE ÖFKELİ** is an experimental autonomous driving project positioned at the intersection of electronics and software disciplines. This project represents the transformation process of an RC vehicle into a self-deciding entity and its digital twin.

The web platform is not just a showcase site for the vehicle, but an interactive dashboard displaying live telemetry data, manufacturing processes, and decision-making algorithms.

---

## 2. PROJECT SCOPE
The project is built on modifying a physical vehicle to gain autonomous features and visualizing this data in a web environment.

*   **Hybrid Manufacturing**: Integration of 3D-printed parts (PLA-CF, TPU, ABS) with industrial components.
*   **Autonomous Driving**: Lane tracking, traffic light detection, and obstacle avoidance.
*   **Digital Twin**: Simulation of the vehicle's exact 3D model and sensor data on the website.

---

## 3. HARDWARE
The vehicle's nervous system is built on a distributed architecture. High-level decisions are made in a central processor, while motor control and sensor readings are managed by microcontrollers.

| Component | Model | Role |
| :--- | :--- | :--- |
| **Main Brain** | `Raspberry Pi 4` | Image processing, running AI models, and high-level logic. |
| **Controller** | `Arduino Nano` | PWM signal generation, motor driver control, and sensor data collection. |
| **Motor Driver** | `L298N` | Power distribution and direction control for DC motors. |
| **Power Unit** | `11.1V LiPo Battery` | Main power source providing high current to the entire system. |
| **Vision** | `Pi Camera Module` | Real-time video stream for lane and object detection. |
| **Distance Sensor** | `HC-SR04` | Obstacle distance measurement via ultrasonic waves. |
| **Actuators** | `Brushed DC Motor` & `Servo` | Propulsion and steering mechanisms. |

---

## 4. VEHICLE SOFTWARE
The "mind" of the vehicle is a combination of deep learning models and classical computer vision techniques.

### Lane Tracking (Regression CNN)
*   **Model**: Regression CNN optimized based on NVIDIA's autonomous driving architecture.
*   **Task**: Produces a continuous steering angle (float) instead of classification (Left/Right).
*   **Dataset**: 5,780 labeled images (60% Straight, 40% Turn).
*   **Performance**: 0.05 Mean Absolute Error (MAE).

### Traffic Light Detection (Object Detection)
*   **Model**: Faster R-CNN.
*   **Task**: Detects traffic lights in the image and classifies their status (Red, Yellow, Green).
*   **Accuracy**: 94.5% Accuracy rate.

---

## 5. WebSTACK
The web interface is built with modern web technologies.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core** | `React 18` | High-performance, type-safe component architecture and fast build process. |
| **Render** | `Three.js`, `Drei` | WebGL-based 3D engine. |
| **Animation** | `GSAP` | Scroll-driven cinematic timelines. |
| **Interaction** | `Lenis` | Smooth scrolling feel synchronized with WebGL. |

---

## 6. DEPLOYMENT

### Development Environment (Local)
To run the project on your local machine:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/sadece-ofkeli.git

# 2. Enter project directory
cd sadece-ofkeli

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```