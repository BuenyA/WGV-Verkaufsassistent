const openai = require("../neuronal_models/openai/openaiAssistant.js");
const createPoliceMoped = require("./createPolicyMoped.js");
const createPoliceHaftplicht = require("./createPolicyHaftplicht.js");

async function intialMoped(thread_id) {
    return [await openai.requestGPT("Im Folgenden werden Schritt für Schritt die Angaben des Benutzers ermitellt. Diese müssen sein: 'Vorname', 'Nachname', 'Adresse', 'Marke und Modell des Rollers', 'Vollkasko oder Teilkasko' 'Neuwert des Rollers' und 'Alter des jüngsten Fahrers'. Sollte der Benutzer einer der Attribute vergessen oder noch nicht im Laufe des Gesprächs ermittelt worde sein, dann fordere ihn auf, die fehlenden Daten nach und nach einzugeben. Überprüfe außerdem, ob die eingebenen Daten realistisch sein können. Falls nicht, fordere den Benutzer auf, die Eingabe zu korrigieren. Sobald du alle Daten hast, gibst du sie als ein JSON-Dokument mit folgenden Attribunamen heraus: 'geschlecht', 'vorname', 'nachname', 'modell', 'neuwert', 'kasko', 'alter', 'plz', 'stadt', 'straße' und 'hausnummer'.", thread_id), false];
}

async function intialHaftpflicht(thread_id) {
    return [await openai.requestGPT("Im Folgenden werden Schritt für Schritt die Angaben des Benutzers ermitellt. Diese müssen sein: 'Vorname', 'Nachname', 'Adresse', 'Tarif' (Basis, Optimal, Plus), 'Öffentlicher Dienst', 'Ehrenamtliche Tätigkeit bei einer Blaulichtorganisation' und 'Single -oder Familien-Tarif'. Sollte der Benutzer einer der Attribute vergessen oder noch nicht im Laufe des Gesprächs ermittelt worde sein, dann fordere ihn auf, die fehlenden Daten nach und nach einzugeben. Überprüfe außerdem, ob die eingebenen Daten realistisch sein können. Falls nicht, fordere den Benutzer auf, die Eingabe zu korrigieren. Sobald du alle Daten hast, gibst du sie als ein JSON-Dokument mit folgenden Attribunamen heraus: 'geschlecht', 'vorname', 'nachname', 'plz', 'stadt', 'straße', 'hausnummer', 'tarif', 'öffDienst', 'ehrenamt' und 'singleFamilie'.", thread_id), false];
}

async function mopedMain(thread_id, userMessage) {
    const gptAnswer = await openai.requestGPT(userMessage, thread_id);
    const gptAnswerString = gptAnswer.join("");
    // const gptAnswerString = '{"geschlecht": "männlich", "vorname": "Anus", "nachname": "Aydemir", "modell": "Aprilia SR 50 Ra", "neuwert": 5000, "kasko": "Teilkasko", "alter": 21, "plz": 74321, "stadt": "Bietigheim-Bissingen", "straße": "Maria Straße"}';
    if(gptAnswerString.indexOf("{") !== -1) {
        var json = JSON.parse(gptAnswerString.substring(gptAnswerString.indexOf("{"), gptAnswerString.indexOf("}") + 1));
        createPoliceMoped.createInsurancePolicy(json);
        return [await openai.requestGPT("Der Benutzer hat nun eine Versicherungspolice zum Download für seine Moped-Versicherung erhalten. Das kann aber ein paar Sekunden dauern.", thread_id), true];
    } else {
        return [gptAnswer, false];
    }
}

async function haftpflichtMain(thread_id, userMessage) {
    const gptAnswer = await openai.requestGPT(userMessage, thread_id);
    const gptAnswerString = gptAnswer.join("");
    // const gptAnswerString = '{"geschlecht": "männlich", "vorname": "Anus", "nachname": "Aydemir", "modell": "Aprilia SR 50 Ra", "neuwert": 5000, "kasko": "Teilkasko", "alter": 21, "plz": 74321, "stadt": "Bietigheim-Bissingen", "straße": "Maria Straße"}';
    if(gptAnswerString.indexOf("{") !== -1) {
        var json = JSON.parse(gptAnswerString.substring(gptAnswerString.indexOf("{"), gptAnswerString.indexOf("}") + 1));
        createPoliceHaftplicht.createInsurancePolicy(json);
        return [await openai.requestGPT("Die Informationen werden nun von einem Sacharbeiter der WGV-Versicherung nochmal überprüft. Das kann ein paar Tage dauern. Bei erfolgreicher Validierung, wird die Police via Post zugesendet. Erkläre das kurz dem Benutzer und biete ihm Hilfe bei weiteren Anliegen an.", thread_id), true];
    } else {
        return [gptAnswer, false];
    }
}

async function otherPlans(thread_id) {
    await openai.requestGPT("Bedauerlicherweise kann die WGV-Versicherung gerade kein Angebot für dieses Versicherungsprodukt machen. Antworte somit im Folgenden immer damit, dass auf dieses Versicherungsprodukt keine Angebote herausgegeben werden dürfen oder Versicherungen abgeschlossen werden dürfen.", thread_id);
    return ["Bedauerlicherweise! kann! ich! aktuell! noch! keine! Angebote! für! diese! Versicherungsprodukte! herausgeben.! Allerdings! helfen! Ihnen! sehr! gerne! einer! meiner! menschlichen! Kollegne! weiter.! Dafür! kannst! du! die! einfache! eine! E-Mail! an! die! www.wgv.de! oder! gleich! ein! Anruf! über! die! 0177! 1695-1500! tätigen.".split("!"), false];
}

module.exports = {
    manualChatbot: function manualChatbot(insuranceProduct, thread_id, firstInteraction, userMessage) {
        if(insuranceProduct === "moped" && firstInteraction === true) {
            return intialMoped(thread_id);
        } else if (insuranceProduct === "haftpflicht" && firstInteraction === true) {
            return intialHaftpflicht(thread_id);
        } else if (insuranceProduct === "moped" && firstInteraction === false) {
            return mopedMain(thread_id, userMessage);
        } else if (insuranceProduct === "haftpflicht" && firstInteraction === false) {
            return haftpflichtMain(thread_id, userMessage);
        } else {
            return otherPlans(thread_id);
        }
    }
}

// mopedMain('thread_WRCsTL3MeY6EYpCG2nNTetoj', '{"geschlecht": "männlich", "vorname": "Anus", "nachname": "Aydemir", "modell": "Aprilia SR 50 R", "neuwert": 5000, "kasko": "Vollkasko", "alter": 21, "plz": 74321, "stadt": "Bietigheim-Bissingen", "straße": "Maria Straße"}');