import { useEffect, useState } from "react";
import "./HeaderComponent.css";
import { useWalletContext } from "../context/wallet.context";
import { connectWallet } from "../utils/walletConnect.config";
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
          <a className="navbar-brand" href="/">
            <img
              src="https://i.ibb.co/GQPvzds4/IMG-6487.jpg"
              alt="logo"
              width="50"
              height="50"
            />
          </a>
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Spot
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Perps
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Ape
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Onboard
                </a>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
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
                <small className="text-muted">Select wallet chain</small>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
