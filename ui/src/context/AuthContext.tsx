import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../services/getUserDetails';
import { AuthContextProps, User } from '../interfaces';
import { useGetUserDetails } from '../utils/useGetUserDetails';


export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken"));
    const [user, setUser] = useState<User | null | undefined>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token);
        } else {
            localStorage.removeItem("accessToken");
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        navigate('/home'); // Navigate to home or other protected routes
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("refreshToken");
        navigate('/login');
    };

        const userQuery = useGetUserDetails();
        useEffect(() => {
            if(userQuery && !userQuery.isLoading){
                console.log(userQuery.isLoading)
                console.log(userQuery.error)
                setUser(userQuery.data)
            }
        }, [userQuery])

        if(userQuery.isLoading){
            return <h1>Loading...</h1>
        }


    

    return (
        <AuthContext.Provider value={{ token, setToken, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};
