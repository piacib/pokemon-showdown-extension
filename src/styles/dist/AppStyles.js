"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.TypeWriterContainer = exports.AppDisplay = exports.Button = exports.PokeButton = void 0;
var styled_components_1 = require("styled-components");
exports.PokeButton = styled_components_1["default"].button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  grid-column: 3/4;\n  background-color: transparent;\n  border: 2px solid black;\n  grid-row: 1;\n  justify-self: end;\n  align-self: center;\n  width: 4em;\n  height: 4em;\n"], ["\n  grid-column: 3/4;\n  background-color: transparent;\n  border: 2px solid black;\n  grid-row: 1;\n  justify-self: end;\n  align-self: center;\n  width: 4em;\n  height: 4em;\n"])));
exports.Button = styled_components_1["default"].button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 150px;\n  height: 40px;\n  grid-row: 1;\n  grid-column: 2;\n  border-radius: 20px;\n  font-size: inherit;\n  justify-self: center;\n  background-color: rgb(237, 85, 100);\n  align-self: center;\n"], ["\n  width: 150px;\n  height: 40px;\n  grid-row: 1;\n  grid-column: 2;\n  border-radius: 20px;\n  font-size: inherit;\n  justify-self: center;\n  background-color: rgb(237, 85, 100);\n  align-self: center;\n"])));
exports.AppDisplay = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: #282c34a4;\n  background-color: #c5bfbf;\n  display: grid;\n  grid-column-gap: 10px;\n  grid-template-rows: 75px 61px 32px auto;\n  width: 600px;\n  height: 400px;\n  padding: 0 0.25em;\n  overflow: hidden;\n"], ["\n  background-color: #282c34a4;\n  background-color: #c5bfbf;\n  display: grid;\n  grid-column-gap: 10px;\n  grid-template-rows: 75px 61px 32px auto;\n  width: 600px;\n  height: 400px;\n  padding: 0 0.25em;\n  overflow: hidden;\n"])));
var typing = styled_components_1.keyframes(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  from {\n    width: 0;\n  }\n  to {\n    width: 100%;\n  }\n"], ["\n  from {\n    width: 0;\n  }\n  to {\n    width: 100%;\n  }\n"])));
/* The typewriter cursor effect */
var blinkCaret = styled_components_1.keyframes(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  from,\n  to {\n    border-color: transparent;\n  }\n  50% {\n    border-color: var(--line-color);\n  }\n"], ["\n  from,\n  to {\n    border-color: transparent;\n  }\n  50% {\n    border-color: var(--line-color);\n  }\n"])));
exports.TypeWriterContainer = styled_components_1["default"].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  grid-row: 1/2;\n  grid-column: 1/2;\n  margin: auto;\n  h1 {\n    height: 1em;\n    width: fit-content;\n    overflow: hidden; /* Ensures the content is not revealed until the animation */\n    border-right: 0.25em solid black; /* The typwriter cursor */\n    white-space: nowrap; /* Keeps the content on a single line */\n    margin: 0 auto; /* Gives that scrolling effect as the typing happens */\n    /* letter-spacing: 0.15em; Adjust as needed */\n    animation: ", " 3.5s steps(40, end),\n      ", " 1.5s step-end infinite;\n  }\n"], ["\n  grid-row: 1/2;\n  grid-column: 1/2;\n  margin: auto;\n  h1 {\n    height: 1em;\n    width: fit-content;\n    overflow: hidden; /* Ensures the content is not revealed until the animation */\n    border-right: 0.25em solid black; /* The typwriter cursor */\n    white-space: nowrap; /* Keeps the content on a single line */\n    margin: 0 auto; /* Gives that scrolling effect as the typing happens */\n    /* letter-spacing: 0.15em; Adjust as needed */\n    animation: ", " 3.5s steps(40, end),\n      ", " 1.5s step-end infinite;\n  }\n"])), typing, blinkCaret);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;