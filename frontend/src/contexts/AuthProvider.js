import React, {
  useState, useCallback, useMemo, useContext, createContext,
} from 'react';

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const savedUserData = JSON.parse(localStorage.getItem('user'));
  const getAuthHeader = useCallback(() => {
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
      getAuthHeader,
    }),
    [signIn, signOut, user, getAuthHeader],
  );

  return (
    <AuthContext.Provider value={providedData}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, useAuth };

export default AuthProvider;
