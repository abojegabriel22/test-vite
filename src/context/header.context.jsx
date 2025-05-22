
import { createContext, useContext } from "react";

let HeaderContext = createContext()

export const HeaderContextProvider = (props) => {
    let {children} = props

    return (
        <>
            <HeaderContext.Provider value={{}}>{children}</HeaderContext.Provider>
        </>
    )
}

export const useHeaderContext = () => {
    return useContext(HeaderContext)
}
  