import axios from "axios";
const baseUrl = "https://dockyard-handler.herokuapp.com/v1.0.0";
// const baseUrl = "http://localhost:8080/v1.0.0";

/**
 * @param {number} eventId
 */
export async function getSteps(eventId) {

    console.log("Retrieving steps for event " + eventId);
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: "bearer " + token },
        };

        const response = await axios.get(baseUrl + "/steps/" + eventId, config);
        return await response.data;
    } else {
        // TODO: Handle this
        console.log("Token not found in local storage");
    }
}

/**
 * @param {string} stepId
 * @param {boolean} [isComplete]
 */
export async function setStepComplete(stepId, isComplete) {

    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem("token");

        const config = {
            headers: { Authorization: "bearer " + token },
        };

        return await axios.put(baseUrl + "/step/complete?stepId=" + stepId + "&isCompleted=" + isComplete, null, config);
    } else {
        // TODO: Handle this
        console.log("Token not found in local storage");
    }
}
