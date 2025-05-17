import { RandInt, RandList } from "./tools/random";

const n1 = RandInt(1, 9);
const n2 = RandInt(10, 99);

export const q1 = RandList([
    [`${n1} + ${n2} ?`, String(n1 + n2)],
    [`${n2} - ${n1} ?`, String(n2 - n1)],
    [`${n1} * ${n2} ?`, String(n1 * n2)],
]);

export const q2 = RandList([
    [
        "What primary color results from the combination of blue and yellow?",
        "green",
    ],
    [
        "What primary color results from the combination of red and yellow?",
        "orange",
    ],
    [
        "What primary color results from the combination of red and blue?",
        "purple",
    ],
    [
        "Which color replace the color green in the Japanese traffic light?",
        "blue",
    ],
]);

export const q3 = RandList([
    ["What is the only country that starts with Y?", "yemen"],
    ["What is the only country whose capital starts with U?", "mongolia"],
    ["What is the only country to end in H?", "bangladesh"],
    ["What is the only country with a $7 bill?", "fiji"],
    ["What is the only country named after a woman?", "saint lucia"],
    ["What is the only country with three capitals?", "south africa"],
    ["What is the only country with 13 months?", "ethiopia"],
]);
