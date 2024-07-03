// backend.js

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

const iexCloudApiKey = 'pk_27432f212c6d4d4e8e4f9778586f3565';
const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'NVDA'];

function fetchStockPrice(symbol) {
    return fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${iexCloudApiKey}`)
        .then(response => response.json())
        .then(data => {
            return {
                symbol: symbol,
                price: data.latestPrice
            };
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            return {
                symbol: symbol,
                price: 'N/A'
            };
        });
}

app.get('/stockPrices', async (req, res) => {
    try {
        const stockPrices = await Promise.all(stockSymbols.map(symbol => fetchStockPrice(symbol)));
        res.json(stockPrices);
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



