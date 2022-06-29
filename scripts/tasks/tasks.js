


onload = function () {
    let tokenJwt = sessionStorage.getItem("jwt")
    

if (!tokenJwt) {
    alert("You shall not pass!!")
} else {
    getDataUser(tokenJwt)
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

function nameInNavBar(objUser) {
    let p = document.querySelector("#nomeUsuario")

    p.innerText = `${objUser.firstName} ${objUser.lastName}`
}