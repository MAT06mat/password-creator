import CreateCaptcha from "./CreateCaptcha";
import { containEmojis, count, forEachChar } from "./tools/chars";
import { CHARSETS } from "./tools/charsets";
import { Randint, RandList } from "./tools/random";
import { sumRomanInString } from "./tools/roman";

let captchaValue = "qpzfhnsdk";
let captchaFixed = false;

const totalDigits = Randint(20, 25);
const bob = RandList(["¯\\_(ツ)_/¯", "(╯°□°)╯︵┻┻", "┬─┬ノ( º _ ºノ)"]);

const rules = [
    {
        text: "The password must have at least 5 characters",
        condition: (text: string) => {
            return text.length >= 5;
        },
    },
    {
        text: "The password must contain lowercase letter",
        condition: (text: string) => {
            return count(text, CHARSETS.lowercase) != 0;
        },
    },
    {
        text: "The password must contain uppercase letter",
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
            return count(text, CHARSETS.numbers) != 0;
        },
    },
    {
        text: "The password must contain a special character",
        condition: (text: string) => {
            return count(text, CHARSETS.symbols) != 0;
        },
    },
    {
        text: "The password must have at least 12 characters",
        condition: (text: string) => {
            return text.length >= 12;
        },
    },
    {
        text: "Password must contain at least one Roman numeral",
        condition: (text: string) => {
            return count(text, CHARSETS.romanNumeral) != 0;
        },
    },
    {
        text: `The sum of all digits must be equal to ${totalDigits}`,
        condition: (text: string) => {
            let num = 0;
            forEachChar(text, (char) => {
                if (CHARSETS.numbers.includes(char)) {
                    num += Number(char);
                }
            });
            return num == totalDigits;
        },
    },
    {
        text: "The password must contain as many lowercase and uppercase letters",
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
        text: "The password must contain pi",
        condition: (text: string) => {
            return text.includes(CHARSETS.pi) || text.includes(CHARSETS.pi2);
        },
    },
    {
        text: "The password must contain an emoji",
        condition: (text: string) => {
            return containEmojis(text);
        },
    },
    {
        text: "The password must contain the captcha",
        condition: (text: string) => {
            if (text.includes(captchaValue)) {
                captchaFixed = true;
                return true;
            }
            return false;
        },
        content: (
            <CreateCaptcha
                onValue={(value: string) => {
                    captchaValue = value;
                }}
                getCaptchaFixed={() => captchaFixed}
            />
        ),
    },
    {
        text: "The sum of all Roman numerals must be equal to 42",
        condition: (text: string) => {
            return sumRomanInString(text) == 42;
        },
    },
    {
        text: `The password must contain bob ${bob}`,
        condition: (text: string) => {
            return text.includes(bob);
        },
    },
];

export default rules;
