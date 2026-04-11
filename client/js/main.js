const searchInput = document.getElementById("searchInput");
const stocksContainer = document.getElementById("stocksContainer");
const sortSelect = document.getElementById("sortSelect");

let allStocks = [];

const renderStocks = (stocks) => {
    stocksContainer.innerHTML = "";

    if (stocks.length === 0){
        stocksContainer.innerHTML = "<p>No stocks found</p>";
        return
    }

    stocks.forEach(stock => {
        const stockCard = document.createElement("div");
        stockCard.classList.add("stock-card");

        stockCard.innerHTML = `
            <h3>${stock.symbol}</h3>
            <p>${stock.companyName}</p>
            <p>Price $${stock.price}</p>
            <p style="color:${stock.changePercent >= 0 ? '#16a34a' : '#dc2626'}">
            Change ${stock.changePercent >= 0 ? '▲' : '▼'} ${Math.abs(stock.changePercent)}%
            </p>
        `;

        stocksContainer.appendChild(stockCard);
    });
}

const applyFiltersAndSort = () => {
    const searchValue = searchInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    let filteredStocks = allStocks.filter(
        (stock) =>
            stock.symbol.toLowerCase().includes(searchValue) || stock.companyName.toLowerCase().includes(searchValue)
    );

    if (sortValue ==="best") {
        filteredStocks.sort((a, b) => b.changePercent - a.changePercent);}
    else if (sortValue === "worst") {
        filteredStocks.sort((a, b) => a.changePercent - b.changePercent);}
    else if (sortValue === "priceHigh") {
        filteredStocks.sort((a, b) => b.price - a.price);}

    renderStocks(filteredStocks);
};


const loadStocks = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/stocks");
        const stocks = await response.json();
        
        allStocks = stocks;
        applyFiltersAndSort();
    }
    catch (error) {
        console.error("Error loading stocks", error);
    }
};

searchInput.addEventListener("input", applyFiltersAndSort);
sortSelect.addEventListener("change", applyFiltersAndSort);

loadStocks();