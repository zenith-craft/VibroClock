/**
 * VibroClock - Stopwatch Manager
 * Precision millisecond timer with lap recording.
 */

class StopwatchManager {
  constructor() {
    this.startTime = 0;
    this.elapsedTime = 0;
    this.isRunning = false;
    this.animFrameId = null;
    this.laps = [];
    this.lastLapTime = 0;

    this.onTickCallback = null;
  }

  start(onTick) {
    if (this.isRunning) return;

    this.onTickCallback = onTick;
    this.isRunning = true;
    this.startTime = performance.now() - this.elapsedTime;

    const update = () => {
      if (!this.isRunning) return;
      this.elapsedTime = performance.now() - this.startTime;
      if (this.onTickCallback) {
        this.onTickCallback(this.getFormattedTime());
      }
      this.animFrameId = requestAnimationFrame(update);
    };

    update();
  }

  pause() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  reset() {
    this.pause();
    this.elapsedTime = 0;
    this.laps = [];
    this.lastLapTime = 0;
    if (this.onTickCallback) {
      this.onTickCallback(this.getFormattedTime());
    }
  }

  addLap() {
    if (!this.isRunning) return null;

    const currentTotal = this.elapsedTime;
    const lapDuration = currentTotal - this.lastLapTime;
    this.lastLapTime = currentTotal;

    const lapObj = {
      lapNo: this.laps.length + 1,
      totalTimeFormatted: this.formatTimeMs(currentTotal),
      lapTimeFormatted: this.formatTimeMs(lapDuration)
    };

    this.laps.unshift(lapObj);
    return this.laps;
  }

  getFormattedTime() {
    return this.formatTimeMs(this.elapsedTime);
  }

  formatTimeMs(ms) {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // 2 digits

    const pad = (n) => String(n).padStart(2, '0');
    return {
      main: `${pad(mins)}:${pad(secs)}`,
      ms: `.${pad(milliseconds)}`
    };
  }
}

export const stopwatchManager = new StopwatchManager();
