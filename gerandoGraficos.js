import conjuntoItensFor from "./pegandoApiTempo.js"

let graficoChanceChuvaExistencia = null
let graficoPorcentagemNuvemExistencia = null
let graficoTemperaturaExistencia=null
let graficoProducaoExistencia=null
let graficoUvExistencia = null
let graficoSocExistencia = null

async function gerandoTodosGraficos(){
  const horas = await conjuntoItensFor("time")
  document.querySelectorAll("canvas").forEach(grafico => grafico.style.display = "none")
  
  await gerandoGraficoChanceChuva(horas)
  document.querySelector("#grafico-probabilidade-de-chuva").style.display = "none"
  
  await gerandoGraficoPorcentagemNuvem(horas)
  document.querySelector("#grafico-tempo-nublado").style.display = "none"

  await gerandoGraficoGeracaoEnergia(horas)
  document.querySelector("#grafico-producao").style.display='none'

  await GerandoGraficoUv(horas)
  document.querySelector("#grafico-raios-solares").style.display='none'

  await gerandoGraficoTemperatura(horas)
  document.querySelector("#grafico-temperatura").style.display='none'

  await gerandoGraficoSoc(horas)
  document.querySelector("#grafico-soc").style.display='none'
}


async function gerandoGraficoChanceChuva(horarios){
    const valores = await conjuntoItensFor ("chance_of_rain")
    let graficoChanceChuva = document.querySelector("#grafico-probabilidade-de-chuva").getContext("2d")
    if (graficoChanceChuvaExistencia) {
      graficoChanceChuvaExistencia.destroy();
    }

  graficoChanceChuvaExistencia = new Chart(graficoChanceChuva, {
    type: 'bar',
    data: {
      labels: horarios,
      datasets: [{
        label: 'Probabilidade de chuva',
        data: valores
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function gerandoGraficoPorcentagemNuvem(horarios) {
  const valores = await conjuntoItensFor ("cloud")
  let graficoPorcentagemNuvem = document.querySelector("#grafico-tempo-nublado").getContext("2d")
  if(graficoPorcentagemNuvemExistencia){
    graficoPorcentagemNuvemExistencia.destroy();
  }

  graficoPorcentagemNuvemExistencia = new Chart(graficoPorcentagemNuvem, {
    type: 'bar',
    data: {
      labels: horarios,
      datasets: [{
        label: '% de nuvens',
        data: valores,
        backgroundColor:'#39c6e9',
        borderColor:'#FFF',
        borderWidth: 1,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function gerandoGraficoGeracaoEnergia(horarios){
  let geracaoEnergia = []
  const eficiencia = 0.204
  const potencia = 335
  const areaPainel = 2.116*0.777
  const valores = await conjuntoItensFor ("uv")
  valores.forEach(valor=>{
    let quantidadeEnergia = valor*potencia*areaPainel*eficiencia
    geracaoEnergia.push(quantidadeEnergia)
  })
  let graficoProducao = document.querySelector("#grafico-producao").getContext("2d")
  if(graficoProducaoExistencia){
    graficoProducaoExistencia.destroy();
  }
  graficoProducaoExistencia = new Chart(graficoProducao, {
    type: 'line',
    data: {
      labels: horarios,
      datasets: [{
        label: 'Geração de energia/hora',
        data: geracaoEnergia,
        borderWidth: 1,
        backgroundColor:'#000',
        borderColor:'#7335a9'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function GerandoGraficoUv(horarios) {
  const valores = await conjuntoItensFor("uv")
  let graficoUv = document.querySelector("#grafico-raios-solares").getContext("2d")
  if(graficoUvExistencia){
    graficoUvExistencia.destroy()
  }
  graficoUvExistencia = new Chart (graficoUv,{
    type: 'bar',
    data: {
      labels: horarios,
      datasets: [{
        label: 'Taxa de raios solares',
        data: valores,
        borderWidth: 1,
        backgroundColor:'#dfd92f'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,         
            text: 'Índice de raios UV',     
            font: {
              size: 14,            
            }
          }
        }
      }
    }
  })
}

async function gerandoGraficoTemperatura(horarios) {
  // extrai os valores de cada dia
  let temperatura = await conjuntoItensFor("temp_c")
  let graficoTemperatura = document.querySelector("#grafico-temperatura").getContext("2d")
  if(graficoTemperaturaExistencia){
    graficoTemperaturaExistencia.destroy()
  }
  graficoTemperaturaExistencia = new Chart(graficoTemperatura, {
    type: 'bar',
    data: {
      labels: horarios,
      datasets: [{
        label: 'Temperatura',
        data: temperatura,
        borderWidth: 1,
        backgroundColor: '#e9b739'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}


async function gerandoGraficoSoc(horarios) {
  let dados = []
  try{
    let pegandoDadosSems = await fetch("http://127.0.0.1:5002/dados")
    let json = await pegandoDadosSems.json()
    dados = json.informacaoSoc
  }catch(error){
    alert(`Falha ao pegar os dados do SEMS ${error}`)
  }
  console.log(dados)
  let graficoSoc = document.querySelector("#grafico-soc").getContext("2d")
  if (graficoSocExistencia){
    graficoSocExistencia.destroy()
  }
  graficoSocExistencia = new Chart(graficoSoc, {
    type: 'bar',
    data: {
      labels: horarios,
      datasets: [{
        label: 'Informações soc (dados retirados do SEMS)',
        data: dados,
        borderWidth: 1,
        backgroundColor: '#392620'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

export default gerandoTodosGraficos