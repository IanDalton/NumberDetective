type Hint = {
    hintNumber: string;
    rule: string;
    correct:number;
    misplaced:number;
};
export type Game = {
    answer: string;
    rules: Hint[];
}



const generateHint = (targetNumber: string): Hint => {
    const numDigits = targetNumber.length;
    var hintNumber = generateRandomNumber(numDigits);
    while (hintNumber === targetNumber) {
        hintNumber = generateRandomNumber(numDigits);
    }


    const { correct, misplaced } = analyzeHint(targetNumber,hintNumber);
    const rule = generateRule(correct, misplaced);

    return { hintNumber, rule, correct, misplaced };
};

const generateRandomNumber = (numDigits: number): string => {
    return Array.from({ length: numDigits }, () => Math.floor(Math.random() * 10)).join('');
};

const generateRule = (correct: number, misplaced: number): string => {
    var hint = "";
    if (correct > 0) hint += `${correct} digit(s) are correct and in the right place.`;
    if (correct > 0 && misplaced > 0) hint += " ";
    if (misplaced > 0) hint += `${misplaced} digit(s) are correct but misplaced.`;
    return hint === "" ?`No digits are correct.`:hint;
};



function evaluateDigit(digit:number,hints:Hint[]):boolean{
    for (let hint of hints){
        if (hint.correct === 0 && hint.misplaced === 0){
            if (hint.hintNumber.includes(digit.toString())){
                return false;
            }
        }
    }
    return true
}

const analyzeHint = (targetNumber: string, hintNumber: string) => {
    let correct = 0;
    let misplaced = 0;

    const targetDigits = targetNumber.split('');
    const hintDigits = hintNumber.split('');
    
    // Track correct digits
    targetDigits.forEach((digit, index) => {
        if (digit === hintDigits[index]) correct++;
        else if (hintDigits.includes(digit)) misplaced++;
    });

    return { correct, misplaced };
};

const checkHint = (correct: number, misplaced: number, hint:Hint): boolean => {
    return correct === hint.correct && misplaced === hint.misplaced;
};

function generateAllNumberCombinations(usableNumbers:Set<Number>,numDigits: number){
    //generate all possible combinations of numbers based on the usable numbers
    let combinations = [];
    let maxNumber = Math.pow(10,numDigits);
    for (let i = 0; i<maxNumber; i++){
        let number = i.toString().padStart(numDigits,'0');
        let valid = true;
        for (let digit of number){
            if (!usableNumbers.has(Number(digit))){
                valid = false;
                break;
            }
        }
        if (valid){
            combinations.push(number);
        }
    }
    return combinations;
}


const isValidNumber = (number: string, hints: Hint[]): boolean => {
    return hints.every((hint) => {
        const { correct, misplaced } = analyzeHint(number, hint.hintNumber);
        return checkHint(correct, misplaced, hint);
    });
};

function possibleSolutions(hints:Hint[],numDigits:number,usableNumbers:Set<number>):string[]{
    const allCombinations = generateAllNumberCombinations(usableNumbers,numDigits);
    return allCombinations.filter((number) => isValidNumber(number, hints));
}

function validateGame(input: Game): boolean {
    let valid = true;
    // Check what numbers are usable
    let usableNumbers = new Set<number>();
    for (let i = 0; i<10; i++) {
        if (evaluateDigit(i,input.rules)){
            usableNumbers.add(i);
        }
    }
    const solutions = possibleSolutions(input.rules,input.answer.length,usableNumbers);


    
    
    return solutions.length === 1 && solutions[0] === input.answer;
}


export function generateGame(numDigits: number = 3, numHints: number = 5): Game {
    var target = generateRandomNumber(numDigits);
    var hints = Array.from({ length: numHints }, () => generateHint(target));
    while (!validateGame({ answer: target, rules: hints })) {
        target = generateRandomNumber(numDigits);
        hints = Array.from({ length: numHints }, () => generateHint(target));
    }
    return { answer: target, rules: hints } ;
}


//console.log(generateGame(3, 2));

