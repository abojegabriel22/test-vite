
export const initialWalletState = {
    address: null,
    chain: "ethereum", // default chain
    error: null,
    dropdownVisible: false,
}

export const walletReducer = (state, action) => {
    switch(action.type){
        case "SET_ADDRESS":
            return {...state, address: action.payload, error: null}
        case "SET_CHAIN":
            return {...state, chain: action.payload}
        case "TOGGLE_DROPDOWN":
            return { ...state, dropdownVisible: !state.dropdownVisible };
        case "SET_ERROR":
            return {...state, error: action.payload}
            default:
                return state
    }
}