import { registration} from "./Registration.js";
import {HtmlContainer} from "./htmlContainer.js";



export const CreateSideBar = {
    createSidebarButton: function (buttonName, clickFunction ) {
        let container = document.querySelector("#leftSideBar");
        let li = document.createElement("li");
        li.setAttribute("class", "nav-item");
        container.appendChild(li);
        let regButton = document.createElement("a");
        li.appendChild(regButton);
        regButton.setAttribute("class", "nav-link text-dark");
        regButton.setAttribute("href", "");
        regButton.innerText = buttonName;
        regButton.addEventListener("click", (event) => {
            event.preventDefault()
            clickFunction();
        });
    },
    createRegistrationForm: function () {
        let container = document.querySelector("#mainContainer");
        container.innerHTML = HtmlContainer.RegForm;
        let button=document.querySelector("#registerButton");
        button.addEventListener("click", ()=>registration.isRegistration() )
    }
}