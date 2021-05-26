module.exports = (sequelize, type) => {
  const Empresa = sequelize.define("Empresa", {
    CUIT: {
      type: type.INTEGER,
      primaryKey: true,
    },
    razon_social: type.STRING,
  });
  Empresa.associate = (models) => {
    Empresa.hasMany(models, {
      foreignKey: "emp_id",
      onDelete: "cascade",
    });
  };
  return Empresa;
};

// const reporteMensual = (cuit,periodo) => {

//   if (getEmpresaByCuit(cuit)){

//   }

// }
