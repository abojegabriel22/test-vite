
import { createContext, useReducer, useContext } from "react";
import { walletReducer, initialWalletState } from "../reducers/wallet.reducer";

const walletContext = createContext()

export const WalletProvider = ({children}) => {
    const [state, dispatch] = useReducer(walletReducer, initialWalletState)

    return (
        <walletContext.Provider value={{state, dispatch}}>{children}</walletContext.Provider>
    )
}

export const useWalletContext = () => useContext(walletContext)