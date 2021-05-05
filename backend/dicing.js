let dice = require('dice.js')

// define regex to detect dice-expressions inside a message
const dice_regex = /(\d*d\d+)([-+*/]((\d*d\d+)|\d+))*/gm;

// input: a string containing dice-expressions (e.g. 3d6+5)
// output: input string just with resolved dice-expressions
exports.applyDice = function (msg) {
    return msg.replace(dice_regex, (match) => {
        const result = dice.roll(match);
        const resString = dice.stringify(result).replace(/\s/g, "");
        return "(" + resString + ") => " + (0 + result);
    });
}