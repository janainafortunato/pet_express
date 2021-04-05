// módulo próprio
const moment = require('moment');

const fs = require('fs');

let bancoDados = fs.readFileSync('./bancoDados.json', 'utf-8');

bancoDados = JSON.parse(bancoDados);

const petshop = {
    atualizarBanco: () => {
        let petsAtulizado = JSON.stringify(bancoDados, null, 2);
        fs.writeFileSync('bancoDados.json', petsAtulizado, 'utf-8');
    },
    
    listarPets: () => {

        let textoListarPets = "PETSHOP \n";
        for(let pet of bancoDados.pets){
            pet.vacinado == true ? console.log('vacinado') : console.log('Não vacinado');
           // textoListarPets +=(` ${pet.nome}, ${pet.tipo},  ${pet.idade}, ${pet.raca}, ${pet.peso}, ${pet.tutor}, ${pet.contato},  ${pet.vacinado} \n`);
            textoListarPets +=(`${pet.nome} está com cabelinho na régua!  ` +  'Data/horario do serviço:' + moment().format());
        }

       /* pet.servicos.forEach((servico) => {
            textoListaPets += (`${servico.data} - ${servico.nome} \n`);
           })*/

        return textoListarPets;
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
        petshop.atualizarBanco();
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
    
   },

    clientePremium: (pet) => {
        // let nome = pet.nome;
        let {nome} = pet;

        let nServicos = pet.servicos.length;

        if (nServicos > 5) {
            console.log(`Olá, ${nome}! Você é um cliente especial e ganhou um descontão!`);
        } else {
            console.log(`Olá, ${nome}! Você ainda não tem descontos disponiveis!`);
        }
    },
    contatoTutor: (pet) => {
        let {nome, tutor, contato} = pet;
        
        return `Tutor: ${tutor}
        Contato: ${contato}
        Pet: ${nome}`;
    },
    filtrarTutor: (nomeTutor) => {
        let petsTutor = bancoDados.pets.filter((pet) => {
            return pet.tutor == nomeTutor;
        });
        
        console.log(`Pets do tutor ${nomeTutor}:`)
        petsTutor.forEach((pet) => {
            console.log(`${pet.nome} - ${pet.tipo}`)
        })
    
    
    },
    
    buscarPet: (nomePet) => {

        let petEncontrado = bancoDados.pets.find((pet) => {
            return pet.nome == nomePet;
        });
    
        return petEncontrado ? petEncontrado : `Nenhum pet encontrado com nome ${nomePet}`;
    }
    
}

module.exports = petshop;