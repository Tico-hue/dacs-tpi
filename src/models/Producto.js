module.exports = (sequelize, type) => {
  const Producto = sequelize.define("products", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    denominacion: type.STRING,
    codigo_ean: type.INTEGER,
    precio_unidad: type.DECIMAL(10, 2),
    unidad_medida: type.STRING,
    fecha_prod: type.DATE,
    fecha_vend: type.DATE,
  });

  return Producto;
};
