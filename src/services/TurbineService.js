import axios from "axios";

const baseUrl = "https://dockyard-handler.herokuapp.com/v1.0.0";
// const baseUrl = "http://localhost:8080/v1.0.0";


export async function getWindfarms() {

    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: "bearer " + token },
        };

        const response = await axios.get(baseUrl + "/events?includeCompleted=true", config);
        return await response.data;
    } else {
        // TODO: Handle this
        console.log("Token not found in local storage");
    }
}

export async function deleteWindfarm(id) {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: "bearer " + token },
        };

        return await axios.delete(baseUrl + "/event?eventId=" + id, config);
    } else {
        // TODO: Handle this
        console.log("Token not found in local storage");
    }
}

export async function createWindfarm(windfarm) {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: "bearer " + token },
        };

        return await axios.post(baseUrl + "/event", windfarm, config);
    } else {
        // TODO: Handle this
        console.log("Token not found in local storage");
    }
}

export async function updateWindfarm(windfarm) {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: "bearer " + token },
        };

        console.log("Updating windfarm: " + JSON.stringify(windfarm));

        return await axios.put(baseUrl + "/event", windfarm, config);
    } else {
        // TODO: Handle this
        console.log("Token not found in local storage");
    }
}

export async function getExportData() {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: "bearer " + token },
        };

        return await axios.get(baseUrl + "/events/csv", config);
    } else {
        // TODO: Handle this
        console.log("Token not found in local storage");
    }
}
