const BASE_URL = "https://ctd-todo-api.herokuapp.com/v1"

/* ---------- TASKS ---------- */
const ENDPOINT_TASKS = BASE_URL + "/tasks"
let userId
let ENDPOINT_TASKS_ID = ENDPOINT_TASKS + `/${userId}`

/* ---------- USERS ---------- */
const ENDPOINT_USERS = BASE_URL + "/users"
const ENDPOINT_USERS_LOGIN = ENDPOINT_USERS + "/login"
const ENDPOINT_USERS_GETME = ENDPOINT_USERS + "/getMe"