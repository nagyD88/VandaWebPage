import {admin} from "./site.js";

let JustForAdmin =function(){
    if(!admin.isAdmin()){
        window.location.replace("/");
    }
}



JustForAdmin();