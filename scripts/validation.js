function normalizeTextRemoveSpaces(text) {
  return text.trim()
}

function normalizeTextToUpperCase(text) {
  return text.toUpperCase()
}

const VALID_EMAIL_REQ = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
