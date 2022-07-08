function normalizeTextRemoveSpaces(text) {
  return text.trim()
}

function normalizeTextToLowerCase(text) {
  return text.toLowerCase()
}

/* Regex com os requisitos para validar o email */
const VALID_EMAIL_REQ = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

/* Regex com os requisitos para validar a senha */
const VALID_PASSWORD_REQ = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

/* Regex com os requisitos para validar a criação de uma nova tarefa */
const VALID_TASK_REQ = /^.{6,}$/