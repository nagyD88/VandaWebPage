
let ToLogin=function(){
    if(window.sessionStorage.length===0){
        window.location.replace("/Login");
    }
}


ToLogin();