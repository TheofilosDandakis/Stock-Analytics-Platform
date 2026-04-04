const express = require("express");
const router = express.Router();

const { getAllStocks, getStockBySymbol } = require("../controllers/stockController");

router.get("/stocks", getAllStocks);
router.get("/stocks/:symbol", getStockBySymbol);

module.exports = router;