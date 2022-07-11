//Código comentado pois essa API passou a retornar erros de servidor para criação de tarefas e novas contas
//const BASE_URL = "https://ctd-todo-api.herokuapp.com/v1"

//Nova API
const BASE_URL = "https://ctd-fe2-todo-v2.herokuapp.com/v1"

/* ---------- TASKS ---------- */
const ENDPOINT_TASKS = BASE_URL + "/tasks"

/* ---------- USERS ---------- */
const ENDPOINT_USERS = BASE_URL + "/users"
const ENDPOINT_USERS_LOGIN = ENDPOINT_USERS + "/login"
const ENDPOINT_USERS_GETME = ENDPOINT_USERS + "/getMe"