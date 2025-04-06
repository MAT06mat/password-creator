import CreateCaptcha from "./CreateCaptcha";
import emojiRegex from "emoji-regex";
import { CHARSETS } from "./charsets";

let captchaValue = "qpzfhnsdk";
let captchaFixed = false;

function getCaptchaFixed() {
    return captchaFixed;
}

function onCaptchaValue(value: string) {
    captchaValue = value;
}

function forEachChar(text: string, func: (char: string) => void) {
    text.split("").forEach(func);
}

function containEmojis(text: string) {
    const regex = emojiRegex();
    return regex.test(text);
}
const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};

function romanToInt(roman: string) {
    let total = 0;
    let prev = 0;
    for (let i = roman.length - 1; i >= 0; i--) {
        const current = romanMap[roman[i] as keyof typeof romanMap];
        if (current < prev) {
            total -= current;
        } else {
            total += current;
        }
        prev = current;
    }
    return total;
}

function sumRomanInString(str: string) {
    const matches = str.match(/(I|V|X|L|C|D|M){1,}/g);
    if (!matches) return 0;

    return matches.reduce((sum, group) => {
        try {
            const value = romanToInt(group);
            return sum + value;
        } catch {
            return sum;
        }
    }, 0);
}

const rules = [
    {
        text: "The password must have at least 5 characters",
        condition: (text: string) => {
            return text.length >= 5;
        },
    },
    {
        text: "The password must contain lowercase characters",
        condition: (text: string) => {
            let haveLowercase = false;
            forEachChar(text, (char) => {
                if (CHARSETS.lowercase.includes(char)) {
                    haveLowercase = true;
                }
            });
            return haveLowercase;
        },
    },
    {
        text: "The password must contain uppercase characters",
        condition: (text: string) => {
            let haveUppercase = false;
            forEachChar(text, (char) => {
                if (CHARSETS.uppercase.includes(char)) {
                    haveUppercase = true;
                }
            });
            return haveUppercase;
        },
    },
    {
        text: "The password must contain a number",
        condition: (text: string) => {
            let number = false;
            forEachChar(text, (char) => {
                if (CHARSETS.numbers.includes(char)) {
                    number = true;
                }
            });
            return number;
        },
    },
    {
        text: "The password must contain a special character",
        condition: (text: string) => {
            let haveSymbol = false;
            forEachChar(text, (char) => {
                if (CHARSETS.symbols.includes(char)) {
                    haveSymbol = true;
                }
            });
            return haveSymbol;
        },
    },
    {
        text: "The password must have at least 12 characters",
        condition: (text: string) => {
            return text.length >= 12;
        },
    },
    {
        text: "The password must contain as many lowercase and uppercase characters",
        condition: (text: string) => {
            let upper = 0;
            let lower = 0;
            forEachChar(text, (char) => {
                if (CHARSETS.uppercase.includes(char)) {
                    upper += 1;
                } else if (CHARSETS.lowercase.includes(char)) {
                    lower += 1;
                }
            });
            return upper === lower && upper != 0;
        },
    },
    {
        text: "The sum of all digits must be equal to 20",
        condition: (text: string) => {
            let num = 0;
            forEachChar(text, (char) => {
                if (CHARSETS.numbers.includes(char)) {
                    num += Number(char);
                }
            });
            return num == 20;
        },
    },
    {
        text: "Password must contain at least one Roman numeral",
        condition: (text: string) => {
            let haveRomanNumeral = false;
            forEachChar(text, (char) => {
                if (CHARSETS.romanNumeral.includes(char)) {
                    haveRomanNumeral = true;
                }
            });
            return haveRomanNumeral;
        },
    },
    {
        text: "The password must contain pi",
        condition: (text: string) => {
            return text.includes(CHARSETS.pi);
        },
    },
    {
        text: "The password must contain the captcha",
        condition: (text: string) => {
            return true; // TO REMOVE
            if (text.includes(captchaValue)) {
                captchaFixed = true;
                return true;
            }
            return false;
        },
        content: (
            <CreateCaptcha
                onValue={onCaptchaValue}
                getCaptchaFixed={getCaptchaFixed}
            />
        ),
    },
    {
        text: "The password must contain an emoji",
        condition: (text: string) => {
            return true;
            return containEmojis(text);
        },
    },
    {
        text: "The sum of all Roman numerals must be equal to 42",
        condition: (text: string) => {
            return sumRomanInString(text) == 42;
        },
    },
];

export default rules;
