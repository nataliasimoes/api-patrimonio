const express = require('express');
const rotasEquipamento = require('./equipamento.js');
const rotasUsuario = require('./usuario.js');
const rotasSecretaria = require('./secretaria.js');
const rotasImagem = require("./imagem.js")

const router = express.Router();

router.use("/equipamento",rotasEquipamento);
router.use("/usuario",rotasUsuario);
router.use("/secretaria", rotasSecretaria)
router.use("/imagem", rotasImagem)

module.exports = router;