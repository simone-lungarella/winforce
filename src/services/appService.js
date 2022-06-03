import axios from 'axios';
const baseUrl = "https://dockyard-handler.herokuapp.com/v1.0.0/";


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

const appService = {
    getTurbines: getTurbines,
    getSteps: getSteps,
    addTurbine: addTurbine,
    setStepComplete: setStepComplete,
    deleteTurbine: deleteTurbine
}

export default appService
