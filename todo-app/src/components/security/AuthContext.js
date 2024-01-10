import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    function login(username, password) {
        if (username === 'Ashutosh' && password === 'test') {
            setAuthenticated(true);
            return true;
        } else {
            setAuthenticated(false);
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
    }

    const valueToBeShred = { isAuthenticated, login, logout };
    return (
        <AuthContext.Provider value={valueToBeShred}>
            {children}
        </AuthContext.Provider>
    )
}
