/**
 * VibroClock - Custom Vibration Pattern Creator
 * Record custom vibration rhythms by tapping/holding on screen with real-time haptic response.
 */

const CUSTOM_PATTERN_KEY = 'vibroclock_custom_pattern';

class PatternCreator {
  constructor() {
    this.recordedEvents = []; // Array of { type: 'vibrate'|'pause', duration: ms }
    this.pressStartTime = 0;
    this.pauseStartTime = 0;
    this.isRecording = false;
    this.isPressing = false;

    this.savedPattern = this.loadCustomPattern();
  }

  loadCustomPattern() {
    try {
      const data = localStorage.getItem(CUSTOM_PATTERN_KEY);
      if (data) {
        return JSON.parse(data);
      }
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
      // Calculate pause duration from previous release
      if (this.pauseStartTime > 0) {
        const pauseDuration = Math.min(2000, Math.max(50, now - this.pauseStartTime));
        this.recordedEvents.push(pauseDuration);
      }
    }

    this.pressStartTime = now;

    // Real-time hardware feedback while holding down
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(5000); // long vibration until release
    }
  }

  endPress() {
    if (!this.isPressing) return;
    const now = Date.now();
    this.isPressing = false;

    // Stop real-time vibration
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
    // Return array of alternating [vibrate, pause, vibrate, pause...]
    return [...this.recordedEvents];
  }
}

export const patternCreator = new PatternCreator();
