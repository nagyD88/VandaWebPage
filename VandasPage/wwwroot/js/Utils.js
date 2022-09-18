export const formMaker = {
    TextInput: function (element, id, value, name) {
        let div = document.createElement("div");
        div.setAttribute("class", "form-group");
        element.appendChild(div);
        let label = document.createElement("label");
        label.innerText = name;
        div.appendChild(label);
        label.setAttribute("class", "control-label");
        div.appendChild(document.createElement("br"));
        let input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("id", id);
        input.setAttribute("type", "text");
        input.setAttribute("value", value);
        div.appendChild(input);
    }
}