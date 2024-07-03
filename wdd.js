document.addEventListener('DOMContentLoaded', () => {
    const iexCloudApiKey = 'pk_27432f212c6d4d4e8e4f9778586f3565';
    const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'NVDA'];

    function fetchStockPrice(symbol) {
        fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${iexCloudApiKey}`)
            .then(response => response.json())
            .then(data => {
                const stockContainer = document.getElementById('stockList');
                const stockInfo = document.createElement('div');
                stockInfo.classList.add('stock-container');
                stockInfo.innerHTML = `
                    <div class="stock-info">
                        <span>${symbol}</span>
                        <span>${data.latestPrice}</span>
                    </div>
                `;
                stockContainer.appendChild(stockInfo);
            })
            .catch(error => console.error('Error fetching stock data:', error));
    }

    stockSymbols.forEach(symbol => {
        fetchStockPrice(symbol);
        setInterval(() => fetchStockPrice(symbol), 5000); // Fetch every 5 seconds for real-time effect
    });
});