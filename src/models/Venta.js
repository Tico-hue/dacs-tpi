module.exports = (sequelize, type) => {
  const Venta = sequelize.define("Venta", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    anio: type.STRING,
    mes: type.STRING,
    cantidad_vend: type.INTEGER,
    cantidad_prod: type.INTEGER,
  });
  Venta.associate = (models) => {
    Venta.belongsTo(models, {
      foreignKey: "emp_id",
      onDelete: "cascade",
    });
  };
  return Venta;
};

// const reporteMensual = (cuit,periodo) => {

//   if (getEmpresaByCuit(cuit)){

//   }

// }
