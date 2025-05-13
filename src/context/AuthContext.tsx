import {createContext} from 'react';

export interface AuthContextType {
    isLoggedIn : boolean;
    loggedUser: any,
    subscription: string,
    userRole: 'user'| 'supervisor',
    update: any,
    handelLogin: any,
    handelRegister: any,
    handleLogout: any,
    isAuthenticated: any,
}

const defaultValue: AuthContextType = {
    isLoggedIn: false,
    userRole: 'user',
    subscription: '',
    loggedUser: {},
    update: () => {},
    handelLogin: () => {},
    handelRegister: () => {},
    handleLogout: () => {},
    isAuthenticated: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export default AuthContext;
