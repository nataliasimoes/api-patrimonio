const { Imagem } = require("../modelos");

function listarTodos(req, res, next) {
  Imagem.findAll().then(function (listaImagem) {
    res.json(listaImagem);
  });
}

function cadastrar(req, res, next) {
  Imagem.create({
    foto: req.body.foto,
    equipamentoId: req.body.equipamentoId,

  })
    .then((imagem) => {
      res.json(ImageBitmap);
    })
    .catch((err) => {
      res.status(401).json({ error: "A imagem não foi cadastrado" });
    });
}

function alterar(req, res) {
  //verifica se o usuario informado pelo id existe
  if (req.imagem) {
    const foto = req.body.foto || req.imagem.foto;
    const equipamentoId = req.body.equipamentoId || req.imagem.equipamentoId;
    Imagem.update(
      { foto, equipamentoId },
      {
        where: {
          id: req.imagem.id
        },
      }
    ).then(() => {
      res.status(200).json({
        message: "Alterado",
      });
    });
  } else {
    res.json({
      message: "As informações da imagem não foram altedas",
    });
  }
}

function remover(req, res, next) {
  if (req.imagem) {
    Imagem.destroy({
      where: {
        id: req.imagem.id,
      },
    }).then(() => {
      res.status(200).json({
        message: "Removido",
      });
    });
  } else {
    res.status(404).json({
      message: "Não foi possível remover",
    });
  }
}

/**
 *
 * @param {*} id id será preenchido com o número que estiver na rota
 */
function carregar(req, res, next, id) {
  Imagem.findOne({
    where: {
      id: id,
    },
  })
    .then((imagem) => {
      req.imagem = imagem;
      next();
    });
}

module.exports = {
  listarTodos,
  cadastrar,
  alterar,
  remover,
  carregar,
};
