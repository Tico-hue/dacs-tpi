module.exports = (sequelize, type) => {
  const Regimen = sequelize.define("Regimen", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    anio: type.STRING,
    mes: type.STRING,
    day_limit: type.INTEGER,
  });
  Regimen.associate = (models) => {
    Regimen.belongsTo(models, {
      foreignKey: "emp_id",
      onDelete: "cascade",
    });
  };
  return Regimen;
};

// const reporteMensual = (cuit,periodo) => {

//   if (getEmpresaByCuit(cuit)){

//   }

// }
