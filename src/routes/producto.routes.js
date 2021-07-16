const { Router } = require("express");
const { createProduct } = require("../controllers/producto.controllers");
const router = Router();
router.post("/", createProduct);

module.exports = router;
