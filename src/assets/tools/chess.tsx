import { RandList } from "./random";

const chessMovesList = [
    { move: "Bxa7+", image: "./chess/0.png" },
    { move: "Bxf6", image: "./chess/1.png" },
    { move: "Bxh7+", image: "./chess/2.png" },
    { move: "Nb8+", image: "./chess/3.png" },
    { move: "Qa5#", image: "./chess/4.png" },
    { move: "Qf7+", image: "./chess/5.png" },
    { move: "Qxf6#", image: "./chess/6.png" },
    { move: "Qxf8+", image: "./chess/7.png" },
    { move: "Rxh3", image: "./chess/8.png" },
    { move: "Rxh8+", image: "./chess/9.png" },
];

const bestMove = RandList(chessMovesList);

export default bestMove;
