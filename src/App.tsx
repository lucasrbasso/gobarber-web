import React from 'react';

import GlobalStyles from './styles/global';

// import SignUp from './pages/SignUp';

import { AuthProvider } from './hooks/AuthContext';

import SignIn from './pages/SignIn';

const App: React.FC = () => {
    return (
        <>
            <AuthProvider>
                <SignIn />
            </AuthProvider>
            <GlobalStyles />
        </>
    );
};

export default App;
