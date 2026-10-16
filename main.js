import { vibrationEngine, PRESET_PATTERNS } from './vibrationEngine.js';
import { alarmManager } from './alarmManager.js';
import { timerManager } from './timerManager.js';
import { patternCreator } from './patternCreator.js';
import { i18n } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('Service Worker registration skipped or failed:', err);
    });
  }

  // 1. Initialize Settings & i18n
  initSettings();

  // 2. Initialize Vibration Engine
  const isVibroSupported = vibrationEngine.init();
  updateVibroBadge(isVibroSupported);

  // 3. Tab Navigation Setup
  initTabs();

  // 4. Live Digital Clock & Alarm Checker
  startLiveClock();

  // 5. Render Alarms
  renderAlarmsList();
  initAlarmModal();

  // 6. Timer Controls Setup (Updated for 5, 10, 25, 30m)
  initTimerControls();

  // 7. Vibro Lab & Custom Pattern Recorder Setup
  initVibroLab();

  // 8. Active Alert Overlay Controls
  initAlertOverlayControls();
});

/* ==========================================================================
   Settings & i18n Language & Theme Control
   ========================================================================== */
function initSettings() {
  const durationSelect = document.getElementById('setting-vibro-duration');
  const themeSelect = document.getElementById('setting-theme');
  const langSelect = document.getElementById('setting-language');

  // Load saved settings
  const savedDuration = localStorage.getItem('vibroclock_duration') || '45';
  const savedTheme = localStorage.getItem('vibroclock_theme') || 'dark';
  const savedLang = i18n.getLanguage();

  if (durationSelect) durationSelect.value = savedDuration;
  if (themeSelect) themeSelect.value = savedTheme;
  if (langSelect) langSelect.value = savedLang;

  applyTheme(savedTheme);
  applyTranslations();

  // Duration Listener
  durationSelect?.addEventListener('change', (e) => {
    localStorage.setItem('vibroclock_duration', e.target.value);
  });

  // Theme Listener
  themeSelect?.addEventListener('change', (e) => {
    const theme = e.target.value;
    localStorage.setItem('vibroclock_theme', theme);
    applyTheme(theme);
  });

  // Language Listener
  langSelect?.addEventListener('change', (e) => {
    const lang = e.target.value;
    i18n.setLanguage(lang);
    applyTranslations();
    renderAlarmsList(); // re-render alarm days/patterns
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

  // Dynamic status badge
  const isSupported = vibrationEngine.isSupported;
  updateVibroBadge(isSupported);
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

/* ==========================================================================
   Tab Navigation
   ========================================================================== */
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

/* ==========================================================================
   Live Digital Clock & Alarm Checker
   ========================================================================== */
let activeTriggeredAlarm = null;

function startLiveClock() {
  const timeEl = document.getElementById('live-time-str');
  const dateEl = document.getElementById('live-date-str');

  const updateClock = () => {
    const now = new Date();
    
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hrs}:${mins}:${secs}`;

    const lang = i18n.getLanguage();
    const localeStr = lang === 'uz' ? 'uz-UZ' : (lang === 'ru' ? 'ru-RU' : 'en-US');
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = now.toLocaleDateString(localeStr, options);
    dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

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

  typeBadge.textContent = i18n.t('alertAlarmActive');
  titleEl.textContent = alarm.label || i18n.t('tabAlarms');
  subtitleEl.textContent = `${alarm.time} — ${i18n.t('alertSilentNote')}`;

  overlay.classList.add('active');

  let patternToUse = alarm.pattern;
  if (patternToUse === 'custom') {
    const customPattern = patternCreator.getSavedPattern();
    if (customPattern) patternToUse = customPattern;
  }

  // Get configured duration from settings
  const configDuration = parseInt(localStorage.getItem('vibroclock_duration') || '45', 10);

  vibrationEngine.startAlertLoop(
    patternToUse,
    configDuration,
    () => {
      overlay.classList.remove('active');
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
}

/* ==========================================================================
   Alarm List & Modal Management
   ========================================================================== */
function renderAlarmsList() {
  const container = document.getElementById('alarms-container');
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

  const openModal = () => {
    updateCustomPatternOption();
    modal.classList.add('active');
  };

  const closeModal = () => modal.classList.remove('active');

  btnOpen.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  btnCancel.addEventListener('click', closeModal);

  btnSave.addEventListener('click', () => {
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

  if (savedPattern && savedPattern.length > 0) {
    customOpt.disabled = false;
    customOpt.textContent = `Custom (${savedPattern.length} steps)`;
  } else {
    customOpt.disabled = true;
    customOpt.textContent = `Custom (Empty)`;
  }
}

/* ==========================================================================
   Timer Controls (5m, 10m, 25m, 30m Presets & HH:MM:SS)
   ========================================================================== */
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
    digitsDisplay.textContent = formatted;
    const strokeOffset = CIRCUMFERENCE * (1 - progressRatio);
    progressCircle.style.strokeDashoffset = strokeOffset;
  };

  // Presets handler (5, 10, 25, 30 mins)
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const totalSecs = parseInt(chip.getAttribute('data-seconds'), 10);
      const h = Math.floor(totalSecs / 3600);
      const m = Math.floor((totalSecs % 3600) / 60);
      const s = totalSecs % 60;

      inputHours.value = h;
      inputMins.value = m;
      inputSecs.value = s;

      timerManager.setDuration(totalSecs);
      statusLabel.textContent = i18n.t('timerStatusReady');
    });
  });

  const handleInputChange = () => {
    presetChips.forEach(c => c.classList.remove('active'));
    const h = parseInt(inputHours.value, 10) || 0;
    const m = parseInt(inputMins.value, 10) || 0;
    const s = parseInt(inputSecs.value, 10) || 0;

    const totalSecs = (h * 3600) + (m * 60) + s;
    timerManager.setDuration(totalSecs);
    statusLabel.textContent = i18n.t('timerStatusReady');
  };

  inputHours.addEventListener('change', handleInputChange);
  inputMins.addEventListener('change', handleInputChange);
  inputSecs.addEventListener('change', handleInputChange);

  patternSelect.addEventListener('change', (e) => {
    timerManager.setPattern(e.target.value);
  });

  btnStart.addEventListener('click', () => {
    if (timerManager.isRunning) {
      timerManager.pause();
      statusLabel.textContent = i18n.t('timerStatusPaused');
      startText.textContent = i18n.t('btnResume');
      startIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
    } else {
      statusLabel.textContent = i18n.t('timerStatusRunning');
      startText.textContent = i18n.t('btnPause');
      startIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>`;

      timerManager.start(
        (formatted, progressRatio) => updateUI(formatted, progressRatio),
        (patternToUse) => {
          statusLabel.textContent = i18n.t('timerStatusFinished');
          startText.textContent = i18n.t('btnStart');
          startIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;

          triggerTimerAlert(patternToUse);
        }
      );
    }
  });

  btnReset.addEventListener('click', () => {
    timerManager.reset();
    statusLabel.textContent = i18n.t('timerStatusReady');
    startText.textContent = i18n.t('btnStart');
    startIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"/>`;
  });

  timerManager.setDuration(300);
}

function triggerTimerAlert(patternKey) {
  const overlay = document.getElementById('active-alert-overlay');
  const typeBadge = document.getElementById('alert-type-badge');
  const titleEl = document.getElementById('alert-title');
  const subtitleEl = document.getElementById('alert-subtitle');

  typeBadge.textContent = i18n.t('alertTimerActive');
  titleEl.textContent = i18n.t('timerStatusFinished');
  subtitleEl.textContent = i18n.t('alertSilentNote');

  overlay.classList.add('active');

  const configDuration = parseInt(localStorage.getItem('vibroclock_duration') || '45', 10);

  vibrationEngine.startAlertLoop(
    patternKey,
    configDuration,
    () => overlay.classList.remove('active'),
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
}

/* ==========================================================================
   Vibro Lab & Custom Pattern Creator
   ========================================================================== */
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

  const updateRecorderUI = () => {
    const pattern = patternCreator.getCompiledPattern();
    if (pattern.length === 0) {
      statusLabel.textContent = i18n.t('statusEmpty');
      btnClear.disabled = true;
      btnPlay.disabled = true;
      btnSave.disabled = true;
    } else {
      statusLabel.textContent = i18n.t('statusRecorded', { n: pattern.length });
      btnClear.disabled = false;
      btnPlay.disabled = false;
      btnSave.disabled = false;
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

  btnClear.addEventListener('click', () => {
    patternCreator.clear();
    updateRecorderUI();
  });

  btnPlay.addEventListener('click', () => {
    const pattern = patternCreator.getCompiledPattern();
    if (pattern.length > 0) {
      vibrationEngine.testPattern(pattern);
    }
  });

  btnSave.addEventListener('click', () => {
    const pattern = patternCreator.getCompiledPattern();
    if (pattern.length > 0) {
      patternCreator.saveCustomPattern(pattern);
      alert("Custom vibration pattern saved!");
      updateCustomPatternOption();
    }
  });

  updateRecorderUI();
}

/* ==========================================================================
   Active Alert Overlay Controls
   ========================================================================== */
function initAlertOverlayControls() {
  const overlay = document.getElementById('active-alert-overlay');
  const btnStop = document.getElementById('btn-alert-stop');
  const btnSnooze = document.getElementById('btn-alert-snooze');

  btnStop.addEventListener('click', () => {
    vibrationEngine.stop();
    overlay.classList.remove('active');
    activeTriggeredAlarm = null;
  });

  btnSnooze.addEventListener('click', () => {
    vibrationEngine.stop();
    overlay.classList.remove('active');

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
