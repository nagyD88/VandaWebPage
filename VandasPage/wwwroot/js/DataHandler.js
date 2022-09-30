
export let dataHandler={
    getLoginData: async function (payload) {
        const response = await fetch(`login/ProcessLogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    },
    registration: async function (payload) {
        const response = await fetch(`register/ProcessRegister`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        return await response.json();
    }
    ,
    getAllEmailNameAndId: async function(){
        return await apiGet('/Data/GetAllEmailNameAndId');
    },
    getAllSettableInfoById: async function(ID){
        return await apiGet(`/Data/GetAllSettableDataByID/${ID}`);
    },
    updateUser: async function(payload){
        return await apiPut("update/ProcessUpdate",payload)
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
async function apiDelete(url) {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        //body: JSON.stringify(payload)
    });
}

async function apiPut(url, data) {
    const request = new Request(url, {body: JSON.stringify(data), method: "PUT", headers: {"Content-Type": 'application/json' }});
    let response = await fetch(request);
    if (response.ok) {
        return await response.json();
    }

}

