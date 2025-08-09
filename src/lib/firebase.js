// Basic Firebase initialization (Auth only)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Read from Vite env (define in .env.local)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn('Firebase not configured yet. Admin routes will be unavailable until env vars are set.');
}

export const auth = app ? getAuth(app) : { _unconfigured: true };
