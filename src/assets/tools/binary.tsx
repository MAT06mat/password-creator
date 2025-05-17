export function toBinaryString(str: string): string {
    return str
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ");
}
