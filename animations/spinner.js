function insertSpinnerLogin() {
  ACCESS_BUTTON.innerText = ""
  ACCESS_BUTTON.appendChild(spinner)
}

function removeSpinnerLogin(){
  ACCESS_BUTTON.removeChild(spinner)
  ACCESS_BUTTON.innerText = "Acessar"
}

function insertSpinnerSignUp() {
  CREATE_ACC_BUTTON.innerText = ""
  CREATE_ACC_BUTTON.appendChild(spinner)
}

function removeSpinnerSignUp(){
  CREATE_ACC_BUTTON.removeChild(spinner)
  CREATE_ACC_BUTTON.innerText = "Criar conta"
}

function insertSpinnerNewTask() {
  NEW_TASK_BTN_IMG.setAttribute('src', "../assets/270-ring.svg")
}

function removeSpinnerNewTask() {
  NEW_TASK_BTN_IMG.setAttribute('src', "../assets/plus.png")
}

let spinner = document.createElement('img')
spinner.src = "../assets/3-dots-fade-white.svg"