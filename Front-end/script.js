/*
=====================================
  FRONT-END — consome nossa API local
=====================================




Este arquivo roda no navegador.
Ele faz requisições para nossa API Node.js
e mostra os dados na tela.
*/








// ==============================
// ELEMENTOS DO HTML
// ==============================




// pega o elemento <img id="makeImage">
// será usado para mostrar a foto da maquiagem
const makeImage = document.getElementById("makeImage");




// pega o elemento que mostra o nome do tipo de maquiagem
const makeTypes = document.getElementById("makeTypes");




// botão que busca uma maquiagem aleatória
const randomBtn = document.getElementById("randomBtn");




// botão que busca maquiagem por tipo
const searchBtn = document.getElementById("searchBtn");




// campo de texto onde o usuário digita o tipo de maquiagem
const makeInput = document.getElementById("makeInput");




// área onde fica a imagem da maquiagem
// usamos querySelector porque é uma classe (.make-box)
const makeBox = document.querySelector(".make-box");








// ==============================
// URL DA NOSSA API
// ==============================




// endereço base da nossa API local
// localhost = computador do próprio usuário
// porta 3000 = onde o servidor Node está rodando
const API = "http://10.106.208.42:3000/api/maquiagens";








// ==============================
// FUNÇÃO PRINCIPAL
// ==============================




// função assíncrona que busca uma maquiagem na API
// recebe uma URL como parâmetro
async function buscarMaquiagem(url) {




    // adiciona a classe "loading"
    // normalmente usada para mostrar animação de carregamento
    makeBox.classList.add("loading");




    try {




        // faz a requisição HTTP para a API
        const response = await fetch(url);




        // converte a resposta para JSON
        const data = await response.json();




        // mostra no console a resposta da API
        console.log("Resposta da API:", data);




        // verifica se a API retornou erro
        if (data.status === "error") {




            // mostra a mensagem de erro na tela
            makeTypes.textContent = data.message;




            // remove a imagem
            makeImage.src = "";




            // para a execução da função
            return;
        }




        // coloca a imagem da maquiagem na tela
        // o src define qual imagem será exibida
        makeImage.src = data.message;




        // extrai o nome do tipo de maquiagem da URL da imagem
        // exemplo da URL:
        // http://localhost:3000/fotos/blush/1.jpg




        // separa a URL em partes usando "/"
        const partes = data.message.split("/");




        // pega a posição 5 do array
        // que corresponde ao tipo de maquiagem
        const tipos = partes[5];




        // coloca a primeira letra maiúscula
        // ex: blush → Blush
        makeTypes.textContent =
            tipos.charAt(0).toUpperCase() + tipos.slice(1);




    } catch (erro) {




        // caso o servidor esteja desligado
        // ou aconteça algum erro na requisição




        // mostra erro no console
        console.error(erro);




        // mostra mensagem na tela
        makeTypes.textContent =
            "⚠️ Servidor offline — rode: node server.js";




        // remove a imagem
        makeImage.src = "";




    } finally {




        // remove a classe de carregamento
        // independentemente de erro ou sucesso
        makeBox.classList.remove("loading");




    }




}








// ==============================
// AÇÕES
// ==============================








// função que busca uma maquiagem aleatória
function maquiagemAleatoria() {




    // chama a função principal
    // passando a rota /aleatorio da API
    buscarMaquiagem(`${API}/aleatorio`);
}








// função que busca maquiagem por tipo
function buscarPorTipo() {




    // pega o texto digitado no input
    const tipos = makeInput.value.trim().toLowerCase();




    // verifica se o usuário digitou algo
    if (!tipos) {




        // se não digitou, mostra alerta
        alert("Digite um tipo de maquiagem!");




        // interrompe a função
        return;
    }




    // chama a API passando a raça na URL
    // exemplo: /api/maquiagem/blush
    buscarMaquiagem(`${API}/${tipos}`);
}








// ==============================
// EVENTOS
// ==============================








// quando clicar no botão "Aleatório"
randomBtn.addEventListener("click", maquiagemAleatoria);








// quando clicar no botão "Buscar"
searchBtn.addEventListener("click", buscarPorTipo);








// quando clicar na imagem de uma maquiagem
// carrega outra maquiagem aleatoria
makeImage.addEventListener("click", maquiagemAleatoria);








// quando o usuário apertar ENTER no input
makeInput.addEventListener("keypress", (event) => {




    // verifica se a tecla pressionada foi Enter
    if (event.key === "Enter") {




        // executa a busca por tipo
        buscarPorTipo();
    }




});








// ==============================
// CARREGA AO ABRIR A PÁGINA
// ==============================








// assim que a página abre
// já busca uma maquiagem aleatória
maquiagemAleatoria();
