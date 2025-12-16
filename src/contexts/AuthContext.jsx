import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { getUserRole } from '../utils/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);  // 'user', 'instructor', or 'admin'
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);

  // Function to fetch user role from backend
  const fetchUserRole = async () => {
    setRoleLoading(true);
    try {
      const data = await getUserRole();
      setUserRole(data.role);
    } catch (error) {
      console.error('Failed to fetch user role:', error);
      setUserRole(null);
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // If we have a session, fetch the user's role
      if (session?.user) {
        fetchUserRole();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Fetch role when user signs in, clear when they sign out
      if (session?.user) {
        fetchUserRole();
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUserRole(null);  // Clear role on sign out
  };

  // Helper functions to check roles
  const isAdmin = () => userRole === 'admin';
  const isInstructor = () => userRole === 'instructor' || userRole === 'admin';
  const isUser = () => !!userRole;  // Any authenticated user with a role

  const value = {
    user,
    session,
    userRole,
    signIn,
    signOut,
    loading,
    roleLoading,
    isAdmin,
    isInstructor,
    isUser,
    refetchRole: fetchUserRole,  // In case we need to manually refresh
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};