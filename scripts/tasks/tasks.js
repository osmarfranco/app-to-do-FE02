/* ---------- VARIABLES ---------- */
const NEW_TASK = document.getElementById('novaTarefa')
const NEW_TASK_BTN = document.getElementById('botaoNovaTarefa')
//const TASK_DESCRIPTION = document.getElementById('teste')
const TASK_DESCRIPTION = document.querySelector('.tarefas-pendentes')
//const TASK_DONE = document.getElementById('terminadas')
const TASK_DONE = document.querySelector('.tarefas-terminadas')



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
    for ( i of tasks){
        let date = new Date(i.createdAt)
        let dateConvert = date.toLocaleDateString()
        
        if (i.completed == true){
            let itemlistdone = `
            <li class="tarefa" id="${i.id}">
            <div class="not-done"></div>
            <div class="descricao">
            <p class="nome">${i.description}</p>
            <p class="timestamp">${dateConvert}</p>
            </div>
            </li>`    
            
            TASK_DONE.innerHTML += itemlistdone

        } else{
        
        let itemlist = `
        <li class="tarefa">
        <div class="not-done" id="${i.id}"></div>
        <div class="descricao">
        <p class="nome">${i.description}</p>
        <p class="timestamp">${dateConvert}</p>
        </div>
        </li>`

        TASK_DESCRIPTION.innerHTML += itemlist

        }
        
    }
}

async  function editTasks(id, token){
    let configRequest = {
        method: "PUT",
        headers: {
            "Authorization": token,
            "Content-Type": 'application/json'            
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

        } else {
            throw "Problema ao buscar tarefas"
        }

    } catch (error) {
        
    }

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

// Visualiza evente do clique e carrega os elementos captados pelo clique no "i"
document.addEventListener('click', (i) =>{
    let tokenJwt = sessionStorage.getItem("jwt")
    // Avalia se o elemento clicado é a div com a classe 'not-done' dentro da ul "tarefas-pendentes" 
    if (i.path[0].classList == 'not-done' && i.path[2].classList == 'tarefas-pendentes' ){
        let pai = i.path[2]
        let filho = i.path[1].outerHTML
        TASK_DONE.innerHTML += filho
        pai.removeChild(i.path[1])
        editTasks(i.path[0].id, tokenJwt)
         
    // Avalia se o elemento clicado é a div com a classe 'not-done' dentro da ul "tarefas-terminadas" 
    } else if (i.path[0].classList == 'not-done' && i.path[2].classList == 'tarefas-terminadas'){
        let pai = i.path[2]
        let filho = i.path[1].outerHTML
        TASK_DESCRIPTION.innerHTML += filho
        pai.removeChild(i.path[1])
    }
})
