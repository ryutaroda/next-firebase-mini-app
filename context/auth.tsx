import { auth, db } from '@/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';

// コンテクスト用の型を定義
type UserContextType = User | null | undefined;

// コンテクストを作成
const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 配布したいデータの定義
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    // ログイン状態を監視し、変化があったら発動
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const ref = doc(db, `users/${firebaseUser.uid}`);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          // ユーザーデータを取得して格納
          const appUser = snap.data() as User;
          setUser(appUser);
        } else {
          // ユーザーが未作成の場合、新規作成して格納
          const appUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName!,
            photoURL: firebaseUser.photoURL!,
            email: firebaseUser.email!,
            createdAt: Date.now(),
          }

          // FireStoreにユーザーデータを保存
          setDoc(ref, appUser).then(() => {
            // 保存に成功したらコンテクストにユーザーデータを格納
            setUser(appUser);
          });
        }
      } else {
        // ログインしていない場合、ユーザーデータを空にする
        setUser(null);
      }

      // コンポーネントが不要になったら監視を終了する
      return undefined;
    });
  }, []);

  // プロバイダーを作成し、配布データを格納する
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);