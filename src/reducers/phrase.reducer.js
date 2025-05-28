
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
        default:
            return state
    }

}
export default phrase_reducer                                                                                                                                                                                                                                              