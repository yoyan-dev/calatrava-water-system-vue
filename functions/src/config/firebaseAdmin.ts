import { initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { getStorage } from 'firebase-admin/storage';

// Singleton: Initialize only once
const app = getApps().length ? getApp() : initializeApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
