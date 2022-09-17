
export const registration={
    createRegistrationButton:function (){
        let container= document.querySelector("#UpperButtonContainer");
        let li= document.createElement("li");
        li.setAttribute("class","nav-item");
        container.appendChild(li);
        let regButton=document.createElement("a");
        li.appendChild(regButton);
        regButton.setAttribute("class","nav-link text-dark");
        regButton.setAttribute("href", "/Registration");
        regButton.innerText="registration";
    }
}