import {createContext} from 'react';

export interface AuthContextType {
    isLoggedIn : boolean;
    loggedUser: any,
    handelLogin: any,
    handelRegister: any,
    handleLogout: any,
    isAuthenticated: any,
}

const defaultValue: AuthContextType = {
    isLoggedIn: false,
    loggedUser: {},
    handelLogin: () => {},
    handelRegister: () => {},
    handleLogout: () => {},
    isAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export default AuthContext;
