const apiFuncoes = {
    
    pegarDadosTemperatura(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        aviso.textContent = "Não há recomendações no momento"
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]<11.5 && valores[i+1]<11.5 && valores[i+2]<11.5){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai fazer frio do dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} ºC<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" id="aceitar-sugestao">Sim</button>
              <button type="button" class="btn border border-secondary">Não</button>
                </div>
            </li>`
                i++
            }
        }
    },
    
    pegarDadosVento(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>20 && valores[i+1]>20 && valores[i+2]>20){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
            <p>Vai ventar muito do dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} mm/h<br>Deseja economizar energia 5 horas antes?</p>
            <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" id="aceitar-sugestao">Sim</button>
              <button type="button" class="btn border border-secondary">Não</button>
            </div>
            </li>`
                
                i++
            }
        }
    },
    
    
    pegarDadosMilimetrosChuva(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>0.25 && valores[i+1]>0.25 && valores[i+2]>0.25){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai chiver muito do dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} mm/h<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" id="aceitar-sugestao">Sim</button>
              <button type="button" class="btn border border-secondary">Não</button>
            </div>
            </li>`
                i++
            }
        }
    },
    
    pegarDadosChanceChuva(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>80 && valores[i+1]>80 && valores[i+2]>80){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Tem alta probabilidade de chuva do dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} mm/h<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" id="aceitar-sugestao">Sim</button>
              <button type="button" class="btn border border-secondary">Não</button>
            </div>
            </li>`
                i++
            }
        }
    },
    
    pegarDadosNuvem(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>75 && valores[i+1]>75 && valores[i+2]>75){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai ficar nublado do dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} mm/h<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" id="aceitar-sugestao">Sim</button>
              <button type="button" class="btn border border-secondary">Não</button>
            </div>
            </li>`
                i++
            }
        }
    },

    limparLista(){
        const lista = document.querySelector("#lista-recomendacao")
        lista.innerHTML = `<h3 class="d-flex justify-content-center align-items-center titulo-recomendacao">Recomendações</h3>`
    }
}

export default apiFuncoes