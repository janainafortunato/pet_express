const { request, response } = require('express');
const express = require('express');
const app = express();
const petshop = require('./petshop');

app.use(express.json());

app.get('/pets', (request, response) => {
    
    return response.send(petshop.listarPets());

});

app.post('/pets', (request, response) => {
   const {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos } = request.body; 
   const resultado = {nome, tipo, idade, raca, peso, tutor, contato, vacinado, servicos };
  // petshop.atualizarBanco();
  petshop.adicionarPet(resultado);
   return response.json(resultado);

});

app.get('/pets/:nome', (request, response) => {
    const {nome} = request.params;
    return response.json(petshop.buscarPet(nome));

}); 

app.listen(8080, () => {
    console.log('Servidor rodando!');
});

//console.log(petshop.listarPets());