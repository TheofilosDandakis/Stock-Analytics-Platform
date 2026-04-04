const loadStocksButton = document.getElementById("loadStocksButton");
const stocksContainer = document.getElementById("stocksContainer");

const loadStocks = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/stocks");
        const stocks = await response.json();

        stocksContainer.innerHTML = "";

        stocks.forEach(stock => {
            const stockCard = document.createElement("div");
            stockCard.classList.add("stock-card");

            stockCard.innerHTML = `
                <h3>${stock.symbol}</h3>
                <p>${stock.companyName}</p>
                <p>Price $${stock.price}</p>
                <p>Change $${stock.changePercent}%</p>
                `;
            
            stocksContainer.appendChild(stockCard);
        });
    }
    catch (error) {
        console.error("Error loading stocks", error);
    }
};

loadStocksButton.addEventListener("click", loadStocks);