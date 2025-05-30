import { useState, useEffect } from "react";
import { useWalletContext } from "../context/wallet.context";

const tokenList = [
  { symbol: "ETH", address: "0xeeee...", decimals: 18 },
  { symbol: "USDT", address: "0xdac17f...", decimals: 6 },
  { symbol: "DAI", address: "0x6b1754...", decimals: 18 },
  // Add more tokens as needed
];

const SwapComponent = () => {
  const { state } = useWalletContext();
  const [fromToken, setFromToken] = useState(tokenList[0]);
  const [toToken, setToToken] = useState(tokenList[1]);
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    if (!amount || isNaN(amount)) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.1inch.io/v5.0/1/quote?fromTokenAddress=${fromToken.address}&toTokenAddress=${toToken.address}&amount=${amount * 10 ** fromToken.decimals}`
      );
      const data = await res.json();
      setQuote(data.toTokenAmount / 10 ** toToken.decimals);
    } catch (err) {
      console.error("Failed to fetch quote:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!state.address) {
      alert("Please connect your wallet first.");
      return;
    }
    // Trigger swap transaction (either via API or custom smart contract interaction)
    alert("Swap triggered (implement logic)");
  };

  useEffect(() => {
    if (amount) fetchQuote();
  }, [fromToken, toToken, amount]);

  return (
    <section className="home">
        <div className="container my-5">
            <div className="row text-center text-white lh-lg">
                <div className="p-4 max-w-md mx-auto shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Swap</h2>

                    <div className="mb-3">
                        <label className="block font-medium">From</label>
                        <select
                        className="w-full border p-2"
                        value={fromToken.symbol}
                        onChange={(e) =>
                            setFromToken(tokenList.find((t) => t.symbol === e.target.value))
                        }
                        >
                        {tokenList.map((token) => (
                            <option key={token.symbol} value={token.symbol}>
                            {token.symbol}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium">To</label>
                        <select
                        className="w-full border p-2"
                        value={toToken.symbol}
                        onChange={(e) =>
                            setToToken(tokenList.find((t) => t.symbol === e.target.value))
                        }
                        >
                        {tokenList.map((token) => (
                            <option key={token.symbol} value={token.symbol}>
                            {token.symbol}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium">Amount</label>
                        <input
                        className="w-full border p-2"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        />
                    </div>

                    {loading ? (
                        <p>Loading quote...</p>
                    ) : quote ? (
                        <p>
                        Estimated: <strong>{quote} {toToken.symbol}</strong>
                        </p>
                    ) : null}

                    <button
                        className="mt-4"
                        onClick={handleSwap}
                    >
                        Swap
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};

export default SwapComponent;
