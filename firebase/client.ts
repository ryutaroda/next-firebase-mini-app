import { initializeApp, getApps } from 'firebase/app';

// 必要な機能をインポート
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  // TODO:認証情報を設置
  apiKey: 'xxx',
  authDomain: 'xxx',
  projectId: 'xxx',
  storageBucket: 'xxx',
  messagingSenderId: 'xxx',
  appId: 'xxx',
  measurementId: 'xxx',
};

if (!getApps()?.length) {
  // Firebaseアプリの初期化
  initializeApp(firebaseConfig);
}

// 他ファイルで使うために機能をエクスポート
export const analytics = getAnalytics();
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
export const funcions = getFunctions();