import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_BASE_URL } from '../environment';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check cookie for existing token
        const token = Cookies.get('token');
        if (token) {
            const storedUser = localStorage.getItem('user_data');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });

            // Backend returns a flat object: { _id, name, email, role, token }
            const { token, ...userData } = response.data;

            // Save token in cookie
            Cookies.set('token', token, { expires: 7 });

            // Save user data
            localStorage.setItem('user_data', JSON.stringify(userData));

            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            // Handle cases where response might be undefined if network error
            const message = error.response?.data?.message || error.message || 'Login failed';
            return {
                success: false,
                message: message
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password });

            // Backend returns { _id, name, email, token }
            const { token, ...userData } = response.data;

            // Save token and user data
            Cookies.set('token', token, { expires: 7 });
            localStorage.setItem('user_data', JSON.stringify(userData));

            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error("Registration failed", error);
            const message = error.response?.data?.message || error.message || 'Registration failed';
            return {
                success: false,
                message: message
            };
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('token');
        localStorage.removeItem('user_data');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
