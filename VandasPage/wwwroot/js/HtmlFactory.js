import {registration} from "./Registration.js";
import {HtmlContainer} from "./htmlContainer.js";
import {dataHandler} from "./DataHandler.js";
import {formMaker} from "./Utils.js";

export const CreateMiddlePart = {
    createUserList: function () {
        let container = document.querySelector("#mainContainer")
        container.replaceChildren()
        let list = document.createElement("ul");
        container.appendChild(list);
        dataHandler.getAllEmailNameAndId().then(data => data.forEach(user => {
            let li = document.createElement("li");
            let div = document.createElement("div");
            list.appendChild(li);
            li.innerText = `${user["Email"].toString()}  ${user["Name"]}`
            li.appendChild(div);
            console.log()
            li.addEventListener("click", () => CreateDetailedView(div, user["Id"]))
        }))
    }
}

function CreateDetailedView (element, ID) {
    if (element.childNodes.length) {
        console.log(element.childNodes.length)
        element.replaceChildren();
    } else {
        let form = document.createElement("form");
        element.appendChild(form);
        dataHandler.getAllSettableInfoById(ID).then(user => {
            formMaker.TextInput(form, "NameInput", user["Name"], "Név")
            let div = document.createElement("div");
            element.appendChild(div);

        })
    }
}
export const CreateSideBar = {
    createSidebarButton: function (buttonName, clickFunction) {
        let container = document.querySelector("#leftSideBar");
        let divElement = document.createElement("div");
        divElement.setAttribute("class", "nav-item");
        container.appendChild(divElement);
        let regButton = document.createElement("a");
        divElement.appendChild(regButton);
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
        let button = document.querySelector("#registerButton");
        button.addEventListener("click", () => registration.isRegistration())
    }
}