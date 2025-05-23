import EthereumProvider from "@walletconnect/ethereum-provider";
const URL = import.meta.env.VITE_BACKEND_URL;

export const connectWallet = async (dispatch, chain) => {
  try {
    dispatch({ type: "SET_ERROR", payload: null });

    let walletAddress = null;

    // ---------- EVM CHAINS (via WalletConnect) ----------
    if ([
      "ethereum", "polygon", "bsc", "arbitrum", "optimism", "fantom", "avalanche", "base"
    ].includes(chain)) {
      const chainMap = {
        ethereum: 1,
        polygon: 137,
        bsc: 56,
        arbitrum: 42161,
        optimism: 10,
        fantom: 250,
        avalanche: 43114,
        base: 8453,
      };
       const chainId = chainMap[chain];

      const provider = await EthereumProvider.init({
        projectId: "e98dc29c50d64dfb81ad3a4a009d95ec", // from WalletConnect Cloud
        chains: [chainId],
        optionalChains: [],
        methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
        rpcMap: {
          1: "https://mainnet.infura.io/v3/e98dc29c50d64dfb81ad3a4a009d95ec",
          137: "https://polygon-rpc.com",
          56: "https://bsc-dataseed.binance.org/",
          42161: "https://arb1.arbitrum.io/rpc",
          10: "https://mainnet.optimism.io",
          250: "https://rpc.fantom.network",
          43114: "https://api.avax.network/ext/bc/C/rpc",
          8453: "https://mainnet.base.org",
        },
        showQrModal: true,
      });

        await provider.enable();

        const ethers = await import("ethers");
        const ethProvider = new ethers.BrowserProvider(provider);
        const signer = await ethProvider.getSigner();
        walletAddress = await signer.getAddress();
      }
    

    // ---------- SOLANA (Phantom via mobile deep link) ----------
    else if (chain === "solana") {
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
      const appUrl = encodeURIComponent(window.location.href);

      if (isMobile && (!window.solana || !window.solana.isPhantom)) {
        // Show toast
        const toast = document.createElement("div");
        toast.innerText = "Tap 'Connect' inside Phantom's browser after opening.\nIf not redirected, open Phantom, go to Browser tab, and paste this URL: https://test-vite2.netlify.app/";
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.backgroundColor = "#333";
        toast.style.color = "#fff";
        toast.style.padding = "12px 16px";
        toast.style.borderRadius = "8px";
        toast.style.zIndex = 9999;
        toast.style.textAlign = "center";
        toast.style.maxWidth = "90%";
        toast.style.fontSize = "14px";
        document.body.appendChild(toast);

        setTimeout(() => {
          toast.remove();
          // Redirect to Phantom app deep link
          window.location.href = `https://phantom.app/ul/dapp?app_url=${appUrl}`;
        }, 6000); // Give user 3s to read the toast
        return;
      }

      // For desktop or Phantom in-app browser
      const response = await window.solana.connect();
      walletAddress = response.publicKey.toString();
    }



    // ---------- TON (TonConnect) ----------
    else if (chain === "ton") {
      const { TonConnectUI } = await import("@tonconnect/ui");

      const connector = new TonConnectUI({
        manifestUrl: "https://test-vite2.netlify.app/tonconnect-manifest.json", // <-- Update to real URL
      });

      // Show connection modal
      const connected = await connector.connectWallet();

      if (!connected || !connected.account || !connected.account.address) {
        return dispatch({ type: "SET_ERROR", payload: "TON wallet connection failed or was rejected" });
      }

      walletAddress = connected.account.address;
    }



    // ---------- FALLBACK ----------
    else {
      return dispatch({ type: "SET_ERROR", payload: `Unsupported chain: ${chain}` });
    }

    // ---------- SAVE TO CONTEXT + BACKEND ----------
    dispatch({ type: "SET_ADDRESS", payload: walletAddress });

    console.log("Sending to backend:", {
      address: walletAddress,
      chain,
    });

    const res = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, chain }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Failed to save wallet:", err);
      // dispatch({ type: "SET_ERROR", payload: "Failed to save wallet to backend" });
    }


  } catch (error) {
    console.error("connectWallet error:", error);
    dispatch({
      type: "SET_ERROR",
      payload: error.message || "Wallet connection failed",
    });
  }
};
