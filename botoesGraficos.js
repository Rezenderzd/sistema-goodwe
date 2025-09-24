function ativandoBotaoGrafico(){
    const botoes = document.querySelectorAll(".botao-grafico")
    const graficos = document.querySelectorAll("canvas")
    botoes.forEach(botao=>{
        botao.addEventListener("click", (evento)=>{
            botoes.forEach(botao=>{
                botao.classList.remove("selecionado")
            })
            botao.classList.add("selecionado")
            let idBotao = botao.getAttribute("id")
            let idGrafico = idBotao.replace("btn-", "grafico-")
            graficos.forEach(grafico=>{
                grafico.style.display = "none"
                if(grafico.getAttribute("id") === idGrafico ){
                    grafico.style.display = "block"
                }
            })
        })
    })
}

export default ativandoBotaoGrafico