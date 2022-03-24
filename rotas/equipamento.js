const express = require('express');
const controladorEquipamento = require('../controlador/equipamento.js');

const router = express.Router();

router.route("/")
  //rota: GET /produto/
  .get(controladorEquipamento.listarTodos)
  //rota: POST /produto/
  .post(controladorEquipamento.cadastrar);

router.route("/imagem/:id")

  .get(controladorEquipamento.listarImagens)

router.route("/:id")
  //rota: GET /produto/:id (ex: /produto/1)
  .get(controladorEquipamento.listarApenasUm)
  //rota: DELETE /produto/:id (ex: /produto/1)
  .delete(controladorEquipamento.remover)
  //rota: PUT /produto/:id (ex: /produto/1)
  .put(controladorEquipamento.alterar);

router.param('id', controladorEquipamento.carregar);

module.exports = router;