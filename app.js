/**
 * VibroClock - Standalone Application Bundle
 * Unified script supporting both file:// direct browser opening and HTTP/PWA deployment.
 */

(function () {
  /* ==========================================================================
     1. i18n Translation System
     ========================================================================== */
  const TRANSLATIONS = {
    uz: {
      appTitle: "VibroClock",
      badgeSilent: "100% Ovsiz / Silent Vibro",
      vibroReady: "Vibratsiya Tayyor",
      vibroVisualOnly: "Ekran Haptic & Visual Pulse Active",
      
      // Tabs
      tabAlarms: "Budilnik",
      tabTimer: "Taymer",
      tabPatterns: "Vibro Lab",
      tabSettings: "Sozlamalar",

      // Alarms
      alarmsHeading: "Budilniklar",
      alarmsSubtitle: "Ovsiz tebranish orqali uyg'otuvchi va eslatuvchi signallar",
      addAlarmBtn: "Yangisini qo'shish",
      noAlarmsTitle: "Budilniklar mavjud emas",
      noAlarmsDesc: "Yangi ovsiz vibratsiyali budilnik qo'shish uchun yuqoridagi tugmani bosing.",
      alarmEveryday: "Har kuni",
      alarmModalTitle: "Yangi Budilnik Qo'shish",
      alarmNameLabel: "Nomi / Izoh",
      alarmNamePlaceholder: "Eslatma nomi (masalan: Ertalabki turish)",
      alarmPatternLabel: "Vibratsiya Patterni",
      alarmRepeatLabel: "Takrorlanish kunlari",
      btnCancel: "Bekor qilish",
      btnSave: "Saqlash",

      // Days
      dayMon: "Dsh",
      dayTue: "Ssh",
      dayWed: "Chr",
      dayThu: "Pay",
      dayFri: "Jum",
      daySat: "Shb",
      daySun: "Yak",

      // Timer
      timerStatusReady: "Tayyor",
      timerStatusRunning: "Sanoq ketmoqda...",
      timerStatusPaused: "Vaqtincha to'xtatildi",
      timerStatusFinished: "Vaqt tugadi!",
      preset5m: "5 minut",
      preset10m: "10 minut",
      preset25m: "25 minut (Pomodoro)",
      preset30m: "30 minut",
      labelHours: "Soat",
      labelMinutes: "Daqiqa",
      labelSeconds: "Soniya",
      btnStart: "Boshlash",
      btnPause: "Pauza",
      btnResume: "Davom etish",
      btnReset: "Qayta o'rnatish",

      // Vibro Lab
      labHeading: "Vibratsiya Labaratoriyasi",
      labSubtitle: "Mavjud tebranish ritmlarini sinang yoki o'zingiznikini yarating",
      btnTest: "Sinash",
      customRecordTitle: "Shaxsiy Vibratsiya Ritm Yaratish",
      customRecordSubtitle: "Quyidagi mayдонni bosib turing va o'zingiz istagan tebranish ritmini yozib oling!",
      tapInstruction: "BU YERGA BOSIB TURING VA TEBRANISH RITMINI YOZING",
      statusEmpty: "Pattern holati: Bo'sh",
      statusRecorded: "Pattern holati: {n} ta tebranish/pauza yozildi",
      btnClear: "Tozalash",
      btnListen: "Sinab Ko'rish",
      btnSavePattern: "Saqlash",

      // Settings
      settingsHeading: "Sozlamalar",
      settingsSubtitle: "Ilova ko'rinishi, til va tebranish parametrlarini moslashtiring",
      settingVibroDuration: "Vibratsiya Davomiyligi",
      settingVibroDurationSub: "Signal chalanganda tebranish qancha vaqt davom etishi",
      dur15s: "15 Soniya",
      dur30s: "30 Soniya",
      dur45s: "45 Soniya (Standart)",
      dur60s: "60 Soniya (1 minut)",
      dur90s: "90 Soniya",
      durInfinite: "Faqat o'zim to'xtatgunimcha (Cheksiz)",
      
      settingTheme: "Interfeys Mavzusi",
      settingThemeSub: "Qorong'u (Obsidian Dark) yoki Yorug' (Clean Light) rejim",
      themeDark: "Obsidian Qorong'u (Dark)",
      themeLight: "Sleek Yorug' (Light)",

      settingLanguage: "Ilova Tili",
      settingLanguageSub: "Interfeys matnlari tili",

      settingBgVibro: "Orqa Fonda Tebranish (Ekran O'chiqda)",
      settingBgVibroSub: "Telefon ekrani qulflanganida tebranib bildirishnoma chiqarish",
      btnEnableBgVibro: "Ruxsat Berish 🔔",
      bgVibroActive: "Faol (Ruxsat Berilgan) ✅",
      settingWakeLock: "Ekranni O'chirmaslik (Wake Lock)",
      settingWakeLockSub: "Taymer ishlayotganda telefon ekrani avtomatik o'chib qolmasligi",

      // Alert Overlay
      alertAlarmActive: "BUDILNIK ISHLAMOQDA",
      alertTimerActive: "TAYMER ISHLAMOQDA",
      alertSilentNote: "100% Ovsiz Vibratsiya Rejimi",
      btnSnooze: "5 Daqiqa Tanaffus (SNOOZE)",
      btnStop: "TO'XTATISH (STOP)",
      autoStopText: "{n} soniyadan so'ng avtomatik to'xtaydi",
      autoStopInfinite: "To'xtatmaguningizcha tebranishda davom etadi"
    },

    en: {
      appTitle: "VibroClock",
      badgeSilent: "100% Silent / Vibro Only",
      vibroReady: "Hardware Vibration Ready",
      vibroVisualOnly: "Screen Haptic & Visual Pulse Active",

      // Tabs
      tabAlarms: "Alarms",
      tabTimer: "Timer",
      tabPatterns: "Vibro Lab",
      tabSettings: "Settings",

      // Alarms
      alarmsHeading: "Alarms",
      alarmsSubtitle: "Silent vibration alarms and reminders",
      addAlarmBtn: "Add New Alarm",
      noAlarmsTitle: "No alarms configured",
      noAlarmsDesc: "Click the button above to add a new silent vibrating alarm.",
      alarmEveryday: "Every day",
      alarmModalTitle: "Add New Alarm",
      alarmNameLabel: "Label / Note",
      alarmNamePlaceholder: "Alarm name (e.g. Morning Wakeup)",
      alarmPatternLabel: "Vibration Pattern",
      alarmRepeatLabel: "Repeat Days",
      btnCancel: "Cancel",
      btnSave: "Save",

      // Days
      dayMon: "Mon",
      dayTue: "Tue",
      dayWed: "Wed",
      dayThu: "Thu",
      dayFri: "Fri",
      daySat: "Sat",
      daySun: "Sun",

      // Timer
      timerStatusReady: "Ready",
      timerStatusRunning: "Counting down...",
      timerStatusPaused: "Paused",
      timerStatusFinished: "Time is up!",
      preset5m: "5 minutes",
      preset10m: "10 minutes",
      preset25m: "25 min (Pomodoro)",
      preset30m: "30 minutes",
      labelHours: "Hours",
      labelMinutes: "Minutes",
      labelSeconds: "Seconds",
      btnStart: "Start",
      btnPause: "Pause",
      btnResume: "Resume",
      btnReset: "Reset",

      // Vibro Lab
      labHeading: "Vibration Laboratory",
      labSubtitle: "Test preset patterns or create your custom rhythm",
      btnTest: "Test",
      customRecordTitle: "Create Custom Rhythm",
      customRecordSubtitle: "Tap and hold below to record your custom vibration rhythm!",
      tapInstruction: "TAP & HOLD HERE TO RECORD VIBRATION RHYTHM",
      statusEmpty: "Pattern status: Empty",
      statusRecorded: "Pattern status: {n} steps recorded",
      btnClear: "Clear",
      btnListen: "Test Play",
      btnSavePattern: "Save Pattern",

      // Settings
      settingsHeading: "Settings",
      settingsSubtitle: "Customize theme, language, and vibration duration",
      settingVibroDuration: "Vibration Duration",
      settingVibroDurationSub: "How long vibration continues when alert triggers",
      dur15s: "15 Seconds",
      dur30s: "30 Seconds",
      dur45s: "45 Seconds (Default)",
      dur60s: "60 Seconds (1 min)",
      dur90s: "90 Seconds",
      durInfinite: "Until I manually stop (Infinite)",

      settingTheme: "Interface Theme",
      settingThemeSub: "Dark (Obsidian) or Light (Sleek Clean)",
      themeDark: "Obsidian Dark Mode",
      themeLight: "Sleek Light Mode",

      settingLanguage: "Language",
      settingLanguageSub: "Interface display language",

      settingBgVibro: "Background Vibration (Screen Off)",
      settingBgVibroSub: "Vibrate and alert even when device screen is locked",
      btnEnableBgVibro: "Enable Notifications 🔔",
      bgVibroActive: "Active (Allowed) ✅",
      settingWakeLock: "Keep Screen Awake (Wake Lock)",
      settingWakeLockSub: "Prevent phone screen from sleeping during timer",

      // Alert Overlay
      alertAlarmActive: "ALARM RINGING",
      alertTimerActive: "TIMER EXPIRED",
      alertSilentNote: "100% Silent Vibration Alert",
      btnSnooze: "5 Min Snooze",
      btnStop: "STOP ALARM",
      autoStopText: "Auto stopping in {n} seconds",
      autoStopInfinite: "Will continue vibrating until stopped"
    },

    ru: {
      appTitle: "VibroClock",
      badgeSilent: "100% Бесшумный / Vibro Only",
      vibroReady: "Вибрация готова",
      vibroVisualOnly: "Визуальный пульс активен",

      // Tabs
      tabAlarms: "Будильники",
      tabTimer: "Таймер",
      tabPatterns: "Вибро-Лаб",
      tabSettings: "Настройки",

      // Alarms
      alarmsHeading: "Будильники",
      alarmsSubtitle: "Бесшумные вибро-сигналы и напоминания",
      addAlarmBtn: "Добавить будильник",
      noAlarmsTitle: "Будильники не добавлены",
      noAlarmsDesc: "Нажмите кнопку выше, чтобы добавить бесшумный вибро-будильник.",
      alarmEveryday: "Каждый день",
      alarmModalTitle: "Добавить будильник",
      alarmNameLabel: "Название / Заметка",
      alarmNamePlaceholder: "Например: Утренний подъем",
      alarmPatternLabel: "Паттерн вибрации",
      alarmRepeatLabel: "Дни повторения",
      btnCancel: "Отмена",
      btnSave: "Сохранить",

      // Days
      dayMon: "Пн",
      dayTue: "Вт",
      dayWed: "Ср",
      dayThu: "Чт",
      dayFri: "Пт",
      daySat: "Сб",
      daySun: "Вс",

      // Timer
      timerStatusReady: "Готово",
      timerStatusRunning: "Идет отсчет...",
      timerStatusPaused: "Пауза",
      timerStatusFinished: "Время вышло!",
      preset5m: "5 минут",
      preset10m: "10 минут",
      preset25m: "25 мин (Помодоро)",
      preset30m: "30 минут",
      labelHours: "Часы",
      labelMinutes: "Минуты",
      labelSeconds: "Секунды",
      btnStart: "Старт",
      btnPause: "Пауза",
      btnResume: "Продолжить",
      btnReset: "Сброс",

      // Vibro Lab
      labHeading: "Вибро Лаборатория",
      labSubtitle: "Тестируйте паттерны или создайте свой ритм",
      btnTest: "Тест",
      customRecordTitle: "Создать свой ритм",
      customRecordSubtitle: "Удерживайте область ниже, чтобы записать ритм вибрации!",
      tapInstruction: "УДЕРЖИВАЙТЕ ЗДЕСЬ ДЛЯ ЗАПИСИ РИТМА",
      statusEmpty: "Статус паттерна: Пусто",
      statusRecorded: "Статус: записано шагов - {n}",
      btnClear: "Очистить",
      btnListen: "Прослушать",
      btnSavePattern: "Сохранить",

      // Settings
      settingsHeading: "Настройки",
      settingsSubtitle: "Настройка темы, языка и длительности вибрации",
      settingVibroDuration: "Длительность вибрации",
      settingVibroDurationSub: "Сколько времени длится вибрация при сигнале",
      dur15s: "15 Секунд",
      dur30s: "30 Секунд",
      dur45s: "45 Секунд (По умолчанию)",
      dur60s: "60 Секунд (1 мин)",
      dur90s: "90 Секунд",
      durInfinite: "Пока не отключу вручную (Бесконечно)",

      settingTheme: "Тема интерфейса",
      settingThemeSub: "Темная (Obsidian) или Светлая (Clean Light)",
      themeDark: "Темная тема (Obsidian)",
      themeLight: "Светлая тема (Clean Light)",

      settingLanguage: "Язык приложения",
      settingLanguageSub: "Язык интерфейса",

      settingBgVibro: "Вибрация в фоне (При выключенном экране)",
      settingBgVibroSub: "Вибрация и уведомление даже когда экран телефона выключен",
      btnEnableBgVibro: "Разрешить уведомления 🔔",
      bgVibroActive: "Активно (Разрешено) ✅",
      settingWakeLock: "Не выключать экран (Wake Lock)",
      settingWakeLockSub: "Предотвращать засыпание экрана во время таймера",

      // Alert Overlay
      alertAlarmActive: "БУДИЛЬНИК ЗВОНИТ",
      alertTimerActive: "ВРЕМЯ ТАЙМЕРА ВЫШЛО",
      alertSilentNote: "100% Бесшумный вибро-сигнал",
      btnSnooze: "Отложить на 5 мин",
      btnStop: "ОТКЛЮЧИТЬ СИГНАЛ",
      autoStopText: "Авто-отключение через {n} секунд",
      autoStopInfinite: "Вибрация будет продолжаться до отключения"
    }
  };

  class I18nManager {
    constructor() {
      this.currentLang = localStorage.getItem('vibroclock_lang') || 'uz';
    }
    setLanguage(lang) {
      if (TRANSLATIONS[lang]) {
        this.currentLang = lang;
        localStorage.setItem('vibroclock_lang', lang);
        return true;
      }
      return false;
    }
    getLanguage() {
      return this.currentLang;
    }
    t(key, params = {}) {
      const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.uz;
      let text = dict[key] || TRANSLATIONS.uz[key] || key;
      Object.keys(params).forEach(p => {
        text = text.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
      });
      return text;
    }
  }

  const i18n = new I18nManager();

  /* ==========================================================================
     2. Vibration Engine
     ========================================================================== */
  const PRESET_PATTERNS = {
    standard: { name: "Standart Pul's", pattern: [500, 250] },
    heartbeat: { name: "Yurak Urishi", pattern: [200, 100, 200, 500] },
    sos: { name: "SOS Shoshilinch", pattern: [150, 100, 150, 100, 150, 300, 400, 100, 400, 100, 400, 300, 150, 100, 150, 100, 150, 500] },
    tremor: { name: "Tezkor Tremor", pattern: [100, 50] },
    wave: { name: "Ritmik Tebranish", pattern: [100, 100, 200, 100, 300, 100, 400, 100, 500, 300] }
  };

  class VibrationEngine {
    constructor() {
      this.isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;
      this.unlocked = false;
      this.activeLoopTimer = null;
      this.autoStopTimer = null;
      this.progressBarInterval = null;
      this.isVibrating = false;
      this.onAutoStopCallback = null;
      this.onTickProgressCallback = null;
      this.visualOverlayEl = null;

      // Auto unlock vibration hardware permission on first touch/click
      const unlockHandler = () => {
        if (!this.unlocked && this.isSupported) {
          try {
            navigator.vibrate(30);
            this.unlocked = true;
          } catch (e) {}
        }
        window.removeEventListener('pointerdown', unlockHandler);
        window.removeEventListener('touchstart', unlockHandler);
        window.removeEventListener('click', unlockHandler);
      };
      window.addEventListener('pointerdown', unlockHandler, { passive: true });
      window.addEventListener('touchstart', unlockHandler, { passive: true });
      window.addEventListener('click', unlockHandler, { passive: true });
    }

    init() {
      this.visualOverlayEl = document.getElementById('vibration-fx-overlay');
      return this.isSupported;
    }

    testPattern(patternKeyOrArray) {
      this.stop();
      const pattern = this._resolvePattern(patternKeyOrArray);
      this._triggerVisualPulse(true);
      setTimeout(() => this._triggerVisualPulse(false), 2500);

      if (this.isSupported) {
        navigator.vibrate(pattern);
      }
    }

    startAlertLoop(patternKeyOrArray, maxDurationSec = 45, onAutoStop, onTickProgress) {
      this.stop();

      this.isVibrating = true;
      this.onAutoStopCallback = onAutoStop;
      this.onTickProgressCallback = onTickProgress;

      const pattern = this._resolvePattern(patternKeyOrArray);
      const patternDuration = pattern.reduce((acc, val) => acc + val, 0);

      this._triggerVisualPulse(true);

      const runPatternCycle = () => {
        if (!this.isVibrating) return;

        if (this.isSupported) {
          navigator.vibrate(pattern);
        }

        const nextDelay = Math.max(patternDuration, 600);
        this.activeLoopTimer = setTimeout(runPatternCycle, nextDelay);
      };

      runPatternCycle();

      const isInfinite = maxDurationSec <= 0 || maxDurationSec === 'infinite';
      const MAX_DURATION_MS = isInfinite ? 0 : maxDurationSec * 1000;
      const startTime = Date.now();

      this.progressBarInterval = setInterval(() => {
        if (isInfinite) {
          if (this.onTickProgressCallback) {
            this.onTickProgressCallback(-1, 100, true);
          }
          return;
        }

        const elapsed = Date.now() - startTime;
        const remainingMs = Math.max(0, MAX_DURATION_MS - elapsed);
        const percentage = (remainingMs / MAX_DURATION_MS) * 100;

        if (this.onTickProgressCallback) {
          this.onTickProgressCallback(remainingMs, percentage, false);
        }

        if (elapsed >= MAX_DURATION_MS) {
          this.stop();
          if (this.onAutoStopCallback) {
            this.onAutoStopCallback();
          }
        }
      }, 100);
    }

    stop() {
      this.isVibrating = false;

      if (this.activeLoopTimer) {
        clearTimeout(this.activeLoopTimer);
        this.activeLoopTimer = null;
      }

      if (this.progressBarInterval) {
        clearInterval(this.progressBarInterval);
        this.progressBarInterval = null;
      }

      if (this.autoStopTimer) {
        clearTimeout(this.autoStopTimer);
        this.autoStopTimer = null;
      }

      if (this.isSupported) {
        navigator.vibrate(0);
      }

      this._triggerVisualPulse(false);
    }

    _resolvePattern(patternKeyOrArray) {
      if (Array.isArray(patternKeyOrArray)) {
        return patternKeyOrArray.length > 0 ? patternKeyOrArray : PRESET_PATTERNS.standard.pattern;
      }

      if (typeof patternKeyOrArray === 'string' && PRESET_PATTERNS[patternKeyOrArray]) {
        return PRESET_PATTERNS[patternKeyOrArray].pattern;
      }

      return PRESET_PATTERNS.standard.pattern;
    }

    _triggerVisualPulse(enable) {
      if (!this.visualOverlayEl) {
        this.visualOverlayEl = document.getElementById('vibration-fx-overlay');
      }
      if (this.visualOverlayEl) {
        if (enable) {
          this.visualOverlayEl.classList.add('active');
        } else {
          this.visualOverlayEl.classList.remove('active');
        }
      }
    }
  }

  const vibrationEngine = new VibrationEngine();

  /* ==========================================================================
     Background Keep-Alive (Silent Audio & Screen Wake Lock)
     Keeps device CPU active in background while remaining 100% silent.
     ========================================================================== */
  class BackgroundKeepAlive {
    constructor() {
      this.audio = null;
      this.wakeLock = null;
      this._initAudio();
    }

    _initAudio() {
      try {
        // 1-second silent WAV base64 buffer
        const silentWav = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
        this.audio = new Audio(silentWav);
        this.audio.loop = true;
        this.audio.volume = 0.001; // virtually inaudible, keeps mobile OS audio session active
      } catch (e) {
        console.warn("Silent audio init failed:", e);
      }
    }

    start(keepScreenAwake = true) {
      if (this.audio) {
        this.audio.play().catch(() => {});
      }
      if (keepScreenAwake && 'wakeLock' in navigator) {
        navigator.wakeLock.request('screen').then(lock => {
          this.wakeLock = lock;
        }).catch(() => {});
      }
    }

    stop() {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      if (this.wakeLock) {
        this.wakeLock.release().catch(() => {});
        this.wakeLock = null;
      }
    }
  }

  const bgKeepAlive = new BackgroundKeepAlive();

  /* ==========================================================================
     Background Alert Manager (Notifications + SW Vibration)
     Triggers device vibration even when screen is locked or app is in background.
     ========================================================================== */
  class BackgroundAlertManager {
    constructor() {
      this.permission = (typeof Notification !== 'undefined') ? Notification.permission : 'default';
    }

    async requestPermission() {
      if (typeof Notification === 'undefined') return 'unsupported';
      try {
        const res = await Notification.requestPermission();
        this.permission = res;
        return res;
      } catch (e) {
        return 'denied';
      }
    }

    triggerBackgroundAlert(title, body, pattern, durationSec) {
      // 1. Send to Service Worker (works when screen is locked/asleep)
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'TRIGGER_ALERT',
          title: title,
          body: body,
          pattern: pattern,
          durationSec: durationSec
        });
      } else if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body: body,
            icon: './assets/icon-192.png',
            vibrate: pattern,
            requireInteraction: true
          });
        } catch (e) {}
      }
    }

    stopBackgroundAlert() {
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'STOP_ALERT'
        });
      }
    }
  }

  const bgAlertManager = new BackgroundAlertManager();

  /* ==========================================================================
     3. Alarm Manager
     ========================================================================== */
  const STORAGE_KEY_ALARMS = 'vibroclock_alarms';

  class AlarmManager {
    constructor() {
      this.alarms = this.loadAlarms();
    }

    loadAlarms() {
      try {
        const data = localStorage.getItem(STORAGE_KEY_ALARMS);
        if (data) return JSON.parse(data);
      } catch (e) {
        console.error('Failed to load alarms:', e);
      }
      return [
        {
          id: 'alarm-default-1',
          time: '07:00',
          label: 'Ertalabki turish',
          pattern: 'standard',
          days: [1, 2, 3, 4, 5],
          enabled: true,
          lastTriggeredDate: null
        }
      ];
    }

    saveAlarms() {
      try {
        localStorage.setItem(STORAGE_KEY_ALARMS, JSON.stringify(this.alarms));
      } catch (e) {
        console.error('Failed to save alarms:', e);
      }
    }

    getAlarms() {
      return this.alarms;
    }

    addAlarm(timeStr, label, pattern, days = []) {
      const newAlarm = {
        id: 'alarm-' + Date.now(),
        time: timeStr,
        label: label.trim() || 'Vibro Budilnik',
        pattern: pattern || 'standard',
        days: days.map(Number),
        enabled: true,
        lastTriggeredDate: null
      };
      this.alarms.push(newAlarm);
      this.saveAlarms();
      return newAlarm;
    }

    toggleAlarm(id, enabled) {
      const alarm = this.alarms.find(a => a.id === id);
      if (alarm) {
        alarm.enabled = enabled;
        this.saveAlarms();
      }
    }

    deleteAlarm(id) {
      this.alarms = this.alarms.filter(a => a.id !== id);
      this.saveAlarms();
    }

    snoozeAlarm(alarm, minutes = 5) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + minutes);
      
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');

      const snoozeAlarm = {
        id: 'snooze-' + Date.now(),
        time: `${hours}:${mins}`,
        label: `[Snooze] ${alarm.label || 'Budilnik'}`,
        pattern: alarm.pattern || 'standard',
        days: [],
        enabled: true,
        isSnooze: true,
        lastTriggeredDate: null
      };

      this.alarms.push(snoozeAlarm);
      this.saveAlarms();
      return snoozeAlarm;
    }

    checkTriggeredAlarms() {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMins = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMins}`;
      
      const currentDay = now.getDay();
      const currentDateStr = now.toISOString().split('T')[0];

      for (const alarm of this.alarms) {
        if (!alarm.enabled) continue;

        if (alarm.time === currentTimeStr) {
          if (alarm.lastTriggeredDate === `${currentDateStr}_${currentTimeStr}`) {
            continue;
          }

          if (alarm.days.length === 0 || alarm.days.includes(currentDay)) {
            alarm.lastTriggeredDate = `${currentDateStr}_${currentTimeStr}`;
            if (alarm.isSnooze) alarm.enabled = false;
            this.saveAlarms();
            return alarm;
          }
        }
      }
      return null;
    }
  }

  const alarmManager = new AlarmManager();

  /* ==========================================================================
     4. Timer Manager (Accurate Timestamp-based Countdown)
     ========================================================================== */
  class TimerManager {
    constructor() {
      this.totalSeconds = 300;
      this.remainingSeconds = 300;
      this.endTime = null;
      this.isRunning = false;
      this.timerInterval = null;
      this.selectedPattern = 'standard';
      this.onTickCallback = null;
      this.onCompleteCallback = null;

      // Re-sync immediately when device screen unlocks or tab becomes visible again
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this.isRunning) {
          this._checkProgress();
        }
      });
    }

    setDuration(totalSeconds) {
      this.reset();
      this.totalSeconds = Math.max(1, totalSeconds);
      this.remainingSeconds = this.totalSeconds;
      this._notifyTick();
    }

    setPattern(patternKey) {
      this.selectedPattern = patternKey;
    }

    start(onTick, onComplete) {
      if (this.isRunning) return;

      this.onTickCallback = onTick;
      this.onCompleteCallback = onComplete;
      this.isRunning = true;
      this.endTime = Date.now() + (this.remainingSeconds * 1000);

      // Start silent keep-alive audio & optional screen wake lock
      const wakeLockEnabled = localStorage.getItem('vibroclock_wakelock') !== 'false';
      bgKeepAlive.start(wakeLockEnabled);

      // Check frequently (every 250ms) for high precision and immediate finish
      this.timerInterval = setInterval(() => {
        this._checkProgress();
      }, 250);
    }

    _checkProgress() {
      if (!this.isRunning || !this.endTime) return;

      const now = Date.now();
      const remainingMs = this.endTime - now;
      const remainingSecs = Math.max(0, Math.ceil(remainingMs / 1000));

      this.remainingSeconds = remainingSecs;
      this._notifyTick();

      if (remainingMs <= 0) {
        this.pause();
        if (this.onCompleteCallback) {
          this.onCompleteCallback(this.selectedPattern);
        }
      }
    }

    pause() {
      this.isRunning = false;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      bgKeepAlive.stop();
    }

    reset() {
      this.pause();
      this.endTime = null;
      this.remainingSeconds = this.totalSeconds;
      this._notifyTick();
    }

    _notifyTick() {
      if (this.onTickCallback) {
        const formatted = this.getFormattedTime();
        const progressRatio = this.remainingSeconds / this.totalSeconds;
        this.onTickCallback(formatted, progressRatio, this.remainingSeconds);
      }
    }

    getFormattedTime() {
      const hrs = Math.floor(this.remainingSeconds / 3600);
      const mins = Math.floor((this.remainingSeconds % 3600) / 60);
      const secs = this.remainingSeconds % 60;
      const pad = (n) => String(n).padStart(2, '0');

      if (hrs > 0) return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
      return `${pad(mins)}:${pad(secs)}`;
    }
  }

  const timerManager = new TimerManager();

  /* ==========================================================================
     5. Pattern Creator
     ========================================================================== */
  const CUSTOM_PATTERN_KEY = 'vibroclock_custom_pattern';

  class PatternCreator {
    constructor() {
      this.recordedEvents = [];
      this.pressStartTime = 0;
      this.pauseStartTime = 0;
      this.isRecording = false;
      this.isPressing = false;
      this.savedPattern = this.loadCustomPattern();
    }

    loadCustomPattern() {
      try {
        const data = localStorage.getItem(CUSTOM_PATTERN_KEY);
        if (data) return JSON.parse(data);
      } catch (e) {
        console.error('Failed to load custom pattern:', e);
      }
      return null;
    }

    saveCustomPattern(patternArray) {
      this.savedPattern = patternArray;
      try {
        localStorage.setItem(CUSTOM_PATTERN_KEY, JSON.stringify(patternArray));
      } catch (e) {
        console.error('Failed to save custom pattern:', e);
      }
    }

    getSavedPattern() {
      return this.savedPattern;
    }

    startPress() {
      const now = Date.now();
      this.isPressing = true;

      if (!this.isRecording) {
        this.isRecording = true;
        this.recordedEvents = [];
      } else {
        if (this.pauseStartTime > 0) {
          const pauseDuration = Math.min(2000, Math.max(50, now - this.pauseStartTime));
          this.recordedEvents.push(pauseDuration);
        }
      }

      this.pressStartTime = now;
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(5000);
      }
    }

    endPress() {
      if (!this.isPressing) return;
      const now = Date.now();
      this.isPressing = false;

      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(0);
      }

      const vibrateDuration = Math.min(3000, Math.max(50, now - this.pressStartTime));
      this.recordedEvents.push(vibrateDuration);
      this.pauseStartTime = now;
    }

    clear() {
      this.recordedEvents = [];
      this.isRecording = false;
      this.isPressing = false;
      this.pressStartTime = 0;
      this.pauseStartTime = 0;
    }

    getCompiledPattern() {
      return [...this.recordedEvents];
    }
  }

  const patternCreator = new PatternCreator();

  /* ==========================================================================
     6. Main Application Orchestration
     ========================================================================== */
  let activeTriggeredAlarm = null;

  document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.log('SW registration skipped:', err);
      });

      // Listen for alert stop actions from background notifications
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'ALERT_STOPPED_FROM_NOTIFICATION') {
          vibrationEngine.stop();
          bgAlertManager.stopBackgroundAlert();
          document.getElementById('active-alert-overlay')?.classList.remove('active');
          activeTriggeredAlarm = null;
        }
      });
    }

    initSettings();
    const isVibroSupported = vibrationEngine.init();
    updateVibroBadge(isVibroSupported);
    initTabs();
    startLiveClock();
    renderAlarmsList();
    initAlarmModal();
    initTimerControls();
    initVibroLab();
    initAlertOverlayControls();
  });

  function initSettings() {
    const durationSelect = document.getElementById('setting-vibro-duration');
    const themeSelect = document.getElementById('setting-theme');
    const langSelect = document.getElementById('setting-language');
    const btnRequestNotif = document.getElementById('btn-request-notification');
    const notifStatusText = document.getElementById('btn-notif-status-text');
    const wakeLockCheckbox = document.getElementById('setting-wake-lock');

    const savedDuration = localStorage.getItem('vibroclock_duration') || '45';
    const savedTheme = localStorage.getItem('vibroclock_theme') || 'dark';
    const savedLang = i18n.getLanguage();
    const savedWakeLock = localStorage.getItem('vibroclock_wakelock') !== 'false';

    if (durationSelect) durationSelect.value = savedDuration;
    if (themeSelect) themeSelect.value = savedTheme;
    if (langSelect) langSelect.value = savedLang;
    if (wakeLockCheckbox) wakeLockCheckbox.checked = savedWakeLock;

    applyTheme(savedTheme);
    applyTranslations();

    // Check current notification permission status
    const updateNotifUI = () => {
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        if (notifStatusText) notifStatusText.textContent = i18n.t('bgVibroActive');
        if (btnRequestNotif) {
          btnRequestNotif.classList.remove('btn-outline');
          btnRequestNotif.classList.add('btn-secondary');
        }
      } else {
        if (notifStatusText) notifStatusText.textContent = i18n.t('btnEnableBgVibro');
        if (btnRequestNotif) {
          btnRequestNotif.classList.add('btn-outline');
          btnRequestNotif.classList.remove('btn-secondary');
        }
      }
    };
    updateNotifUI();

    btnRequestNotif?.addEventListener('click', async () => {
      const res = await bgAlertManager.requestPermission();
      updateNotifUI();
      if (res === 'granted') {
        alert("Orqa fonda tebranish (bildirishnomalar) muvaffaqiyatli yoqildi!");
      }
    });

    wakeLockCheckbox?.addEventListener('change', (e) => {
      localStorage.setItem('vibroclock_wakelock', e.target.checked ? 'true' : 'false');
    });

    durationSelect?.addEventListener('change', (e) => {
      localStorage.setItem('vibroclock_duration', e.target.value);
    });

    themeSelect?.addEventListener('change', (e) => {
      const theme = e.target.value;
      localStorage.setItem('vibroclock_theme', theme);
      applyTheme(theme);
    });

    langSelect?.addEventListener('change', (e) => {
      const lang = e.target.value;
      i18n.setLanguage(lang);
      applyTranslations();
      updateNotifUI();
      renderAlarmsList();
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const metaTheme = document.getElementById('meta-theme-color');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'light' ? '#f8fafc' : '#090b10');
    }
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = i18n.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = i18n.t(key);
    });

    updateVibroBadge(vibrationEngine.isSupported);
  }

  function updateVibroBadge(isSupported) {
    const badgeText = document.getElementById('vibro-status-text');
    const badgeEl = document.getElementById('vibro-support-badge');
    if (!badgeText || !badgeEl) return;

    if (isSupported) {
      badgeText.textContent = i18n.t('vibroReady');
    } else {
      badgeText.textContent = i18n.t('vibroVisualOnly');
      badgeEl.style.borderColor = 'rgba(0, 242, 254, 0.4)';
      badgeEl.style.color = 'var(--primary-cyan)';
    }
  }

  function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(targetId)?.classList.add('active');
      });
    });
  }

  function startLiveClock() {
    const timeEl = document.getElementById('live-time-str');
    const dateEl = document.getElementById('live-date-str');

    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      if (timeEl) timeEl.textContent = `${hrs}:${mins}:${secs}`;

      const lang = i18n.getLanguage();
      const localeStr = lang === 'uz' ? 'uz-UZ' : (lang === 'ru' ? 'ru-RU' : 'en-US');
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const dateStr = now.toLocaleDateString(localeStr, options);
      if (dateEl) dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

      const triggered = alarmManager.checkTriggeredAlarms();
      if (triggered && !vibrationEngine.isVibrating) {
        triggerAlarmAlert(triggered);
      }
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  function triggerAlarmAlert(alarm) {
    activeTriggeredAlarm = alarm;
    const overlay = document.getElementById('active-alert-overlay');
    const typeBadge = document.getElementById('alert-type-badge');
    const titleEl = document.getElementById('alert-title');
    const subtitleEl = document.getElementById('alert-subtitle');

    if (typeBadge) typeBadge.textContent = i18n.t('alertAlarmActive');
    if (titleEl) titleEl.textContent = alarm.label || i18n.t('tabAlarms');
    if (subtitleEl) subtitleEl.textContent = `${alarm.time} — ${i18n.t('alertSilentNote')}`;

    overlay?.classList.add('active');

    let patternToUse = alarm.pattern;
    if (patternToUse === 'custom') {
      const customPattern = patternCreator.getSavedPattern();
      if (customPattern) patternToUse = customPattern;
    }

    const configDuration = parseInt(localStorage.getItem('vibroclock_duration') || '45', 10);
    const resolvedPattern = vibrationEngine._resolvePattern(patternToUse);

    // 1. Foreground vibration and UI visual pulses
    vibrationEngine.startAlertLoop(
      resolvedPattern,
      configDuration,
      () => {
        overlay?.classList.remove('active');
        bgAlertManager.stopBackgroundAlert();
        activeTriggeredAlarm = null;
      },
      (remainingMs, percentage, isInfinite) => {
        const progressBar = document.getElementById('auto-stop-bar');
        const timerText = document.getElementById('auto-stop-timer-text');
        
        if (isInfinite) {
          if (progressBar) progressBar.style.width = '100%';
          if (timerText) timerText.textContent = i18n.t('autoStopInfinite');
        } else {
          if (progressBar) progressBar.style.width = `${percentage}%`;
          if (timerText) {
            const secsLeft = Math.ceil(remainingMs / 1000);
            timerText.textContent = i18n.t('autoStopText', { n: secsLeft });
          }
        }
      }
    );

    // 2. Background vibration notification (works when phone screen is locked/asleep)
    bgAlertManager.triggerBackgroundAlert(
      alarm.label || i18n.t('tabAlarms'),
      `${alarm.time} — ${i18n.t('alertSilentNote')}`,
      resolvedPattern,
      configDuration
    );
  }

  function renderAlarmsList() {
    const container = document.getElementById('alarms-container');
    if (!container) return;

    const alarms = alarmManager.getAlarms();

    if (alarms.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="8"/><path d="M5 3L2 6M22 6l-3-3M12 9v4l3 2"/></svg>
          <h3>${i18n.t('noAlarmsTitle')}</h3>
          <p>${i18n.t('noAlarmsDesc')}</p>
        </div>
      `;
      return;
    }

    const daysMap = [
      i18n.t('daySun'), i18n.t('dayMon'), i18n.t('dayTue'), 
      i18n.t('dayWed'), i18n.t('dayThu'), i18n.t('dayFri'), i18n.t('daySat')
    ];

    container.innerHTML = alarms.map(alarm => {
      let daysStr = i18n.t('alarmEveryday');
      if (alarm.days.length > 0) {
        daysStr = alarm.days.map(d => daysMap[d]).join(', ');
      }

      let patternName = PRESET_PATTERNS[alarm.pattern]?.name || alarm.pattern;
      if (alarm.pattern === 'custom') patternName = i18n.t('customRecordTitle');

      return `
        <div class="alarm-card ${alarm.enabled ? '' : 'off'}" data-id="${alarm.id}">
          <div class="alarm-info">
            <div class="alarm-time">${alarm.time}</div>
            <div class="alarm-meta">
              <span class="alarm-label">${escapeHtml(alarm.label)}</span>
              <span>•</span>
              <span class="alarm-days">${daysStr}</span>
              <span class="alarm-pattern-chip">${patternName}</span>
            </div>
          </div>
          <div class="alarm-controls">
            <label class="toggle-switch">
              <input type="checkbox" class="alarm-toggle-input" ${alarm.enabled ? 'checked' : ''} data-id="${alarm.id}" />
              <span class="slider"></span>
            </label>
            <button class="btn-delete-alarm" data-id="${alarm.id}" title="${i18n.t('btnClear')}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.alarm-toggle-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        alarmManager.toggleAlarm(id, e.target.checked);
        renderAlarmsList();
      });
    });

    container.querySelectorAll('.btn-delete-alarm').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        alarmManager.deleteAlarm(id);
        renderAlarmsList();
      });
    });
  }

  function initAlarmModal() {
    const modal = document.getElementById('modal-add-alarm');
    const btnOpen = document.getElementById('btn-open-add-alarm');
    const btnClose = document.getElementById('btn-close-alarm-modal');
    const btnCancel = document.getElementById('btn-cancel-alarm');
    const btnSave = document.getElementById('btn-save-alarm');

    if (!modal) return;

    const openModal = () => {
      updateCustomPatternOption();
      modal.classList.add('active');
    };

    const closeModal = () => modal.classList.remove('active');

    btnOpen?.addEventListener('click', openModal);
    btnClose?.addEventListener('click', closeModal);
    btnCancel?.addEventListener('click', closeModal);

    btnSave?.addEventListener('click', () => {
      const timeVal = document.getElementById('alarm-input-time').value;
      const labelVal = document.getElementById('alarm-input-label').value;
      const patternVal = document.getElementById('alarm-input-pattern').value;

      const selectedDays = [];
      document.querySelectorAll('.days-selector input:checked').forEach(cb => {
        selectedDays.push(Number(cb.value));
      });

      if (!timeVal) {
        alert("Iltimos, budilnik vaqtini tanlang!");
        return;
      }

      alarmManager.addAlarm(timeVal, labelVal, patternVal, selectedDays);
      renderAlarmsList();
      closeModal();

      document.getElementById('alarm-input-label').value = '';
      document.querySelectorAll('.days-selector input').forEach(cb => cb.checked = false);
    });
  }

  function updateCustomPatternOption() {
    const customOpt = document.getElementById('opt-custom-pattern');
    const savedPattern = patternCreator.getSavedPattern();

    if (customOpt) {
      if (savedPattern && savedPattern.length > 0) {
        customOpt.disabled = false;
        customOpt.textContent = `Custom (${savedPattern.length} steps)`;
      } else {
        customOpt.disabled = true;
        customOpt.textContent = `Custom (Empty)`;
      }
    }
  }

  function initTimerControls() {
    const digitsDisplay = document.getElementById('timer-digits-display');
    const statusLabel = document.getElementById('timer-status-label');
    const progressCircle = document.getElementById('timer-progress-circle');
    
    const presetChips = document.querySelectorAll('.preset-chip');
    const inputHours = document.getElementById('timer-input-hours');
    const inputMins = document.getElementById('timer-input-minutes');
    const inputSecs = document.getElementById('timer-input-seconds');

    const btnStart = document.getElementById('btn-timer-start');
    const startIcon = document.getElementById('timer-start-icon');
    const startText = document.getElementById('timer-start-text');
    const btnReset = document.getElementById('btn-timer-reset');
    const patternSelect = document.getElementById('timer-pattern-select');

    const CIRCUMFERENCE = 615.75;

    const updateUI = (formatted, progressRatio) => {
      if (digitsDisplay) digitsDisplay.textContent = formatted;
      const strokeOffset = CIRCUMFERENCE * (1 - progressRatio);
      if (progressCircle) progressCircle.style.strokeDashoffset = strokeOffset;
    };

    presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const totalSecs = parseInt(chip.getAttribute('data-seconds'), 10);
        const h = Math.floor(totalSecs / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;

        if (inputHours) inputHours.value = h;
        if (inputMins) inputMins.value = m;
        if (inputSecs) inputSecs.value = s;

        timerManager.setDuration(totalSecs);
        if (statusLabel) statusLabel.textContent = i18n.t('timerStatusReady');
      });
    });

    const handleInputChange = () => {
      presetChips.forEach(c => c.classList.remove('active'));
      const h = parseInt(inputHours?.value, 10) || 0;
      const m = parseInt(inputMins?.value, 10) || 0;
      const s = parseInt(inputSecs?.value, 10) || 0;

      const totalSecs = (h * 3600) + (m * 60) + s;
      timerManager.setDuration(totalSecs);
      if (statusLabel) statusLabel.textContent = i18n.t('timerStatusReady');
    };

    inputHours?.addEventListener('change', handleInputChange);
    inputMins?.addEventListener('change', handleInputChange);
    inputSecs?.addEventListener('change', handleInputChange);

    patternSelect?.addEventListener('change', (e) => {
      timerManager.setPattern(e.target.value);
    });

    btnStart?.addEventListener('click', () => {
      if (timerManager.isRunning) {
        timerManager.pause();
        if (statusLabel) statusLabel.textContent = i18n.t('timerStatusPaused');
        if (startText) startText.textContent = i18n.t('btnResume');
        if (startIcon) startIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
      } else {
        // Automatically ask notification permission on first timer start to guarantee background vibration
        if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
          bgAlertManager.requestPermission().then(() => {
            const notifStatusText = document.getElementById('btn-notif-status-text');
            const btnRequestNotif = document.getElementById('btn-request-notification');
            if (Notification.permission === 'granted') {
              if (notifStatusText) notifStatusText.textContent = i18n.t('bgVibroActive');
              if (btnRequestNotif) {
                btnRequestNotif.classList.remove('btn-outline');
                btnRequestNotif.classList.add('btn-secondary');
              }
            }
          });
        }

        if (statusLabel) statusLabel.textContent = i18n.t('timerStatusRunning');
        if (startText) startText.textContent = i18n.t('btnPause');
        if (startIcon) startIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;

        timerManager.start(
          (formatted, progressRatio) => updateUI(formatted, progressRatio),
          (patternToUse) => {
            if (statusLabel) statusLabel.textContent = i18n.t('timerStatusFinished');
            if (startText) startText.textContent = i18n.t('btnStart');
            if (startIcon) startIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;

            triggerTimerAlert(patternToUse);
          }
        );
      }
    });

    btnReset?.addEventListener('click', () => {
      timerManager.reset();
      if (statusLabel) statusLabel.textContent = i18n.t('timerStatusReady');
      if (startText) startText.textContent = i18n.t('btnStart');
      if (startIcon) startIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
    });

    timerManager.setDuration(300);
  }

  function triggerTimerAlert(patternKey) {
    const overlay = document.getElementById('active-alert-overlay');
    const typeBadge = document.getElementById('alert-type-badge');
    const titleEl = document.getElementById('alert-title');
    const subtitleEl = document.getElementById('alert-subtitle');

    const alertTitle = i18n.t('timerStatusFinished');
    const alertBody = `${i18n.t('alertTimerActive')} — ${i18n.t('alertSilentNote')}`;

    if (typeBadge) typeBadge.textContent = i18n.t('alertTimerActive');
    if (titleEl) titleEl.textContent = alertTitle;
    if (subtitleEl) subtitleEl.textContent = alertBody;

    overlay?.classList.add('active');

    const configDuration = parseInt(localStorage.getItem('vibroclock_duration') || '45', 10);
    const resolvedPattern = vibrationEngine._resolvePattern(patternKey);

    // 1. Foreground vibration and UI visual pulses
    vibrationEngine.startAlertLoop(
      resolvedPattern,
      configDuration,
      () => {
        overlay?.classList.remove('active');
        bgAlertManager.stopBackgroundAlert();
      },
      (remainingMs, percentage, isInfinite) => {
        const progressBar = document.getElementById('auto-stop-bar');
        const timerText = document.getElementById('auto-stop-timer-text');

        if (isInfinite) {
          if (progressBar) progressBar.style.width = '100%';
          if (timerText) timerText.textContent = i18n.t('autoStopInfinite');
        } else {
          if (progressBar) progressBar.style.width = `${percentage}%`;
          if (timerText) {
            const secsLeft = Math.ceil(remainingMs / 1000);
            timerText.textContent = i18n.t('autoStopText', { n: secsLeft });
          }
        }
      }
    );

    // 2. Background vibration notification (works when screen is locked/asleep)
    bgAlertManager.triggerBackgroundAlert(alertTitle, alertBody, resolvedPattern, configDuration);
  }

  function initVibroLab() {
    const testBtns = document.querySelectorAll('.btn-test-pattern');
    testBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const patternKey = btn.getAttribute('data-pattern');
        vibrationEngine.testPattern(patternKey);
      });
    });

    const tapZone = document.getElementById('tap-record-zone');
    const statusLabel = document.getElementById('record-status-label');
    const btnClear = document.getElementById('btn-clear-recorded');
    const btnPlay = document.getElementById('btn-play-recorded');
    const btnSave = document.getElementById('btn-save-recorded');

    if (!tapZone) return;

    const updateRecorderUI = () => {
      const pattern = patternCreator.getCompiledPattern();
      if (pattern.length === 0) {
        if (statusLabel) statusLabel.textContent = i18n.t('statusEmpty');
        if (btnClear) btnClear.disabled = true;
        if (btnPlay) btnPlay.disabled = true;
        if (btnSave) btnSave.disabled = true;
      } else {
        if (statusLabel) statusLabel.textContent = i18n.t('statusRecorded', { n: pattern.length });
        if (btnClear) btnClear.disabled = false;
        if (btnPlay) btnPlay.disabled = false;
        if (btnSave) btnSave.disabled = false;
      }
    };

    const handlePointerDown = (e) => {
      e.preventDefault();
      tapZone.classList.add('pressing');
      patternCreator.startPress();
      updateRecorderUI();
    };

    const handlePointerUp = (e) => {
      e.preventDefault();
      tapZone.classList.remove('pressing');
      patternCreator.endPress();
      updateRecorderUI();
    };

    tapZone.addEventListener('pointerdown', handlePointerDown);
    tapZone.addEventListener('pointerup', handlePointerUp);
    tapZone.addEventListener('pointerleave', handlePointerUp);

    btnClear?.addEventListener('click', () => {
      patternCreator.clear();
      updateRecorderUI();
    });

    btnPlay?.addEventListener('click', () => {
      const pattern = patternCreator.getCompiledPattern();
      if (pattern.length > 0) {
        vibrationEngine.testPattern(pattern);
      }
    });

    btnSave?.addEventListener('click', () => {
      const pattern = patternCreator.getCompiledPattern();
      if (pattern.length > 0) {
        patternCreator.saveCustomPattern(pattern);
        alert("Custom vibration pattern saved!");
        updateCustomPatternOption();
      }
    });

    updateRecorderUI();
  }

  function initAlertOverlayControls() {
    const overlay = document.getElementById('active-alert-overlay');
    const btnStop = document.getElementById('btn-alert-stop');
    const btnSnooze = document.getElementById('btn-alert-snooze');

    btnStop?.addEventListener('click', () => {
      vibrationEngine.stop();
      bgAlertManager.stopBackgroundAlert();
      overlay?.classList.remove('active');
      activeTriggeredAlarm = null;
    });

    btnSnooze?.addEventListener('click', () => {
      vibrationEngine.stop();
      bgAlertManager.stopBackgroundAlert();
      overlay?.classList.remove('active');

      if (activeTriggeredAlarm) {
        alarmManager.snoozeAlarm(activeTriggeredAlarm, 5);
        renderAlarmsList();
      }
      activeTriggeredAlarm = null;
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
