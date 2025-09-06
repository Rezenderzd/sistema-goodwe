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
let nomeCidade;

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

botaoEconomia.addEventListener("click", ()=>{
        alert("Alexa: Ok, economia de energia será ativada.")
})

document.addEventListener("click", async (evento) => {
        if (evento.target.matches("button[value='recomendacao']") && evento.target.classList.contains("btn-danger")) {
                const liAtual = evento.target.closest('li') //pega a li mais próxima (a do botão nesse caso)
                alert(`Alexa: Ok, economia de energia será ativada.`)
                apiFuncoes.limparLista()
                if(!listaAtual.querySelector("li")){ //se na lista atual não tiver li
                       mensagemAviso.textContent = "Não há recomendações no momento"
                }
                else{
                        mensagemAviso.textContent = ''
                }
                
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



