import {CreateSideBar} from "./HtmlFactory.js";

export let admin = {
    isAdmin: function () {
        return window.sessionStorage["admin"] === "true";
    },

    registration: function () {
        if (this.isAdmin()) {
            
            CreateSideBar.createSidebarButton("Regisztráció",CreateSideBar.createRegistrationForm);
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
