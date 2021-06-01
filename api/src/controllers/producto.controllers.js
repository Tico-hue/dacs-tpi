const express = require("express");
const ProductRepository = require("../repositories/productoRepository");
const repository = new ProductRepository();
const sequelize = require("../loaders/db/db");
const logger = require("winston");
const empresaRepository = require("../repositories/empresaRepository");
const { Console } = require("winston/lib/winston/transports");
const getAllProducts = async (req = Request, res = Response) => {
  return await repository.allProductos();
};

const createProduct = async (req = Request, res = Response) => {
  try {
    console.log(req.body, "body");
    const empresa = await repository.getEmpresaByCuit(req.body.cuit);
    // const producto = await repository.createProduct(req.body)
    console.log(empresa[0].id, "empresa");
    const body = {
      emp_id: empresa[0].id,
      ean: req.body.ean,
      deno: req.body.deno,
      u_medida: req.body.uMedida,
      precioU: req.body.precioU,
    };

    const producto = await repository.createProduct(body);
    if (!producto) {
      res.status(400).send("error");
    }
    res.status(201).json(producto);
  } catch (err) {
    throw err;
  }
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
  createProduct,
};
