import PropTypes from "prop-types"
import { useState, useEffect, useCallback, createContext } from 'react';

import API_URL from 'src/config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);

    const login = (userData, authToken, authRefreshToken) => {
        setUser(userData);
        setToken(authToken);
        setRefreshToken(authRefreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        localStorage.setItem('refreshToken', authRefreshToken);
    };

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }, []);

    const refreshAuthToken = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh: refreshToken })
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.access);
                localStorage.setItem('token', data.access);
            } else {
                console.error('Failed to refresh token:', response.status, response.statusText);
                logout();
            }
        } catch (error) {
            console.error('Network error while refreshing token:', error);
            logout();
        }
    }, [refreshToken, logout]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refreshAuthToken();
        }, 15 * 60 * 1000); // Refresh every 15 minutes

        return () => clearInterval(intervalId);
    }, [refreshAuthToken]);

    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = {
        user,
        token,
        login,
        logout,
        refreshAuthToken,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.any
};
