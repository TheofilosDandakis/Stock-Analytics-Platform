const express = require("express");
const router = express.Router();

const stocks = require("../data/mockStocks");

router.get("/stocks", (req, res) => {
    res.json(stocks);
});

router.get("/stocks/:symbol", (req, res) => {
    const requestedSymbol = req.params.symbol.toUpperCase();

    const stock = stocks.find(
        (stockItem) => stockItem.symbol === requestedSymbol
    );

    if (!stock) {
        return res.status(404).json({ message: "Stock not found" });
    }

    res.json(stock);
});

module.exports = router;