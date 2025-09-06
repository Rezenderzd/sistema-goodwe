function ativandoBotaoGrafico(){
    const botoes = document.querySelectorAll(".botao-grafico")
    const graficos = document.querySelectorAll("canvas")
    const textoExplicativo = document.querySelector("#explicacao-raios")
    botoes.forEach(botao=>{
        botao.addEventListener("click", (evento)=>{
            textoExplicativo.innerHTML=''
            botoes.forEach(botao=>{
                botao.classList.remove("selecionado")
            })
            botao.classList.add("selecionado")
            let idBotao = botao.getAttribute("id")
            let idGrafico = idBotao.replace("btn-", "grafico-")
            graficos.forEach(grafico=>{
                grafico.style.display = "none"
                if(grafico.getAttribute("id") === idGrafico ){
                    if(idGrafico=='grafico-raios-solares'){
                        textoExplicativo.innerHTML = 'O indíce de raios UV determina qual a intensidade dos raios, avaliando o risco a pele humana.<br>Sendo:<br>0-2 Baixo risco<br>3-5 Risco moderado<br>6-7 Alto<br>8-10 Muito alto<br>11+ Risco extremo, sendo recomendado evitar exposição ao sol'
                    }
                    grafico.style.display = "block"
                }
            })
        })
    })
}

export default ativandoBotaoGrafico