import express from "express";
import axios from "axios";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.COINAPI_KEY;

// Create a reusable fetcher
async function fetchCandles(interval, limit) {
  try {
    const response = await axios.get(
      `https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest`,
      {
        params: { period_id: interval, limit },
        headers: { "X-CoinAPI-Key": API_KEY },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching candles:", err.message);
    throw err;
  }
}

// ✅ Last 20 candles (15m each)
app.get("/api/candles/15m", async (req, res) => {
  try {
    const data = await fetchCandles("15MIN", 20);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch 15m candles" });
  }
});

// ✅ Last 12 candles (5m each → last 1 hour)
app.get("/api/candles/5m", async (req, res) => {
  try {
    const data = await fetchCandles("5MIN", 12);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch 5m candles" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
