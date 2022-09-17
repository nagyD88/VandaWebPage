import { registration} from "./Registration.js";
import {HtmlContainer} from "./htmlContainer.js";



export const CreateRegistration = {
    createRegistrationButton: function () {
        let container = document.querySelector("#UpperButtonContainer");
        let li = document.createElement("li");
        li.setAttribute("class", "nav-item");
        container.appendChild(li);
        let regButton = document.createElement("a");
        li.appendChild(regButton);
        regButton.setAttribute("class", "nav-link text-dark");
        regButton.setAttribute("href", "");
        regButton.innerText = "registration";
        regButton.addEventListener("click", (event) => {
            event.preventDefault()
            this.createRegistrationForm();
        });
    },
    createRegistrationForm: function () {
        let container = document.querySelector("#mainContainer");
        container.innerHTML = HtmlContainer.RegForm;
        let button=document.querySelector("#registerButton");
        button.addEventListener("click", ()=>registration.isRegistration() )
    }
}