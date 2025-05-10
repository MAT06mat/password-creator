import { CHARSETS } from "./charsets";

function romanToInt(roman: string) {
    let total = 0;
    let prev = 0;
    for (let i = roman.length - 1; i >= 0; i--) {
        const current =
            CHARSETS.romanMap[roman[i] as keyof typeof CHARSETS.romanMap];
        if (current < prev) {
            total -= current;
        } else {
            total += current;
        }
        prev = current;
    }
    return total;
}

export function sumRomanInString(str: string) {
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
