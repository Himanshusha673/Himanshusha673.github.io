export const ENGINEERING_FILTERS = ['All', 'Real-Time', 'Security', 'Offline', 'iOS / Native', 'Networking', 'Backend', 'Game', 'Performance', 'Architecture'];

export const ENGINEERING = [
  {
    title: 'Real-time communication & socket reliability',
    description: 'Built Flutter WebSocket communication around connection state, handshake readiness, reconnection handling and queued events so events are not sent before a session is ready.',
    tags: ['Flutter', 'WebSockets', 'Real-Time', 'Architecture'],
    categories: ['Real-Time', 'Architecture', 'Security'],
    code: `Connection\n    ↓\nHandshake\n    ↓\nKey Exchange\n    ↓\nSession Established\n    ↓\nQueued Events Released\n    ↓\nNormal Socket Communication`,
    details: [
      'Implemented a first-handshake flow after connection/reconnection.',
      'Events arriving before session readiness are held in a queue.',
      'Once the handshake completes, queued events are released in order.',
      'Normal socket events continue after the session becomes ready.'
    ]
  },
  {
    title: 'Secure session key exchange',
    description: 'Designed an ephemeral X25519 / ECDH key-exchange flow with HKDF-SHA256 derived session keys instead of transmitting a static encryption key.',
    tags: ['X25519', 'ECDH', 'HKDF-SHA256', 'Security'],
    categories: ['Security', 'Architecture'],
    code: `Client                 Server\nPrivate Key            Private Key\n     ↓                      ↓\nPublic Key  ─────────→  Public Key\n          X25519 / ECDH\n                ↓\n          Shared Secret\n                ↓\n           HKDF-SHA256\n                ↓\n           Session Key\n                ↓\n       Encrypted Communication`,
    details: [
      'Ephemeral key pairs are used for the session handshake.',
      'Both sides derive the same shared secret without sending the private key.',
      'HKDF-SHA256 derives session encryption material from the shared secret.',
      'The resulting session key is kept in memory for the active session.'
    ]
  },
  {
    title: 'Al Sadu — SVG drawing engine',
    description: 'Worked on a 3-minute drawing game with a drag-and-drop SVG canvas where SVG assets could be customized using user-selected colors.',
    tags: ['Flutter', 'SVG', 'Canvas', 'Game', 'Customization'],
    categories: ['Game', 'Offline', 'Architecture'],
    code: `User Input\n    ↓\nSelect SVG element\n    ↓\nApply requested color\n    ↓\nUpdate SVG asset\n    ↓\nRender customized drawing\n    ↓\nSave game state locally`,
    details: [
      'Used SVG asset structure as the basis for drawing customization.',
      'Mapped SVG elements to user-selected colors.',
      'Supported multiple color inputs without requiring a static asset for every combination.',
      'The project was designed around a short 3-minute gameplay flow.'
    ]
  },
  {
    title: 'Al Sadu — offline-first gameplay & sync',
    description: 'The game continued working when connectivity was unavailable. Submitted game data was stored locally and synchronized to the backend when connectivity returned.',
    tags: ['Offline-First', 'WorkManager', 'Local Storage', 'Background Sync'],
    categories: ['Offline', 'Architecture'],
    code: `Game / Form Submit\n        ↓\nInternet available?\n   ↙             ↘\n NO               YES\n ↓                 ↓\nSave locally     Send to API\n ↓                 ↓\nQueue for sync   Database\n ↓\nConnectivity returns\n ↓\nBackground sync\n ↓\nServer database`,
    details: [
      'Local persistence allowed the user flow to continue without an active connection.',
      'The 3-minute game submission could be retained locally.',
      'Background synchronization was handled through WorkManager.',
      'When connectivity returned, pending data could be pushed to the server.'
    ]
  },
  {
    title: 'Niva — incoming-call architecture & CallKit',
    description: 'Worked through multiple approaches for initiating and presenting incoming calls on iOS, moving from background execution approaches toward persistent notification and FCM-driven call initiation.',
    tags: ['Flutter', 'iOS', 'CallKit', 'FCM', 'Push Notifications'],
    categories: ['iOS / Native', 'Real-Time'],
    code: `Server-side call event\n        ↓\nPush / notification trigger\n        ↓\nBackground handling\n        ↓\nCall initiation\n        ↓\nCallKit\n        ↓\nNative incoming-call UI`,
    details: [
      'Implemented the call flow around native iOS CallKit integration.',
      'The implementation evolved through WorkManager/background handling, persistent notification handling and finally FCM-based call initiation.',
      'The goal was to surface an incoming-call flow even when the app was not actively open.',
      'Native iOS behaviour was coordinated with the Flutter layer.'
    ]
  },
  {
    title: 'Network speed testing',
    description: 'Worked on a Flutter network-speed measurement feature using server-side transfer tests and later explored a WebSocket + FastAPI architecture for ping, download and upload measurements.',
    tags: ['Flutter', 'Networking', 'WebSocket', 'FastAPI', 'TCP'],
    categories: ['Networking', 'Backend'],
    code: `Flutter Client\n      ↓\nWebSocket / TCP\n      ↓\nFastAPI Backend\n      ↓\nPing · Download · Upload`,
    details: [
      'The initial implementation explored FTP/TCP based transfer measurements.',
      'Testing involved separate server locations and multiple transfer streams.',
      'The architecture was then evaluated toward WebSocket communication with a FastAPI backend.',
      'The goal was to measure latency and upload/download performance in a controlled application flow.'
    ]
  },
  {
    title: 'Production mobile architecture & performance',
    description: 'Across production Flutter applications, worked with Clean Architecture, BLoC and other state-management approaches, native platform integrations, testing and performance optimization.',
    tags: ['Flutter', 'BLoC', 'Clean Architecture', 'Testing', 'Performance'],
    categories: ['Architecture', 'Performance'],
    code: `UI\n ↓\nPresentation / State\n ↓\nDomain\n ↓\nData / API\n ↓\nPlatform & Services`,
    details: [
      'Used BLoC, Provider, Riverpod and GetX across different codebases.',
      'Worked with REST APIs, Firebase, native Android/iOS integrations and Method Channels.',
      'Implemented unit/widget testing and production debugging workflows.',
      'Resume-documented work includes a 40% memory-usage reduction through advanced state management.'
    ]
  },
  {
    title: 'Qzense — data-driven mobile integration',
    description: 'Worked with the IoT and Data Science team on mobile apps for fruit and fish freshness prediction, including REST API integration and BLoC-based state management.',
    tags: ['Flutter', 'BLoC', 'REST APIs', 'Data Science'],
    categories: ['Backend', 'Architecture', 'Performance'],
    code: `Flutter App\n    ↓\nBLoC State\n    ↓\nREST API\n    ↓\nPrediction Service\n    ↓\nFreshness Result`,
    details: [
      'Integrated REST APIs into the Flutter application.',
      'Used BLoC for state management and performance improvements.',
      'Collaborated with the Data Science team on banana and fish freshness prediction workflows without an IoT dependency.'
    ]
  }
];
