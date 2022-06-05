import axios from 'axios';
const baseUrl = "http://localhost:8080/v1.0.0/";


const getTurbines = () => {
    return axios.get(baseUrl + 'events');
}

const addTurbine = (turbineData) => {
    return axios.post(baseUrl + 'event', turbineData);
}

const deleteTurbine = (turbineId) => {
    return axios.delete(baseUrl + "event?eventId=" + turbineId);
}

const getSteps = () => {
    return axios.get(baseUrl + 'steps');
}

const setStepComplete = (stepId, isComplete) => {
    return axios.put(baseUrl + "step/complete?stepId=" + stepId + "&isCompleted=" + isComplete);
}

const login = async (username, password) => {

    let response = null;
    try {
        response = await axios.post("http://localhost:8080/login",
        JSON.stringify({ username, password }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
    } catch (error) {
        if (!error?.response) {
            console.log("No server response");
        } else if (error.response?.status === 400) {
            console.log("Bad request");
        } else if (error.response?.status === 401) {
            console.log("Unauthorized");
        } else {
            console.log("Error: ", error.response?.status);
        }
    }

    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    return {
        username, password, accessToken, roles
    }
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
    saveUser: saveUser
}

export default appService
