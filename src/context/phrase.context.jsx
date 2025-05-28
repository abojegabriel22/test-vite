
import { createContext, useReducer } from "react"
import phrase_reducer from "../reducers/phrase.reducer"

const initialState = {
    phrase: "",
    error: null,
    loading: false
}
export const PhraseContext = createContext(initialState)

export const PhraseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(phrase_reducer, initialState)

    return (
        <PhraseContext.Provider value={{state, dispatch}}>
            {children}
        </PhraseContext.Provider>
    )
}