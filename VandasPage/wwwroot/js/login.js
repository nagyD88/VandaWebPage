import {dataHandler} from "./DataHandler.js";

const login = {
    getLoginData: function () {
        let email = document.querySelector("#Email").value;
        let password = document.querySelector("#Password").value;
        dataHandler.getLoginData({
            Password: password,
            Email: email
        }).then((data) => {
            if (data!==false) {
                window.sessionStorage.setItem("email", data["Email"]);
                window.sessionStorage.setItem("admin", data["Admin"]);
                window.sessionStorage.setItem("Id", data["ID"]);
                window.location.replace("/")
            }else{
                alert("Hibás e-mail vagy jelszó!")
            }
        })

    },
    getButton: function () {
        let button = document.querySelector("#loginButton");
        button.addEventListener('click', () => this.getLoginData())
    }
}

login.getButton();
