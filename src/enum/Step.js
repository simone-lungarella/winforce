// SOPRALLUOGO(1, "Sopralluogo", "Sopralluogo in sito"),
// REDAZIONE_REPORT(2, "Redazione report", "Redazione elaborato grafico attività adeguamento viabilità e piazzola"),
// NOTIFICA_PRELIMINARE(3, "Notifica preliminare", "Emissione notifica preliminare"),
// PERMITTING(4, "Permitting", "Rilascio titolo abilitativo"),
// COMPLETAMENTO_OOCC(5, "Fine attività OOCC", "Completamento attività opere civili"),
// COMPLETAMENTO_EEMM(6, "Fine attività EEMM", "Completamento attività elettromeccaniche"),
// SMONTAGGIO_PIAZZOLA(7, "Smontaggio piazzola", "Smontaggio piazzola e ripristino aree ante operam"),
// CHIUSURA_PERMITTING(8, "Chiusura permitting", "Comunicazione enti chiusura cantiere");

/**
 * @enum {string}
 * @readonly
 */
const Step = {
    1: "Sopralluogo",
    2: "Redazione report",
    3: "Notifica preliminare",
    4: "Permitting",
    5: "Fine attività OOCC",
    6: "Fine attività EEMM",
    7: "Smontaggio piazzola",
    8: "Chiusura permitting"
};


export default Step;
