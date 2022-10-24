import React, {
  useState, useCallback, useMemo, useContext, createContext,
} from 'react';

const AuthnContext = createContext({});
const useAuthn = () => useContext(AuthnContext);

const AuthnProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('user'));
  const getAuthnHeader = useCallback(() => {
    const userId = savedUserData;
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }

    return {};
  }, [savedUserData]);

  const [user, setUser] = useState(
    savedUserData ? { username: savedUserData.username } : null,
  );
  const signIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const providedData = useMemo(
    () => ({
      signIn,
      signOut,
      user,
      getAuthnHeader,
    }),
    [signIn, signOut, user, getAuthnHeader],
  );

  return (
    <AuthnContext.Provider value={providedData}>{children}</AuthnContext.Provider>
  );
};

export { AuthnContext, useAuthn };

export default AuthnProvider;
