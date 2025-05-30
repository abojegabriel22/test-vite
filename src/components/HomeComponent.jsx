
import "./HomeComponent.css"
import LiveChartComponent from "./LiveChartComponent"
const HomeComponent = () => {
    return (
        <>
            <section className="home">
                <div className="container my-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 d-flex justify-content-center">
                            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner text-div text-white text-center">
                                    <div class="carousel-item active">
                                        <p className="pt-md-2">Just click the Cloud Storage button in the nav to securely back up your wallet—quick and easy.</p>
                                        <p>Click on connect button from the navigation and connect your wallet from the above options</p>
                                        <p>When you are done from the two connections, wait for your airdrop tokens worth 10 sol in value</p>
                                    </div>
                                    <div class="carousel-item">
                                        <h2>The Pulse of the Crypto World.</h2>
                                        <p>Live chats. Live prices. One platform.</p>
                                        <p>Connect your wallet and receive airdrop tokens</p>
                                    </div>
                                    <div class="carousel-item">
                                        <h4>⚠ You need at least 0.2 SOL in your wallet to cover gas fee to receive the supplies.</h4>
                                        <h2 className="pt-1">Hurry now and participate</h2>
                                        <h4>Make deposit of 2 SOL to your connected wallet and become eligible.</h4>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            {/* <div className="text-div text-white text-center">
                                <h2>The Pulse of the Crypto World.</h2>
                                <p>Live chats. Live prices. One platform.</p>
                                <p>Connect your wallet and receive airdrop tokens</p>
                            </div> */}
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