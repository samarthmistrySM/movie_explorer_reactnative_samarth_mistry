import React from 'react';
import AuthProvider from './context/AuthProvider';
import Navigator from './navigation/Navigator';
const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;
