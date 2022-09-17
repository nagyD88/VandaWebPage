export const registration = {
    createRegistrationButton: function () {
        let container = document.querySelector("#UpperButtonContainer");
        let li = document.createElement("li");
        li.setAttribute("class", "nav-item");
        container.appendChild(li);
        let regButton = document.createElement("a");
        li.appendChild(regButton);
        regButton.setAttribute("class", "nav-link text-dark");
        regButton.setAttribute("href", "/Registration");
        regButton.innerText = "registration";
    },
    createRegistrationForm: function () {
        let container = document.querySelector("#mainContainer");
        let div = document.createElement("div");
        let Form = document.createElement("form");
        container.appendChild(div);
        div.appendChild(Form);
        for (let i = 0; i < 2; i++) {
            let div1 = document.createElement("div");
            Form.appendChild(div1);
            div1.setAttribute("class", "form-group");
            let label = document.createElement("label");
            div1.appendChild(label);
            label.setAttribute("class", "control-label");
            let input = document.createElement("input");
            div1.appendChild(input);
            input.setAttribute("class", "form-control");
            input.setAttribute("type", "text");
        }
        let passwordInput=Form.getElementsByTagName("input")[0];
        passwordInput.setAttribute("id", "passwordInput");
        let emailInput=Form.getElementsByTagName("input")[1];
        emailInput.setAttribute("id", "emailInput");
        let passwordLabel= Form.getElementsByTagName("label")[0]
        passwordLabel.innerText="Password";
        let emailLabel=Form.getElementsByTagName("label")[1]
        let adminDiv= document.createElement("div")
        Form.appendChild(adminDiv);
        adminDiv.setAttribute("class", "form-check-label");
        let adminInput= document.createElement("input");
        adminInput.setAttribute("class", "form-check-input");
        adminInput.setAttribute("type", "checkbox")
        let adminLabel = document.createElement("label");
        adminLabel.setAttribute("class","form-check-input");
        adminDiv.appendChild(adminLabel);
        adminLabel.appendChild(adminInput);
        adminInput.innerText="Admin";
        let buttonDiv= document.createElement("div");
        buttonDiv.setAttribute("class","form-group" )
        let button= document.createElement("input");
        button.innerText="registration";
        Form.appendChild(buttonDiv);
        buttonDiv.appendChild(button);
        button.setAttribute("class","btn btn-primary");
        
        
    }
}