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
            console.log(enable)
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

    const userQuery = useGetUserDetails(enable);
    useEffect(() => {
        if(userQuery){
            setUser(userQuery.data?.decoded) 
            console.log(user)
        }
        if(userQuery && userQuery.data?.expired === true){
            logout()
        }
    }, [userQuery])

    if(token && userQuery.isLoading){
        return <h1>Loading...</h1>
    }

    return (
        <AuthContext.Provider value={{ token, setToken, login, logout, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
