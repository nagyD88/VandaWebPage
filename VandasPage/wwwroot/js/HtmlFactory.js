let RegForm = ` <div class="row">
                    <div class="col-md-4">
                        <form action="/action_page.php">
                            <div class="form-group">
                                <label class="control-label" for="email">e-mail:</label><br>
                                <input class="form-control" type="text" id="emailInput" name="email">
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="lname">password:</label>
                                <input class="form-control" type="password" id="passwordInput" name="password"><br>
                            </div>
                            <div class="form-group form-check">
                                <label for="admin">
                                    <input class="form-check-input" type="checkbox" id="adminInput" name="admin" value="admin">
                                Admin</label><br><br>
                            </div>
                            <div class="form-group">
                                <input id="registerButton" class="btn btn-primary" value=Registration>
                             </div>
                        </form>
                    </div> 
                </div>`;

export const registration = {
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
            console.log("ker");
        });
    },
    createRegistrationForm: function () {
        let container = document.querySelector("#mainContainer");
        container.innerHTML = RegForm;
    }
}