module.exports = (sequelize, type) => {
  const Producto = sequelize.define("products", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    denominacion: type.STRING,
    codigo_ean: { type: type.BIGINT, unique: true },
    precio_unidad: type.DECIMAL(10, 2),
    //TODO entity
    unidad_medida: type.STRING,
  });

  return Producto;
};
