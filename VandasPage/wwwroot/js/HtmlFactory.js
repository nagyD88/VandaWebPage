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
            li.innerText = `${user["Email"].toString()}  ${user["Name"]}`;
            li.appendChild(div);
            formMaker.ButtonMaker(li, "Áttekintés", `detailedView${user['Id']}`);
            let button=document.querySelector(`#detailedView${user['Id']}`);
            button.addEventListener("click", () => {
                if (button.innerText==="Áttekintés"){
                    button.innerText="Kevesebb";
                }else{
                    button.innerText="Áttekintés";
                }
                CreateDetailedView(div, user["Id"]);
            })
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
            formMaker.TextInput(form, `NameInput${user["Id"]}`, user["Name"], "Név");
            formMaker.TextInput(form, `PriceInput${user["Id"]}`, user["Price"], "Ár");
            formMaker.TextInput(form, `NumberOfDetailsInput${user["Id"]}`, user["NumberOfDetailsStart"], "Részletek száma")
            formMaker.TextInput(form, `MBTIInput${user["Id"]}`,user["MBTI"],"MBTI");
            let saveButton = formMaker.ButtonMaker(form, "Mentés", `save${user["Id"]}`);
            saveButton.addEventListener('click', ()=>basicUpdate(user["Id"]));
            let detailsButton = formMaker.ButtonMaker(form, "Részletek", `details${user["Id"]}`);
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