import React from "react";
import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    
    const [colorTheme, setColorTheme]= useState('Light');
    const [counter, setCounter]=useState(0);
    return (
        <DataContext.Provider value={{
            colorTheme, setColorTheme, counter, setCounter
            }}>
            {children}
        </DataContext.Provider>
    )
} 

export default DataContext;