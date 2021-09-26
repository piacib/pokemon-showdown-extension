"use strict";
exports.__esModule = true;
var types_1 = require("../types");
var messages_1 = require("../messages");
var utils_1 = require("./utils");
var getTeam_1 = require("./getTeam");
var testDS = {
    user: [
        "Dodrio",
        "Rotom-Heat",
        "Snorlax",
        "Snorlax",
        "Talonflame",
        "Rotom-Heat",
        "Lilligant",
    ],
    opponent: [
        "Skarmory",
        "Suicune",
        "Wobbuffet",
        "Exeggutor",
        "Skarmory",
        "Pyroar",
        "Wobbuffet",
        "Regice",
        "Pyroar",
        "Skarmory",
        "Wobbuffet",
        "Skarmory",
        "Suicune",
        "Wobbuffet",
    ]
};
// const messageLog = document.getElementsByClassName("inner message-log").item(0)
// messageLog.addEventListener('DOMNodeInserted',(event)=> {console.log(event.path);console.log(checkLastEl(event.path[1],'H2'))} ,false)
// const checkType = (htmlEl, type) => {
//   return htmlEl.tagName === type
// }
// const getLastEl = parentEl => {
//   const childrenEls = parentEl.children
//   return childrenEls.item(childrenEls.length - 1)
// }
// const checkLastEl = (parentEl, type) => {
//   return checkType(getLastEl(parentEl), type)
// }
var emptyResponse = {
    opponentsTeam: null,
    user: [],
    usersTeam: null,
    opponent: []
};
var validateSender = function (message, sender) {
    return sender.id === chrome.runtime.id && message.from === types_1.Sender.React;
};
var checkLastElement = function (_a) {
    var messageLog = _a.messageLog;
    if (messageLog.lastElementChild === null) {
        console.log("messageLog.lastElementChild === null");
        return false;
    }
    if (messageLog.lastElementChild.tagName === "H2") {
        return messageLog.lastElementChild.textContent;
    }
    console.log("check last element passed");
    console.log(messageLog.lastElementChild);
    return false;
};
var messagesFromReactAppListener = function (message, sender, response) {
    var isValidated = validateSender(message, sender);
    //
    if (isValidated && message.message === messages_1.testMessage) {
        console.log(testDS);
        response(testDS);
    }
    if (isValidated && message.message === messages_1.pokemonMessage) {
        var chat = document.getElementsByClassName("battle-history");
        var messageLog = document
            .getElementsByClassName("inner message-log")
            .item(0);
        var opponentsTeam_1 = getTeam_1.getTeam("opponent");
        var usersTeam_1 = getTeam_1.getTeam("user");
        var _a = utils_1.getPokemon(chat), user_1 = _a.user, opponent_1 = _a.opponent;
        var lastElement_1 = messageLog ? checkLastElement({ messageLog: messageLog }) : null;
        var testMutator = new MutationObserver(function () {
            if (lastElement_1) {
                response({
                    user: user_1,
                    turnNumber: Number(lastElement_1.replace(/^\D+/g, "")),
                    opponent: opponent_1,
                    opponentsTeam: opponentsTeam_1,
                    usersTeam: usersTeam_1
                });
            }
        });
        if (messageLog) {
            testMutator.observe(messageLog, {
                subtree: true,
                childList: true
            });
        }
        response({
            user: user_1,
            opponent: opponent_1,
            opponentsTeam: opponentsTeam_1,
            usersTeam: usersTeam_1
        });
    }
};
var main = function () {
    console.log("[content.ts] Main");
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};
main();
