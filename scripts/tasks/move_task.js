let listaUL = document.querySelector(".tarefas-pendentes");
let listaULTerminadas = document.querySelector(".tarefas-terminadas");
let taskId;
let tarefa;

//Altera o completed para true
async  function editTasks(id, token, JSON){
    
    let configRequest = {
        method: "PUT",
        headers: {
            
            "Content-Type": 'application/json',
            "Authorization": token       
        },
        
        body: JSON
    }
    try {
        let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
        if(data.status == 200 || data.status == 201) {
           editTaskSuccess()
            
        }

    } catch (error) {
        console.log(error)
        toastError()
    }

}

async  function editTasksDescription(id, token, body){
    
    let configRequest = {
        method: "PUT",
        headers: {
            
            "Content-Type": 'application/json',
            "Authorization": token       
        },
        
        body: JSON.stringify(body)
    }
    try {
        let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
        if(data.status == 200 || data.status == 201) {
           editTaskSuccess()
        }

    } catch (error) {
        console.log(error)
        toastError()
    }

}

//Altera o completed para false
async  function returnTasks(id, token, JSON){
    let configRequest = {
        method: "PUT",
        headers: {
            
            "Content-Type": 'application/json',
            "Authorization": token       
        },
        
        body: JSON
    }
    try {
        let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
        if(data.status == 200 || data.status == 201) {
           editTaskSuccess()
            
        }

    } catch (error) {
        console.log(error)
        toastError()
    }
}

//Deletar tarefa 
async  function dellTask(id, token){
    let configRequest = {
        method: "DELETE",
        headers: {
            "Authorization": token           
        }
        
}
try {
    let data = await fetch(ENDPOINT_TASKS + "/" + id , configRequest)
    if(data.status == 200) {
        deleteTaskSuccess()
    }

} catch (error) {
    console.log(error)
    toastError()
}
}

async  function coletaDadosTasks(id, token){
    let configRequest = {
        method: "GET",
        headers: {
            "Authorization": token,
            "id": id
            
        },
        redirect: 'follow'
    }
    try {
        let data = await fetch(ENDPOINT_TASKS + "/" + id , configRequest)
        if (data.status == 200) {
            let responseConvert = await data.json();
            taskId = responseConvert.id
            tarefa = responseConvert
           
            

        } else {
            throw "Problema ao buscar tarefas"
        }


    } catch (error) {
        console.log(error)
        toastError()
    }

}



//pega as informações e renderiza as tarefas na tela
function renderizaTarefas(tarefa){
    listaUL = document.querySelector(".tarefas-pendentes");
    listaULTerminadas = document.querySelector(".tarefas-terminadas");

    for( tarefas of tarefa){
    if(tarefas.completed == false){
        let date = new Date(tarefas.createdAt)
        let dateConvert = date.toLocaleDateString()
        let hourConvert = date.toLocaleTimeString()

        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.setAttribute("id", tarefas.id);
        li.innerHTML = 
        `
        <div class="not-done"  onClick="trocarTarefa(${tarefas.id})"> </div>
        <div class="descricao" onClick="editarTarefa(${tarefas.id})">
            <p class="nome">${tarefas.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dateConvert} às ${hourConvert}</p>
        </div>

        `;

        listaUL.appendChild(li);
    }   else {  
        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.setAttribute("id", tarefas.id);
        li.innerHTML = 
        `
        <div class="done"> </div>
        <div class="descricao">
            <p class="nome">${tarefas.description}</p>
            <div>
                <button><i id="${tarefas.id}" class="fas fa-undo-alt change" onClick="voltarTarefa(${tarefas.id})"></i></button>
                <button onClick="deletaTarefa(${tarefas.id})"><i id="${tarefas.id}" class="far fa-trash-alt" ></i></button>
            </div>
        </div>

        `;

        listaULTerminadas.appendChild(li);
}

}}

async function renderizaUmaTarefa(tarefa){
    listaUL = document.querySelector(".tarefas-pendentes");
    listaULTerminadas = document.querySelector(".tarefas-terminadas");

    if(tarefa.completed == false){
        let elementPai = document.getElementById(`${tarefa.id}`)
        elementPai.remove()
        
        
        let date = new Date(tarefa.createdAt)
        let dateConvert = date.toLocaleDateString()
        let hourConvert = date.toLocaleTimeString()
        
        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.setAttribute("id", tarefa.id)
        li.innerHTML = 
        `
        <div class="not-done" onClick="trocarTarefa(${tarefa.id})"> </div>
        <div class="descricao" onClick="editarTarefa(${tarefa.id})">
            <p class="nome">${tarefa.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dateConvert} às ${hourConvert}</p>
        </div>
        </li>
        `;

        listaUL.appendChild(li);
    }   else if (tarefa.completed == true){
        let elementPai = document.getElementById(`${tarefa.id}`)
        elementPai.remove()
        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.setAttribute("id", tarefa.id)
        li.innerHTML = 
        `
        <div class="done"> </div>
        <div class="descricao">
            <p class="nome">${tarefa.description}</p>
            <div>
                <button><i id="${tarefa.id}" class="fas fa-undo-alt change" onClick="voltarTarefa(${tarefa.id})"></i></button>
                <button onClick="deletaTarefa(${tarefa.id})"><i id="${tarefa.id}" class="far fa-trash-alt" ></i></button>
            </div>
        </div>

        `;

        listaULTerminadas.appendChild(li);
    } else {

    }


}

// função que é chamada quando se clica na div not-done
async function trocarTarefa(id){
    let JSON = "{\r\n  \"completed\": true\r\n}";
    editTasks(id, sessionStorage.getItem("jwt"), JSON)
    await coletaDadosTasks(id, sessionStorage.getItem("jwt"))
    await tarefa
    renderizaUmaTarefa(tarefa)

    
  
}

async function trocarDescricao(id){
    let conteudo = document.getElementById('editandoTarefa')
    taskId = id
    let body = {
        "description": conteudo.value
    }
    await editTasksDescription(taskId, sessionStorage.getItem("jwt"), body)
    await coletaDadosTasks(taskId, sessionStorage.getItem("jwt"))
    await tarefa
    renderizaUmaTarefa(tarefa)
}

// função que é chamada quando se clica no botão da class "fas fa-undo-alt change"
async function voltarTarefa(id){
    let JSON = "{\r\n  \"completed\": false\r\n}";
    returnTasks(id, sessionStorage.getItem("jwt"), JSON)
    await coletaDadosTasks(id, sessionStorage.getItem("jwt"))
    await tarefa
    renderizaUmaTarefa(tarefa)
}

function deletaTarefa(id){  
    dellTask(id, sessionStorage.getItem("jwt"))
    let elementPai = document.getElementById(id)
        elementPai.remove()
}


// Transforma o campo da tarefa em input
function editarTarefa(id){
    let elemento = document.getElementById(id)
    let descricao = elemento.children[1].children[0].innerText
    elemento.innerHTML = 
    `
    <div class="not-done" onClick="trocarTarefa(${id})"> </div>
    <div class="descricao">
      <form class="editar-tarefa">
        <input id="editandoTarefa" type="text">
        <button id="editar-tarefa" class="button-blocked" type="button" onClick="trocarDescricao(${id}) disabled">
          <img src="./assets/ok.png" alt="Adicionar uma nova tarefa">
        </button>
      </form>
    </div>
    </li>
    `
    let conteudo = document.getElementById('editandoTarefa')
    conteudo.value = descricao

    // Event Listeners para os elementos recém criados
    const EDIT_TASK = document.getElementById('editandoTarefa')
    const EDIT_TASK_BTN = document.getElementById('editar-tarefa')

    EDIT_TASK.addEventListener('input', () => {
        if(EDIT_TASK.value.match(VALID_TASK_REQ)){
            EDIT_TASK_BTN.classList.remove('button-blocked')
            EDIT_TASK_BTN.classList.add('button-default')
            EDIT_TASK_BTN.removeAttribute('disabled')
        } else {
            EDIT_TASK_BTN.classList.add('button-blocked')
            EDIT_TASK_BTN.classList.remove('button-default')
            EDIT_TASK_BTN.setAttribute('disabled', true)
        }
    })

    EDIT_TASK_BTN.addEventListener('click', () => {
        trocarDescricao(id)
    })
}