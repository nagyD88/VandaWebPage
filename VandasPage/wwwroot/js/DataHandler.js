
export let dataHandler={
    logUserIn: async function (userName, password) {
        return await apiPost('api/users/login', {
            'user_name': userName,
            'password': password
        });
    },
    logUserOut: async function() {
        await apiGet('api/users/logout')
    }
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

