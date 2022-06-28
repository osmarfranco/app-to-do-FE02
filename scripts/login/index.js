/* Captura os inputs que serão manipulados */
let emailLogin = document.getElementById("inputEmail");
let passwordLogin = document.getElementById("inputPassword");
let botaoLogin = document.getElementById("botaoLogin");
const toastSucesso = document.getElementById('toastSucesso');
const toastFracasso = document.getElementById('toastFracasso');
let emailValidado = false
let senhaValidada = false
let token

/* Altera o botão de acesso quando está bloqueado */
botaoLogin.style.backgroundColor = "#979292A1";
botaoLogin.innerText = "Acessar";


/* Define um objeto para o usuário */
let objetoUsuario = {
    email: "",
    password: ""
}

/* Adiciona o evento de click ao botão */
botaoLogin.addEventListener("click", function (evento) {

    //Verifica a validação
    if (validaLogin(emailLogin.value, passwordLogin.value)) {

        evento.preventDefault();

        /* Normalização das informações*/
        emailLogin = normalizaTextoRetiraEspacos(emailLogin.value);
        ;

        //Atribui as informações normalizadas ao objeto do usuário (em JS)
        objetoUsuario.email = emailLogin
        objetoUsuario.password = passwordLogin.value;


        //Transforma o objeto JS em objeto JSON(textual)
        let objetoUsuarioEmJson = JSON.stringify(objetoUsuario);

        //console.log(objetoUsuarioEmJson);
        
        let configRequest = {
            method:"POST",
            headers: {
                "Content-type": "Application/json"
            },
            body: objetoUsuarioEmJson
        }
        
        fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", configRequest)
        .then(
            resultado => {
                //Verifica se ocorreu sucesso ao fazer o login
                if (resultado.status == 201 || resultado.status == 200) {
                    return resultado.json();
                } else {
                    //Lança uma exceção em caso de erro no login
                    throw resultado;
                }
            }
        ).then(
            resultado => {
                //Ao obter sucesso, chama a função de sucesso do login
                loginSucesso(resultado);
                
            }
        ).catch(
            erro => {
                //Verifica os status de "senha incorreta ou email incorreto"
                if (erro.status == 400 || erro.status == 404) {
                    //Ao obter algum desses status, chama a função erro no login
                    loginErro("Email e/ou senha inválidos");
                    
                }

            }
        );

} else {
    console.log("Login inválido");
}

});

function loginSucesso(resultadoSucesso) {
    sessionStorage.setItem("authorization", resultadoSucesso.jwt)
    token = sessionStorage.getItem("authorization")
    console.log(token);
    const toast = new bootstrap.Toast(toastSucesso)

    toast.show()
    
}

function loginErro(resultadoErro) {
    console.log(resultadoErro);
    const toast = new bootstrap.Toast(toastFracasso)

    toast.show()
    
}


/* Verificando o input de email */
emailLogin.addEventListener("blur", () => {

    let validacaoEmail = document.getElementById("validacaoEmail");

    if (emailLogin.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        validacaoEmail.innerText = ""
        emailLogin.style.border = "2px solid transparent "
        emailValidado = true
    } else {
        validacaoEmail.innerText = "Email errado"

        emailLogin.style.border = "2px solid #E9554EBB"
        
    }
    validaLogin(emailLogin.value, passwordLogin.value);
});

/* Verificando o input de senha */
passwordLogin.addEventListener("blur", () => {

    let validacaoSenha = document.getElementById("validacaoSenha");
    

    if (passwordLogin.value) {
        validacaoSenha.innerText = ""
        passwordLogin.style.border = "2px solid transparent"
        
        
    } else {
        validacaoSenha.innerText = "Campo obrigatório"
        passwordLogin.style.border = "2px solid #E9554EBB"
        
    }

    validaLogin(emailLogin.value, passwordLogin.value);
});



/* Função que valida o acesso na página de login */
function validaLogin(email, password) {

    if (email && password) {
        //True
        botaoLogin.removeAttribute("disabled")
        botaoLogin.style.backgroundColor = "#7898FF";
        botaoLogin.innerText = "Acessar";
        return true;

    } else {
        //False
        botaoLogin.setAttribute("disabled", "true")
        botaoLogin.style.backgroundColor = "#979292A1";
        botaoLogin.innerText = "Bloqueado";
        return false;
    }
}
