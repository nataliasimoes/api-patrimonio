const { Usuario } = require("../modelos");

function listarTodos(req, res, next) {
  Usuario.findAll().then(function (listaUsuarios) {
    res.json(listaUsuarios);
  });
}

function cadastrar(req, res, next) {
  Usuario.create({
    nome: req.body.nome,
    username: req.body.username,
    email: req.body.email,
    senha: req.body.senha

  })
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      res.status(401).json({ error: "O Usuario não foi cadastrado" });
    });
}

function listarApenasUm(req, res) {
  if (req.usuario) {
    res.json(req.usuario);
  } else {
    res.status(404).json({
      message: "O usuario informado não existe",
    });
  }
}

function alterar(req, res) {
  //verifica se o usuario informado pelo id existe
  if (req.usuario) {
    const username = req.body.username || req.usuario.username;
    const email = req.body.email || req.usuario.email;
    const senha = req.body.senha || req.usuario.senha;
    Usuario.update(
      { username, email, senha  },
      {
        where: {
          id: req.usuario.id
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

function remover(req, res, next) {
  if (req.usuario) {
    Usuario.destroy({
      where: {
        id: req.usuario.id,
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
  Usuario.findOne({
    where: {
      id: id,
    },
  })
    //na linha abaixo é utilizado Arrow Functions no lugar da função "anônima" (function (produto) { ... })
    //para saber mais sobre Arrow function acesse:
    //https://raphaelfabeni.com/es6-arrow-functions/
    .then((usuario) => {
      //armena o usuario na requisição, para que a próxima função
      //consiga recuperá-lo
      req.usuario = usuario;
      next();
    });
}

module.exports = {
  listarTodos,
  cadastrar,
  listarApenasUm,
  alterar,
  remover,
  carregar,
};
