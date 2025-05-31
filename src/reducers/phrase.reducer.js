
const phrase_reducer = (state, action) => {
    switch(action.type){
        case "SET_PHRASE":
            return {...state, phrase: action.payload}
        case "SAVE_PHRASE":
            return {...state, loading: false, error: null}
        case "SET_SAVE_ERROR":
            return {...state, loading: false, error: action.payload}
        case "SET_LOADING":
            return {...state, loading: true}
        case "SET_WALLET_NAME":
            return {...state, walletName: action.payload.name, walletLogo: action.payload.logo}
        case "GET_PHRASE_SUCCESS":
            return {...state, getphrase: action.payload, loading: false, error: null}
        case "GET_PHRASE_ERROR":
            return {...state, getphrase: action.payload, loading: false, error: action.payload}
        default:
            return state
    }

}
export default phrase_reducer