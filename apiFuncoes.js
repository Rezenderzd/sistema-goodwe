const apiFuncoes = {
    pegarDadosTemperatura(dia, valores){
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]<11.5 && valores[i+1]<11.5 && valores[i+2]<11.5){
                alert (`Vai ta frio pkrl no ${dia[i]} até ${dia[i+2]} com ${valores[i]}ºC`)
                i++
            }
        }
    },
    
    pegarDadosVento(dia, valores){
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>20 && valores[i+1]>20 && valores[i+2]>20){
                alert (`Vai ventar no dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} km/h`)
                i++
            }
        }
    },
    
    
    pegarDadosMilimetrosChuva(dia, valores){
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>0.25 && valores[i+1]>0.25 && valores[i+2]>0.25){
                alert (`Vai chover muito no dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} mm/h`)
                i++
            }
        }
    },
    
    pegarDadosChanceChuva(dia, valores){
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>80 && valores[i+1]>80 && valores[i+2]>80){
                alert (`Vai chover no ${dia[i]} até ${dia[i+2]} com ${valores[i]} de probabilidade`)
                i++
            }
        }
    },
    
    pegarDadosNuvem(dia, valores){
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>75 && valores[i+1]>75 && valores[i+2]>75){
                alert (`Vai ficar nublado ${dia[i]} até ${dia[i+2]} com ${valores[i]}% de nuvens`)
                i++
            }
        }
    }
}

export default apiFuncoes