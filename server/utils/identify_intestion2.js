const nlp = require('compromise');
const Fuse = require('fuse.js');

var status = "normal"; // Zustände: "normal", "offerSet"

const stopWords = ["an", "ne"]

function getKeywords() {
    if(status === "offerSet") {
        return keywords = [
            "ja",
            "gerne",
            "jo",
            "yes",
            "klar",
            "sicher",
            "tarif",
            "in ordnung",
            "Yo",
            "ja gerne",
            "angebot",
            "abschließen",
            "berechnen",
        ];
    } else {
        return keywords = [
            "angebot",
            "abschließen",
            "berechnen"
        ];
    }
}

function checkSimilarly(text, keywords) {
    const doc = nlp(text.toLowerCase());

    const options = {
        includeScore: true,
        threshold: 0.2 // Adjusted for fuzzy matching tolerance
    };
    
    const fuse = new Fuse(keywords, options);

    const tokens = doc.terms().out('array');
    console.log('Tokens:', tokens);
    for (const token of tokens) {
        const result = fuse.search(token);
        console.log('Token:', token, 'Result:', result);
        if (result.length > 0 && result[0].score <= 0.2) {
            return true;
        }
    }
    return false;
}

function identifyIntesionChatbot(botMessage, userMessage) {
    const keywords = getKeywords();
    const setOffer = checkSimilarly(botMessage, keywords);
    if (setOffer == true) {
        status = "offerSet";
        console.log("Status: " + status);
    }
    return identifyIntesionUser(userMessage);
}

function identifyIntesionUser(text) {
    const keywords = getKeywords();
    return checkSimilarly(text, keywords);
}

module.exports = {
    identifyIntesionChatbot: function identifyIntesionChatbot(botMessage, userMessage) {
        const keywords = getKeywords();
        const setOffer = checkSimilarly(botMessage, keywords);
        if (setOffer == true) {
            status = "offerSet";
            console.log("status: offerSet")
        }
        return identifyIntesionUser(userMessage);
    },

    identifyIntesionUser: function identifyIntesionUser(text) {
        const keywords = getKeywords();
        return checkSimilarly(text, keywords);
    }
}

console.log(identifyIntesionChatbot("Super, das freut mich! Gibt es ein bestimmtes Versicherungsprodukt, das dich besonders interessiert? Wir haben tolle Angebote für Kfz-, Haftpflicht-, Hausrat- und viele weitere Versicherungen.", "Ja Kfz interessiert mich"))
// console.log(identifyIntesionUser("Kannst du mir ein Angebot machen für eine Kfz Versicherung"));