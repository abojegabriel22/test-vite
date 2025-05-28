import { useEffect, useState } from "react";
import "./HeaderComponent.css";
import { useWalletContext } from "../context/wallet.context";
import { connectWallet, disconnectWallet } from "../utils/walletConnect.config";
import { Link } from "react-router-dom";
// import { connectWallet } from "../connectWallet";


const phrases = ["Swap more", "Trade better", "Earn fast"];

const Header = () => {
  const [currentText, setCurrentText] = useState(phrases[0]);
  const [flip, setFlip] = useState(false);
  const [index, setIndex] = useState(0);
  const [walletLoading, setWalletLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        const nextIndex = (index + 1) % phrases.length;
        setCurrentText(phrases[nextIndex]);
        setIndex(nextIndex);
      }, 500);
      setTimeout(() => setFlip(false), 1000);
    }, 2500);

    return () => clearInterval(interval);
  }, [index]);

  const { state, dispatch } = useWalletContext();

  const handleConnect = async() => {
    if (walletLoading) return;
      setWalletLoading(true);
    try {
      await connectWallet(dispatch, state.chain);
    } finally {
      setWalletLoading(false); // stop loading
    }
  };


  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary1 navbar-dark sticky-top">
        <div className="container-fluid">
          <Link to="/cloud-storage" className="navbar-brand">
            <img
              src="https://i.ibb.co/GQPvzds4/IMG-6487.jpg"
              alt="logo"
              width="50"
              height="50"
            />
          </Link>
          <div className="flip-box">
            <h4 className={`airdrop ${flip ? "flip" : ""}`}>{currentText}</h4>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end nav-margin"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cloud-storage" className="nav-link">
                  Spot
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cloud-storage" className="nav-link">
                  Perps
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cloud-storage" className="nav-link">
                  Ape
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cloud-storage" className="nav-link">
                  Onboard
                </Link>
              </li>
              <li className="nav-item dropdown-center hover-dropdown position-relative">
                <button
                  className="btn dropdown-toggle text-dropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Cloud Storage
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-light p-3 dropdown-menu-media"
                  style={{
                    minWidth: '500px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/TqBGZ8xV/download.png" alt="wallet-logo" width={20} height={20} /></span> Trust Wallet</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/G4nrtH4T/metamask.png" alt="wallet-logo" width={20} height={20} /></span> MetaMask</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/FvxNTy5/coinbase.png" alt="wallet-logo" width={20} height={20} /></span> Coinbase Wallet</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/B278RgtX/cryptocom.png" alt="wallet-logo" width={20} height={20} /></span> Crypto.com</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/7dTw9mj0/ledger.jpg" alt="wallet-logo" width={20} height={20} /></span> Ledger</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/YrJPcVW/ellipal.png" alt="wallet-logo" width={20} height={20} /></span> Ellipal Wallet</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/zH4nYD1s/moreno.jpg" alt="wallet-logo" width={20} height={20} /></span> Moreno</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/TD8hnprF/defiwallet.jpg" alt="wallet-logo" width={20} height={20} /></span> Crypto.com | Defi wallet</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/7xDGNzdN/phantom.png" alt="wallet-logo" width={20} height={20} /></span> Phantom</Link></li>
                    </div>
                    <div className="col-md-6">
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/0j6y1g6f/safepal.png" alt="wallet-logo" width={20} height={20} /></span> Safepal</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/mVTpBdgQ/electrum.jpg" alt="wallet-logo" width={20} height={20} /></span> Electrum Wallet</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/Xr4DYZKk/myether.png" alt="wallet-logo" width={20} height={20} /></span> MyEther</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/Z6J93GbD/exodus.jpg" alt="wallet-logo" width={20} height={20} /></span> Exodus</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/Kc574KDt/bestwallet.jpg" alt="wallet-logo" width={20} height={20} /></span> Best Wallet</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/RTJbhsCz/safemoon.png" alt="wallet-logo" width={20} height={20} /></span> Safemoon</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/KcLMBgyB/fortmatic.png" alt="wallet-logo" width={20} height={20} /></span> Fortmatic</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/sJ1myqg3/trezor.png" alt="wallet-logo" width={20} height={20} /></span> Trezor</Link></li>
                      <li><Link to="/cloud-storage" className="dropdown-item nav-link text-dark1"><span className="wallet-logo pe-3"><img src="https://i.ibb.co/VWpZskrZ/wc1.png" alt="wallet-logo" width={20} height={20} /></span> Others</Link></li>
                    </div>
                  </div>
                </ul>
              </li>
              <li className="nav-item dropdown hover-dropdown">
                <button
                  className="btn text-dropdown dropdown-toggle"
                  type="button"
                  id="walletDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {state.address ? (
                    <span className="text-address">{`${state.address.slice(
                      0,
                      6
                    )}...${state.address.slice(-4)}`}</span>
                  ) : (
                    "Connect"
                  )}
                </button>
                {state.address && (
                  <ul>
                    <li>
                      <button
                      className="btn btn-outline-danger w-100 mt-2"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await disconnectWallet(dispatch, state.chain);
                      }}
                    >
                      Disconnect
                    </button>
                    </li>
                  </ul>
                )}

                {state.error && (
                  <div className="text-danger mt-2 small">{state.error}</div>
                )}

                <ul
                  className="dropdown-menu dropdown-menu-end p-3"
                  aria-labelledby="walletDropdown"
                >
                  <li>
                    <select
                      className="form-select mb-2"
                      onChange={(e) =>
                        dispatch({ type: "SET_CHAIN", payload: e.target.value })
                      }
                      value={state.chain}
                
                    >
                      <option value="ethereum">Ethereum</option>
                      <option value="polygon">Polygon</option>
                      <option value="bsc">Binance Smart Chain</option>
                      <option value="arbitrum">Arbitrum</option>
                      <option value="optimism">Optimism</option>
                      <option value="fantom">Fantom</option>
                      <option value="avalanche">Avalanche</option>
                      <option value="base">Base</option>
                      <option value="solana">Solana (Phantom)</option>
                      <option value="ton">TON</option>
                    </select>
                  </li>
                  <li>
                    <button
                      className="btn btn-success w-100"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleConnect();
                      }}
                      disabled = {walletLoading}
                    >
                      {walletLoading ? "Connecting..." : "Connect Wallet"}
                    </button>
                  </li>
                </ul>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
