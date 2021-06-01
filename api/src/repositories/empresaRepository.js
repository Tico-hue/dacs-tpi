const logger = require("../loaders/logger/index");
const sequelize = require("../loaders/db/db");
const db = require("../loaders/db/db");

class empresaRepository {
  constructor() {}

  async getProductsByCuit(cuit) {
    try {
      const response = await db.empresas.findAll({
        raw: true,
        attributes: ["id", "razon_social"],
        where: {
          CUIT: cuit,
        },
        include: [
          {
            model: db.productos,
          },
        ],
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = empresaRepository;

//   async allProductsByPeriod(anio, mes) {
//     let mes2 = 0;
//     if (mes < 10) {
//       mes2 = parseInt(mes) + 1;
//       mes = `0${mes}`;
//       mes2 = `0${mes2}`;
//     } else if (mes >= 10 && mes <= 12) {
//       mes2 = parseInt(mes) + 1;
//       mes = `${mes}`;
//     }

//     try {
//       const response = await sequelize.Producto.findAll({
//         raw: true,
//         attributes: [
//           "id",
//           "denominacion",
//           "codigo_ean",
//           "precio_unidad",
//           "unidad_medida",
//           "fecha_prod",
//           "fecha_vend",
//         ],

//         where: {
//           [Op.and]: [
//             {
//               fecha_prod: {
//                 [Op.between]: [
//                   `${anio}-${mes}-01T00:00:00.000Z`,
//                   `${anio}-${mes2}-01T00:00:00.000Z`,
//                 ],
//               },
//             },
//             {
//               fecha_vend: {
//                 [Op.between]: [
//                   `${anio}-${mes}-01T00:00:00.000Z`,
//                   `${anio}-${mes2}-01T00:00:00.000Z`,
//                 ],
//               },
//             },
//           ],
//         },
//       });
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   }
//   async getPost(id) {
//     try {
//       const response = await sequelize.Post.findByPk(id, {
//         attributes: ["id", "title", "content", "image", "createdAt", "cat_id"],
//       });
//       return response;
//     } catch (err) {
//       throw err;
//     }
//   }
//   async createPost(body) {
//     const post = await sequelize.Post.create({
//       raw: true,
//       title: body.title,
//       content: body.content,
//       image: body.image,
//       cat_id: body.category,
//     });
//     return post;
//   }
// }
