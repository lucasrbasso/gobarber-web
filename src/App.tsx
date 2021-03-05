import React from 'react';

import GlobalStyles from './styles/global';

// import SignUp from './pages/SignUp';

import AppProvider from './hooks';

import SignIn from './pages/SignIn';

const App: React.FC = () => {
    return (
        <>
            <AppProvider>
                <SignIn />
            </AppProvider>

            <GlobalStyles />
        </>
    );
};

export default App;
