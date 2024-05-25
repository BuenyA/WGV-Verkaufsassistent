const nlp = require('compromise');
const Fuse = require('fuse.js');

function getKeywords(counter) {
    if(counter === 0) {
        return keywords = [
            "kfz",
            "auto",
            "kraftfahrzeug",
            "wagen",
            "karre",
            "schlitten",
            "karosse",
            "vehikel",
            "wohnmobil",
            "wohnwagen",
            "motorrad"
        ];
    } else if(counter === 1) {
        return keywords = [
            "moped",
            "roller",
            "mofa",
            "zweirad",
            "mopped",
            "zweitakter"
        ];
    } else if(counter === 2) {
        return keywords = [
            "youngdriver"
        ];
    } else if(counter === 3) {
        return keywords = [
            "hausrat",
            "glas"
        ];
    } else if(counter === 4) {
        return keywords = [
            "wohngebäude",
            "gebäude"
        ];
    } else if(counter === 5) {
        return keywords = [
            "privathaftplicht",
            "haftplicht",
            "bauleistungsversicherung",
            "bauherrenhaftpflichtversicherung",
            "diensthaftplicht"
        ];
    } else if(counter === 6) {
        return keywords = [
            "cyber",
            "hacker",
            "cracker"
        ];
    } else if(counter === 7) {
        return keywords = [
            "rechtsschutz",
            "abschließen",
            "berechnen"
        ];
    } else if(counter === 8) {
        return keywords = [
            "zahn",
            "zähne"
        ];
    } else if(counter === 9) {
        return keywords = [
            "rente"
        ];
    } else {
        return keywords = [
            ""
        ];
    }
}

function checkSimilarly(message, keywords) {
    const doc = nlp(message.toLowerCase());

    const options = {
        includeScore: true,
        threshold: 0.1
    };
    
    const fuse = new Fuse(keywords, options);

    const tokens = doc.terms().out('array');
    // console.log('Tokens:', tokens);
    for (const token of tokens) {
        const result = fuse.search(token);
        // console.log('Token:', token, 'Result:', result);
        if (result.length > 0 && result[0].score <= 0.2) {
            return true;
        }
    }
    return false;
}

function whichProduct(message) {

    var productFound = false;
    var counter = 0;
    const keywords = ["kfz", "moped", "youngdriver", "hausrat", "wohngebäude", "haftpflicht", "cyber", "rechtsschutz", "zahn", "rente"]

    while(!productFound) {
        productFound = checkSimilarly(message, getKeywords(counter));
        counter++;
        if(counter === 20) {
            break;
        }
    }

    return keywords[counter - 1];
}

module.exports = {
    searchInitiationWord: function searchInitiationWord(message) {
        let index = message.indexOf("Start Angebot");

        if(index !== -1) {
            substring = message.substring(index + 14);
            keyword = substring.substring(0, substring.indexOf(":"));
            return [true, whichProduct(keyword)];
        } else {
            return [false, ""];
        }
    }
}