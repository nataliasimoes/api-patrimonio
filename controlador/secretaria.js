const { Secretaria, Equipamento } = require("../modelos");

function listarTodos(req, res, next) {
  Secretaria.findAll().then(function (listarSecretarias) {
    res.json(listarSecretarias);
  });
}

function cadastrar(req, res, next) {
  Secretaria.create({
    nome: req.body.nome
  })
    .then((secretaria) => {
      res.json(secretaria);
    })
    .catch((err) => {
      res.status(401).json({ error: "A secretaria não foi cadastrado" });
    });
}

function equipamentosSecretaria(req, res, next) {
  if (req.secretaria) {
    Equipamento.findAll({
      where: {
        secretariaId: req.secretaria.id
      }
    }).then(function (listarEquipamentos) {
      res.json(listarEquipamentos);
    });
  } else {
    res.status(404).json({
      message: 'a secretaria informada não existe'
    })
  }
}

function alterar(req, res) {
  //verifica se o usuario informado pelo id existe
  if (req.secretaria) {
    const nome = req.body.nome || req.secretaria.nome;
    Secretaria.update(
      { nome },
      {
        where: {
          id: req.secretaria.id
        },
      }
    ).then(() => {
      res.status(200).json({
        message: "Alterado",
      });
    });
  } else {
    res.json({
      message: "As informações do usuario não foram altedas",
    });
  }
}

/**
 *
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Secretaria.findOne({
    where: {
      id: id,
    },
  })
    .then((secretaria) => {
      req.secretaria = secretaria;
      next();
    });
}

module.exports = {
  listarTodos,
  equipamentosSecretaria,
  cadastrar,
  alterar,
  carregar,
};
