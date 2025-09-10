import axios from "axios";

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.COINAPI_KEY;

    const url = "https://rest.coinapi.io/v1/ohlcv/BINANCE_SPOT_BTC_USDT/latest";
    const response = await axios.get(url, {
      headers: { "X-CoinAPI-Key": API_KEY },
      params: {
        period_id: "5MIN",
        limit: 12, // last 1 hour
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
