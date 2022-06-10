import axios from 'axios';
const baseUrl = "https://dockyard-handler.herokuapp.com/v1.0.0/";

let token = null

const setToken = newToken => {
    if (newToken != null) {
        token = newToken;
        localStorage.setItem("token", token);
    }
}

const getTurbines = () => {
    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.get(baseUrl + 'events', config);
}

const addTurbine = (turbineData) => {

    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.post(baseUrl + 'event', turbineData, config);
}

const deleteTurbine = (turbineId) => {
    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.delete(baseUrl + "event?eventId=" + turbineId, config);
}

const getSteps = () => {
    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.get(baseUrl + 'steps', config);
}

const setStepComplete = (stepId, isComplete) => {
    const config = {
        headers: { Authorization: 'bearer ' + token },
    }

    return axios.put(baseUrl + "step/complete?stepId=" + stepId + "&isCompleted=" + isComplete, null, config);
}

const login = async (username, password) => {

    return axios.get("https://dockyard-handler.herokuapp.com/login?username=" + username + "&password=" + password);
}

const saveUser = (username, password) => {
    const user = {
        username: username,
        password: password
    }
    return axios.post(baseUrl + "registration/user", user);
}

const appService = {
    getTurbines: getTurbines,
    getSteps: getSteps,
    addTurbine: addTurbine,
    setStepComplete: setStepComplete,
    deleteTurbine: deleteTurbine,
    login: login,
    saveUser: saveUser,
    setToken: setToken
}

export default appService
