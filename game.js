function generateHint(targetNumber) {
    var numDigits = targetNumber.length;
    var hintNumber = generateRandomNumber(numDigits);
    while (hintNumber === targetNumber) {
        hintNumber = generateRandomNumber(numDigits);
    }
    var result = analyzeHint(targetNumber, hintNumber);
    var correct = result.correct;
    var misplaced = result.misplaced;
    var rule = generateRule(correct, misplaced);
    return { hintNumber: hintNumber, rule: rule, correct: correct, misplaced: misplaced };
}

function generateRandomNumber(numDigits) {
    return Array.from({ length: numDigits }, function () { return Math.floor(Math.random() * 10); }).join('');
}

function generateRule(correct, misplaced) {
    var hint = "";
    if (correct > 0) hint += correct + " digit(s) are correct and in the right place.";
    if (correct > 0 && misplaced > 0) hint += " ";
    if (misplaced > 0) hint += misplaced + " digit(s) are correct but misplaced.";
    return hint === "" ? "No digits are correct." : hint;
}

function evaluateDigit(digit, hints) {
    for (var i = 0; i < hints.length; i++) {
        var hint = hints[i];
        if (hint.correct === 0 && hint.misplaced === 0) {
            if (hint.hintNumber.includes(digit.toString())) {
                return false;
            }
        }
    }
    return true;
}

function analyzeHint(targetNumber, hintNumber) {
    var correct = 0;
    var misplaced = 0;
    var targetDigits = targetNumber.split('');
    var hintDigits = hintNumber.split('');
    targetDigits.forEach(function (digit, index) {
        if (digit === hintDigits[index]) correct++;
        else if (hintDigits.includes(digit)) misplaced++;
    });
    return { correct: correct, misplaced: misplaced };
}

function checkHint(correct, misplaced, hint) {
    return correct === hint.correct && misplaced === hint.misplaced;
}

function generateAllNumberCombinations(usableNumbers, numDigits) {
    var combinations = [];
    var maxNumber = Math.pow(10, numDigits);
    for (var i = 0; i < maxNumber; i++) {
        var number = i.toString().padStart(numDigits, '0');
        var valid = true;
        for (var j = 0; j < number.length; j++) {
            var digit = Number(number[j]);
            if (!usableNumbers.has(digit)) {
                valid = false;
                break;
            }
        }
        if (valid) {
            combinations.push(number);
        }
    }
    return combinations;
}

function isValidNumber(number, hints) {
    return hints.every(function (hint) {
        var result = analyzeHint(number, hint.hintNumber);
        var correct = result.correct;
        var misplaced = result.misplaced;
        return checkHint(correct, misplaced, hint);
    });
}

function possibleSolutions(hints, numDigits, usableNumbers) {
    var allCombinations = generateAllNumberCombinations(usableNumbers, numDigits);
    return allCombinations.filter(function (number) { return isValidNumber(number, hints); });
}

function validateGame(input) {
    var valid = true;
    var usableNumbers = new Set();
    for (var i = 0; i < 10; i++) {
        if (evaluateDigit(i, input.rules)) {
            usableNumbers.add(i);
        }
    }
    var solutions = possibleSolutions(input.rules, input.answer.length, usableNumbers);
    return solutions.length === 1 && solutions[0] === input.answer;
}

export function generateGame(numDigits, numHints) {
    if (numDigits === undefined) numDigits = 3;
    if (numHints === undefined) numHints = 5;
    var target = generateRandomNumber(numDigits);
    var hints = Array.from({ length: numHints }, function () { return generateHint(target); });
    while (!validateGame({ answer: target, rules: hints })) {
        target = generateRandomNumber(numDigits);
        hints = Array.from({ length: numHints }, function () { return generateHint(target); });
    }
    return { answer: target, rules: hints };
}



