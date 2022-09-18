import {CreateSideBar} from "./HtmlFactory.js";

export let admin = {
    isAdmin: function () {
        return window.sessionStorage["admin"] === "true";
    },

    registration: function () {
        if (this.isAdmin()) {
            CreateSideBar.createSidebarButton("Regisztráció", CreateSideBar.createRegistrationForm);
            CreateSideBar.createSidebarButton("Felhasználók", CreateSideBar.createRegistrationForm);
            CreateSideBar.createSidebarButton("kérdőív", CreateSideBar.createRegistrationForm);
            CreateSideBar.createSidebarButton("Oktatófelület", CreateSideBar.createRegistrationForm);
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
