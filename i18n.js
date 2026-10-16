/**
 * VibroClock - i18n Translation Dictionary
 * Supports Uzbek, English, and Russian.
 */

export const TRANSLATIONS = {
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

export const i18n = new I18nManager();
