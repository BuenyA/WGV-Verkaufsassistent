function cyber() {
    return "Ich kann dir sehr gerne ein Angebot für eine Kfz-Versicherung machen. Dafür bräuchte ich noch ein paar Daten von dir. XXX";
}

function moped() {
    return "Ich kann dir sehr gerne ein Angebot für eine Moped-Versicherung machen. Dafür bräuchte ich noch ein paar Daten von dir. XXX";
}

function otherPlans() {
    return "Bedauerlicherweise kann ich aktuell noch keine Angebote für diese Versicherungsprodukte herausgeben. Allerdings kann dir sehr gerne einer meiner menschlichen Mitarbeiter weiterhelfen. Dafür kannst du die einfache eine E-Mail an die XXX.wgv.de oder gleich ein Anruf über die 0177 XXX XXXXX tätigen."
}

module.exports = {
    manualChatbot: function manualChatbot(insuranceProduct) {
        if(insuranceProduct === "cyber") {
            return kfz().split(/(?=\s)|(?<=\s)/);
        } else if(insuranceProduct === "moped") {
            return moped().split(/(?=\s)|(?<=\s)/);
        } else {
            return otherPlans().split(/(?=\s)|(?<=\s)/);
        }
    }
}