const INPUT_NAME = document.getElementById('inputName')
const INPUT_SURNAME = document.getElementById('inputSurname')
const INPUT_EMAIL = document.getElementById('inputEmail')
const INPUT_PASSWORD = document.getElementById('inputPassword')
const INPUT_REPEAT_PASSWORD = document.getElementById('inputRepeatPassword')
const CREATE_ACC_BUTTON = document.getElementById('createAcc')

const NAME_VALIDATION = document.getElementById('nameValidation')
const SURNAME_VALIDATION = document.getElementById('surnameValidation')
const EMAIL_VALIDATION = document.getElementById('emailValidation')
const PASSWORD_VALIDATION = document.getElementById('passwordValidation')
const REPEAT_PASSWORD_VALIDATION = document.getElementById(
  'repeatPasswordValidation'
)

function createAccValidation(name, surname, email, password, repeatPassword) {
  if (
    name &&
    surname &&
    email &&
    password &&
    repeatPassword &&
    NAME_VALIDATION.innerText === '' &&
    SURNAME_VALIDATION.innerText === '' &&
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
  name: '',
  surname: '',
  email: '',
  password: ''
}

INPUT_NAME.addEventListener('keyup', () => {
  if (INPUT_NAME.value) {
    NAME_VALIDATION.innerText = ''
    INPUT_NAME.classList.remove('form-error')
  } else {
    NAME_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_NAME.classList.add('form-error')
  }
  createAccValidation(
    INPUT_NAME.value,
    INPUT_SURNAME.value,
    INPUT_EMAIL.value,
    INPUT_PASSWORD.value,
    INPUT_REPEAT_PASSWORD.value
  )
})

INPUT_SURNAME.addEventListener('keyup', () => {
  if (INPUT_SURNAME.value) {
    SURNAME_VALIDATION.innerText = ''
    INPUT_SURNAME.classList.remove('form-error')
  } else {
    SURNAME_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_SURNAME.classList.add('form-error')
  }
  createAccValidation(
    INPUT_NAME.value,
    INPUT_SURNAME.value,
    INPUT_EMAIL.value,
    INPUT_PASSWORD.value,
    INPUT_REPEAT_PASSWORD.value
  )
})

INPUT_EMAIL.addEventListener('keyup', () => {
  if (INPUT_EMAIL.value) {
    EMAIL_VALIDATION.innerText = ''
    INPUT_EMAIL.classList.remove('form-error')
  } else {
    EMAIL_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_EMAIL.classList.add('form-error')
  }
  createAccValidation(
    INPUT_NAME.value,
    INPUT_SURNAME.value,
    INPUT_EMAIL.value,
    INPUT_PASSWORD.value,
    INPUT_REPEAT_PASSWORD.value
  )
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
  createAccValidation(
    INPUT_NAME.value,
    INPUT_SURNAME.value,
    INPUT_EMAIL.value,
    INPUT_PASSWORD.value,
    INPUT_REPEAT_PASSWORD.value
  )
})

INPUT_REPEAT_PASSWORD.addEventListener('keyup', () => {
  if (INPUT_REPEAT_PASSWORD.value) {
    REPEAT_PASSWORD_VALIDATION.innerText = ''
    INPUT_REPEAT_PASSWORD.classList.remove('form-error')
  } else {
    REPEAT_PASSWORD_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_REPEAT_PASSWORD.classList.add('form-error')
  }
  createAccValidation(
    INPUT_NAME.value,
    INPUT_SURNAME.value,
    INPUT_EMAIL.value,
    INPUT_PASSWORD.value,
    INPUT_REPEAT_PASSWORD.value
  )
})

INPUT_REPEAT_PASSWORD.addEventListener('blur', () => {
  if (INPUT_REPEAT_PASSWORD.value === INPUT_PASSWORD.value) {
    REPEAT_PASSWORD_VALIDATION.innerText = ''
    INPUT_REPEAT_PASSWORD.classList.remove('form-error')
  } else if (INPUT_REPEAT_PASSWORD.value === '') {
    REPEAT_PASSWORD_VALIDATION.innerText = 'Campo obrigatório'
    INPUT_REPEAT_PASSWORD.classList.add('form-error')
  } else {
    REPEAT_PASSWORD_VALIDATION.innerText = 'As senhas devem ser iguais'
    INPUT_REPEAT_PASSWORD.classList.add('form-error')
  }
  createAccValidation(
    INPUT_NAME.value,
    INPUT_SURNAME.value,
    INPUT_EMAIL.value,
    INPUT_PASSWORD.value,
    INPUT_REPEAT_PASSWORD.value
  )
})

CREATE_ACC_BUTTON.addEventListener('click', function (event) {
  if (
    createAccValidation(
      INPUT_NAME.value,
      INPUT_SURNAME.value,
      INPUT_EMAIL.value,
      INPUT_PASSWORD.value,
      INPUT_REPEAT_PASSWORD.value
    )
  ) {
    event.preventDefault()

    let name = normalizeTextRemoveSpaces(INPUT_NAME.value)
    let surName = normalizeTextRemoveSpaces(INPUT_SURNAME.value)
    let email = normalizeTextRemoveSpaces(INPUT_EMAIL.value)
    let password = normalizeTextRemoveSpaces(INPUT_PASSWORD.value)

    name = normalizeTextToUpperCase(name)
    surName = normalizeTextToUpperCase(surName)
    email = normalizeTextToUpperCase(email)

    newUserObj.name = name
    newUserObj.surname = surName
    newUserObj.email = email
    newUserObj.password = password

    let newUserObjInJson = JSON.stringify(newUserObj)

    console.log(newUserObjInJson)
  }
})
