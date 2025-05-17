export function RandInt(min: number, max?: number) {
    if (!max) {
        max = min;
        min = 0;
    }

    return Math.round(min + Math.random() * (max - min - 1));
}

export function RandList<T>(list: T[]): T {
    const random = RandInt(list.length);
    return list[random];
}

export function RandListString(str: string): string {
    const list = str.split("");
    const random = RandList(list);
    return String(random);
}

export function MultipleRandListSring(str: string, num: number): string {
    return Array.from({ length: num }, () => RandListString(str)).join("");
}
