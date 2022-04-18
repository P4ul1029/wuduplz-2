import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthenticatedUserContext = createContext({});

export function AuthenticatedUserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthenticatedUserContext)
}