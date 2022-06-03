import axios from 'axios';
const baseUrl = "http://localhost:8080/v1.0.0/";


const getTurbines = () => {
    return axios.get(baseUrl + 'events');
}

const addTurbine = (turbineData) => {
    return axios.post(baseUrl + 'event', turbineData);
}

const getSteps = () => {
    return axios.get(baseUrl + 'steps');
}

const setStepComplete = (stepId, isComplete) => {
    return axios.put(baseUrl + "step/complete?stepId=" + stepId + "&isCompleted=" + isComplete);
}

export default {
    getTurbines : getTurbines,
    getSteps : getSteps,
    addTurbine : addTurbine,
    setStepComplete : setStepComplete
}
