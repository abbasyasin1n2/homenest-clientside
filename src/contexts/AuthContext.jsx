import { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import '../firebase/firebase.init';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Register new user
  const registerUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Generate a default avatar using UI Avatars if no photo provided
      const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=200&bold=true`;
      
      // Update profile with name and photo
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || defaultAvatar
      });
      
      // Reload user to get updated profile
      await result.user.reload();
      
      // Update local user state immediately
      setUser(auth.currentUser);
      
      // Get and store Firebase token
      const token = await result.user.getIdToken();
      localStorage.setItem('firebaseToken', token);
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Get and store Firebase token
      const token = await result.user.getIdToken();
      localStorage.setItem('firebaseToken', token);
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Update local user state immediately
      setUser(result.user);
      
      // Get and store Firebase token
      const token = await result.user.getIdToken();
      localStorage.setItem('firebaseToken', token);
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('firebaseToken');
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Debug: Log user photo URL
      if (currentUser) {
        console.log('User logged in:', {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        });
        
        const token = await currentUser.getIdToken();
        localStorage.setItem('firebaseToken', token);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

