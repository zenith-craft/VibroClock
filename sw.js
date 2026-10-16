/**
 * VibroClock - Service Worker
 * Enables PWA installation, offline caching, and background vibration notifications
 * when the device screen is locked or asleep.
 */

const CACHE_NAME = 'vibroclock-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './src/style.css',
  './src/app.js',
  './manifest.json'
];

let activeAlertInterval = null;
let alertEndTime = 0;

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

/**
 * Handle incoming messages from the frontend page
 */
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || !data.type) return;

  if (data.type === 'TRIGGER_ALERT') {
    handleTriggerAlert(data);
  } else if (data.type === 'STOP_ALERT') {
    stopActiveAlert();
  }
});

function handleTriggerAlert(data) {
  stopActiveAlert();

  const title = data.title || 'VibroClock';
  const body = data.body || "Vaqt tugadi! 100% Ovsiz Vibratsiya";
  const pattern = data.pattern || [500, 250, 500, 250, 500];
  const durationSec = typeof data.durationSec === 'number' ? data.durationSec : 45;
  const isInfinite = durationSec <= 0;

  alertEndTime = isInfinite ? 0 : Date.now() + (durationSec * 1000);

  // Show immediate first vibrating notification
  showVibratingNotification(title, body, pattern);

  // If repeat is required, pulse notification periodically
  activeAlertInterval = setInterval(() => {
    if (!isInfinite && Date.now() >= alertEndTime) {
      stopActiveAlert();
      return;
    }
    showVibratingNotification(title, body, pattern);
  }, 2400);
}

function showVibratingNotification(title, body, pattern) {
  self.registration.showNotification(title, {
    body: body,
    icon: './assets/icon-192.png',
    badge: './assets/icon-192.png',
    vibrate: pattern,
    tag: 'vibroclock-active-alert',
    renotify: true,
    requireInteraction: true,
    silent: false,
    actions: [
      { action: 'stop', title: "🛑 TO'XTATISH (STOP)" }
    ]
  }).catch((err) => {
    console.error('Failed to show notification in SW:', err);
  });
}

function stopActiveAlert() {
  if (activeAlertInterval) {
    clearInterval(activeAlertInterval);
    activeAlertInterval = null;
  }
  alertEndTime = 0;

  // Close existing notification
  self.registration.getNotifications({ tag: 'vibroclock-active-alert' })
    .then((notifications) => {
      notifications.forEach((n) => n.close());
    })
    .catch(() => {});
}

/**
 * Handle notification clicks (e.g. user taps notification or Stop button)
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  stopActiveAlert();

  // Notify all open client windows that alert was stopped
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage({ type: 'ALERT_STOPPED_FROM_NOTIFICATION' });
      });

      // Focus on existing window or open a new one
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('./index.html');
      }
    })
  );
});

self.addEventListener('notificationclose', () => {
  stopActiveAlert();
  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    clientList.forEach((client) => {
      client.postMessage({ type: 'ALERT_STOPPED_FROM_NOTIFICATION' });
    });
  });
});
