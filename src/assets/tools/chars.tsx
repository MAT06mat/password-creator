import emojiRegex from "emoji-regex";

export function forEachChar(text: string, func: (char: string) => void) {
    text.split("").forEach(func);
}

export function containEmojis(text: string) {
    const regex = emojiRegex();
    return regex.test(text);
}

export function count(text: string, chars: string) {
    let number = 0;
    forEachChar(text, (char) => {
        if (chars.includes(char)) {
            number += 1;
        }
    });
    return number;
}
