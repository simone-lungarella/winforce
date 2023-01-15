import { writable } from "svelte/store";

let steps = writable([
    {
        "id": 74,
        "eventId": 73,
        "name": "Sopralluogo",
        "description": "Sopralluogo zona cantiere",
        "complete": true
    },
    {
        "id": 75,
        "eventId": 73,
        "name": "Redazione report",
        "description": "Redazione report precedente ad inizio cantiere",
        "complete": true
    },
    {
        "id": 76,
        "eventId": 73,
        "name": "CME/ODC",
        "description": "CME/ODC",
        "complete": true
    },
    {
        "id": 77,
        "eventId": 73,
        "name": "Richiesta apertura cantiere",
        "description": "Invio report a permitting",
        "complete": true
    },
    {
        "id": 78,
        "eventId": 73,
        "name": "Permitting",
        "description": "Permitting",
        "complete": false
    },
    {
        "id": 79,
        "eventId": 73,
        "name": "Documentazione sicurezza",
        "description": "Documentazione sicurezza successiva all'avvio del cantiere",
        "complete": false
    },
    {
        "id": 80,
        "eventId": 73,
        "name": "Fine attività OOCC",
        "description": "Completamento attività OOCC",
        "complete": false
    },
    {
        "id": 81,
        "eventId": 73,
        "name": "Fine attività EEMM",
        "description": "Completamento attività EEMM",
        "complete": false
    },
    {
        "id": 82,
        "eventId": 73,
        "name": "Smontaggio piazzola",
        "description": "Smontaggio piazzola prima del completamento del cantiere",
        "complete": false
    }
]);


/**
 * @param {number} stepId
 */
function setStepComplete(stepId) {
    steps.update(items => {
        const updatedItems = items.map(item => {
            if (item.id === stepId) {
                return { ...item, complete: true };
            }
            return item;
        });
        return updatedItems;
    });
}

export {
    steps,
    setStepComplete
}
