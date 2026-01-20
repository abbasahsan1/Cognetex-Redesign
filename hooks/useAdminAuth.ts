import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth, firebaseEnabled } from '../lib/firebase';

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      setError('Firebase is not configured.');
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (password: string) => {
    if (!firebaseEnabled || !auth) {
      setError('Firebase is not configured.');
      return;
    }
    if (!adminEmail) {
      setError('Missing admin email configuration.');
      return;
    }
    setError(null);
    await signInWithEmailAndPassword(auth, adminEmail, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, isLoading, error, login, logout };
};
