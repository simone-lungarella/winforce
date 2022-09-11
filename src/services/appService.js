import axios from 'axios';
const baseUrl = "http://localhost:8080/v1.0.0/";

let token = null

const setToken = newToken => {
    if (newToken != null) {
        token = newToken;
        localStorage.setItem("token", token);
    }
}

const getTurbines = () => {

    console.log("BACKEND SRV - Retrieving all turbines");

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.get(baseUrl + 'events', config);
}

const addTurbine = (turbineData) => {

    console.log("BACKEND SRV - Creating turbine: " + turbineData.name);

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.post(baseUrl + 'event', turbineData, config);
}

const alterTurbine = (turbineData) => {

    console.log("BACKEND SRV - Updating turbine: " + turbineData.name);

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.put(baseUrl + 'event', turbineData, config);
}

const deleteTurbine = (turbineId) => {
    
    console.log("BACKEND SRV - Deleting turbine: " + turbineId);

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.delete(baseUrl + "event?eventId=" + turbineId, config);
}

const getSteps = () => {

    console.log("BACKEND SRV - Retrieving all steps");

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.get(baseUrl + 'steps', config);
}

const getExportdata = () => {

    console.log("BACKEND SRV - Creating csv file");

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.get(baseUrl + 'events/csv', config);
}

const setStepComplete = (stepId, isComplete) => {

    console.log("BACKEND SRV - Setting step completeness: " + stepId + " - " + isComplete);

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.put(baseUrl + "step/complete?stepId=" + stepId + "&isCompleted=" + isComplete, null, config);
}

const login = async (username, password) => {

    return axios.get("http://localhost:8080/login?username=" + username + "&password=" + password);
}

const createUser = (username, password, userRole) => {
    
    console.log("BACKEND SRV - Creating user: " + username);
    
    const config = {
        headers: { Authorization: 'bearer ' + token },
    }
    
    return axios.post(baseUrl + "registration/user", { username: username, password: password, userRole: userRole }, config);
}

const appService = {
    getTurbines: getTurbines,
    getSteps: getSteps,
    addTurbine: addTurbine,
    setStepComplete: setStepComplete,
    deleteTurbine: deleteTurbine,
    login: login,
    setToken: setToken,
    createUser: createUser,
    alterTurbine: alterTurbine,
    getExportdata: getExportdata
}

export default appService
