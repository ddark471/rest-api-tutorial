import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../services/getUserDetails';
import { AuthContextProps, User, userDetails } from '../interfaces';
import { useGetUserDetails } from '../utils/useGetUserDetails';

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null | undefined>(null);
    const [enable, setEnable] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
    
        if (accessToken && refreshToken) {
          // Optional: Add token validation logic here (e.g., check expiration)
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token);
            setIsAuthenticated(true)
            setEnable(true)
        }
    }, [token]);
    
    const login = (newToken: string) => {
        setToken(newToken);
        setIsAuthenticated(true)
        navigate('/'); // Navigate to home or other protected routes
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate('/login');
        setIsAuthenticated(false)
    };
    const shouldFetchUser = Boolean(isAuthenticated && token && !user);
    const userQuery = useGetUserDetails(shouldFetchUser);
    useEffect(() => {
        if (userQuery && userQuery.data) {
            const { decoded, valid } = userQuery.data;
            if (valid === false || decoded === null) {
              logout();
            } else {
              setUser(decoded);
            }
          }
    }, [userQuery])

    if(shouldFetchUser && userQuery.isLoading){
        return <h1>Loading...</h1>
    }

    return (
        <AuthContext.Provider value={{ token, setToken, login, logout, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
