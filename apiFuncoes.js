const apiFuncoes = {
    
    pegarDadosTemperatura(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        aviso.textContent = "Não há recomendações no momento"
        for(let i=0;i<valores.length -8;i++){
            if(valores[i+6]<11.5 && valores[i+6]<11.5 && valores[i+7]<11.5){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai fazer frio do dia ${dia[i+5]} até ${dia[i+7]} com ${valores[i+5]} ºC<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
                </div>
            </li>`
                i++
            }
        }
    },
    
    pegarDadosVento(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -8;i++){
            if(valores[i+5]>20 && valores[i+6]>20 && valores[i+7]>20){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
            <p>Vai ventar muito do dia ${dia[i+5]} até ${dia[i+7]} com ${valores[i+5]} km/h<br>Deseja economizar energia 5 horas antes?</p>
            <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
            </div>
            </li>`
                
                i++
            }
        }
    },
    
    
    pegarDadosMilimetrosChuva(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -8;i++){
            if(valores[i+5]>0.25 && valores[i+6]>0.25 && valores[i+7]>0.25){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai chiver muito do dia ${dia[i+5]} até ${dia[i+7]} com ${valores[i+5]} mm/h<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
            </div>
            </li>`
                i++
            }
        }
    },
    
    pegarDadosChanceChuva(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -8;i++){
            if(valores[i+5]>80 && valores[i+6]>80 && valores[i+7]>80){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Tem alta probabilidade de chuva do dia ${dia[i+5]} até ${dia[i+7]} com ${valores[i+5]}% de chance de chuva<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
            </div>
            </li>`
                i++
            }
        }
    },
    
    pegarDadosNuvem(dia, valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -8;i++){
            if(valores[i+5]>75 && valores[i+6]>75 && valores[i+7]>75){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai ficar nublado do dia ${dia[i+5]} até ${dia[i+7]} com ${valores[i+5]}% de nuvens<br>Deseja economizar energia 5 horas antes?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
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