import {dataHandler} from "./DataHandler.js";


export const registration={
    isRegistration:function(){
        let email=document.getElementById("emailInput").value;
        let password=document.getElementById("passwordInput").value;
        let admin=document.getElementById("adminInput").checked;
        dataHandler.registration(email,password,admin).then(data=>console.log(data));
    }
    
}


