import conjuntoItensFor from "./pegandoApiTempo.js"
import apiFuncoes from "./apiFuncoes.js"
import ativandoBotaoGrafico from "./graficos.js"

//Pegar o nome da cidade e  transforma-lo em compativel para a url

const botao = document.querySelector("#botao-cidade")
const listaAtual = document.querySelector("#lista-recomendacao")
const mensagemAviso = document.querySelector("#sem-recomendacao")
const verCidade = document.querySelector("#ver-cidade")
const fecharVerCidade = document.querySelector("#fechar-ver-cidade")
let nomeCidade;
ativandoBotaoGrafico()

verCidade.addEventListener("click", ()=>{
        nomeCidade = document.querySelector("#nome-cidade").value //armazena o nome que está no #nome-cidade 
        document.querySelector("#nome-cidade").value = "" 
})

fecharVerCidade.addEventListener("click",()=>{
        document.querySelector("#nome-cidade").value = nomeCidade //pega o nome da cidade que foi armazenado e adiciona no input para não quebrar os botões
})



botao.addEventListener("click", async (evento)=>{
        apiFuncoes.limparLista()
        const horas = await conjuntoItensFor("time")
        const temperatura = await conjuntoItensFor("feelslike_c")
        const velocidadeVento = await conjuntoItensFor("wind_kph")
        const milimetros = await conjuntoItensFor("precip_mm")
        const chanceChuva = await conjuntoItensFor("chance_of_rain")
        const nuvens = await conjuntoItensFor("cloud")
        apiFuncoes.pegarDadosTemperatura(horas, temperatura)
        apiFuncoes.pegarDadosVento(horas, velocidadeVento)
        apiFuncoes.pegarDadosMilimetrosChuva(horas, milimetros)
        apiFuncoes.pegarDadosChanceChuva(horas, chanceChuva)
        apiFuncoes.pegarDadosNuvem(horas, nuvens)
        const offcanvasCidade = document.querySelector('#offcanvasTop')
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasCidade) || new bootstrap.Offcanvas(offcanvasCidade)
        offcanvas.hide()
})

document.addEventListener("click", async (evento) => {
        if (evento.target.matches("button[value='recomendacao']") && evento.target.classList.contains("btn-danger")) {
                const liAtual = evento.target.closest('li') //pega a li mais próxima (a do botão nesse caso)
                const horas = await conjuntoItensFor("time")
                const textoLi = liAtual.textContent
                const textoDataLi = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/ // \d pega numeros {4} que contenham 4 digitos
                const dataHora = textoLi.match(textoDataLi) //encontra textoDataLi dentro do textoLi
                let horasAntes;
                if(dataHora){
                        const inicioEvento = dataHora[1]
                        for(let i = 0; i<horas.length; i++){
                                if(horas[i]===inicioEvento){
                                        horasAntes = horas[i-5]
                                        break
                                }
                        }
                }
                alert(`Alexa: Ok, ativando a economia de energia para: ${horasAntes} `)
                liAtual.remove()
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



