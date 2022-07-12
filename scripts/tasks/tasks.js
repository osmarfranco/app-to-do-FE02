/* ---------- VARIABLES ---------- */
const NEW_TASK = document.getElementById('novaTarefa')
const NEW_TASK_BTN = document.getElementById('botaoNovaTarefa')
const NEW_TASK_BTN_IMG = document.getElementById('imagemBotaoNovaTarefa')
const TASK_DESCRIPTION = document.querySelector('.tarefas-pendentes')
const TASK_DONE = document.querySelector('.tarefas-terminadas')

const TOAST_CREATE_SUCCESS = document.getElementById('toastSuccessCreateTask')
const TOAST_EDIT_SUCCESS = document.getElementById('toastSuccessEditTask')
const TOAST_DELETE_SUCCESS = document.getElementById('toastSuccessDeleteTask')
const TOAST_ERROR = document.getElementById('toastFail')

/* ---------- FUNCTIONS ---------- */
async function getUserData(token) {
  let configRequest = {
    headers: {
      Authorization: token
    }
  }
  try {
    let data = await fetch(ENDPOINT_USERS_GETME, configRequest)

    if (data.status == 200) {
      let responseConvert = await data.json()

      nameInNavBar(responseConvert)
      nameInitialsAvatar(responseConvert)
    } else {
      throw 'Problema ao buscar usuário'
    }
  } catch (error) {
    console.log(error)
  }
}

async function getUserTasks(token) {
  let configRequest = {
    headers: {
      Authorization: token
    }
  }
  try {
    let data = await fetch(ENDPOINT_TASKS, configRequest)

    if (data.status == 200) {
      let responseConvert = await data.json()

      setTimeout(() => {
        removeSkeleton('.tarefas-pendentes')
        removeSkeleton('.tarefas-terminadas')
        renderTasks(responseConvert)
      }, 1500)
      //1500
    } else {
      throw 'Problema ao buscar tarefas'
    }
  } catch (error) {
    removeSkeleton('.tarefas-pendentes')
    removeSkeleton('.tarefas-terminadas')
    console.log(error)
  }
}

// Coloca o nome do usuário na navbar
function nameInNavBar(objUser) {
  let p = document.querySelector('#nomeUsuario')

  p.innerText = `${objUser.firstName} ${objUser.lastName}`
}

// Cria um avatar com as iniciais do usuário
function nameInitialsAvatar(objUser) {
  let img = document.getElementById('user-image')
  let avatarUrl = `https://ui-avatars.com/api/?name=${objUser.firstName}+${objUser.lastName}&bold=true&rounded=true`

  img.setAttribute('src', avatarUrl)
}

//Finalizar sessão
function logOut() {
  sessionStorage.removeItem('jwt')
  window.location.href = './index.html'
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
  let tokenJwt = sessionStorage.getItem('jwt')

  if (!tokenJwt) {
    alert('You shall not pass!!')
    //retorna usuário não logado a página principal
    window.location.href = 'index.html'
  } else {
    showSkeletons(4, '.tarefas-pendentes')
    showSkeletons(4, '.tarefas-terminadas')
    getUserData(tokenJwt)
    getUserTasks(tokenJwt)
    swal("Seja bem vindo!");
  }
}

NEW_TASK.addEventListener('input', () => {
  if (NEW_TASK.value.match(VALID_TASK_REQ)) {
    NEW_TASK_BTN.classList.remove('button-blocked')
    NEW_TASK_BTN.classList.add('button-default')
    NEW_TASK_BTN.removeAttribute('disabled')
  } else {
    NEW_TASK_BTN.classList.add('button-blocked')
    NEW_TASK_BTN.classList.remove('button-default')
    NEW_TASK_BTN.setAttribute('disabled', true)
  }
})

NEW_TASK_BTN.addEventListener('click', async event => {
  event.preventDefault()

  let tokenJwt = sessionStorage.getItem('jwt')
  let newTask = {
    description: normalizeTextRemoveSpaces(NEW_TASK.value),
    completed: false
  }
  let newTaskInJson = JSON.stringify(newTask)

  insertSpinnerNewTask()
  await newTaskApi(newTaskInJson, tokenJwt)
  clearTasks()
  await getNewTaskList(tokenJwt)
  NEW_TASK.value = ''
})
