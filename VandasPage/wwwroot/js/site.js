import {CreateRegistration} from "./HtmlFactory.js";

export let admin = {
    isAdmin: function () {
        return window.sessionStorage["admin"] === "true";
    },

    registration: function () {
        if (this.isAdmin()) {
            
            CreateRegistration.createRegistrationButton();
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
