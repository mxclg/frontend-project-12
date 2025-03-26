import {
  createContext, useState, useEffect, useMemo,
} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('userId'));
      if (user && user.token) {
        setLoggedIn(true);
      } else {
        localStorage.removeItem('userId');
        setLoggedIn(false);
      }
    } catch {
      localStorage.removeItem('userId');
      setLoggedIn(false);
    }
  }, []);

  const logIn = (userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
