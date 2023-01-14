import { writable } from "svelte/store";

let windfarms = writable([
    {
        "id": 1135,
        "turbineName": "PL17",
        "turbineNumber": "2044",
        "description": "Ploaghe",
        "odlNumber": 2393596,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "13-12-2022 11:55",
        "turbineState": "Ferma",
        "completedSteps": 0,
        "startingDateOOCC": "2022-12-01",
        "mailSent": false
    },
    {
        "id": 1160,
        "turbineName": "RO09",
        "turbineNumber": "2061",
        "description": "Roseto Valfortore",
        "odlNumber": 2394955,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "03-01-2023 13:03",
        "turbineState": "Ferma",
        "completedSteps": 1,
        "startingDateEEMM": "2023-01-03",
        "startingDateOOCC": "2023-01-04",
        "permittingDate": "2023-01-01",
        "mailSent": false
    },
    {
        "id": 1169,
        "turbineName": "PC15",
        "turbineNumber": "2062",
        "description": "Pietracatella",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Attività Varie"
        ],
        "creationDate": "03-01-2023 13:23",
        "turbineState": "In marcia",
        "completedSteps": 1,
        "startingDateOOCC": "2023-01-11",
        "mailSent": false
    },
    {
        "id": 991,
        "turbineName": "MC02",
        "turbineNumber": "XXXX",
        "description": "Macchia",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "05-10-2022 09:44",
        "turbineState": "In marcia",
        "completedSteps": 2,
        "startingDateOOCC": "2022-10-10",
        "mailSent": false
    },
    {
        "id": 999,
        "turbineName": "MC11",
        "turbineNumber": "XXXX",
        "description": "Macchia",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "05-10-2022 09:44",
        "turbineState": "In marcia",
        "completedSteps": 2,
        "startingDateOOCC": "2022-10-10",
        "mailSent": false
    },
    {
        "id": 1007,
        "turbineName": "MC12",
        "turbineNumber": "XXXX",
        "description": "Macchia",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "05-10-2022 09:45",
        "turbineState": "In marcia",
        "completedSteps": 2,
        "startingDateOOCC": "2022-10-10",
        "mailSent": false
    },
    {
        "id": 927,
        "turbineName": "MC05",
        "turbineNumber": "XXXX",
        "description": "Macchia",
        "odlNumber": 2445094,
        "power": "KILOWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "08-09-2022 12:07",
        "turbineState": "In marcia",
        "completedSteps": 2,
        "mailSent": false
    },
    {
        "id": 1127,
        "turbineName": "PL19",
        "turbineNumber": "2049",
        "description": "Ploaghe",
        "odlNumber": 2394345,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "13-12-2022 11:54",
        "turbineState": "Ferma",
        "completedSteps": 2,
        "startingDateOOCC": "2022-12-19",
        "mailSent": false
    },
    {
        "id": 1095,
        "turbineName": "CA13",
        "turbineNumber": "2039",
        "description": "Carlentini",
        "odlNumber": 2392374,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Blade Bearing"
        ],
        "creationDate": "07-11-2022 13:40",
        "turbineState": "Ferma",
        "completedSteps": 3,
        "startingDateEEMM": "2022-11-13",
        "startingDateOOCC": "2022-11-07",
        "mailSent": false
    },
    {
        "id": 943,
        "turbineName": "CA14",
        "turbineNumber": "2019",
        "description": "Carlentini",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione cuscinetto"
        ],
        "creationDate": "28-09-2022 06:22",
        "turbineState": "In marcia",
        "completedSteps": 3,
        "startingDateOOCC": "2022-10-03",
        "permittingDate": "2022-09-26",
        "mailSent": true
    },
    {
        "id": 863,
        "turbineName": "GAS59",
        "turbineNumber": "2000",
        "description": "Fossa del Lupo",
        "odlNumber": 244389,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Blade Bearing"
        ],
        "creationDate": "05-09-2022 12:48",
        "turbineState": "In marcia",
        "completedSteps": 4,
        "startingDateOOCC": "2022-09-12",
        "completionDateOOCC": "2022-09-12",
        "permittingDate": "2022-09-08",
        "mailSent": true
    },
    {
        "id": 871,
        "turbineName": "PAL37",
        "turbineNumber": "2000",
        "description": "Fossa del Lupo",
        "odlNumber": 0,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Blade Bearing"
        ],
        "creationDate": "05-09-2022 12:50",
        "turbineState": "In marcia",
        "completedSteps": 4,
        "startingDateOOCC": "2022-09-12",
        "completionDateOOCC": "2022-09-12",
        "permittingDate": "2022-09-08",
        "mailSent": true
    },
    {
        "id": 1023,
        "turbineName": "AM01",
        "turbineNumber": "1969",
        "description": "Amaroni",
        "odlNumber": 2434422,
        "power": "MEGAWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "13-10-2022 10:59",
        "turbineState": "In marcia",
        "completedSteps": 4,
        "startingDateOOCC": "2022-10-20",
        "completionDateOOCC": "2022-10-19",
        "mailSent": false
    },
    {
        "id": 1015,
        "turbineName": "VAL07",
        "turbineNumber": "1969",
        "description": "Fossa del Lupo",
        "odlNumber": 2445306,
        "power": "MEGAWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "13-10-2022 10:59",
        "turbineState": "In marcia",
        "completedSteps": 4,
        "startingDateOOCC": "2022-10-20",
        "completionDateOOCC": "2022-10-18",
        "mailSent": false
    },
    {
        "id": 1031,
        "turbineName": "AM11",
        "turbineNumber": "1969",
        "description": "Amaroni",
        "odlNumber": 2444968,
        "power": "MEGAWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "13-10-2022 11:00",
        "turbineState": "In marcia",
        "completedSteps": 4,
        "startingDateOOCC": "2022-10-20",
        "completionDateOOCC": "2022-11-03",
        "mailSent": false
    },
    {
        "id": 951,
        "turbineName": "PC02",
        "turbineNumber": "2025",
        "description": "Pietracatella",
        "odlNumber": 2392092,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "03-10-2022 10:42",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-10-11",
        "startingDateOOCC": "2022-10-08",
        "completionDateEEMM": "2022-10-19",
        "completionDateOOCC": "2022-10-18",
        "mailSent": false
    },
    {
        "id": 959,
        "turbineName": "MT03",
        "turbineNumber": "2023",
        "description": "Motta",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione Main Bearing"
        ],
        "creationDate": "03-10-2022 10:43",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-10-11",
        "startingDateOOCC": "2022-10-09",
        "completionDateEEMM": "2022-11-14",
        "completionDateOOCC": "2022-10-31",
        "mailSent": false
    },
    {
        "id": 967,
        "turbineName": "PL30",
        "turbineNumber": "2028",
        "description": "Ploaghe",
        "odlNumber": 2392264,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "03-10-2022 13:09",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-10-11",
        "startingDateOOCC": "2022-10-10",
        "completionDateEEMM": "2022-10-21",
        "completionDateOOCC": "2022-10-20",
        "mailSent": false
    },
    {
        "id": 975,
        "turbineName": "RO15",
        "turbineNumber": "2023",
        "description": "Roseto",
        "odlNumber": 2392092,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione Blade Bearing"
        ],
        "creationDate": "04-10-2022 13:04",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-10-04",
        "startingDateOOCC": "2022-10-10",
        "completionDateEEMM": "2022-10-21",
        "completionDateOOCC": "2022-10-06",
        "mailSent": false
    },
    {
        "id": 983,
        "turbineName": "SV14",
        "turbineNumber": "2021",
        "description": "San Vincenzo",
        "odlNumber": 2391872,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "04-10-2022 13:06",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-10-04",
        "startingDateOOCC": "2022-10-02",
        "completionDateEEMM": "2022-10-21",
        "completionDateOOCC": "2022-10-04",
        "mailSent": false
    },
    {
        "id": 855,
        "turbineName": "GAS58",
        "turbineNumber": "2000",
        "description": "Fossa del Lupo",
        "odlNumber": 2443868,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Blade Bearing"
        ],
        "creationDate": "05-09-2022 12:48",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "completionDateEEMM": "2022-09-29",
        "completionDateOOCC": "2022-09-12",
        "permittingDate": "2022-09-08",
        "mailSent": true
    },
    {
        "id": 879,
        "turbineName": "PAL64",
        "turbineNumber": "XXXX",
        "description": "Fossa del Lupo",
        "odlNumber": 0,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Main Bearing"
        ],
        "creationDate": "05-09-2022 12:50",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateOOCC": "2022-09-12",
        "completionDateEEMM": "2023-01-06",
        "completionDateOOCC": "2022-11-29",
        "mailSent": false
    },
    {
        "id": 919,
        "turbineName": "LC24",
        "turbineNumber": "2001",
        "description": "Lacedonia Wind",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Manutenzione ordinaria viabilità"
        ],
        "creationDate": "05-09-2022 13:33",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "completionDateEEMM": "2022-10-22",
        "completionDateOOCC": "2022-10-22",
        "permittingDate": "2022-09-05",
        "mailSent": true
    },
    {
        "id": 1103,
        "turbineName": "SV13",
        "turbineNumber": "2037",
        "description": "San Vincenzo",
        "odlNumber": 2392012,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "07-11-2022 13:44",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-11-15",
        "startingDateOOCC": "2022-11-03",
        "completionDateEEMM": "2023-01-06",
        "completionDateOOCC": "2022-11-14",
        "mailSent": false
    },
    {
        "id": 1111,
        "turbineName": "SA04",
        "turbineNumber": "XXXX",
        "description": "Salemi",
        "odlNumber": 2393143,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "10-11-2022 15:15",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-11-20",
        "startingDateOOCC": "2022-11-15",
        "completionDateEEMM": "2023-01-06",
        "completionDateOOCC": "2023-01-06",
        "mailSent": false
    },
    {
        "id": 935,
        "turbineName": "MT06",
        "turbineNumber": "2009",
        "description": "Motta",
        "odlNumber": 2391634,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione Pala RJ"
        ],
        "creationDate": "12-09-2022 08:32",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateOOCC": "2022-09-17",
        "completionDateEEMM": "2022-09-29",
        "completionDateOOCC": "2022-09-22",
        "mailSent": false
    },
    {
        "id": 1039,
        "turbineName": "BO21",
        "turbineNumber": "2027",
        "description": "Bortigiadas",
        "odlNumber": 2444964,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Pala RJ"
        ],
        "creationDate": "13-10-2022 11:02",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateOOCC": "2022-10-20",
        "completionDateEEMM": "2022-11-07",
        "completionDateOOCC": "2022-10-20",
        "mailSent": false
    },
    {
        "id": 1119,
        "turbineName": "BI11",
        "turbineNumber": "2043",
        "description": "Bisaccia",
        "odlNumber": 2393410,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione trafo"
        ],
        "creationDate": "18-11-2022 10:29",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-11-27",
        "startingDateOOCC": "2022-11-25",
        "completionDateEEMM": "2022-12-05",
        "completionDateOOCC": "2022-11-28",
        "mailSent": false
    },
    {
        "id": 763,
        "turbineName": "FZ05",
        "turbineNumber": "1958",
        "description": "Forenza",
        "odlNumber": 2390507,
        "power": "KILOWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "21-08-2022 10:15",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateOOCC": "2022-08-26",
        "completionDateEEMM": "2022-08-21",
        "completionDateOOCC": "2022-08-21",
        "permittingDate": "2022-08-21",
        "mailSent": true
    },
    {
        "id": 771,
        "turbineName": "MV01",
        "turbineNumber": "1981",
        "description": "Monteverde",
        "odlNumber": 2390553,
        "power": "KILOWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "21-08-2022 10:18",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateOOCC": "2022-08-26",
        "completionDateEEMM": "2022-08-29",
        "completionDateOOCC": "2022-08-21",
        "permittingDate": "2022-08-21",
        "mailSent": true
    },
    {
        "id": 779,
        "turbineName": "BS40",
        "turbineNumber": "1989",
        "description": "Bisaccia Wind",
        "odlNumber": 2444615,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione Pala RJ"
        ],
        "creationDate": "21-08-2022 10:19",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateOOCC": "2022-08-26",
        "completionDateEEMM": "2022-09-01",
        "completionDateOOCC": "2022-08-23",
        "permittingDate": "2022-08-22",
        "mailSent": true
    },
    {
        "id": 787,
        "turbineName": "FZ10",
        "turbineNumber": "1993",
        "description": "Forenza",
        "odlNumber": 0,
        "power": "KILOWATT",
        "operation": [
            "Riparazione pale"
        ],
        "creationDate": "21-08-2022 10:20",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateOOCC": "2022-08-26",
        "completionDateOOCC": "2022-08-26",
        "permittingDate": "2022-08-22",
        "mailSent": true
    },
    {
        "id": 795,
        "turbineName": "R04",
        "turbineNumber": "1988",
        "description": "Rocca San Felice",
        "odlNumber": 2390646,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "21-08-2022 10:21",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateOOCC": "2022-08-26",
        "completionDateEEMM": "2022-08-29",
        "completionDateOOCC": "2022-08-21",
        "permittingDate": "2022-08-21",
        "mailSent": true
    },
    {
        "id": 803,
        "turbineName": "VC04",
        "turbineNumber": "1991",
        "description": "Vicari",
        "odlNumber": 2442127,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Traversa"
        ],
        "creationDate": "23-08-2022 07:34",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateEEMM": "2022-09-03",
        "startingDateOOCC": "2022-08-30",
        "completionDateEEMM": "2022-10-31",
        "completionDateOOCC": "2022-10-31",
        "mailSent": false
    },
    {
        "id": 811,
        "turbineName": "FZ36",
        "turbineNumber": "2002",
        "description": "Forenza",
        "odlNumber": 2444853,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione Pala RJ"
        ],
        "creationDate": "25-08-2022 07:24",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateEEMM": "2022-09-10",
        "startingDateOOCC": "2022-08-30",
        "completionDateEEMM": "2022-11-07",
        "completionDateOOCC": "2022-09-15",
        "permittingDate": "2022-09-06",
        "mailSent": true
    },
    {
        "id": 1071,
        "turbineName": "NU15",
        "turbineNumber": "2035",
        "description": "Nulvi",
        "odlNumber": 2392586,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "25-10-2022 07:03",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateOOCC": "2022-10-25",
        "completionDateEEMM": "2022-10-31",
        "completionDateOOCC": "2022-10-31",
        "mailSent": false
    },
    {
        "id": 847,
        "turbineName": "GR09",
        "turbineNumber": "1999",
        "description": "Greci",
        "odlNumber": 2444925,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione Gearbox"
        ],
        "creationDate": "29-08-2022 14:25",
        "turbineState": "In marcia",
        "completedSteps": 5,
        "startingDateOOCC": "2022-09-05",
        "completionDateEEMM": "2022-10-21",
        "completionDateOOCC": "2022-09-07",
        "permittingDate": "2022-09-05",
        "mailSent": true
    },
    {
        "id": 1079,
        "turbineName": "PG05",
        "turbineNumber": "2040",
        "description": "Poggio Imperiale",
        "odlNumber": 2392975,
        "power": "MEGAWATT",
        "operation": [
            "Sostituzione Blade Bearing"
        ],
        "creationDate": "31-10-2022 11:40",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-11-05",
        "startingDateOOCC": "2022-11-04",
        "completionDateEEMM": "2022-11-28",
        "completionDateOOCC": "2022-11-16",
        "mailSent": false
    },
    {
        "id": 1087,
        "turbineName": "VZ13",
        "turbineNumber": "2036",
        "description": "Vizzini",
        "odlNumber": 2392578,
        "power": "KILOWATT",
        "operation": [
            "Sostituzione generatore"
        ],
        "creationDate": "31-10-2022 11:41",
        "turbineState": "Ferma",
        "completedSteps": 5,
        "startingDateEEMM": "2022-11-02",
        "startingDateOOCC": "2022-10-31",
        "completionDateEEMM": "2022-11-14",
        "completionDateOOCC": "2022-11-14",
        "mailSent": false
    }
]);


/**
 * @param {{ id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateOOCC: string; mailSent: boolean; startingDateEEMM?: undefined; permittingDate?: undefined; completionDateOOCC?: undefined; completionDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateEEMM: string; startingDateOOCC: string; permittingDate: string; mailSent: boolean; completionDateOOCC?: undefined; completionDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; mailSent: boolean; startingDateOOCC?: undefined; startingDateEEMM?: undefined; permittingDate?: undefined; completionDateOOCC?: undefined; completionDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateEEMM: string; startingDateOOCC: string; mailSent: boolean; permittingDate?: undefined; completionDateOOCC?: undefined; completionDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateOOCC: string; permittingDate: string; mailSent: boolean; startingDateEEMM?: undefined; completionDateOOCC?: undefined; completionDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateOOCC: string; completionDateOOCC: string; permittingDate: string; mailSent: boolean; startingDateEEMM?: undefined; completionDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateOOCC: string; completionDateOOCC: string; mailSent: boolean; startingDateEEMM?: undefined; permittingDate?: undefined; completionDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateEEMM: string; startingDateOOCC: string; completionDateEEMM: string; completionDateOOCC: string; mailSent: boolean; permittingDate?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; completionDateEEMM: string; completionDateOOCC: string; permittingDate: string; mailSent: boolean; startingDateOOCC?: undefined; startingDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateOOCC: string; completionDateEEMM: string; completionDateOOCC: string; mailSent: boolean; startingDateEEMM?: undefined; permittingDate?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateOOCC: string; completionDateEEMM: string; completionDateOOCC: string; permittingDate: string; mailSent: boolean; startingDateEEMM?: undefined; } | { id: number; turbineName: string; turbineNumber: string; description: string; odlNumber: number; power: string; operation: string[]; creationDate: string; turbineState: string; completedSteps: number; startingDateEEMM: string; startingDateOOCC: string; completionDateEEMM: string; completionDateOOCC: string; permittingDate: string; mailSent: boolean; }} windfarm
 */
function add(windfarm) {
    windfarms.update(i => [...i, windfarm])
}

/**
 * @param {number} windfarmId
 */
function remove(windfarmId) {
    windfarms.update(i => i.filter(windfarm => windfarm.id !== windfarmId));
}

/**
 * @param {{id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateOOCC: string;mailSent: boolean;startingDateEEMM?: undefined;permittingDate?: undefined;completionDateOOCC?: undefined;completionDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateEEMM: string;startingDateOOCC: string;permittingDate: string;mailSent: boolean;completionDateOOCC?: undefined;completionDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;mailSent: boolean;startingDateOOCC?: undefined;startingDateEEMM?: undefined;permittingDate?: undefined;completionDateOOCC?: undefined;completionDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateEEMM: string;startingDateOOCC: string;mailSent: boolean;permittingDate?: undefined;completionDateOOCC?: undefined;completionDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateOOCC: string;permittingDate: string;mailSent: boolean;startingDateEEMM?: undefined;completionDateOOCC?: undefined;completionDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateOOCC: string;completionDateOOCC: string;permittingDate: string;mailSent: boolean;startingDateEEMM?: undefined;completionDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateOOCC: string;completionDateOOCC: string;mailSent: boolean;startingDateEEMM?: undefined;permittingDate?: undefined;completionDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateEEMM: string;startingDateOOCC: string;completionDateEEMM: string;completionDateOOCC: string;mailSent: boolean;permittingDate?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;completionDateEEMM: string;completionDateOOCC: string;permittingDate: string;mailSent: boolean;startingDateOOCC?: undefined;startingDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateOOCC: string;completionDateEEMM: string;completionDateOOCC: string;mailSent: boolean;startingDateEEMM?: undefined;permittingDate?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateOOCC: string;completionDateEEMM: string;completionDateOOCC: string;permittingDate: string;mailSent: boolean;startingDateEEMM?: undefined;} | {id: number;turbineName: string;turbineNumber: string;description: string;odlNumber: number;power: string;operation: string[];creationDate: string;turbineState: string;completedSteps: number;startingDateEEMM: string;startingDateOOCC: string;completionDateEEMM: string;completionDateOOCC: string;permittingDate: string;mailSent: boolean;}} windfarm
 * @param {number} i
 */
function update(windfarm, i) {
    windfarms.update(it => {
        it[i] = windfarm;
        return it;
    });
}

export {
    windfarms,
    add,
    remove,
    update
}
