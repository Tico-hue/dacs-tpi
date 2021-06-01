const { Router } = require("express");
const { getProductsByCuit, regimen } = require("../controllers/empresa.controllers");
const router = Router();
router.get("/:cuit", getProductsByCuit);
// router.post("/", regimen);

module.exports = router;
