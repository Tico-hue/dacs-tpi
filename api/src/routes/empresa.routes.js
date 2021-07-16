const { Router } = require("express");
const { getProductsByCuit, regimen, createEmpresa } = require("../controllers/empresa.controllers");
const router = Router();
router.get("/:cuit", getProductsByCuit);
// router.post("/", regimen);
router.post("/", createEmpresa);

module.exports = router;
