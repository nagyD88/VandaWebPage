import React, { ReactElement } from 'react';
import { createContext, useState } from 'react';

type ChildrenType = { children?: ReactElement | ReactElement[] };
type ColorType = "Light" | "Dark"
type DatacontexType = {
  colorTheme:ColorType;
  setColorTheme:(colorTheme: ColorType) => void;
}

const DataContext = createContext<DatacontexType>({
  colorTheme:"Light",
  setColorTheme:(colorTheme:ColorType)=>{},
});

export const DataProvider = ({ children }: ChildrenType): ReactElement => {
    const [colorTheme, setColorTheme] = useState<ColorType>('Light');
    

  return (
    <DataContext.Provider
      value={{
        colorTheme:colorTheme,
        setColorTheme:setColorTheme
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
