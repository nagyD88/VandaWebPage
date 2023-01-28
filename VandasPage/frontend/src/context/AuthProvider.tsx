import React, { ReactElement } from 'react';
import { createContext, useState } from 'react';
import {Level} from '../model/Level'
type ChildrenType = { children?: ReactElement | ReactElement[] };
type AuthType={
  user: string, 
  admin: boolean, 
  id: number, 
  levels: Level[]
}|null;


type AuthContextType ={
  auth: AuthType;
  setAuth:(auth: AuthType) => void;}

const AuthContext = createContext<AuthContextType>({
  auth:{
    user:"", 
    admin:false, 
    id:-1, 
    levels:[]
  },
  setAuth:()=>{}
});

export const AuthProvider = ({ children }:ChildrenType) => {
  const [auth, setAuth] = useState<AuthType>(null);

  return (
    <AuthContext.Provider value={{ auth:auth, setAuth:setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
