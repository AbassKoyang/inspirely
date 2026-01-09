importScripts(
  'https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js'
 );
 importScripts(
  'https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js'
 );

 const app = firebase.initializeApp({
  apiKey: "AIzaSyBsCy5FDsrsq9FbyA-nxrMUnpj2MVqS1o8",
  authDomain: "swirl-483410.firebaseapp.com",
  projectId: "swirl-483410",
  messagingSenderId: "775778819448",
  appId: "1:775778819448:web:da11b023f6bbbc0f4d7c8d",
});
 const messaging = firebase.messaging();
 
 messaging.onBackgroundMessage((payload) => {
  console.log(
   '[firebase-messaging-sw.js] Received background message ',
   payload
  );
  const link = payload.data?.fcmOptions?.link ?? payload.data?.url; // Prioritize fcmOptions link
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
   body: payload.notification.body,
   data: { url: link },
   icon: '/icon-512.png',
   badge: '/icon-512.png',
   tag: payload.data?.chatId || 'New notification',
   requireInteraction: true,
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [
      {
        action: 'open',
        title: 'Open',
      },
      {
        action: 'close',
        title: 'Dismiss',
      }
    ],

  };
  self.registration.showNotification(notificationTitle, notificationOptions);
 });
 
 self.addEventListener('notificationclick', (event) => {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
  // This checks if the client is already open and if it is, it focuses on the tab.
  // tab with the URL passed in the notification payload
  event.waitUntil(
   clients
    // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
    .matchAll({ type: 'window', includeUncontrolled: true })
    .then(function (clientList) {
     const url = event.notification.data.url;
     if (!url) return;
     // will focus on the existing tab i.e. https://example.com/about
     for (const client of clientList) {
      console.log(client.url);
      if (client.url === url && 'focus' in client) {
       return client.focus();
      }
     }
     if (clients.openWindow) {
      console.log('OPENWINDOW ON CLIENT');
      return clients.openWindow(url);
     }
    })
  );
 });