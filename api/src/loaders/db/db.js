const { Sequelize } = require("sequelize");
const empresas = require("../../models/Empresa");
const productos = require("../../models/Producto");
const regimenes = require("../../models/Venta");
const config = require("../../config");
const logger = require("../logger");

const sequelize = new Sequelize("dacs_tpi", "root", "rootroot", {
  host: config.host,
  dialect: "mysql",
  dialectOptions: { decimalNumbers: true },
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established");
  })
  .catch((err) => {
    logger.error("Unable to connecto to db");
  });
var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Empresa = empresas(sequelize, Sequelize);
const Producto = productos(sequelize, Sequelize);
const Regimen = regimenes(sequelize, Sequelize);
db = { ...db, empresas: Empresa, productos: Producto, regimenes: Regimen };
Regimen.associate(Empresa);
Empresa.associate(Producto);

sequelize.sync({ force: false }).then(() => {
  logger.info("synchronized");
});

module.exports = db;
