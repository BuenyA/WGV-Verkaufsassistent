const utils_identify_intestion = require("./identify_intestion.js");
const utils_manualChatbot = require("./manualChatbot.js");

module.exports = {
    searchInitiationWord: function searchInitiationWord(message) {
        return utils_identify_intestion.searchInitiationWord(message);
    },

    manualChatbot: function manualChatbot(message) {
        return utils_manualChatbot.manualChatbot(message);
    }
}