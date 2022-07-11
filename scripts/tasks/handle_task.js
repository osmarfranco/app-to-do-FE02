/* ---------- VARIABLES ---------- */
let taskId
let task

/* ---------- FUNCTIONS ---------- */
function clearTasks() {
  let pendingTasksList = document.querySelector('.tarefas-pendentes')
  let finishedTasksList = document.querySelector('.tarefas-terminadas')

  pendingTasksList.innerHTML = ''
  finishedTasksList.innerHTML = ''
}

async function getTaskData(id, token) {
  let configRequest = {
    method: 'GET',
    headers: {
      Authorization: token,
      id: id
    },
    redirect: 'follow'
  }
  try {
    let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
    if (data.status == 200) {
      let responseConvert = await data.json()
      taskId = responseConvert.id
      task = responseConvert
    } else {
      throw 'Problema ao buscar tarefas'
    }
  } catch (error) {
    console.log(error)
    toastError()
  }
}

/* Criação de tarefas */
async function newTaskApi(object, token) {
  let configRequest = {
    method: 'POST',
    headers: {
      'Content-type': 'Application/json',
      Authorization: token
    },
    body: object
  }
  try {
    let data = await fetch(ENDPOINT_TASKS, configRequest)

    if (data.status == 201 || data.status == 200) {
      removeSpinnerNewTask()
      // clearTasks()
      // await getUserTasks(tokenJwt)
      createTaskSuccess()
    } else {
      throw data
    }
  } catch (error) {
    if (error.status == 400 || error.status == 401 || error.status == 500) {
      console.log('Algo deu errado e a tarefa não foi criada')
      removeSpinnerNewTask()
      toastError()
    }
  }
}

// Retorna a lista atualizada de tarefas após a criação de uma nova
async function getNewTaskList(token) {
  let configRequest = {
    headers: {
      Authorization: token
    }
  }
  try {
    let data = await fetch(ENDPOINT_TASKS, configRequest)

    if (data.status == 200) {
      let responseConvert = await data.json()

        renderTasks(responseConvert)
    } else {
      throw 'Problema ao buscar tarefas'
    }
  } catch (error) {
    console.log(error)
  }
}

/* Exclusão de tarefas */
async function deleteTaskApi(id, token) {
  let configRequest = {
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  }
  try {
    let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
    if (data.status == 200) {
      deleteTaskSuccess()
    }
  } catch (error) {
    console.log(error)
    toastError()
  }
}

function deleteTask(id) {
  deleteTaskApi(id, sessionStorage.getItem('jwt'))
  let parentElement = document.getElementById(id)
  parentElement.remove()
}

/* Mudanças de status das tarefas */
//Altera o completed para true (marca a tarefa como concluída)
async function markAsDoneApi(id, token, JSON) {
  let configRequest = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },

    body: JSON
  }
  try {
    let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
    if (data.status == 200 || data.status == 201) {
      editTaskSuccess()
    }
  } catch (error) {
    console.log(error)
    toastError()
  }
}

//Altera o completed para false (retorna para as tarefas pendentes)
async function returnTaskApi(id, token, JSON) {
  let configRequest = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },

    body: JSON
  }
  try {
    let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
    if (data.status == 200 || data.status == 201) {
      editTaskSuccess()
    }
  } catch (error) {
    console.log(error)
    toastError()
  }
}

// Marca a tarefa como terminada (é chamada quando se clica na div not-done)
async function markAsDone(id) {
  let JSON = '{\r\n  "completed": true\r\n}'
  await markAsDoneApi(id, sessionStorage.getItem('jwt'), JSON)
  await getTaskData(id, sessionStorage.getItem('jwt'))
  renderOnlyOneTask(task)
}

// Retorna para a lista de tarefas pendentes (é chamada quando se clica no botão da class "fas fa-undo-alt change")
async function returnTask(id) {
  let JSON = '{\r\n  "completed": false\r\n}'
  await returnTaskApi(id, sessionStorage.getItem('jwt'), JSON)
  await getTaskData(id, sessionStorage.getItem('jwt'))
  renderOnlyOneTask(task)
}

/* Alteração do conteúdo das tarefas */
async function changeDescriptionApi(id, token, body) {
  let configRequest = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },

    body: JSON.stringify(body)
  }
  try {
    let data = await fetch(ENDPOINT_TASKS + '/' + id, configRequest)
    if (data.status == 200 || data.status == 201) {
      editTaskSuccess()
    }
  } catch (error) {
    console.log(error)
    toastError()
  }
}

async function changeDescription(id) {
  let conteudo = document.getElementById('editandoTarefa')
  taskId = id
  let body = {
    description: conteudo.value
  }
  await changeDescriptionApi(taskId, sessionStorage.getItem('jwt'), body)
  await getTaskData(taskId, sessionStorage.getItem('jwt'))
  renderOnlyOneTask(task)
}

// Transforma o campo da tarefa em input
function editTask(id) {
  let element = document.getElementById(id)
  let description = element.children[1].children[0].innerText
  element.innerHTML = `
    <div class="not-done" onClick="markAsDone(${id})"> </div>
    <div class="descricao">
      <form class="editar-tarefa">
        <input id="editandoTarefa" type="text">
        <button id="editar-tarefa" class="button-blocked" type="button" onClick="changeDescription(${id}) disabled">
          <img id="editIMG"src="./assets/ok.png" alt="Confirmar alteração da sua tarefa">
        </button>
      </form>
    </div>
    </li>
    `
  let conteudo = document.getElementById('editandoTarefa')
  conteudo.value = description

  // Constantes, Funções e Event Listeners para os elementos recém criados
  const EDIT_TASK = document.getElementById('editandoTarefa')
  const EDIT_TASK_BTN = document.getElementById('editar-tarefa')
  const EDIT_TASK_BTN_IMG = document.getElementById('editIMG')

  function insertSpinnerEditTask() {
    EDIT_TASK_BTN_IMG.setAttribute('src', '../assets/270-ring.svg')
  }

  EDIT_TASK.addEventListener('input', () => {
    if (EDIT_TASK.value.match(VALID_TASK_REQ)) {
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
    insertSpinnerEditTask()
    changeDescription(id)
  })
}

/* Renderizadores de tarefas */
//pega as informações e renderiza as tarefas na tela
function renderTasks(task) {
  let pendingTasksList = document.querySelector('.tarefas-pendentes')
  let finishedTasksList = document.querySelector('.tarefas-terminadas')

  for (tasks of task) {
    if (tasks.completed == false) {
      let date = new Date(tasks.createdAt)
      let dateConvert = date.toLocaleDateString()
      let hourConvert = date.toLocaleTimeString()

      let li = document.createElement('li')
      li.classList.add('tarefa')
      li.setAttribute('id', tasks.id)
      li.innerHTML = `
        <div class="not-done"  onClick="markAsDone(${tasks.id})"> </div>
        <div class="descricao" onClick="editTask(${tasks.id})">
            <p class="nome">${tasks.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dateConvert} às ${hourConvert}</p>
        </div>

        `

      pendingTasksList.appendChild(li)
    } else {
      let li = document.createElement('li')
      li.classList.add('tarefa')
      li.setAttribute('id', tasks.id)
      li.innerHTML = `
        <div class="done"> </div>
        <div class="descricao">
            <p class="nome">${tasks.description}</p>
            <div style="display:flex">
                <button><i id="${tasks.id}" class="fas fa-undo-alt change" onClick="returnTask(${tasks.id})"></i></button>
                <button onClick="deleteTask(${tasks.id})"><i id="${tasks.id}" class="far fa-trash-alt" ></i></button>
            </div>
        </div>

        `

      finishedTasksList.appendChild(li)
    }
  }
}

async function renderOnlyOneTask(task) {
  let pendingTasksList = document.querySelector('.tarefas-pendentes')
  let finishedTasksList = document.querySelector('.tarefas-terminadas')

  if (task.completed == false) {
    let parentElement = document.getElementById(`${task.id}`)
    parentElement.remove()

    let date = new Date(task.createdAt)
    let dateConvert = date.toLocaleDateString()
    let hourConvert = date.toLocaleTimeString()

    let li = document.createElement('li')
    li.classList.add('tarefa')
    li.setAttribute('id', task.id)
    li.innerHTML = `
        <div class="not-done" onClick="markAsDone(${task.id})"> </div>
        <div class="descricao" onClick="editTask(${task.id})">
            <p class="nome">${task.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dateConvert} às ${hourConvert}</p>
        </div>
        </li>
        `

    pendingTasksList.appendChild(li)
  } else if (task.completed == true) {
    let parentElement = document.getElementById(`${task.id}`)
    parentElement.remove()
    let li = document.createElement('li')
    li.classList.add('tarefa')
    li.setAttribute('id', task.id)
    li.innerHTML = `
        <div class="done"> </div>
        <div class="descricao">
            <p class="nome">${task.description}</p>
            <div style="display:flex">
                <button><i id="${task.id}" class="fas fa-undo-alt change" onClick="returnTask(${task.id})"></i></button>
                <button onClick="deleteTask(${task.id})"><i id="${task.id}" class="far fa-trash-alt" ></i></button>
            </div>
        </div>

        `

    finishedTasksList.appendChild(li)
  } else {
  }
}