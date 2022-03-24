const Equipamento = require("./equipamento.js");
const Secretaria = require("./secretaria")
const Usuario = require("./usuario");
const Imagem = require("./imagem");


const modelos = {
  Equipamento,
  Secretaria,
  Usuario,
  Imagem

};

Object.entries(modelos).forEach(([name,model]) => {
  model.sync();
  // model.associate(modelos);
  console.log(name);
})


module.exports = {
  Equipamento,
  Secretaria,
  Usuario,
  Imagem

}