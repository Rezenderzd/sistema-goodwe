const funcoesLogin = {
    fecharOffCanvasLogin(){
        const offcanvasLogin =  document.querySelector("#offcanvasLogin")
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasLogin) || new bootstrap.Offcanvas(offcanvasLogin)
        offcanvas.hide()
    },
    fecharOffCanvasLogin(){
        const offcanvasCriarConta = document.querySelector("#offcanvasCriarConta")
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasCriarConta) || new bootstrap.Offcanvas(offcanvasCriarConta)
        offcanvas.hide()
    },
    visualizarSenhaCriar(){
        const botaoSenhaVisivelCriar = document.querySelector("#senha-criar-conta-visivel")
        const botaoSenhaInvisivelCriar = document.querySelector("#senha-criar-conta-invisivel")
        const inputSenhaCriar = document.querySelector("#senha-criar-conta")
        inputSenhaCriar.type='text'
        botaoSenhaVisivelCriar.classList.add("d-none")
        botaoSenhaInvisivelCriar.classList.remove("d-none")
    },
    senhaInvisivelCriar(){
        const botaoSenhaVisivelCriar = document.querySelector("#senha-criar-conta-visivel")
        const botaoSenhaInvisivelCriar = document.querySelector("#senha-criar-conta-invisivel")
        const inputSenhaCriar = document.querySelector("#senha-criar-conta")
        inputSenhaCriar.type='password'
        botaoSenhaVisivelCriar.classList.remove("d-none")
        botaoSenhaInvisivelCriar.classList.add("d-none")
    },
    visualizarConfirmarSenhaCriar(){
        const botaoConfirmarSenhaVisivelCriar = document.querySelector("#confirmar-senha-criar-conta-visivel")
        const botaoConfirmarSenhaInvisivelCriar = document.querySelector("#confirmar-senha-criar-conta-invisivel")
        const inputConfirmarSenhaCriar = document.querySelector("#confirmar-senha")
        inputConfirmarSenhaCriar.type='text'
        botaoConfirmarSenhaVisivelCriar.classList.add("d-none")
        botaoConfirmarSenhaInvisivelCriar.classList.remove("d-none")
    },
    confirmarSenhaInvisivel(){
        const botaoConfirmarSenhaVisivelCriar = document.querySelector("#confirmar-senha-criar-conta-visivel")
        const botaoConfirmarSenhaInvisivelCriar = document.querySelector("#confirmar-senha-criar-conta-invisivel")
        const inputSenhaCriar = document.querySelector("#confirmar-senha")
        inputSenhaCriar.type='password'
        botaoConfirmarSenhaVisivelCriar.classList.remove("d-none")
        botaoConfirmarSenhaInvisivelCriar.classList.add("d-none")
    },
    visualizarSenhaLogin(){
        const botaoSenhaVisivelLogin = document.querySelector("#senha-login-visivel")
        const botaoSenhaInvisiveLogin = document.querySelector("#senha-login-invisivel")
        const inputSenhaLogin = document.querySelector("#senha-login")
        inputSenhaLogin.type='text'
        botaoSenhaVisivelLogin.classList.add("d-none")
        botaoSenhaInvisiveLogin.classList.remove("d-none")
    },
    senhaLoginInvisivel(){
        const botaoSenhaVisivelLogin = document.querySelector("#senha-login-visivel")
        const botaoSenhaInvisivelLogin = document.querySelector("#senha-login-invisivel")
        const inputSenhaLogin = document.querySelector("#senha-login")
        inputSenhaLogin.type='password'
        botaoSenhaVisivelLogin.classList.remove("d-none")
        botaoSenhaInvisivelLogin.classList.add("d-none")
    },
    validacaoCriarConta(){
        let criarConta = false
        const senha = document.querySelector("#senha-criar-conta").value
        const confirmarSenha = document.querySelector("#confirmar-senha").value
        const email =document.querySelector("#email-criar-conta").value
        const offcanvasCriarConta = document.querySelector('#offcanvasCriarConta')
        const avisoCriarConta = document.querySelector("#aviso-criar-conta")
        if(senha===''||email==''||confirmarSenha==''){
            avisoCriarConta.textContent = "Preencha todos os campos antes de criar a conta"
        }else{
            if(senha!==confirmarSenha){
                avisoCriarConta.textContent = "Senhas não coincidem"
            }else{
                alert("Bem vindo aos serviços Goodwe")
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasCriarConta) || new bootstrap.Offcanvas(offcanvasCriarConta)
                offcanvas.hide()
                criarConta = true
                return criarConta
            } 
        }
    },
    confirmarLogin(){
        const campoEmail = document.querySelector("#email-login").value
        const campoSenha = document.querySelector("#senha-login").value
        const offcanvasLogin = document.querySelector('#offcanvasLogin')
        const avisoLogin = document.querySelector("#aviso-login")
        if(campoEmail==''||campoSenha==''){
            avisoLogin.textContent = "Preencha todos os campos para efetuar o login"
        }else{
            alert("Logado com sucesso")
            let login = true
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasLogin) || new bootstrap.Offcanvas(offcanvasLogin)
            offcanvas.hide()
            return login
        }
    }
}

export default funcoesLogin

