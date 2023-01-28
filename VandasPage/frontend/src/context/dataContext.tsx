import React, { ReactElement } from 'react';
import { createContext, useState } from 'react';

type ChildrenType = { children?: ReactElement | ReactElement[] };
type ColorType = "Light" | "Dark"
type DatacontexType = {
  colorTheme:ColorType;
  setColorTheme:(colorTheme: ColorType) => void;
  counter:number;
  setCounter:(counter:number)=>void;
}
const DataContext = createContext<DatacontexType>({
  colorTheme:"Light",
  setColorTheme:(colorTheme:ColorType)=>{},
  counter:0,
  setCounter:(counter:number)=>{}
});

export const DataProvider = ({ children }: ChildrenType): ReactElement => {
    const [colorTheme, setColorTheme] = useState<ColorType>('Light');
    const [counter, setCounter] = useState<number>(0);

  return (
    <DataContext.Provider
      value={{
        colorTheme:colorTheme,
        setColorTheme:setColorTheme,
        counter:counter,
        setCounter:setCounter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
