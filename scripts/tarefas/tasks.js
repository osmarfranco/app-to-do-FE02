let tokenJwt;

onload = function () {

    tokenJwt = this.sessionStorage.getItem("jwt");

    if(!tokenJwt) {
        this.alert("You shall not pass!!")
        location.href = "index.html"

    } else {

    }


}