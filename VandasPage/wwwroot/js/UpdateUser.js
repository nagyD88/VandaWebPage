import {dataHandler} from "./DataHandler.js";

export function basicUpdate(id) {

    let name = document.getElementById(`NameInput${id}`).value;
    let price = document.getElementById(`PriceInput${id}`).value;
    let numberOfDetails = document.getElementById(`NumberOfDetailsInput${id}`).value;
    let mbti = document.getElementById(`MBTIInput${id}`).value;
    dataHandler.updateUser({
        Name: name,
        Price: price,
        NumberOfDetailsStart: numberOfDetails,
        MBTI: mbti,
        Id: id
    }).then(data => console.log(data));
}
