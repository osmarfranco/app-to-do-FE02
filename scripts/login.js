const INPUT_EMAIL = document.getElementById('inputEmail')
const INPUT_PASSWORD = document.getElementById('inputPassword')
const ACCESS_BUTTON = document.getElementById('accessButton')
const EMAIL_VALIDATION = document.getElementById('emailValidation')
const PASSWORD_VALIDATION = document.getElementById('passwordValidation')

function loginValidation(email, password) {
  if (
    email &&
    password &&
    EMAIL_VALIDATION.innerText === '' &&
    PASSWORD_VALIDATION.innerText === ''
  ) {
    //True
    ACCESS_BUTTON.removeAttribute('disabled')
    ACCESS_BUTTON.classList.remove('blocked-button')
    return true
  } else {
    //False
    ACCESS_BUTTON.setAttribute('disabled', true)
    ACCESS_BUTTON.classList.add('blocked-button')
    return false
  }
}

let userObj = {
  email: '',
  password: ''
}

INPUT_EMAIL.addEventListener('keyup', () => {
  if (INPUT_EMAIL.value) {
    EMAIL_VALIDATION.innerText = ''
    INPUT_EMAIL.classList.remove('form-error')
  } else {
    EMAIL_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_EMAIL.classList.add('form-error')
  }
  loginValidation(INPUT_EMAIL.value, INPUT_PASSWORD.value)
})

INPUT_EMAIL.addEventListener('blur', () => {
  if (INPUT_EMAIL.value.match(VALID_EMAIL_REQ)) {
    EMAIL_VALIDATION.innerText = ''
    INPUT_EMAIL.classList.remove('form-error')
  } else if (INPUT_EMAIL.value === '') {
    EMAIL_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_EMAIL.classList.add('form-error')
  } else {
    EMAIL_VALIDATION.innerText = 'Email inválido'
    INPUT_EMAIL.classList.add('form-error')
  }
})

INPUT_PASSWORD.addEventListener('keyup', () => {
  if (INPUT_PASSWORD.value) {
    PASSWORD_VALIDATION.innerText = ''
    INPUT_PASSWORD.classList.remove('form-error')
  } else {
    PASSWORD_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_PASSWORD.classList.add('form-error')
  }
  loginValidation(INPUT_EMAIL.value, INPUT_PASSWORD.value)
})

ACCESS_BUTTON.addEventListener('click', function (event) {
  if (loginValidation(INPUT_EMAIL.value, INPUT_PASSWORD.value)) {
    event.preventDefault()

    let emailLogin = normalizeTextRemoveSpaces(INPUT_EMAIL.value)
    let passwordLogin = normalizeTextRemoveSpaces(INPUT_PASSWORD.value)

    userObj.email = emailLogin
    userObj.password = passwordLogin

    let userObjInJson = JSON.stringify(userObj)

    console.log(userObjInJson)
  }
})
