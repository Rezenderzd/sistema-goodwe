const botoes = document.querySelectorAll(".botao-grafico")

function ativandoBotaoGrafico(){
    botoes.forEach(botao=>{
        botao.addEventListener("click", (evento)=>{
            botoes.forEach(botao=>{
                botao.classList.remove("selecionado")
            })
            botao.classList.add("selecionado")
        })
    })
}

export default ativandoBotaoGrafico