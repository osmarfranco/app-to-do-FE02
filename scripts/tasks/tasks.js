/* ---------- VARIABLES ---------- */
const NEW_TASK = document.getElementById('novaTarefa')
const NEW_TASK_BTN = document.getElementById('botaoNovaTarefa')
const TASK_DESCRIPTION = document.getElementById('teste')

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
            // nameInitialsOnUserImage(responseConvert)
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

// function nameInitialsOnUserImage(objUser) {
//     let div = document.getElementById('user-id')
//     let initials = objUser.firstName[0] + objUser.lastName[0]

//     div.innerHTML += `<p>${initials}</p>`
//     console.log(objUser.firstName[0] + objUser.lastName[0])
// }

function getTasks(tasks){
    let teste = tasks[0].createdAt
    console.log()
    
    for ( i of tasks){
        let date = new Date(i.createdAt)
        let dateConvert = date.toLocaleDateString()
        
        let itemlist = `
        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
        <p class="nome">${i.description}</p>
        <p class="timestamp">${dateConvert}</p>
        </div>
        </li>`

        TASK_DESCRIPTION.innerHTML += itemlist
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
          console.log(data.json())
          location.reload()
      } else {
        throw data
      }
    } catch (error) {
      if (error.status == 400 || error.status == 401) {
        console.log("Algo deu errado e a tarefa não foi criada")  
      }
    }
  }

/* ---------- EVENT LISTENERS ---------- */
onload = function () {
    let tokenJwt = sessionStorage.getItem("jwt")
    
    if (!tokenJwt) {
        alert("You shall not pass!!")
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