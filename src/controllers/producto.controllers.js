const express = require("express");
const ProductoRepository = require("../repositories/productoRepository");
const repository = new ProductoRepository();
const sequelize = require("../loaders/db/db");
const logger = require("winston");

const getAllProducts = async (req = Request, res = Response) => {
  return await repository.allProductos();
};

const getProductsByPeriod = async (req = Request, res = Response) => {
  try {
    const products = await repository.allProductsByPeriod();
    const mes = console.log(products[0].dataValues);
    // const filteredP = products.filter((p)=>p.fecha_prod)
    return products;
  } catch (err) {
    throw err;
  }
};

const createProduct = async (req = Request, res = Response) => {
  const response = await repository.createP(req.body);
  res.status(201).json(response);

  res.status(500).send("image field must be an image url format");
};
// const getPost = async (req = Request, res = Response) => {
//   const post = await repository.getPost(req.params.id);
//   if (post === null) {
//     res.status(404).send("not Found");
//   } else {
//     res.json(post);
//   }
// };

// const updatePost = async (req = Request, res = Response) => {
//   const { title, content, image, category } = req.body;
//   const postToUpdate = await sequelize.Post.findByPk(req.params.id);
//   if (postToUpdate === null) {
//     res.status(404).send("post Not Found");
//   } else {
//     if (!image || (image && image.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i))) {
//       const result = await sequelize.Post.update(
//         {
//           title: title,
//           content: content,
//           image: image,
//           cat_id: category,
//         },
//         {
//           where: {
//             id: req.params.id,
//           },
//         },
//       );
//       res.status(200).json(result);
//     } else {
//       res.status(500).send("image field must be a image url format");
//     }
//   }
// };

// const deletePost = async (req = Request, res = Response) => {
//   const postToDelete = await sequelize.Post.findByPk(req.params.id);
//   if (postToDelete === null) {
//     res.status(404).send("post Not Found");
//   } else {
//     sequelize.Post.destroy({
//       where: {
//         id: req.params.id,
//       },
//     }).then((result, error) => {
//       if (error) {
//         throw error;
//       }
//       res.status(200).json(result);
//     });
//   }
// };

module.exports = {
  getProductsByPeriod,
};
