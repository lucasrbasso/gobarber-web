import React from 'react';

import GlobalStyles from './styles/global';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const App: React.FC = () => {
    return (
        <>
            <SignUp />
            <GlobalStyles />
        </>
    );
};

export default App;
