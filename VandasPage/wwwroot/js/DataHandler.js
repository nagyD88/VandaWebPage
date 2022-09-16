
export let dataHandler={
    getLoginData: async function (password, email) {
        return await getApi(`login/ProcessLogin/${password}/${email}`);
    },
    logUserOut: async function() {
        await apiGet('api/users/logout')
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

