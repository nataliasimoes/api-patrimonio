const express = require('express')
const bodyParser = require('body-parser');
const rotas = require('./rotas');
const cors = require('cors');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());
app.use(rotas);
app.get('/',(req,res) => {
  res.json({
    message: 'Está rodando corretamente'
  });
});

app.listen(port, () => {
  console.log(`O servidor está escutando em http://localhost:${port}`)
})