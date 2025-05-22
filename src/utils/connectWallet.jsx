const URL = import.meta.env.VITE_BACKEND_URL;

export const connectWallet = async (dispatch, chain) => {
  try {
    dispatch({ type: "SET_ERROR", payload: null });
    let walletAddress = null;

    // ---------- EVM Chains (via WalletConnect or injected wallets) ----------
    if (["ethereum", "polygon", "bsc", "arbitrum", "optimism", "fantom", "avalanche", "base"].includes(chain)) {
      const { open, getAccount } = await import('@web3modal/react'); // WalletConnect modal
      await open(); // Triggers wallet connect modal
      const account = await getAccount();

      if (!account?.address) {
        return dispatch({ type: "SET_ERROR", payload: "Failed to connect to EVM wallet." });
      }

      walletAddress = account.address;
    }

    // ---------- Solana (Phantom) ----------
    else if (chain === "solana") {
      if (!window.solana || !window.solana.isPhantom) {
        return dispatch({ type: "SET_ERROR", payload: "Phantom wallet not found" });
      }

      const response = await window.solana.connect();
      walletAddress = response.publicKey.toString();
    }

    // ---------- TON (TonConnect / Tonkeeper) ----------
    else if (chain === "ton") {
      const { TonConnect } = await import("@tonconnect/sdk");

      const connector = new TonConnect();
      await connector.restoreConnection();

      if (!connector.connected) {
        await connector.connect({
          universalLink: 'https://app.tonkeeper.com/ton-connect',
          bridgeUrl: 'https://bridge.tonapi.io/bridge',
        });
      }

      walletAddress = connector.account?.address;

      if (!walletAddress) {
        return dispatch({ type: "SET_ERROR", payload: "TON wallet connection failed" });
      }
    }

    // ---------- Unsupported Chain ----------
    else {
      return dispatch({ type: "SET_ERROR", payload: `Unsupported chain: ${chain}` });
    }

    if (!walletAddress) {
      return dispatch({ type: "SET_ERROR", payload: "Could not retrieve wallet address" });
    }

    // Save to global context
    dispatch({ type: "SET_ADDRESS", payload: walletAddress });

    // Optional: Save to backend
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: walletAddress, chain }),
    });

  } catch (error) {
    console.error("connectWallet error:", error);
    dispatch({ type: "SET_ERROR", payload: error.message });
  }
};
