const stocks = require("../data/mockStocks");

const getAllStocks = (req, res) => {
    res.json(stocks);
};

const getStockBySymbol = (req, res) => {
    const requestedSymbol = req.params.symbol.toUpperCase();

    const stock = stocks.find(
        (stockItem) => stockItem.symbol === requestedSymbol
    );

    if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
    }

    res.json(stock);
};

module.exports = {
    getAllStocks,
    getStockBySymbol
};