function normalizeTextRemoveSpaces(text) {
  return text.trim()
}

function normalizeTextToLowerCase(text) {
  return text.toLowerCase()
}

const VALID_EMAIL_REQ = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const VALID_TASK_REQ = /^.{6,}$/