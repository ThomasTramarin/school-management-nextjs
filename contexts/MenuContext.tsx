"use client";
import { createContext, useState, ReactNode, useContext, SetStateAction, Dispatch } from "react";

export const MenuContext = createContext<Props | undefined>(undefined);

type Props = {menuOpen: boolean, setMenuOpen: Dispatch<SetStateAction<boolean>>};

export const MenuProvider = ({children}: {children: ReactNode}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <MenuContext.Provider value={{menuOpen, setMenuOpen}}>
            {children}
        </MenuContext.Provider>
    );
}

export function useMenuContext(){
    const context = useContext(MenuContext);
    if(context === undefined){
      throw new Error("Use context not found")
    }
    return context;
}