import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    
    const [colorTheme, setColorTheme]= useState('Light');

    return (
        <DataContext.Provider value={{
            colorTheme, setColorTheme
            }}>
            {children}
        </DataContext.Provider>
    )
} 

export default DataContext;