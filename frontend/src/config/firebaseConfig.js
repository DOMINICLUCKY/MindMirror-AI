import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyACuOkhA8A5A6vlaYYKmKDUD-n3YxkxXk0',
  authDomain: 'mindmirrorai-cf58c.firebaseapp.com',
  projectId: 'mindmirrorai-cf58c',
  storageBucket: 'mindmirrorai-cf58c.firebasestorage.app',
  messagingSenderId: '465483364762',
  appId: '1:465483364762:web:adf865fb69c15e9c03a223'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Auth and Providers for login buttons
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;
