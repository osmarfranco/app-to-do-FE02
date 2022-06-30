


onload = function () {
    let tokenJwt = sessionStorage.getItem("jwt")
    

if (!tokenJwt) {
    alert("You shall not pass!!")
} else {
    getDataUser(tokenJwt)
    getUserTasks(tokenJwt)
}

}

async  function getDataUser(token) {

    

    let configRequest = {
        headers: {
            "Authorization": token
        }
    }
    try {
        let data = await fetch(ENDPOINT_USERS_GETME, configRequest)

        if (data.status == 200) {
            let responseConvert = await data.json();
            

            nameInNavBar(responseConvert)

        } else {
            throw "Problema ao buscar usuário"
        }
        
    } catch (error) {
        console.log(error)
    }
    

}

async  function getUserTasks(token) {

    

    let configRequest = {
        headers: {
            "Authorization": token
        }
    }
    try {
        let data = await fetch(ENDPOINT_TASKS, configRequest)

        if (data.status == 200) {
            let responseConvert = await data.json();
            

            getTasks(responseConvert)

        } else {
            throw "Problema ao buscar tarefas"
        }
        
    } catch (error) {
        console.log(error)
    }
    

}

function nameInNavBar(objUser) {
    let p = document.querySelector("#nomeUsuario")

    p.innerText = `${objUser.firstName} ${objUser.lastName}`
}




function getTasks(tasks){

    const TASK_DESCRIPTION = document.getElementById('teste')
    let teste = tasks[0].createdAt
    console.log()
    

    for ( i of tasks){

        let date = new Date(i.createdAt)
        
        let dateConvert = date.toLocaleDateString()
        
        let itemlist = `
        <li class="tarefa">
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${i.description}</p>
          <p class="timestamp">${dateConvert}</p>
        </div>
      </li>`
      TASK_DESCRIPTION.innerHTML += itemlist
        

    }

}