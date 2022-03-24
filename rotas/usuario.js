const express = require('express');
const controladorUsuario = require('../controlador/usuario.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorUsuario.listarTodos)
  //rota: POST /produto/
  .post(controladorUsuario.cadastrar);

router.route("/:id")
  //rota: GET /produto/:id (ex: /produto/1)
  .get(controladorUsuario.listarApenasUm)
  //rota: DELETE /produto/:id (ex: /produto/1)
  .delete(controladorUsuario.remover)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorUsuario.alterar);

router.param('id', controladorUsuario.carregar);

module.exports = router;