
export let dataHandler={
    getLoginData: async function (password, email) {
        return await apiGet(`login/ProcessLogin/${password}/${email}`);
    },
    registration: async function(email, password, admin){
        return await apiGet(`register/ProcessRegister/${email}/${password}/${admin}`);
    },
    getAllEmailNameAndId: async function(){
        return await apiGet('/Data/GetAllEmailNameAndId');
    },
    getAllSettableInfoById: async function(ID){
        return await apiGet(`/Data/GetAllSettableDataByID/${ID}`);
    }
}
async function getApi(url) {
    let response = await fetch(url)
    return await response.json()
}

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
}

