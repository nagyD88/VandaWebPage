﻿import {dataHandler} from "./DataHandler.js";
const login={
    getLoginData:function(){
        let email=document.querySelector("#Email").value;
        let password = document.querySelector("#Password").value;
        dataHandler.getLoginData(password, email).then((data)=>{
            console.log(data);
            window.sessionStorage.setItem("email", email);
        })
        
    },
    getButton:function (){
        let button= document.querySelector("#loginButton");
        button.addEventListener('click',()=> this.getLoginData())
    }
}

login.getButton();
