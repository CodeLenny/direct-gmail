const fs = require("fs");
const path = require("path");

String.prototype.padStart = function padStart(len, add) {
  return (Array(len).join(add) + this).slice(-len);
}

/**
 * Produces a 2-digit version number from a 3-digit semver string.
*/
function simplifySemVer(v) {
  let a, b, c;
  [a, b, c] = v.split(".");
  return `${a}.${b.padStart(5, "0")}${c.padStart(5, "0")}`;
}

const semver = process.env.VERSION || require("./package.json").version;

const file = require("./package.json").main.replace(".js", "");
const repo = require("./package.json").repository.url.match(/github.com\/(.*)\.git$/)[1];

const version = simplifySemVer(semver);

const header = `
// ==UserScript==
// @name         ${require("./package.json").scriptName}
// @namespace    http://codelenny.com/
// @version      ${version}
// @description  ${require("./package.json").description}
// @author       ${require("./package.json").author}
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/URI.js/1.18.10/URI.js
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_notification
// @match        https://gmail.com/*
// @match        https://mail.google.com/*
// @updateURL    https://raw.githubusercontent.com/${repo}/master/${file}.meta.js
// @downloadURL  https://raw.githubusercontent.com/${repo}/master/${file}.user.js
// ==/UserScript==
`;

const script = fs.readFileSync(path.join(__dirname, `${file}.js`), "utf8");

fs.writeFileSync(path.join(__dirname, `${file}.meta.js`), header);
fs.writeFileSync(path.join(__dirname, `${file}.user.js`), `${header}\n${script}`);
