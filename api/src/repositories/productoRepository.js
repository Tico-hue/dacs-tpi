const logger = require("../loaders/logger/index");
const sequelize = require("../loaders/db/db");
const { Op } = require("sequelize");
const db = require("../loaders/db/db");

class ProductRepository {
  constructor() {}

  async createProduct(body) {
    try {
      const product = await db.productos.create({
        denominacion: body.deno,
        codigo_ean: body.ean,
        precio_unidad: body.precioU,
        unidad_medida: body.uMedida,
        emp_id: body.emp_id,
      });
      return product;
    } catch (err) {
      throw err;
    }
  }
  async getEmpresaByCuit(cuit) {
    try {
      const empresa = await db.empresas.findAll({
        raw: true,
        where: {
          CUIT: cuit,
        },
      });
      return empresa;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = ProductRepository;

// async allProductsByPeriod(anio, mes, cuit) {
//   let mes2 = 0;
//   if (mes < 10) {
//     mes2 = parseInt(mes) + 1;
//     mes = `0${mes}`;
//     mes2 = `0${mes2}`;
//   } else if (mes >= 10 && mes <= 12) {
//     mes2 = parseInt(mes) + 1;
//     mes = `${mes}`;
//   }

//   try {
//     const response = await db.empresas.findAll({
//       raw: true,
//       // attributes: [
//       //   "id",
//       //   "denominacion",
//       //   "codigo_ean",
//       //   "precio_unidad",
//       //   "unidad_medida",
//       //   "fecha_prod",
//       //   "fecha_vend",
//       // ],

//       where: {
//         CUIT: cuit,
//       },
//       include: [
//         {
//           model: db.productos,

//           where: {
//             [Op.and]: [
//               {
//                 fecha_prod: {
//                   [Op.between]: [
//                     `${anio}-${mes}-01T00:00:00.000Z`,
//                     `${anio}-${mes2}-01T00:00:00.000Z`,
//                   ],
//                 },
//               },
//               {
//                 fecha_vend: {
//                   [Op.between]: [
//                     `${anio}-${mes}-01T00:00:00.000Z`,
//                     `${anio}-${mes2}-01T00:00:00.000Z`,
//                   ],
//                 },
//               },
//             ],
//           },
//         },
//       ],
//     });
//     return response;
//   } catch (err) {
//     throw err;
//   }
// }
