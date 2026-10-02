/**
 * VibroClock - Vibration Engine
 * Manages Web Vibration API (navigator.vibrate), custom pulse rhythm patterns,
 * visual screen pulse FX, and configurable auto-stop duration logic.
 * STRICTLY 100% SILENT (NO AUDIO SOUNDS).
 */

export const PRESET_PATTERNS = {
  standard: {
    name: "Standart Pul's",
    pattern: [500, 250]
  },
  heartbeat: {
    name: "Yurak Urishi",
    pattern: [200, 100, 200, 500]
  },
  sos: {
    name: "SOS Shoshilinch",
    pattern: [150, 100, 150, 100, 150, 300, 400, 100, 400, 100, 400, 300, 150, 100, 150, 100, 150, 500]
  },
  tremor: {
    name: "Tezkor Tremor",
    pattern: [100, 50]
  },
  wave: {
    name: "Ritmik Tebranish",
    pattern: [100, 100, 200, 100, 300, 100, 400, 100, 500, 300]
  }
};

class VibrationEngine {
  constructor() {
    this.isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;
    this.activeLoopTimer = null;
    this.autoStopTimer = null;
    this.progressBarInterval = null;
    this.isVibrating = false;
    this.onAutoStopCallback = null;
    this.onTickProgressCallback = null;

    this.visualOverlayEl = null;
  }

  init() {
    this.visualOverlayEl = document.getElementById('vibration-fx-overlay');
    return this.isSupported;
  }

  /**
   * One-shot preview test for a pattern
   */
  testPattern(patternKeyOrArray) {
    this.stop();
    const pattern = this._resolvePattern(patternKeyOrArray);
    
    this._triggerVisualPulse(true);
    setTimeout(() => this._triggerVisualPulse(false), 2500);

    if (this.isSupported) {
      navigator.vibrate(pattern);
    }
  }

  /**
   * Start looping vibration alert with configurable maxDurationSec (e.g., 15, 30, 45, 60, 90, 0=infinite)
   */
  startAlertLoop(patternKeyOrArray, maxDurationSec = 45, onAutoStop, onTickProgress) {
    this.stop();

    this.isVibrating = true;
    this.onAutoStopCallback = onAutoStop;
    this.onTickProgressCallback = onTickProgress;

    const pattern = this._resolvePattern(patternKeyOrArray);
    const patternDuration = pattern.reduce((acc, val) => acc + val, 0);

    // 1. Enable screen visual haptics
    this._triggerVisualPulse(true);

    // 2. Continuous pattern loop
    const runPatternCycle = () => {
      if (!this.isVibrating) return;

      if (this.isSupported) {
        navigator.vibrate(pattern);
      }

      const nextDelay = Math.max(patternDuration, 600);
      this.activeLoopTimer = setTimeout(runPatternCycle, nextDelay);
    };

    runPatternCycle();

    // 3. Auto-stop limit logic (If maxDurationSec is 0, it means infinite/until manual stop)
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

export const vibrationEngine = new VibrationEngine();
