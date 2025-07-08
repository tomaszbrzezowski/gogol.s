import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { validateMockCredentials, createMockUser, MOCK_ADMIN_CREDENTIALS } from './mockAuth';

// Mock User type to replace Supabase User
export type MockUser = {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
    role: string;
  };
  app_metadata: Record<string, any>;
  aud: string;
  created_at: string;
  updated_at: string;
};

// Session storage keys
const SESSION_KEY = 'admin_session';
const USER_KEY = 'admin_user';

export const signIn = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!validateMockCredentials(email, password)) {
    throw new Error('Invalid credentials');
  }
  
  const user = createMockUser(email);
  
  // Store session in localStorage
  localStorage.setItem(SESSION_KEY, 'true');
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return { user };
};

export const signOut = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Clear session
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = (): MockUser | null => {
  const session = localStorage.getItem(SESSION_KEY);
  const userStr = localStorage.getItem(USER_KEY);
  
  if (!session || !userStr) {
    return null;
  }
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(SESSION_KEY) === 'true';
};

export const useRequireAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      
      if (!currentUser) {
        navigate('/admin');
      }
    };

    checkAuth();

    // Listen for storage changes (in case user logs out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SESSION_KEY || e.key === USER_KEY) {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  return { user };
};