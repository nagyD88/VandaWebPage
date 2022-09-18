import {CreateMiddlePart, CreateSideBar} from "./HtmlFactory.js";
import {dataHandler} from "./DataHandler.js";

export let admin = {
    isAdmin: function () {
        return window.sessionStorage["admin"] === "true";
    },

    registration: function () {
        if (this.isAdmin()) {
            CreateSideBar.createSidebarButton("Regisztráció", CreateSideBar.createRegistrationForm);
            CreateSideBar.createSidebarButton("Felhasználók",CreateMiddlePart.createUserList);
            CreateSideBar.createSidebarButton("kérdőív", CreateSideBar.createRegistrationForm);
            CreateSideBar.createSidebarButton("Oktatófelület", CreateSideBar.createRegistrationForm);
            console.log(dataHandler.getAllSettableInfoById(2));
            
            
        }
    }
}

let ToLogin = function () {
    if (window.sessionStorage.length === 0) {
        window.location.replace("/Login");
    }
}
ToLogin();
admin.registration();
