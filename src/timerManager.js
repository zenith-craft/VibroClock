/**
 * VibroClock - Timer Manager
 * Handles countdown timer logic, SVG progress ring updates, and trigger callbacks.
 */

class TimerManager {
  constructor() {
    this.totalSeconds = 300; // default 5 mins
    this.remainingSeconds = 300;
    this.isRunning = false;
    this.timerInterval = null;
    this.selectedPattern = 'standard';

    this.onTickCallback = null;
    this.onCompleteCallback = null;
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

    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      this._notifyTick();

      if (this.remainingSeconds <= 0) {
        this.pause();
        if (this.onCompleteCallback) {
          this.onCompleteCallback(this.selectedPattern);
        }
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  reset() {
    this.pause();
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

    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  }
}

export const timerManager = new TimerManager();
