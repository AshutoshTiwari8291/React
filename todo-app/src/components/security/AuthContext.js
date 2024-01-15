import { createContext, useContext, useState } from "react";
import { executeJWTAuthenticationService } from "../todo/api/AuthenticationApiService";
import { apiClient } from "../todo/api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setusername] = useState(null);
    const [token, setToken] = useState(null);
    // function login(username, password) {
    //     if (username === 'Ashutosh' && password === 'test') {
    //         setAuthenticated(true);
    //         setusername('Ashutosh')
    //         return true;
    //     } else { 
    //         setAuthenticated(false);
    //         setusername(null)
    //         return false;
    //     }
    // }

    async function login(username, password) {
        // const baToken = 'Basic ' + window.btoa(username + ":" + password)
        try {
            const response = await executeJWTAuthenticationService(username,password);
            if (response.status == 200) {
                const jwtToken = 'Bearer '+ response.data.token;
                setAuthenticated(true);
                setusername(username)
                setToken( jwtToken);
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken;
                        return config;
                    }
                )
                return true;
            } else {
                logout();
                return false;
            }

        } catch (error) {
            logout();
            return false;
        }

    }

    function logout() {
        setAuthenticated(false);
        setusername(null)
        setToken(null);
    }

    const valueToBeShred = { isAuthenticated, login, logout, username, token };
    return (
        <AuthContext.Provider value={valueToBeShred}>
            {children}
        </AuthContext.Provider>
    )
}
