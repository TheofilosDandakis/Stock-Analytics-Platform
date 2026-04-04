const express = require("express");
const router = express.Router();

router.get("/stocks", (req, res) => {
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

    res.json(stocks);
});

module.exports = router;