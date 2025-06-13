import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  /*useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);*/

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password })
      const { token, user } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(user)
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);

      setIsLoading(true)
      const res = await axios.post("http://localhost:5000/api/auth/register", { email, password, name })
      const { token, user } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(user)
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed")
    } finally {
      setIsLoading(false)
    }
  };

 const logout = async () => {
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    delete axios.defaults.headers.common["Authorization"]
    navigate("/login")
  }
  

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};