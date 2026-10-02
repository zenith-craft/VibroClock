/**
 * VibroClock - Alarm Manager
 * Manages alarm entries, storage, repeat days, and minute-precision trigger checks.
 */

const STORAGE_KEY = 'vibroclock_alarms';

class AlarmManager {
  constructor() {
    this.alarms = this.loadAlarms();
  }

  loadAlarms() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load alarms from localStorage:', e);
    }
    // Default initial sample alarm
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.alarms));
    } catch (e) {
      console.error('Failed to save alarms to localStorage:', e);
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
    const snoozeTimeStr = `${hours}:${mins}`;

    const snoozeAlarm = {
      id: 'snooze-' + Date.now(),
      time: snoozeTimeStr,
      label: `[Snooze] ${alarm.label || 'Budilnik'}`,
      pattern: alarm.pattern || 'standard',
      days: [], // one-time
      enabled: true,
      isSnooze: true,
      lastTriggeredDate: null
    };

    this.alarms.push(snoozeAlarm);
    this.saveAlarms();
    return snoozeAlarm;
  }

  /**
   * Check if any alarm should fire right now
   */
  checkTriggeredAlarms() {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMins = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${currentHours}:${currentMins}`;
    
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ...
    const currentDateStr = now.toISOString().split('T')[0];

    for (const alarm of this.alarms) {
      if (!alarm.enabled) continue;

      // Time match
      if (alarm.time === currentTimeStr) {
        // Prevent re-triggering in the same minute
        if (alarm.lastTriggeredDate === `${currentDateStr}_${currentTimeStr}`) {
          continue;
        }

        // Days match check (if days empty, triggers every day)
        if (alarm.days.length === 0 || alarm.days.includes(currentDay)) {
          alarm.lastTriggeredDate = `${currentDateStr}_${currentTimeStr}`;
          
          // If it was a one-time snooze alarm, disable or remove it
          if (alarm.isSnooze) {
            alarm.enabled = false;
          }
          this.saveAlarms();
          
          return alarm;
        }
      }
    }

    return null;
  }
}

export const alarmManager = new AlarmManager();
