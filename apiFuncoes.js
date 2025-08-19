const apiFuncoes = {
    pegarDadosTemperatura(dia, valores){
        let contador = 0
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]<11.5 && valores[i+1]<11.5 && valores[i+2]<11.5){
                alert (`Vai ta frio pkrl no ${dia[i]} até ${dia[i+2]} com ${valores[i]}ºC`)
                contador++
                i++
            }
        }
        if(contador===0){
            alert("Não vai ta tão frio assim, fica de boa")
        }
    },
    
    pegarDadosVento(dia, valores){
        let contador = 0
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>20 && valores[i+1]>20 && valores[i+2]>20){
                alert (`Vai ventar no dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} km/h`)
                contador++
                i++
            }
        }
        if(contador===0){
            alert("Não vai ventar tão forte nos próximos 3 dias")
        }
    },
    
    
    pegarDadosMilimetrosChuva(dia, valores){
        let contador = 0
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>0.25 && valores[i+1]>0.25 && valores[i+2]>0.25){
                alert (`Vai chover muito no dia ${dia[i]} até ${dia[i+2]} com ${valores[i]} mm/h`)
                contador++
                i++
            }
        }
        if(contador===0){
            alert("Não vai chover forte, fica tranquilo")
        }
    },
    
    pegarDadosChanceChuva(dia, valores){
        let contador = 0
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>80 && valores[i+1]>80 && valores[i+2]>80){
                alert (`Vai chover no ${dia[i]} até ${dia[i+2]} com ${valores[i]} de probabilidade`)
                contador++
                i++
            }
        }
        if(contador===0){
            alert("Não há altas probabilidades de chuva")
        }
    },
    
    pegarDadosNuvem(dia, valores){
        let contador = 0
        for(let i=0;i<valores.length -2;i++){
            if(valores[i]>75 && valores[i+1]>75 && valores[i+2]>75){
                alert (`Vai ficar nublado ${dia[i]} até ${dia[i+2]} com ${valores[i]}% de nuvens`)
                contador++
                i++
            }
        }
        if(contador===0){
            alert("O dia vai ficar sem nuvens")
        }
    }
}

export default apiFuncoes