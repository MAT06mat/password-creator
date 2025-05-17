import { useContext, useEffect, useState } from "react";
import { ParentRerenderContext } from "../components/RuleContainerContext";

interface Props {
    sec?: number;
    min?: number;
    onFinish: () => void;
}

function Timer({ sec = 0, min = 0, onFinish }: Props) {
    const [seconds, setSeconds] = useState(sec + min * 60);
    const rerenderParent = useContext(ParentRerenderContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev > 0) {
                    return prev - 1;
                }
                clearInterval(interval);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    });

    if (seconds === 1) {
        setTimeout(() => onFinish(), 1000);
        setTimeout(() => rerenderParent(), 1000);
    }

    const displayedSec = seconds % 60;
    const displayedMin = Math.floor(seconds / 60);

    return (
        <div className="timer">
            <div className="min">
                {displayedMin.toString().padStart(2, "0")}
            </div>
            <div className="separator">:</div>
            <div className="sec">
                {displayedSec.toString().padStart(2, "0")}
            </div>
        </div>
    );
}

export default Timer;
