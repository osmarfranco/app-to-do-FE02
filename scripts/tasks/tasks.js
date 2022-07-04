/* ---------- VARIABLES ---------- */
const NEW_TASK = document.getElementById('novaTarefa')
const NEW_TASK_BTN = document.getElementById('botaoNovaTarefa')
const FINISH_SESSION = document.getElementById('closeApp')
const TASK_DESCRIPTION = document.querySelector('.tarefas-pendentes')
const TASK_DONE = document.querySelector('.tarefas-terminadas')

const TOAST_CREATE_SUCCESS = document.getElementById('toastSuccessCreateTask')
const TOAST_EDIT_SUCCESS = document.getElementById('toastSuccessEditTask')
const TOAST_DELETE_SUCCESS = document.getElementById('toastSuccessDeleteTask')
const TOAST_ERROR = document.getElementById('toastFail')
const exampleModal = document.getElementById('exampleModal')
let teste;
let tokenJwt = sessionStorage.getItem("jwt")
let recipient;



/* ---------- FUNCTIONS ---------- */
async  function getDataUser(token) { 
    let configRequest = {
        headers: {
            "Authorization": token
        }
    }
    try {
        let data = await fetch(ENDPOINT_USERS_GETME, configRequest)
        
        if (data.status == 200) {
            let responseConvert = await data.json();

            nameInNavBar(responseConvert)
            nameInitialsAvatar(responseConvert)
        } else {
            throw "Problema ao buscar usuário"
        } 
    } catch (error) {
        console.log(error)
    }
}

async  function getUserTasks(token) {
    let configRequest = {
        headers: {
            "Authorization": token
        }
    }
    try {
        let data = await fetch(ENDPOINT_TASKS, configRequest)
        
        if (data.status == 200) {
            let responseConvert = await data.json();
            
            getTasks(responseConvert)
        } else {
            throw "Problema ao buscar tarefas"
        }
    } catch (error) {
        console.log(error)
    }
}

function nameInNavBar(objUser) {
    let p = document.querySelector("#nomeUsuario")
    
    p.innerText = `${objUser.firstName} ${objUser.lastName}`
}

// Cria um avatar com as iniciais do usuário
function nameInitialsAvatar(objUser) {
    let img = document.getElementById('user-image')
    let avatarUrl = `https://ui-avatars.com/api/?name=${objUser.firstName}+${objUser.lastName}&bold=true&rounded=true`

    img.setAttribute('src', avatarUrl)
}

function getTasks(tasks){
    for ( i of tasks){
        let date = new Date(i.createdAt)
        let dateConvert = date.toLocaleDateString()
        
        if (i.completed == true){
            let itemlistdone = `
            <li class="tarefa" id="${i.id}">
            <div class="done"></div>
            <div class="descricao">
            <p class="nome">${i.description}</p>
            <div>
            <button><i id="${i.id}" class="fas fa-undo-alt change"></i></button>
            <button><i id="${i.id}" class="far fa-trash-alt"></i></button>
            </div>

            
            </div>
            </li>`    
            
            TASK_DONE.innerHTML += itemlistdone

        } else{
        
        let itemlist = `
        <li class="tarefa">
        <div class="not-done" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${i.id}"> </div>
        <div class="descricao">
        <p class="nome">${i.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dateConvert}</p>
        
        </div>
        </li>`

        TASK_DESCRIPTION.innerHTML += itemlist

        }
        
    }
}

async function newTaskApi(object, token) {
    let configRequest = {
        method:"POST",
        headers: {
            "Content-type": "Application/json",
            "Authorization": token
        },
        body: object
      }
    try {
      let data = await fetch(ENDPOINT_TASKS, configRequest)
      
      if(data.status == 201 || data.status == 200) {
          console.log("Tarefa criada com sucesso")
          createTaskSuccess()
          console.log(data.json())
        //   location.reload()
      } else {
        throw data
      }
    } catch (error) {
      if (error.status == 400 || error.status == 401) {
        console.log("Algo deu errado e a tarefa não foi criada")
        toastError()  
      }
    }
  }

  async  function editTasks(id, token){
    
    let configRequest = {
        method: "PUT",
        headers: {
            
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": token       
        },
        
        body:{
            "completed": true
        }
    }
    try {
        let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
        if (data.status == 200 || data.status == 201) {
            let responseConvert = await data.json();
            console.log(responseConvert)
            console.log(configRequest)
            editTaskSuccess()
        } else {
            throw "Problema ao buscar tarefas"
        }

    } catch (error) {
        console.log(error)
        toastError()
    }

}

async  function getTasksById(token, id) {
    
    let configRequest = {
        headers: {
            "Authorization": token
        }
    }
    try {
        let data = await fetch(ENDPOINT_TASKS + "/" + id, configRequest)
        
        if (data.status == 200) {
            let responseConvert = await data.json();
            
            recipient = responseConvert;
            console.log(recipient)
            
        } else {
            throw "Problema ao buscar tarefas"
        }
    } catch (error) {
        console.log(error)
    }
}


// Toasts
function createTaskSuccess() {
    const toast = new bootstrap.Toast(TOAST_CREATE_SUCCESS)
    toast.show() 
  }

function editTaskSuccess() {
    const toast = new bootstrap.Toast(TOAST_EDIT_SUCCESS)
    toast.show() 
  }

function deleteTaskSuccess() {
    const toast = new bootstrap.Toast(TOAST_DELETE_SUCCESS)
    toast.show() 
  }

function toastError() {
    const toast = new bootstrap.Toast(TOAST_ERROR)
    toast.show() 
  }

/* ---------- EVENT LISTENERS ---------- */
onload = function () {
    let tokenJwt = sessionStorage.getItem("jwt")
    
    if (!tokenJwt) {
        alert("You shall not pass!!")
        //retorna usuário não logado a página principal
        window.location.href = 'index.html'
    } else {
        getDataUser(tokenJwt)
        getUserTasks(tokenJwt)
    }
}

NEW_TASK.addEventListener('input', () => {
    if(NEW_TASK.value.match(VALID_TASK_REQ)){
        NEW_TASK_BTN.classList.remove('button-blocked')
        NEW_TASK_BTN.classList.add('button-default')
        NEW_TASK_BTN.removeAttribute('disabled')
    } else {
        NEW_TASK_BTN.classList.add('button-blocked')
        NEW_TASK_BTN.classList.remove('button-default')
        NEW_TASK_BTN.setAttribute('disabled', true)
    }
})

NEW_TASK_BTN.addEventListener('click', (event) => {
    event.preventDefault()

    let tokenJwt = sessionStorage.getItem("jwt")
    let newTask = {
        description: normalizeTextRemoveSpaces(NEW_TASK.value),
        completed: false
    }
    
    newTaskApi(JSON.stringify(newTask), tokenJwt)
})

FINISH_SESSION.addEventListener('click', (event) => {
    if(event) {
        sessionStorage.removeItem("jwt")
        window.location.href = 'index.html'
    }
})

// Visualiza evente do clique e carrega os elementos captados pelo clique no "i"
document.addEventListener('click', (i) =>{
    let tokenJwt = sessionStorage.getItem("jwt")
    // Avalia se o elemento clicado é a div com a classe 'not-done' dentro da ul "tarefas-pendentes" 
    if (i.path[0].classList == 'not-done' && i.path[2].classList == 'tarefas-pendentes' ){
        let teste = i.path[0].id
        let pai = i.path[2]
        let filho = i.path[1].outerHTML
        TASK_DONE.innerHTML += filho
        pai.removeChild(i.path[1])
        //editTasks(i.path[0].id, tokenJwt)

            exampleModal.addEventListener('shown.bs.modal', async () => {
                await getTasksById(tokenJwt, teste)
                const modalBodyTextarea = exampleModal.querySelector('.modal-body textarea')
        
                modalBodyTextarea.value = recipient.description
            })
        
        
         
    // Avalia se o elemento clicado é a div com a classe 'not-done' dentro da ul "tarefas-terminadas" 
    } else if (i.path[0].classList == 'not-done' && i.path[2].classList == 'tarefas-terminadas'){
        let pai = i.path[2]
        let filho = i.path[1].outerHTML
        TASK_DESCRIPTION.innerHTML += filho
        pai.removeChild(i.path[1])
    }
})



