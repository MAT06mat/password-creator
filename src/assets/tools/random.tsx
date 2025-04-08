export function Randint(min: number, max?: number) {
    if (!max) {
        max = min;
        min = 0;
    }

    return Math.round(min + Math.random() * (max - min));
}

export function RandList<T>(list: T[]): T {
    const random = Randint(list.length);
    return list[random];
}
