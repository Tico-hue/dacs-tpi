const logger = require("../loaders/logger/index");
const sequelize = require("../loaders/db/db");

class ProductRepository {
  constructor() {}

  async allProductsByPeriod() {
    try {
      const response = await sequelize.Producto.findAll({
        attributes: [
          "id",
          "denominacion",
          "codigo_ean",
          "precio_unidad",
          "unidad_medida",
          "fecha_prod",
          "fecha_vend",
        ],
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
  async getPost(id) {
    try {
      const response = await sequelize.Post.findByPk(id, {
        attributes: ["id", "title", "content", "image", "createdAt", "cat_id"],
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
  async createPost(body) {
    const post = await sequelize.Post.create({
      raw: true,
      title: body.title,
      content: body.content,
      image: body.image,
      cat_id: body.category,
    });
    return post;
  }
}
module.exports = ProductRepository;
