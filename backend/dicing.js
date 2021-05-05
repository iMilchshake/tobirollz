let dice = require('dice.js')

//const str = "Attack d20+3 with 1d6+d4+3 Damage";
const regex = /(\d*d\d+)([-+*/]((\d*d\d+)|\d+))*/gm;

const replacer = function(match, capture) {
    const res = dice.roll(match);
    let resString = dice.stringify(res).replace(/\s/g, "");
    return "("+resString+") => "+(0+res);
}

// input: a string containing dice-syntax (e.g. 3d6+5)
// output: same string just with resolved dice rolls
exports.applyDice = function(msg) {
    return msg.replace(regex, replacer);
}