const apiFuncoes = {
    
    pegarDadosTemperatura(valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        aviso.textContent = "Não há recomendações no momento"
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]<11.5 && valores[i+1]<11.5 && valores[i+2]<11.5){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai fazer frio hoje diminuindo a geração de energia<br>Deseja economizar energia hoje?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
                </div>
            </li>`
                break
            }
        }
    },
    
    pegarDadosVento(valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>20 && valores[i+1]>20 && valores[i+2]>20){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
            <p>Vai ventar muito hoje diminuindo a geração de energia<br>Deseja economizar energia hoje?</p>
            <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
            </div>
            </li>`
                
               break
            }
        }
    },
    
    
    pegarDadosMilimetrosChuva(valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>0.25 && valores[i+1]>0.25 && valores[i+2]>0.25){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai chover muito hoje diminuindo a geração de energia<br>Deseja economizar energia hoje?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
            </div>
            </li>`
                break
            }
        }
    },
    
    pegarDadosChanceChuva(valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>80 && valores[i+1]>80 && valores[i+2]>80){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Tem alta probabilidade de chuva hoje diminuindo a geração de energia<br>Deseja economizar energia hoje?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
            </div>
            </li>`
                break
            }
        }
    },
    
    pegarDadosNuvem(valores){
        const lista = document.querySelector("#lista-recomendacao")
        const aviso = document.querySelector("#sem-recomendacao")
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>75 && valores[i+1]>75 && valores[i+2]>75){
                aviso.textContent = ''
                lista.innerHTML += `<li class="item-recomendacao  border border-danger">
                <p>Vai ficar nublado hoje diminuindo a geração de energia<br>Deseja economizar energia hoje?</p>
                <div class="botoes-recomendacao">
              <button type="button" class="btn btn-danger" value="recomendacao">Sim</button>
              <button type="button" class="btn border border-secondary" value="recomendacao">Não</button>
                </div>
                </li>`
                break
            }
        }
    },

    limparLista(){
        const lista = document.querySelector("#lista-recomendacao")
        lista.innerHTML = `<h3 class="d-flex justify-content-center align-items-center titulo-recomendacao">Recomendações</h3>`
    }
}

export default apiFuncoes