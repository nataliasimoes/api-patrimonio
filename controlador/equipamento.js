const { Equipamento, Imagem } = require("../modelos");

function listarTodos(_, res) {
  Equipamento.findAll().then(function (listaEquipamentos) {
    res.json(listaEquipamentos);
  });
}

function cadastrar(req, res) {
  try{
    Equipamento.create({
    tombo: req.body.tombo,
    secretariaId: req.body.secretariaId,
    descricao: req.body.descricao,
    notaFiscal: req.body.notaFiscal,
    estado: req.body.estado,
    status: req.body.status,
    usuarioId: req.body.usuarioId
  })
    .then((equipamento) => {
      res.json(equipamento);
    })
    .catch((err) => {
      res.status(err).json({ error: "o equipamento não foi cadastrado" });
    });
  } catch (e){
    res.status(404).json({ message: "A função não funcionou" });
  }
  
}

function listarImagens(req, res){
  if(req.equipamento){
    Imagem.findAll({
      where:{
        equipamentoId: req.equipamento.id
      }
    }).then((listarImagem) => {
      res.json(listarImagem)
    })
  } else{
    res.status(404).json({
      message: 'O equipamento informado não existe'
    })
  }
}

function listarApenasUm(req, res) {
  //Verifica se o equipamento informado existe
  if (req.equipamento) {
    res.json(req.equipamento);
  } else {
    res.status(404).json({
      message: "O equipamento informando não está na lista",
    });
  }
}

function alterar(req, res) {
  //verifica se o equipamento informado pelo id existe
  if (req.equipamento) {
    const tombo = req.body.tombo || req.equipamento.tombo;
    const secretariaId = req.body.secretariaId || req.equipamento.secretariaId;
    const notaFiscal = req.body.notaFiscal || req.equipamento.notaFiscal;
    const status = req.body.status || req.equipamento.status; 
    const estado = req.body.estado || req.equipamento.estado;
    Equipamento.update(
      { tombo, secretariaId, notaFiscal, status, estado  },
      {
        where: {
          tombo: req.equipamento.id
        },
      }
    ).then(() => {
      res.status(200).json({
        message: "Alterado",
      });
    });
  } else {
    res.json({
      message: "As informações do equipamento não foram altedas",
    });
  }
}

function remover(req, res, next) {
  //Verifica se o equipamento informado existe
  if (req.equipamento) {
    Equipamento.destroy({ //apaga o equipamento
      where: {
        id: req.equipamento.id,
      },
    }).then(() => {
      res.status(200).json({
        message: "Removido",
      });
    }).catch((err) => {
      res.status(401).json({ error: "O equipamento não foi removido" });
    });
  } else {
    res.status(404).json({
      message: "Não foi possível remover",
    });
  }
}


function carregar(req, next, tombo) {
  Equipamento.findOne({
    where: {
      tombo: tombo,
    },
  })
    .then((equipamento) => {
      req.equipamento = equipamento;
      next();
    });
}

module.exports = {
  listarTodos,
  cadastrar,
  listarApenasUm,
  listarImagens,
  alterar,
  remover,
  carregar,
};
