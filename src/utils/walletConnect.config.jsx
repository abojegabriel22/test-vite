import EthereumProvider from "@walletconnect/ethereum-provider";

const URL = import.meta.env.VITE_BACKEND_URL;

export const connectWallet = async (dispatch, chain) => {
  try {
    dispatch({ type: "SET_ERROR", payload: null });

    let walletAddress = null;

    // ---------- EVM CHAINS (via WalletConnect) ----------
    if (
      [
        "ethereum",
        "polygon",
        "bsc",
        "arbitrum",
        "optimism",
        "fantom",
        "avalanche",
        "base",
      ].includes(chain)
    ) {
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
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

      if (!window.evmProvider) {
        window.evmProvider = await EthereumProvider.init({
          projectId: "edc965db046d9ccd493ca31544001628",
          chains: [chainId],
          optionalChains: [],
          methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
          rpcMap: {
            1: "https://mainnet.infura.io/v3/edc965db046d9ccd493ca31544001628",
            137: "https://polygon-rpc.com",
            56: "https://bsc-dataseed.binance.org/",
            42161: "https://arb1.arbitrum.io/rpc",
            10: "https://mainnet.optimism.io",
            250: "https://rpc.fantom.network",
            43114: "https://api.avax.network/ext/bc/C/rpc",
            8453: "https://mainnet.base.org",
          },
          showQrModal: !isMobile,
        });

        window.evmProvider.on("display_uri", (uri) => {
          if (isMobile) {
            const toast = document.createElement("div");
            toast.innerText =
              "Opening your wallet... If not redirected, open Trust Wallet or MetaMask manually.";
            toast.style.position = "fixed";
            toast.style.bottom = "20px";
            toast.style.left = "50%";
            toast.style.transform = "translateX(-50%)";
            toast.style.backgroundColor = "#222";
            toast.style.color = "#fff";
            toast.style.padding = "10px 15px";
            toast.style.borderRadius = "8px";
            toast.style.zIndex = 9999;
            toast.style.fontSize = "14px";
            document.body.appendChild(toast);

            setTimeout(() => {
              toast.remove();
              const trustWallet = `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
              window.location.href = trustWallet;
            }, 2500);
          }
        });
      }

      const provider = window.evmProvider;

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
          window.location.href = `https://phantom.app/ul/dapp?app_url=${appUrl}`;
        }, 6000);
        return;
      }

      const response = await window.solana.connect();
      walletAddress = response.publicKey.toString();
    }

    // ---------- TON (TonConnect) ----------
    else if (chain === "ton") {
      const { TonConnectUI } = await import("@tonconnect/ui");
      const { Address } = await import("ton-core");

      const connector = new TonConnectUI({
        manifestUrl: "https://test-vite2.netlify.app/tonconnect-manifest.json",
      });

      const connected = await connector.connectWallet();

      if (!connected || !connected.account || !connected.account.address) {
        dispatch({
          type: "SET_ERROR",
          payload: "TON wallet connection failed or was rejected",
        });
        showErrorToast("TON wallet connection failed or was rejected");
        return;
      }

      const rawAddress = connected.account.address;
      const friendlyAddress = Address.parse(rawAddress).toString({
        bounceable: true,
        urlSafe: true,
      });

      walletAddress = friendlyAddress;
    }

    // ---------- FALLBACK ----------
    else {
      dispatch({ type: "SET_ERROR", payload: `Unsupported chain: ${chain}` });
      showErrorToast(`Unsupported chain: ${chain}`);
      return;
    }

    // ---------- SAVE TO CONTEXT + BACKEND ----------
    dispatch({ type: "SET_ADDRESS", payload: walletAddress });

    const res = await fetch(`${URL}/api/wallets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, chain }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Failed to save wallet:", err);
      showErrorToast("fetch error");
    }
  } catch (error) {
    console.error("connectWallet error:", error);
    dispatch({
      type: "SET_ERROR",
      payload: error.message || "Wallet connection failed",
    });
    showErrorToast(error.message || "Wallet connection failed");
  }
};

// ---------- Reusable Toast for Errors ----------
function showErrorToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.backgroundColor = "#d9534f";
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
  }, 8000);
}

export const disconnectWallet = async (dispatch, chain) => {
  try {
    // Disconnect WalletConnect (EVM)
    if (
      [
        "ethereum", "polygon", "bsc", "arbitrum", "optimism",
        "fantom", "avalanche", "base"
      ].includes(chain)
    ) {
      if (window.evmProvider) {
        await window.evmProvider.disconnect();
        window.evmProvider = null;
      }

    }

    // Disconnect Phantom (Solana)
    if (chain === "solana" && window.solana?.isConnected) {
      window.solana.disconnect();
    }

    // Disconnect TON
    if (chain === "ton") {
      const { TonConnectUI } = await import("@tonconnect/ui");
      const connector = new TonConnectUI({
        manifestUrl: `${window.location.origin}/tonconnect-manifest.json`,
      });
      await connector.disconnect();
    }

    // Reset global state
    dispatch({ type: "DISCONNECT" });
  } catch (err) {
    console.error("Disconnect error:", err);
    dispatch({ type: "SET_ERROR", payload: "Failed to disconnect wallet" });
  }
};
