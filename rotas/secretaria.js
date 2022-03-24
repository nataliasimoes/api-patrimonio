const express = require('express');
const controladorSecretaria = require('../controlador/secretaria.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorSecretaria.listarTodos)
  //rota: POST /produto/
  .post(controladorSecretaria.cadastrar);

router.route("/:id")

  .get(controladorSecretaria.equipamentosSecretaria)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorSecretaria.alterar);

router.param('id', controladorSecretaria.carregar);

module.exports = router;