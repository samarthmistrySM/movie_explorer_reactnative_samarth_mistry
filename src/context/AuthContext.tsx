import {createContext} from 'react';

export interface AuthContextType {
    isLoggedIn : boolean;
    loggedUser: any,
    userRole: 'user'| 'admin',
    handelLogin: any,
    handelRegister: any,
    handleLogout: any,
    isAuthenticated: any,
}

const defaultValue: AuthContextType = {
    isLoggedIn: false,
    userRole: 'user',
    loggedUser: {},
    handelLogin: () => {},
    handelRegister: () => {},
    handleLogout: () => {},
    isAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export default AuthContext;
