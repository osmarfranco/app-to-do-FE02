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

let tokenJwt = sessionStorage.getItem("jwt")
let recipient;
let completed = {
    "completed": true
}



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
            
            setTimeout(() => {
                removerSkeleton(".tarefas-pendentes")
                removerSkeleton(".tarefas-terminadas")
                renderizaTarefas(responseConvert);
            }, 1500);
            
            

        } else {
            throw "Problema ao buscar tarefas"
        }
    } catch (error) {
        removerSkeleton(".tarefas-pendentes")
        removerSkeleton(".tarefas-terminadas")
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
        createTaskSuccess()

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
        renderizarSkeletons(4, ".tarefas-pendentes")
        renderizarSkeletons(4, ".tarefas-terminadas")
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

NEW_TASK_BTN.addEventListener('click', async (event) => {
    event.preventDefault()

    let tokenJwt = sessionStorage.getItem("jwt")
    let newTask = {
        description: normalizeTextRemoveSpaces(NEW_TASK.value),
        completed: false
    }
    
    await newTaskApi(JSON.stringify(newTask), tokenJwt)
    await getUserTasks(tokenJwt)
    NEW_TASK.value = '';
    
})

FINISH_SESSION.addEventListener('click', (event) => {
    if(event) {
        sessionStorage.removeItem("jwt")
        window.location.href = 'index.html'
    }
})



