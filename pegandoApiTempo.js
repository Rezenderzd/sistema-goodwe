//Pega a url da api com a cidade determinada pelo usuário
async function pegandoAPi(nomeCidade) {
    try{
        const api = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c4c8e26e03c74508b2b141838251208&q=${nomeCidade}&days=7`)
        const apiJson = await api.json()
        return apiJson
    }catch(error){
        alert(`Erro ao carregar a API:${error}`)
    }
}

async function conjuntoItensFor(item){
    const cidade = document.querySelector("#nome-cidade").value
    const aviso = document.querySelector("#aviso")
    if(cidade === ""){
        aviso.textContent = 'Digite o nome da cidade'
    }else{
        aviso.textContent = ''
        const cidadeURL = encodeURIComponent(cidade)
        const qtdMaximoDias = 1
        const qtdHoras = 24
        let array = []
        const apiCidade = await pegandoAPi(cidadeURL)
        for(let i=0;i<qtdMaximoDias;i++){
            for(let j=0; j<qtdHoras;j++){
            const string  = `apiCidade.forecast.forecastday[${i}].hour[${j}].${item}`
            const tempo = eval(string)
            array.push(tempo)
            }
        }
        console.log(array)
        return array
    }
}

export default conjuntoItensFor