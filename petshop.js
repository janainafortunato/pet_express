// módulo próprio
const moment = require('moment');
const fs = require('fs');

let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop = {
    atualizarBanco: () => {
        let petsAtulizado = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync('bancoDdos.json', petsAtulizado, 'utf-8');
    },
    
    listarPets: () => {
        for(let pet of bancoDados.pets){
            pet.vacinado == true ? console.log('vacinado') : console.log('Não vacinado');
            console.log(`As informações de cadastro do pet: ${pet.nome}, ${pet.tipo},  ${pet.idade}, ${pet.raca}, ${pet.peso}, ${pet.tutor}, ${pet.contato},  ${pet.vacinado}`);
        }
    },

    vacinarPet: (pet) => {
        for(let pet of bancoDados.pets){
            if(pet.vacinado == false && pet.nome == pet.nome){
                pet.vacinado = true;
                console.log(`O pet está vacinado ${pet.nome}`);
            }else{
                console.log("já está vacinado");
            }
        }
    },

    campanhaVacina: () => {
        let contando = 0;
        for(let pet of bancoDados.pets){
            
            if(pet.vacinado == false){
                pet.vacinado = true;
               contando++;  
    
            }
    
        }
        atualizarBanco();
        console.log(`Os pets ${contando}`)
    },

    adicionarPet: (novoPet) => {
        bancoDados.pets.push(novoPet);
        atualizarBanco();
        console.log(`${novoPet.nome} foi adicionado com sucesso!`);
    
    },

    darBanhoPet: pet => {
        pet.servicos.push({
            'nome':'banho',
            'data': moment().format('DD-MM-YYYY')
        });
        atualizarBanco();
        console.log(`${pet.nome} está de banho tomado!`);
    },

    tosarPet: (pet) => {
    
        pet.servicos.push({
            'nome': 'tosa'
        });
        atualizarBanco();
        console.log(`${pet.nome} está com cabelinho na régua!  ` +  'Data/horario do serviço:' + moment().format());
  
    },

    apararUnhasPet: (pet) => {
    
        pet.servicos.push({
            'nome': 'corte de unhas'
        });
        atualizarBanco();
        console.log(`${pet.nome} está de unhas aparadas!  ` + 'Data/horario do serviço:' +  moment().format());
        
    },

    atenderCliente: (pet, servicos) => {
        console.log(`Novo atendimento para o pet do tutor ${pet.tutor} com o nome ${pet.nome}`);
        servicos(pet)
        console.log('Volte sempre !!');
    
   }

    
}

module.exports = petshop;