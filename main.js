import conjuntoItensFor from "./pegandoApiTempo.js"
import apiFuncoes from "./apiFuncoes.js"
import ativandoBotaoGrafico from "./botoesGraficos.js"
import gerandoTodosGraficos from "./gerandoGraficos.js"
import funcoesLogin from "./login.js"

//Pegar o nome da cidade e  transforma-lo em compativel para a url

const botao = document.querySelector("#botao-cidade")
const listaAtual = document.querySelector("#lista-recomendacao")
const mensagemAviso = document.querySelector("#sem-recomendacao")
const verCidade = document.querySelector("#ver-cidade")
const fecharVerCidade = document.querySelector("#fechar-ver-cidade")
const botaoEconomia = document.querySelector("#ativar-economia")
const botaoCampoIa = document.querySelector("#btn-campo-ia")
const botaoIaDuvida = document.querySelector("#botao-perguntar-ia")
const botaoRecomendacaoIa = document.querySelector("#recomendacao-ia")
const campoRecomendacaoIa = document.querySelector("#resposta-recomendacao-ia")
const loadingRecomendacao = document.querySelector("#loading-recomendacao")
const loadingPergunta = document.querySelector("#loading-pergunta")
const telaPrioridade = document.querySelector("#prioridades")
let nomeCidade;
const botaoDesativar = document.querySelector("#desativar-economia")
const botaoSenhaVisivelLogin = document.querySelector("#senha-login-visivel")
const botaoSenhaInvisivelLogin = document.querySelector("#senha-login-invisivel")
const botaoConfirmarSenhaVisivelCriar = document.querySelector("#confirmar-senha-criar-conta-visivel")
const botaoConfirmarSenhaInvisivelCriar = document.querySelector("#confirmar-senha-criar-conta-invisivel")
const botaoSenhaVisivelCriar = document.querySelector("#senha-criar-conta-visivel")
const botaoSenhaInvisivelCriar = document.querySelector("#senha-criar-conta-invisivel")
const botaoCriarConta = document.querySelector("#botao-criar-conta")
const botaoLogar = document.querySelector("#botao-logar")
const botaoCriarContaAba = document.querySelector("#botao-criar-conta-aba")
let logado = false
const botaoIaPergunta = document.querySelector("#btn-campo-ia")
const botaoLoginPagina = document.querySelector("#login")

let ipTasmota //lógica do ip (se contém 1, ele existe algo do tipo)
let linkIpTasmota  = `http://${ipTasmota}`


botaoLoginPagina.addEventListener("click", ()=>{
        document.querySelector("#email-login").value = ''
        document.querySelector("#senha-login").value = ''
        document.querySelector("#aviso-login").textContent = ''
})

botaoCriarContaAba.addEventListener("click",()=>{
        document.querySelector("#email-criar-conta").value = ''
        document.querySelector("#senha-criar-conta").value = ''
        document.querySelector("#confirmar-senha").value = ''
        document.querySelector("#aviso-criar-conta").textContent = ''
})

botaoCampoIa.addEventListener("click", ()=>{
        document.querySelector("#pergunta-ia").value = ''
})

async function comandoGraficos() {
        await gerandoTodosGraficos()
        ativandoBotaoGrafico()
}

verCidade.addEventListener("click", ()=>{
        nomeCidade = document.querySelector("#nome-cidade").value //armazena o nome que está no #nome-cidade 
        document.querySelector("#nome-cidade").value = "" 
})

fecharVerCidade.addEventListener("click",()=>{
        document.querySelector("#nome-cidade").value = nomeCidade //pega o nome da cidade que foi armazenado e adiciona no input para não quebrar os botões
})

botao.addEventListener("click", async (evento)=>{
        const botoesGrafico = document.querySelectorAll(".botao-grafico")
        botoesGrafico.forEach(botaoGrafico => {
                botaoGrafico.classList.remove("selecionado")
        });
        apiFuncoes.limparLista()
        const horas = await conjuntoItensFor("time")
        const temperatura = await conjuntoItensFor("mintemp_c")
        const velocidadeVento = await conjuntoItensFor("wind_kph")
        const milimetros = await conjuntoItensFor("precip_mm")
        const chanceChuva = await conjuntoItensFor("chance_of_rain")
        const nuvens = await conjuntoItensFor("cloud")
        apiFuncoes.pegarDadosTemperatura(temperatura)
        apiFuncoes.pegarDadosVento(velocidadeVento)
        apiFuncoes.pegarDadosMilimetrosChuva(milimetros)
        apiFuncoes.pegarDadosChanceChuva(chanceChuva)
        apiFuncoes.pegarDadosNuvem(nuvens)
        await comandoGraficos()
        const offcanvasCidade = document.querySelector('#offcanvasTop')
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasCidade) || new bootstrap.Offcanvas(offcanvasCidade)
        offcanvas.hide()

})

botaoEconomia.addEventListener("click", async()=>{
        if(logado){
                try{
                        fetch(`${linkIpTasmota}/cm?cmnd=Power%20On`)
                        .then(response=> response.json())
                        .then(data=>console.log(data))
                }catch(error){
                        alert(`Deu merda${error}`)
                }
                alert("Alexa: Ok, economia de energia será ativada.")
        }else{
                alert("Entre na conta para ativar o modo economia")
        }
})

botaoDesativar.addEventListener("click", async()=>{
        if(logado){
                try{
                        fetch(`${linkIpTasmota}/cm?cmnd=Power%20Off`)
                        .then(response=> response.json())
                        .then(data=>console.log(data))        
                }catch(error){
                        alert(`Deu merda${error}`)
                }
                alert("Alexa: Ok, modo econômia desativado")  
        }else{
                alert("Entre na conta para desativar o modo economia")
        }
})

document.addEventListener("click", async (evento) => {
        if (evento.target.matches("button[value='recomendacao']") && evento.target.classList.contains("btn-danger")) {
                try{
                        fetch(`${linkIpTasmota}/cm?cmnd=Power%20On`)
                        .then(response=> response.json())
                        .then(data=>console.log(data))
                        apiFuncoes.limparLista()
                        if(!listaAtual.querySelector("li")){ //se na lista atual não tiver li
                               mensagemAviso.textContent = "Não há recomendações no momento"
                        }
                        else{
                                mensagemAviso.textContent = ''
                        }
                }catch(error){
                        alert(`Deu merda ${error}`)
                }
                alert("Alexa: Ok, modo econômia ativado")
        }
        else if(evento.target.matches("button[value='recomendacao']") && evento.target.classList.contains("border-secondary")){
                const liAtual = evento.target.closest('li')
                liAtual.remove()
                if(!listaAtual.querySelector("li")){
                        mensagemAviso.textContent = "Não há recomendações no momento"
                }
                else{
                        mensagemAviso.textContent = ''
                }
        }
})

botaoIaPergunta.addEventListener("click",()=>{
        const campoIa = document.querySelector("#lista-resposta-ia")
        campoIa.innerHTML = ''
})

botaoIaDuvida.addEventListener("click", async(evento)=>{
        const campoIa = document.querySelector("#lista-resposta-ia")
        if(logado){
                try{
                loadingPergunta.style.display = 'block'
                campoIa.innerHTML=''
                const pergunta = document.querySelector('#pergunta-ia').value
                const resposta = await fetch('http://127.0.0.1:5001/iaDuvidas', { //envia uma requisição post para o back com a pergunta do usuário
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'}, //diz que o que está sendo enviado é um JSON
                        body: JSON.stringify({pergunta}) //transforma a pergunta em um JSON
                });
                const dados = await resposta.json()
                document.querySelector("#pergunta-ia").value = ''
                const respostaIa = document.createElement('p')
                respostaIa.classList.add('resposta-ia')
                loadingPergunta.style.display='none'
                respostaIa.textContent = ''
                respostaIa.textContent = dados.resposta
                campoIa.appendChild(respostaIa)
        }
        catch(error){
                loadingPergunta.style.display='none'
                const respostaIa = document.createElement('p')
                respostaIa.classList.add('resposta-ia')
                loadingPergunta.style.display='none'
                respostaIa.textContent = ''
                respostaIa.textContent='Não foi possível carregar a resposta'
                campoIa.appendChild(respostaIa)
                alert(`Erro ao carregar a ia: ${error}`)
        }
        }else{
                loadingPergunta.style.display='none'
                const respostaIa = document.createElement('p')
                respostaIa.classList.add('resposta-ia')
                campoIa.appendChild(respostaIa)
                respostaIa.textContent = 'Entre com sua conta para acessar a ia'
        }
})

botaoRecomendacaoIa.addEventListener("click", async ()=>{
        if(logado){
                try{
                        nomeCidade = document.querySelector("#nome-cidade").value
                        loadingRecomendacao.style.display ='block'
                        campoRecomendacaoIa.textContent=''
                        campoRecomendacaoIa.textContent='Carregando...'
                        const resposta = await  fetch ("http://127.0.0.1:5000/iaRecomendacao",{
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'}, //diz que o que está sendo enviado é um JSON
                                body: JSON.stringify({cidade: nomeCidade}) //transforma a pergunta em um JSON
                        })
                        campoRecomendacaoIa.textContent='Analisando dados'
                        const respostaIa = await resposta.json()
                        loadingRecomendacao.style.display = 'none'
                        campoRecomendacaoIa.textContent=''
                        campoRecomendacaoIa.textContent = respostaIa.resposta
                }catch(error){
                        loadingRecomendacao.style.display = 'none'
                        campoRecomendacaoIa.textContent='Não foi possível carregar a resposta'
                        alert(`Erro ao gerar recomendacao: ${error}`)
                }
        }else{
                loadingRecomendacao.style.display = 'none'
                campoRecomendacaoIa.textContent='Entre com sua conta para acessar a ia'
        }
})



botaoSenhaVisivelLogin.addEventListener("click",()=>{
        funcoesLogin.visualizarSenhaLogin()
})


botaoSenhaInvisivelLogin.addEventListener("click",()=>{
        funcoesLogin.senhaLoginInvisivel()
})

botaoConfirmarSenhaVisivelCriar.addEventListener("click",()=>{
        funcoesLogin.visualizarConfirmarSenhaCriar()
})

botaoConfirmarSenhaInvisivelCriar.addEventListener("click",()=>{
        funcoesLogin.confirmarSenhaInvisivel()
})

botaoSenhaVisivelCriar.addEventListener("click",()=>{
        funcoesLogin.visualizarSenhaCriar()
})

botaoSenhaInvisivelCriar.addEventListener("click",()=>{
        funcoesLogin.senhaInvisivelCriar()
})

botaoCriarConta.addEventListener("click",async ()=>{
        let contaCriada = funcoesLogin.validacaoCriarConta()
        if(contaCriada){
                const email = document.querySelector("#email-criar-conta").value
                const senha = document.querySelector("#senha-criar-conta").value
                try {
                        const response = await fetch('http://127.0.0.1:5003/users', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({email,senha})
                        });
                        const text = await response.text()
                        const data = JSON.parse(text)
                        const mensagemErro = data.error
                        const avisoCriarConta = document.querySelector("#aviso-criar-conta")
                        if(mensagemErro === 'Email já cadastrado'){
                                avisoCriarConta.textContent = data.error
                                contaCriada = false
                        }else{
                                alert("Bem vindo aos serviços Goodwe")
                                avisoCriarConta.textContent = ''
                                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasCriarConta) || new bootstrap.Offcanvas(offcanvasCriarConta)
                                offcanvas.hide()
                        }
                      } catch (error) {
                        console.error(error)
                        alert(`${error}`)
                      }
        }else{
                return 0
        }
})

botaoLogar.addEventListener("click",async ()=>{
        logado = funcoesLogin.confirmarLogin()
        if(logado){
                let emailLogin = document.querySelector("#email-login").value
                let senhaLogin = document.querySelector("#senha-login").value
                const offcanvasLogin = document.querySelector('#offcanvasLogin')
                let avisoLogin = document.querySelector("#aviso-login")
                try{
                        const response = await fetch('http://127.0.0.1:5003/buscarLogin',{
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({emailLogin,senhaLogin})
                        })
                        const text = await response.text()
                        const data = JSON.parse(text)
                        const mensagemErro = data.error
                        const mensagemSucesso = data.message
                        if(mensagemErro===''){
                                alert(mensagemSucesso)
                                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasLogin) || new bootstrap.Offcanvas(offcanvasLogin)
                                offcanvas.hide()
                        }else{
                                avisoLogin.textContent=mensagemErro
                                logado = false
                        }
                }catch(error){
                        alert(`Erro na validação do login: ${error}`)
                }
        }
})