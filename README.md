# 📳 VibroClock — 100% Silent Vibrating Alarm & Timer Web App (PWA)

**VibroClock** — bu mutlaqo ovoz chiqarmasdan, faqat apparat tebranishi (**Web Vibration API**) hamda orqa fonda **Service Worker Notification Vibrations** orqali ishlaydigan aqlli budilnik va taymer veb-ilovasi (PWA).

---

## 🌟 Asosiy Xususiyatlar

- **100% Ovsiz Rejim:** Hech qanday qo'ng'iroq, rington yoki sound effect yo'q. Faqat motor vibratsiyasi va neon ekran to'lqini.
- **Orqa Fonda va Ekran O'chganda Ishlash (Background & Sleep Mode):**
  - **Timestamp-based Countdown:** Telefon ekrani qulflansa ham vaqt to'xtab qolmaydi va soniyasigacha aniq hisoblanadi.
  - **Silent Keep-Alive Session:** Mobil operatsion tizim (Android/iOS) fonida brauzer CPU'sini uxlatib qo'ymaslik uchun 100% jim-jit keep-alive seansi.
  - **Screen Wake Lock API:** Taymer ishlayotganda ekranning avtomatik o'chib qolmasligini sozlash imkoniyati.
  - **Service Worker Background Vibrations:** Telefon qulflangan/uxlagan holatda ham tizim darajasida tebranish yuborish.
- **Budilnik (Alarm):** Haftalik takrorlanish kunlari va alohida tebranish ritmlari.
- **Taymer (Timer):** **5, 10, 25 (Pomodoro), 30 minut** tezkor tugmalari hamda Soat:Minut:Sekund kiritish.
- **Sozlamalar (Settings):**
  - **Vibratsiya Davomiyligi:** 15s, 30s, 45s, 60s, 90s va "Faqat o'zim to'xtatgunimcha (Cheksiz)".
  - **Interfeys Mavzusi:** Qorong'u Obsidian Dark va Sleek Light Mode.
  - **Ko'p Tillilik (i18n):** O'zbekcha, English, Русский.
  - **Orqa fonda tebranish ruxsati:** Bitta tugma bilan faollashtirish.
- **PWA (Progressive Web App):** Telefonga ilova sifatida o'rnatib olish va offline ishlash imkoniyati!

---

## 🚀 GitHub-ga Joylash va Internetda Sayt Qilish

VibroClock-ni o'zingizning GitHub hisobingizga yuklab, **GitHub Pages** orqali telefoningizga o'rnatib olish uchun quyidagi oddiy 3 ta bosqichni bajaring:

### 1-Bosqich: GitHub-da yangi resurs (Repository) yaratish
1. [github.com](https://github.com) saytiga kiring.
2. Yuqori o'ng burchakdagi **"+"** tugmasini bosib, **"New repository"**-ni tanlang.
3. Repository nomiga **`vibroclock`** deb yozing.
4. **Public** rejimini tanlang va **"Create repository"** tugmasini bosing.

### 2-Bosqich: Kodlarni GitHub-ga yuklash (Terminal orqali)
Loyiha papkasida (`C:\Users\HANDSOME\.gemini\antigravity\scratch\vibroclock`) terminalni ochib, quyidagi komandalarni ketma-ket bajaring:

```bash
git init
git add .
git commit -m "VibroClock with Background Sleep Vibration"
git branch -M main
git remote add origin https://github.com/IZLAGAN_GITHUB_USERNAMINGIZ/vibroclock.git
git push -u origin main
```

*(Eslatma: `IZLAGAN_GITHUB_USERNAMINGIZ` o'rniga o'zingizning GitHub foydalanuvchi nomingizni yozing).*

### 3-Bosqich: GitHub Pages-ni yoqish (Tekin Veb-Sayt)
1. GitHub-dagi `vibroclock` repository sahifasida **Settings** bo'limiga o'ting.
2. Chap menyudan **Pages** tugmasini bosing.
3. **Branch** bo'limidan `main` branch-ni va `/root` papkasini tanlang-da, **Save** tugmasini bosing.
4. 1-2 minutda GitHub sizga tayyor rasmiy havola beradi:
   👉 `https://IZLAGAN_GITHUB_USERNAMINGIZ.github.io/vibroclock/`

---

## 📲 Telefonga O'rnatish va Ekran O'chiqda Ishlatish Yo'riqnomasi

1. Telefoningiz brauzerida (Chrome yoki Safari) sayt havolasini oching.
2. Brauzer menyusidan **"Ekranga qo'shish" (Add to Home Screen)** tugmasini bosib, telefonga o'rnating.
3. Ilovaga kirgach, **"Sozlamalar" (Settings)** bo'limiga o'ting va **"Orqa fonda tebranish (Ruxsat berish 🔔)"** tugmasini bosing (yoki taymerni boshlaganda ruxsat bering).
4. Endi taymerni qo'yib, telefoningizning quvvat (power) tugmasi bilan ekranini o'chirib qo'ysangiz ham, sanoq to'xtamaydi va vaqt tugaganda **telefoningiz vibratsiya orqali xabar beradi**!
