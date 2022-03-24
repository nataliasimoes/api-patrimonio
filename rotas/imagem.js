const express = require('express');
const controladorImagem = require('../controlador/Imagem.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorImagem.listarTodos)
  //rota: POST /produto/
  .post(controladorImagem.cadastrar);

router.route("/:id")
  //rota: DELETE /produto/:id (ex: /produto/1)
  .delete(controladorImagem.remover)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorImagem.alterar);

router.param('id', controladorImagem.carregar);

module.exports = router;