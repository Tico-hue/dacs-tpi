const { Router } = require("express");
const { getProductsByPeriod } = require("../controllers/producto.controllers");
const router = Router();
router.get("/:anio/:mes", getProductsByPeriod);

module.exports = router;
