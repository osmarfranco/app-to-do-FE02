const EMAIL_LOGIN = document.getElementById('emailLogin')
const PASSWORD_LOGIN = document.getElementById('passwordLogin')
const ACCESS_BUTTON = document.getElementById('accessButton')
const EMAIL_LOGIN_VALIDATION = document.getElementById('emailLoginValidation')
const PASSWORD_LOGIN_VALIDATION = document.getElementById('passwordLoginValidation')

function loginValidation(email, password) {
  if (
    email &&
    password &&
    EMAIL_LOGIN_VALIDATION.innerText === '' &&
    PASSWORD_LOGIN_VALIDATION.innerText === ''
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

EMAIL_LOGIN.addEventListener('keyup', () => {
  if (EMAIL_LOGIN.value) {
    EMAIL_LOGIN_VALIDATION.innerText = ''
    EMAIL_LOGIN.classList.remove('form-error')
  } else {
    EMAIL_LOGIN_VALIDATION.innerText = 'Campo obrigatório'
    EMAIL_LOGIN.classList.add('form-error')
  }
  loginValidation(EMAIL_LOGIN.value, PASSWORD_LOGIN.value)
})

EMAIL_LOGIN.addEventListener('blur', () => {
  if (EMAIL_LOGIN.value.match(VALID_EMAIL_REQ)) {
    EMAIL_LOGIN_VALIDATION.innerText = ''
    EMAIL_LOGIN.classList.remove('form-error')
  } else if (EMAIL_LOGIN.value === '') {
    EMAIL_LOGIN_VALIDATION.innerText = 'Campo obrigatório'
    EMAIL_LOGIN.classList.add('form-error')
  } else {
    EMAIL_LOGIN_VALIDATION.innerText = 'Email inválido'
    EMAIL_LOGIN.classList.add('form-error')
  }
})

PASSWORD_LOGIN.addEventListener('keyup', () => {
  if (PASSWORD_LOGIN.value) {
    PASSWORD_LOGIN_VALIDATION.innerText = ''
    PASSWORD_LOGIN.classList.remove('form-error')
  } else {
    PASSWORD_LOGIN_VALIDATION.innerText = 'Campo obrigatório'
    PASSWORD_LOGIN.classList.add('form-error')
  }
  loginValidation(EMAIL_LOGIN.value, PASSWORD_LOGIN.value)
})

ACCESS_BUTTON.addEventListener('click', function (event) {
  if (loginValidation(EMAIL_LOGIN.value, PASSWORD_LOGIN.value)) {
    event.preventDefault()

    let emailLogin = normalizeTextRemoveSpaces(EMAIL_LOGIN.value)
    let passwordLogin = normalizeTextRemoveSpaces(PASSWORD_LOGIN.value)

    userObj.email = emailLogin
    userObj.password = passwordLogin

    let userObjInJson = JSON.stringify(userObj)

    console.log(userObjInJson)
  }
})
