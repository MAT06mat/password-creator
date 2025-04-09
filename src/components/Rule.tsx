import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
    number?: number;
    text?: string;
    children: ReactNode;
    completed?: boolean;
}

const Rule = React.memo(({ number, text, children, completed }: Props) => {
    return (
        <motion.div
            className={completed ? "rule completed" : "rule"}
            initial={{
                opacity: 0,
                marginBottom: 0,
                padding: "0 1.2em",
                gridTemplateRows: "0fr",
            }}
            animate={{
                opacity: 1,
                marginBottom: "1em",
                padding: "0.6em 1.2em",
                gridTemplateRows: "1fr",
            }}
            transition={{
                marginBottom: { duration: 0.1 },
                opacity: { delay: 0.4, duration: 0.6 },
            }}
        >
            <div className="wrapped-rule">
                <h3>Rule {number}</h3>
                <p>{text}</p>
                {children}
            </div>
        </motion.div>
    );
});

export default Rule;
