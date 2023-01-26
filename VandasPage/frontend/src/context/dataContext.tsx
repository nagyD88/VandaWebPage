import React, { ReactElement } from 'react';
import { createContext, useState } from 'react';

type ChildrenType = { children?: ReactElement | ReactElement[] };
type ColorTheme = "Light" | "Dark"
const [colorTheme, setColorTheme] = useState<ColorTheme>('Light');
const [counter, setCounter] = useState<number>(0);
const DataContext = createContext({colorTheme, setColorTheme, counter, setCounter});


export const DataProvider = ({ children }: ChildrenType): ReactElement => {


  return (
    <DataContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        counter,
        setCounter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
