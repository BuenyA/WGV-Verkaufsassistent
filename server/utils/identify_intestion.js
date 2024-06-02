const nlp = require('compromise');
const Fuse = require('fuse.js');

function getKeywords(counter) {
    if(counter === 0) {
        return keywords = [
            "kfz",
            "kfzversicherung",
            "auto",
            "autoversicherung",
            "kraftfahrzeug",
            "kraftfahrzeugversicherung",
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
            "mopedversicherung",
            "roller",
            "rollerversicherung",
            "mofa",
            "mofaversicherung",
            "zweirad",
            "mopped",
            "moppedversicherung",
            "zweitakter"
        ];
    } else if(counter === 2) {
        return keywords = [
            "youngdriver",
            "youngdriverversicherung",
        ];
    } else if(counter === 3) {
        return keywords = [
            "hausrat",
            "hausratversicherung",
            "glas"
        ];
    } else if(counter === 4) {
        return keywords = [
            "wohngebäude",
            "wohngebäudeversicherung",
            "gebäude"
        ];
    } else if(counter === 5) {
        return keywords = [
            "privathaftplicht",
            "privathaftplichtversicherung",
            "haftplicht",
            "haftplichtversicherung",
            "bauleistungsversicherung",
            "bauherrenhaftpflichtversicherung",
            "diensthaftplicht",
            "diensthaftplichtversicherung"
        ];
    } else if(counter === 6) {
        return keywords = [
            "cyber",
            "cyberversicherung",
            "hacker",
            "hackerversicherung",
            "cracker",
            "crackerversicherung"
        ];
    } else if(counter === 7) {
        return keywords = [
            "rechtsschutz",
            "rechtsschutzversicherung"
        ];
    } else if(counter === 8) {
        return keywords = [
            "zahn",
            "zahnversicherung",
            "zähne",
            "zähneversicherung"
        ];
    } else if(counter === 9) {
        return keywords = [
            "rente",
            "rentenversicherung"
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
    const keywords = ["kfz", "moped", "youngdriver", "hausrat", "wohngebäude", "haftpflicht", "cyber", "rechtsschutz", "zahn", "rente"];

    while(!productFound) {
        productFound = checkSimilarly(message, getKeywords(counter));
        counter++;
        if(counter === 20) {
            break;
        }
    }

    // console.log(counter - 1);

    return keywords[counter - 1];
}

function searchInitiationWord(message) {
    let index = message.indexOf("Start Angebot");

    if(index !== -1) {
        substring = message.substring(index + 14);
        console.log(substring.indexOf("-"));
        if (substring.indexOf("-") !== -1) {
            if (substring.indexOf(":") < substring.indexOf("-")) {
                keyword = substring.substring(0, substring.indexOf(":"));
            } else {
                keyword = substring.substring(0, substring.indexOf("-"));
            }
        } else {
            keyword = substring.substring(0, substring.indexOf(":"));
        }
        console.log(keyword);
        return [true, whichProduct(keyword)];
    } else {
        return [false, ""];
    }
}

module.exports = {
    searchInitiationWord: function searchInitiationWord(message) {
        let index = message.indexOf("Start Angebot");

        if(index !== -1) {
            substring = message.substring(index + 14);
            // console.log(substring.indexOf("-"));
            if (substring.indexOf("-") !== -1) {
                if (substring.indexOf(":") < substring.indexOf("-")) {
                    keyword = substring.substring(0, substring.indexOf(":"));
                } else {
                    keyword = substring.substring(0, substring.indexOf("-"));
                }
            } else {
                keyword = substring.substring(0, substring.indexOf(":"));
            }
            // console.log(keyword);
            return [true, whichProduct(keyword)];
        } else {
            return [false, ""];
        }
    }
}

// console.log(searchInitiationWord("Vielen Dank, Bünyamin! Hier sind die Informationen, die ich von dir erhalten habe: - **Name:** Bünyamin Aydemir - **Adresse:** Maria-Merian-Straße 8, 74321 Bietigheim-Bissingen - **Geburtsdatum:** 18.09.2002 Ich werde nun das Angebot für den OPTIMAL-Tarif der Privathaftpflichtversicherung erstellen. Start Angebot Privathaftpflichtversicherung OPTIMAL: Dein individuelles Angebot wird jetzt vorbereitet. Einen Moment bitte. Dein Angebot ist fertig. Bei weiteren Fragen oder wenn du das Angebot annehmen möchtest, lass es mich einfach wissen!"));