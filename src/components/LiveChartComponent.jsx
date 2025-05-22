
import { useEffect, useReducer } from "react"
import { initialState, liveChartReducer, ACTIONS } from "../reducers/liveChart.reducer";
import { Sparklines, SparklinesLine } from 'react-sparklines';

import "./LiveChart.component.css"

const LiveChartComponent = () => {
    const [state, dispatch] = useReducer(liveChartReducer, initialState)

    useEffect(()=>{
        const fetchMarketData = async () => {
            dispatch({ type: ACTIONS.FETCH_START })
            try{
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d`)

                const data = await response.json()

                

                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
            }catch(error){
                console.error("Error fetching market data:", error);
                dispatch({ type: ACTIONS.FETCH_ERROR });
            }
        }
        fetchMarketData()
        const interval = setInterval(fetchMarketData, 50000) // every 10 seconds to avoid api rate limit
        return () => clearInterval(interval)
    },[])

    const formatCurrency = (num) =>
        num ? `$${num.toLocaleString(undefined, {minimumFractionDigits:2})}` : "-"
    
    return (
        <>
            <section>
                <div className="container liveChartContainer">
                    <div className="livChartHeading">
                        <h1 className="text-center py-5 underline">View Live Chart</h1>
                    </div>
                    <div className="table-responsive liveChart">
                        <table className="table table-hover table-bordered text-center align-middle responsive-text">
                            <thead className="table-light left-align">
                                <tr>
                                <th>#</th>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>24h Volume</th>
                                <th>Market Cap</th>
                                <th>Last 7 Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.initialLoading ? (
                                <tr className="loaderWidth">
                                    <td colSpan="9">Loading...</td>
                                </tr>
                                ) : (
                                state.coins.map((coin, index) => (
                                    <tr key={coin.id}>
                                        <td>{index + 1}</td>
                                        <td className="d-flex align-items-center gap-2">
                                            <img src={coin.image} alt={coin.name} width="25" />
                                            <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                                        </td>
                                        <td>{formatCurrency(coin.current_price)}</td>
                                        <td className={coin.price_change_percentage_1h_in_currency > 0 ? "text-success" : "text-danger"}>
                                            {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                                        </td>
                                        <td className={coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>
                                            {coin.price_change_percentage_24h?.toFixed(2)}%
                                        </td>
                                        <td className={coin.price_change_percentage_7d_in_currency > 0 ? "text-success" : "text-danger"}>
                                            {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                                        </td>
                                        <td>{formatCurrency(coin.total_volume)}</td>
                                        <td>{formatCurrency(coin.market_cap)}</td>
                                        <td>
                                            <Sparklines data={coin.sparkline_in_7d.price} width={100} height={30}>
                                                <SparklinesLine color="blue" />
                                            </Sparklines>
                                        </td>
                                    </tr>
                                ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
export default LiveChartComponent