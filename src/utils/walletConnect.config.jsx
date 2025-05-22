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
      if (!window.solana || !window.solana.isPhantom) {
        const appUrl = encodeURIComponent(window.location.href);
        window.location.href = `https://phantom.app/ul/dapp?app_url=${appUrl}`;
        return;
      }

      const response = await window.solana.connect();
      walletAddress = response.publicKey.toString();
    }


    // ---------- TON (TonConnect) ----------
    else if (chain === "ton") {
      const { TonConnectUI } = await import("@tonconnect/ui");

      const connector = new TonConnectUI({
        manifestUrl: "https://yourdomain.com/tonconnect-manifest.json", // update this
      });

      await connector.connectWallet();

      const wallet = connector.wallet;
      walletAddress = wallet?.account?.address;

      if (!walletAddress) {
        return dispatch({ type: "SET_ERROR", payload: "TON wallet connection failed" });
      }
    }


    // ---------- FALLBACK ----------
    else {
      return dispatch({ type: "SET_ERROR", payload: `Unsupported chain: ${chain}` });
    }

    // ---------- SAVE TO CONTEXT + BACKEND ----------
    dispatch({ type: "SET_ADDRESS", payload: walletAddress });

    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, chain }),
    });

  } catch (error) {
    console.error("connectWallet error:", error);
    dispatch({
      type: "SET_ERROR",
      payload: error.message || "Wallet connection failed",
    });
  }
};
