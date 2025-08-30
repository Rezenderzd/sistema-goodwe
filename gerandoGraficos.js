import conjuntoItensFor from "./pegandoApiTempo.js"

let graficoChanceChuvaExistencia = null
async function gerandoTodosGraficos(){
  const horas = await conjuntoItensFor("time")
  gerandoGraficoChanceChuva(horas)
}


async function gerandoGraficoChanceChuva(horarios){
    const valores = await conjuntoItensFor ("chance_of_rain")
    const graficoChanceChuva = document.querySelector("#grafico-probabilidade-de-chuva").getContext("2d")
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

export default gerandoTodosGraficos