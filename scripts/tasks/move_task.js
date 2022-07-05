let listaUL = document.querySelector(".tarefas-pendentes")
let listaULTerminadas = document.querySelector(".tarefas-terminadas")

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
        if (data.status == 200 || data.status == 201) {
            let responseConvert = await data.json();
            console.log(responseConvert);

        } else {
            throw "Problema ao buscar tarefas"
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
        if (data.status == 200 || data.status == 201) {
            let responseConvert = await data.json();
            console.log(responseConvert);

        } else {
            throw "Problema ao buscar tarefas"
        }

    } catch (error) {
        console.log(error)
        toastError()
    }

}

//pega as informções e renderiza as tarefas na tela
function renderizaTarefas(tarefa){
    for( tarefas of tarefa){
    if(tarefas.completed == false){
        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.innerHTML = 
        `
        <div class="not-done" id="${tarefas.id}" onClick="trocarTarefa(${tarefas.id})"> </div>
        <div class="descricao" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <p class="nome">${tarefas.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i> ${tarefas.createdAt}</p>
        </div>

        `;

        listaUL.appendChild(li);
    }   else {  
        let li = document.createElement("li");
        li.classList.add("tarefa");
        li.innerHTML = 
        `
        <div class="done" id="${tarefas.id}"> </div>
        <div class="descricao">
            <p class="nome">${tarefas.description}</p>
            <div>
                <button><i id="${tarefas.id}" class="fas fa-undo-alt change" onClick="voltarTarefa(${tarefas.id})"></i></button>
                <button><i id="${tarefas.id}" class="far fa-trash-alt"></i></button>
            </div>
        </div>

        `;

        listaULTerminadas.appendChild(li);
}

}}

// função que é chamada quando se clica na div not-done
function trocarTarefa(id){
    let JSON = "{\r\n  \"completed\": true\r\n}";
    editTasks(id, sessionStorage.getItem("jwt"), JSON)
}

// função que é chamada quando se clica no botão da class "fas fa-undo-alt change"
function voltarTarefa(id){
    let JSON = "{\r\n  \"completed\": false\r\n}";
    returnTasks(id, sessionStorage.getItem("jwt"), JSON)
}