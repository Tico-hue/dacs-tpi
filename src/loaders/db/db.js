const { Sequelize } = require("sequelize");
const empresas = require("../../models/Empresa");
const productos = require("../../models/Producto");
const regimenes = require("../../models/Regimen");
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

const Empresa = empresas(sequelize, Sequelize);
const Producto = productos(sequelize, Sequelize);
const Regimen = regimenes(sequelize, Sequelize);
Regimen.associate(Empresa);
Empresa.associate(Producto);

sequelize.sync({ force: false }).then(() => {
  logger.info("synchronized");
});

module.exports = {
  Empresa,
  Regimen,
  Producto,
};
