
import "./HomeComponent.css"
import LiveChartComponent from "./LiveChartComponent"
const HomeComponent = () => {
    return (
        <>
            <section className="home">
                <div className="container my-5">
                    <div className="row align-items-center">
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="text-div text-white text-center">
                        <h2>The Pulse of the Crypto World.</h2>
                        <p>Live chats. Live prices. One platform.</p>
                        <p>Connect your wallet and receive airdrop tokens</p>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-start">
                        <div className="image-div">
                        <img src="https://i.ibb.co/1fdhjwLz/airdrop.png" alt="Banner" title="crypto" className="img-fluid"/>
                        </div>
                    </div>
                    </div>
                </div>      
            </section>
            <section className="LiveChartSection">
                <LiveChartComponent  />
            </section>
            
        </>
    )
}
export default HomeComponent