import { differenceInDays, parseISO } from 'date-fns';
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    updateUser: (user: User) => void;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');
        const dateLogged = localStorage.getItem('@GoBarber:date');

        if (dateLogged) {
            const date = parseISO(JSON.parse(dateLogged));

            if (differenceInDays(new Date(Date.now()), date) >= 1) {
                return {} as AuthState;
            }
        }

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;

            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const response = await api.post('/sessions', { email, password });

            const { token, user } = response.data;

            localStorage.setItem('@GoBarber:token', token);
            localStorage.setItem('@GoBarber:user', JSON.stringify(user));
            localStorage.setItem(
                '@GoBarber:date',
                JSON.stringify(new Date(Date.now())),
            );

            api.defaults.headers.authorization = `Bearer ${token}`;

            setData({ token, user });
        },
        [],
    );

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({} as AuthState);
    }, []);

    const updateUser = useCallback(
        (user: User) => {
            localStorage.setItem('@GoBarber:user', JSON.stringify(user));

            setData({
                token: data.token,
                user,
            });
        },

        [setData, data.token],
    );

    return (
        <AuthContext.Provider
            value={{ user: data.user, updateUser, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
