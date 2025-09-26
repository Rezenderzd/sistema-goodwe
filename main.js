import conjuntoItensFor from "./pegandoApiTempo.js"
import apiFuncoes from "./apiFuncoes.js"
import ativandoBotaoGrafico from "./botoesGraficos.js"
import gerandoTodosGraficos from "./gerandoGraficos.js"

//Pegar o nome da cidade e  transforma-lo em compativel para a url

const botao = document.querySelector("#botao-cidade")
const listaAtual = document.querySelector("#lista-recomendacao")
const mensagemAviso = document.querySelector("#sem-recomendacao")
const verCidade = document.querySelector("#ver-cidade")
const fecharVerCidade = document.querySelector("#fechar-ver-cidade")
const botaoEconomia = document.querySelector("#ativar-economia")
const botaoCampoIa = document.querySelector("#btn-campo-ia")
const botaoIaDuvida = document.querySelector("#botao-perguntar-ia")
const botaoRecomendacaoIa = document.querySelector("#recomendacao-ia")
const campoRecomendacaoIa = document.querySelector("#resposta-recomendacao-ia")
const loadingRecomendacao = document.querySelector("#loading-recomendacao")
const loadingPergunta = document.querySelector("#loading-pergunta")
let nomeCidade;
const botaoDesativar = document.querySelector("#desativar-economia")
let ipTasmota
let linkIpTasmota  = `http://${ipTasmota}`


botaoCampoIa.addEventListener("click", ()=>{
        document.querySelector("#pergunta-ia").value = ''
})

async function comandoGraficos() {
        await gerandoTodosGraficos()
        ativandoBotaoGrafico()
}

verCidade.addEventListener("click", ()=>{
        nomeCidade = document.querySelector("#nome-cidade").value //armazena o nome que está no #nome-cidade 
        document.querySelector("#nome-cidade").value = "" 
})

fecharVerCidade.addEventListener("click",()=>{
        document.querySelector("#nome-cidade").value = nomeCidade //pega o nome da cidade que foi armazenado e adiciona no input para não quebrar os botões
})

botao.addEventListener("click", async (evento)=>{
        const botoesGrafico = document.querySelectorAll(".botao-grafico")
        botoesGrafico.forEach(botaoGrafico => {
                botaoGrafico.classList.remove("selecionado")
        });
        apiFuncoes.limparLista()
        const horas = await conjuntoItensFor("time")
        const temperatura = await conjuntoItensFor("mintemp_c")
        const velocidadeVento = await conjuntoItensFor("wind_kph")
        const milimetros = await conjuntoItensFor("precip_mm")
        const chanceChuva = await conjuntoItensFor("chance_of_rain")
        const nuvens = await conjuntoItensFor("cloud")
        apiFuncoes.pegarDadosTemperatura(temperatura)
        apiFuncoes.pegarDadosVento(velocidadeVento)
        apiFuncoes.pegarDadosMilimetrosChuva(milimetros)
        apiFuncoes.pegarDadosChanceChuva(chanceChuva)
        apiFuncoes.pegarDadosNuvem(nuvens)
        await comandoGraficos()
        const offcanvasCidade = document.querySelector('#offcanvasTop')
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasCidade) || new bootstrap.Offcanvas(offcanvasCidade)
        offcanvas.hide()
})

botaoEconomia.addEventListener("click", async()=>{
        try{
                fetch(`${linkIpTasmota}/cm?cmnd=Power%20On`)
                .then(response=> response.json())
                .then(data=>console.log(data))
        }catch(error){
                alert(`Deu merda${error}`)
        }
        alert("Alexa: Ok, economia de energia será ativada.")
        console.log('ligado')
})

botaoDesativar.addEventListener("click", async()=>{
        try{
                fetch(`${linkIpTasmota}/cm?cmnd=Power%20Off`)
                .then(response=> response.json())
                .then(data=>console.log(data))        
        }catch(error){
                alert(`Deu merda${error}`)
        }
        alert("Alexa: Ok, modo econômia desativado")
        console.log('desligado')     
})

document.addEventListener("click", async (evento) => {
        if (evento.target.matches("button[value='recomendacao']") && evento.target.classList.contains("btn-danger")) {
                try{
                        fetch(`${linkIpTasmota}/cm?cmnd=Power%20On`)
                        .then(response=> response.json())
                        .then(data=>console.log(data))
                        apiFuncoes.limparLista()
                        if(!listaAtual.querySelector("li")){ //se na lista atual não tiver li
                               mensagemAviso.textContent = "Não há recomendações no momento"
                        }
                        else{
                                mensagemAviso.textContent = ''
                        }
                }catch(error){
                        alert(`Deu merda ${error}`)
                }
                alert("Alexa: Ok, modo econômia ativado")
        }
        else if(evento.target.matches("button[value='recomendacao']") && evento.target.classList.contains("border-secondary")){
                const liAtual = evento.target.closest('li')
                liAtual.remove()
                if(!listaAtual.querySelector("li")){
                        mensagemAviso.textContent = "Não há recomendações no momento"
                }
                else{
                        mensagemAviso.textContent = ''
                }
        }
})

botaoIaDuvida.addEventListener("click", async()=>{
        const campoIa = document.querySelector("#lista-resposta-ia")
        try{
                loadingPergunta.style.display = 'block'
                campoIa.innerHTML=''
                const pergunta = document.querySelector('#pergunta-ia').value
                const resposta = await fetch('http://127.0.0.1:5001/iaDuvidas', { //envia uma requisição post para o back com a pergunta do usuário
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'}, //diz que o que está sendo enviado é um JSON
                        body: JSON.stringify({pergunta}) //transforma a pergunta em um JSON
                });
                const dados = await resposta.json()
                document.querySelector("#pergunta-ia").value = ''
                const respostaIa = document.createElement('p')
                respostaIa.classList.add('resposta-ia')
                loadingPergunta.style.display='none'
                respostaIa.textContent = ''
                respostaIa.textContent = dados.resposta
                campoIa.appendChild(respostaIa)
        }
        catch(error){
                loadingPergunta.style.display='none'
                const respostaIa = document.createElement('p')
                respostaIa.classList.add('resposta-ia')
                loadingPergunta.style.display='none'
                respostaIa.textContent = ''
                respostaIa.textContent='Não foi possível carregar a resposta'
                campoIa.appendChild(respostaIa)
                alert(`Erro ao carregar a ia: ${error}`)
        }
})

botaoRecomendacaoIa.addEventListener("click", async ()=>{
        try{
                nomeCidade = document.querySelector("#nome-cidade").value
                loadingRecomendacao.style.display ='block'
                campoRecomendacaoIa.textContent=''
                campoRecomendacaoIa.textContent='Carregando...'
                const resposta = await  fetch ("http://127.0.0.1:5000/iaRecomendacao",{
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'}, //diz que o que está sendo enviado é um JSON
                        body: JSON.stringify({cidade: nomeCidade}) //transforma a pergunta em um JSON
                })
                campoRecomendacaoIa.textContent='Analisando dados'
                const respostaIa = await resposta.json()
                loadingRecomendacao.style.display = 'none'
                campoRecomendacaoIa.textContent=''
                campoRecomendacaoIa.textContent = respostaIa.resposta
        }catch(error){
                loadingRecomendacao.style.display = 'none'
                campoRecomendacaoIa.textContent='Não foi possível carregar a resposta'
                alert(`Erro ao gerar recomendacao: ${error}`)
        }
})