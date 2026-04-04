const express = require("express");
const router = express.Router();

const stocks = [
         {
            symbol: "AAPL",
            companyName: "Apple Inc.",
            price: 212.45,
            changePercent: 1.2
        },
        {
            symbol: "MSFT",
            companyName: "Microsoft Corp.",
            price: 487.31,
            changePercent: -0.4
        },
        {
            symbol: "NVDA",
            companyName: "NVIDIA Corp.",
            price: 132.88,
            changePercent: 2.6
        }
    ];

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