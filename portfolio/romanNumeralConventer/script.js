const userInput = document.getElementById("input");
const convertButton = document.getElementById("convertButton");
const resultDiv = document.getElementById("result");

function intToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    if (num === 0) return '';

    for (let i = 0; i < romanNumerals.length; i++) {
        if (num >= romanNumerals[i].value) {
            return romanNumerals[i].numeral + intToRoman(num - romanNumerals[i].value);
        }
    }
}

function romanToInt(string) {
    const romanHash = {
        I : 1,
        V : 5,
        X : 10,
        L : 50,
        C : 100,
        D : 500,
        M : 1000
    };

    let result = 0;

    for (let i = 0; i < string.length; i++) {
        if (string[i] === "I" && string[i + 1] === "V") {
            result += 4;
            i++;
        } else if (string[i] === "I" && string[i + 1] === "X") {
            result += 9;
            i++;
        } else if (string[i] === "X" && string[i + 1] === "L") {
            result += 40;
            i++;
        } else if (string[i] === "X" && string[i + 1] === "C") {
            result += 90;
            i++;
        } else if (string[i] === "C" && string[i + 1] === "D") {
            result += 400;
            i++;
        }
        else if (string[i] === "C" && string[i + 1] === "M") {
            result += 900;
            i++;
        } else {
            result += romanHash[string[i]]
        }
    }
    return result
}

function calculateResult() {
    const input = userInput.value
    const number = parseInt(input)
    const validRomanNumeral = /^(?=.)M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    if (validRomanNumeral.test(input)) {
        return romanToInt(input)
    }

    if (!isNaN(number) && number > 0 && number <= 3999) {
        return intToRoman(number)
    }

    return "Zadejte číslo větší než 0 a menší nebo rovno 3999 nebo zadejte validní římské číslo."
}

convertButton.addEventListener("click", () => {
    resultDiv.innerText = calculateResult();
});