import React, { ReactElement } from 'react';
import { createContext, useState } from 'react';
import { LevelType } from '../model/LevelType';
type ChildrenType = { children?: ReactElement | ReactElement[] };

type AuthType = {
  user: string;
  admin: boolean|null;
  id: number;
  levels: LevelType[];
};

type AuthContextType = {
  auth: AuthType;
  setAuth: (auth: AuthType) => void;
};

const AuthContext = createContext<AuthContextType>({
  auth: {
    user: '',
    admin: null,
    id: -1,
    levels: [],
  },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: ChildrenType) => {
  const [auth, setAuth] = useState<AuthType>({
    user: '',
    admin: null,
    id: -1,
    levels: [],
  });

  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
