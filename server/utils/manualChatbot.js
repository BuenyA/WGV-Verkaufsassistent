const openai = require("../neuronal_models/openai/openaiAssistant.js");
const createPolice = require("./createPolicy.js");

async function intialMoped(thread_id) {
    return await openai.requestGPT("Die folgenden Nachrichten werden nun die Angaben des Benutzers enthalten. Diese müssen sein: 'Vorname', 'Nachname', 'Modell des Rollers', 'Vollkasko oder Teilkasko' 'Neuwert des Rollers', 'Alter des jüngsten Fahrers' und die 'PLZ'. Sollte der Benutzer einer der Attribute vergessen, dann fordere ihn auf, die fehlenden Daten einzugeben. Überprüfe außerdem, ob die eingebenen Daten realistisch sein können. Falls nicht, fordere den Benutzer auf, die Eingabe zu korrigieren. Sobald du alle Daten hast, gibst du sie als ein JSON-Dokument mit folgenden Attribunamen heraus: 'vorname', 'nachname', 'modell', 'neuwert', 'kasko', 'alter' und 'plz'.", thread_id);
    // return "Ich! kann! dir! sehr! gerne! ein! Angebot! für! eine! Moped-Versicherung! machen.! Dafür! bräuchte! ich! noch! die! folgenden! Daten! von! dir:! Vorname,! Nachname,! Modell,! Neuwert,! Alter! des! jüngsten! Fahrers,! und! die! Postleitzahl..".split("!");
}

async function mopedMain(thread_id, userMessage) {
    const gptAnswer = await openai.requestGPT(userMessage, thread_id);
    const gptAnswerString = gptAnswer.join("");
    if(gptAnswerString.indexOf("{") !== -1) {
        var json = JSON.parse(gptAnswerString.substring(gptAnswerString.indexOf("{"), gptAnswerString.indexOf("}") + 1));

        return await openai.requestGPT("Der Benutzer hat nun eine Versicherungspolice zum Download für seine Moped-Versicherung erhalten. Das kann aber ein paar Sekunden dauern.", thread_id);
    } else {
        return gptAnswer;
    }
}

async function otherPlans(thread_id) {
    await openai.requestGPT("Bedauerlicherweise kann die WGV-Versicherung gerade kein Angebot für dieses Versicherungsprodukt machen. Antworte somit im Folgenden immer damit, dass auf dieses Versicherungsprodukt keine Angebote herausgegeben werden dürfen oder Versicherungen abgeschlossen werden dürfen.", thread_id);
    return "Bedauerlicherweise! kann! ich! aktuell! noch! keine! Angebote! für! diese! Versicherungsprodukte! herausgeben.! Allerdings! kann! dir! sehr! gerne! einer! meiner! menschlichen! Mitarbeiter! weiterhelfen.! Dafür! kannst! du! die! einfache! eine! E-Mail! an! die! www.wgv.de! oder! gleich! ein! Anruf! über! die! 0177! 1695-1500! tätigen.".split("!");
}

module.exports = {
    manualChatbot: function manualChatbot(insuranceProduct, thread_id, firstInteraction, userMessage) {
        if(insuranceProduct === "moped" && firstInteraction === true) {
            return intialMoped(thread_id);
        } else if (insuranceProduct === "moped" && firstInteraction === false) {
            return mopedMain(thread_id, userMessage);
        } else {
            return otherPlans(thread_id);
        }
    }
}