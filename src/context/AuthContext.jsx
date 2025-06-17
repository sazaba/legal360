import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('usuario');

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUsuario(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData, token) => {
        setUsuario(userData);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
