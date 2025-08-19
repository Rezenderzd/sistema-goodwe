import conjuntoItensFor from "./pegandoApiTempo.js"
import apiFuncoes from "./apiFuncoes.js"


const botao = document.querySelector("#botao-cidade")

//Pegar o nome da cidade e  transforma-lo em compativel para a url
botao.addEventListener("click", async ()=>{
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
    document.querySelector("#nome-cidade").value = ""
})



