const FIRST_NAME = document.getElementById('firstName')
const LAST_NAME = document.getElementById('lastName')
const EMAIL = document.getElementById('email')
const PASSWORD = document.getElementById('password')
const REPEAT_PASSWORD = document.getElementById('repeatPassword')
const CREATE_ACC_BUTTON = document.getElementById('createAcc')

const FIRST_NAME_VALIDATION = document.getElementById('firstNameValidation')
const LAST_NAME_VALIDATION = document.getElementById('lastNameValidation')
const EMAIL_VALIDATION = document.getElementById('emailValidation')
const PASSWORD_VALIDATION = document.getElementById('passwordValidation')
const REPEAT_PASSWORD_VALIDATION = document.getElementById('repeatPasswordValidation')

function createAccValidation(name, surname, email, password, repeatPassword) {
  if (
    name &&
    surname &&
    email &&
    password &&
    repeatPassword &&
    FIRST_NAME_VALIDATION.innerText === '' &&
    LAST_NAME_VALIDATION.innerText === '' &&
    EMAIL_VALIDATION.innerText === '' &&
    PASSWORD_VALIDATION.innerText === '' &&
    REPEAT_PASSWORD_VALIDATION.innerText === ''
  ) {
    //True
    CREATE_ACC_BUTTON.removeAttribute('disabled')
    CREATE_ACC_BUTTON.classList.remove('blocked-button')
    return true
  } else {
    //False
    CREATE_ACC_BUTTON.setAttribute('disabled', true)
    CREATE_ACC_BUTTON.classList.add('blocked-button')
    return false
  }
}

let newUserObj = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

FIRST_NAME.addEventListener('keyup', () => {
  if (FIRST_NAME.value) {
    FIRST_NAME_VALIDATION.innerText = ''
    FIRST_NAME.classList.remove('form-error')
  } else {
    FIRST_NAME_VALIDATION.innerText = 'Campo obrigatório'
    FIRST_NAME.classList.add('form-error')
  }
  createAccValidation(
    FIRST_NAME.value,
    LAST_NAME.value,
    EMAIL.value,
    PASSWORD.value,
    REPEAT_PASSWORD.value
  )
})

LAST_NAME.addEventListener('keyup', () => {
  if (LAST_NAME.value) {
    LAST_NAME_VALIDATION.innerText = ''
    LAST_NAME.classList.remove('form-error')
  } else {
    LAST_NAME_VALIDATION.innerText = 'Campo obrigatório'
    LAST_NAME.classList.add('form-error')
  }
  createAccValidation(
    FIRST_NAME.value,
    LAST_NAME.value,
    EMAIL.value,
    PASSWORD.value,
    REPEAT_PASSWORD.value
  )
})

EMAIL.addEventListener('keyup', () => {
  if (EMAIL.value) {
    EMAIL_VALIDATION.innerText = ''
    EMAIL.classList.remove('form-error')
  } else {
    EMAIL_VALIDATION.innerText = 'Campo obrigatório'
    EMAIL.classList.add('form-error')
  }
  createAccValidation(
    FIRST_NAME.value,
    LAST_NAME.value,
    EMAIL.value,
    PASSWORD.value,
    REPEAT_PASSWORD.value
  )
})

EMAIL.addEventListener('blur', () => {
  if (EMAIL.value.match(VALID_EMAIL_REQ)) {
    EMAIL_VALIDATION.innerText = ''
    EMAIL.classList.remove('form-error')
  } else if (EMAIL.value === '') {
    EMAIL_VALIDATION.innerText = 'Campo obrigatório'
    EMAIL.classList.add('form-error')
  } else {
    EMAIL_VALIDATION.innerText = 'Email inválido'
    EMAIL.classList.add('form-error')
  }
})

PASSWORD.addEventListener('keyup', () => {
  if (PASSWORD.value) {
    PASSWORD_VALIDATION.innerText = ''
    PASSWORD.classList.remove('form-error')
  } else {
    PASSWORD_VALIDATION.innerText = 'Campo obrigatório'
    PASSWORD.classList.add('form-error')
  }
  createAccValidation(
    FIRST_NAME.value,
    LAST_NAME.value,
    EMAIL.value,
    PASSWORD.value,
    REPEAT_PASSWORD.value
  )
})

REPEAT_PASSWORD.addEventListener('keyup', () => {
  if (REPEAT_PASSWORD.value) {
    REPEAT_PASSWORD_VALIDATION.innerText = ''
    REPEAT_PASSWORD.classList.remove('form-error')
  } else {
    REPEAT_PASSWORD_VALIDATION.innerText = 'Campo obrigatório'
    REPEAT_PASSWORD.classList.add('form-error')
  }
  createAccValidation(
    FIRST_NAME.value,
    LAST_NAME.value,
    EMAIL.value,
    PASSWORD.value,
    REPEAT_PASSWORD.value
  )
})

REPEAT_PASSWORD.addEventListener('blur', () => {
  if (REPEAT_PASSWORD.value === PASSWORD.value) {
    REPEAT_PASSWORD_VALIDATION.innerText = ''
    REPEAT_PASSWORD.classList.remove('form-error')
  } else if (REPEAT_PASSWORD.value === '') {
    REPEAT_PASSWORD_VALIDATION.innerText = 'Campo obrigatório'
    REPEAT_PASSWORD.classList.add('form-error')
  } else {
    REPEAT_PASSWORD_VALIDATION.innerText = 'As senhas devem ser iguais'
    REPEAT_PASSWORD.classList.add('form-error')
  }
  createAccValidation(
    FIRST_NAME.value,
    LAST_NAME.value,
    EMAIL.value,
    PASSWORD.value,
    REPEAT_PASSWORD.value
  )
})

CREATE_ACC_BUTTON.addEventListener('click', function (event) {
  if (
    createAccValidation(
      FIRST_NAME.value,
      LAST_NAME.value,
      EMAIL.value,
      PASSWORD.value,
      REPEAT_PASSWORD.value
    )
  ) {
    event.preventDefault()

    let firstName = normalizeTextRemoveSpaces(FIRST_NAME.value)
    let lastName = normalizeTextRemoveSpaces(LAST_NAME.value)
    let email = normalizeTextRemoveSpaces(EMAIL.value)
    let password = normalizeTextRemoveSpaces(PASSWORD.value)

    firstName = normalizeTextToUpperCase(firstName)
    lastName = normalizeTextToUpperCase(lastName)
    email = normalizeTextToUpperCase(email)

    newUserObj.firstName = firstName
    newUserObj.lastName = lastName
    newUserObj.email = email
    newUserObj.password = password

    let newUserObjInJson = JSON.stringify(newUserObj)

    console.log(newUserObjInJson)
  }
})
