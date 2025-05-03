import React from 'react';
import {render, act, waitFor} from '@testing-library/react-native';
import AuthProvider from '../../src/context/AuthProvider';
import AuthContext from '../../src/context/AuthContext';

describe('AuthProvider', () => {

  it('should provide default values', async () => {
    let contextValues;

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {value => {
            contextValues = value;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
    

    await waitFor(() => {
      expect(contextValues).toBeDefined();
      expect(contextValues.isLoggedIn).toBe(false);
      expect(contextValues.loggedUser).toBe(null);
    });
  });

  it('should logout the user', async () => {
    let contextValues;

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {value => {
            contextValues = value;
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await waitFor(async () => {
      await contextValues.handleLogout();
      expect(contextValues.isLoggedIn).toBe(false);
      expect(contextValues.loggedUser).toBe(null);
    });
  });
});
