import { ReactNode, useState } from "react";
import Rule from "./Rule";
import rules from "../assets/rules";
import { AnimatePresence } from "framer-motion";
import { ParentRerenderContext } from "./RuleContainerContext";

interface rule {
    text?: string;
    condition: (text: string) => boolean;
    content?: ReactNode | undefined;
    number?: number;
    completed?: boolean;
}

interface Props {
    passwordText: string;
    passwordRef: React.RefObject<HTMLTextAreaElement>;
    setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
    setfullScreenButtonDisable: React.Dispatch<React.SetStateAction<boolean>>;
}

function RuleContainer({
    passwordText,
    passwordRef,
    setFullScreen,
    setfullScreenButtonDisable,
}: Props) {
    const [finish, setFinish] = useState(false);
    const [displayRules, setDisplayRules] = useState<rule[]>([]);

    /*const [displayRules, setDisplayRules] = useState<rule[]>(rules);
    rules.filter((rule: rule) => false);*/

    const [count, setCount] = useState(0);
    const forceRerender = () => setCount(count + 1);

    // Check if all rules are completed
    let isAllRulesCompleted = true;
    displayRules.forEach((rule: rule) => {
        rule.completed = rule.condition(passwordText);
        if (!rule.completed) {
            isAllRulesCompleted = false;
        }
    });

    if (isAllRulesCompleted) {
        // Create a list of rule uncompleted
        const allRulesUncompleted: rule[] = [];
        rules.forEach((rule: rule) => {
            if (!rule.condition(passwordText)) {
                allRulesUncompleted.push(rule);
            }
        });

        // Add a new uncompleted rule in displayRules
        if (allRulesUncompleted.length > 0) {
            const newRule = allRulesUncompleted.reverse().pop(); // Find a rule uncompleted
            rules.filter((rule) => rule != newRule); // Remove the rule uncompleted
            if (newRule) {
                newRule.number = Number(displayRules.length + 1);
                const newDisplayRules = [newRule, ...displayRules];
                setDisplayRules(newDisplayRules);
            }
        } else {
            if (!finish) {
                setFinish(true);
                passwordRef.current.disabled = true;
                setTimeout(() => {
                    setFullScreen(false);
                });
            }
        }
    }

    if (displayRules.length > 5) {
        setTimeout(() => {
            setfullScreenButtonDisable(false);
        });
    }

    return (
        <>
            {finish ? (
                <div className="finish">
                    <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 130.2 130.2"
                    >
                        <circle
                            className="path circle"
                            fill="none"
                            stroke="#73AF55"
                            strokeWidth="6"
                            strokeMiterlimit="10"
                            cx="65.1"
                            cy="65.1"
                            r="62.1"
                        />
                        <polyline
                            className="path check"
                            fill="none"
                            stroke="#73AF55"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            points="100.2,40.2 51.5,88.8 29.8,67.5 "
                        />
                    </svg>

                    <div className="subtitle">
                        <p>This is the most secure password !</p>
                    </div>
                </div>
            ) : (
                <ParentRerenderContext.Provider value={forceRerender}>
                    <div className="rule-container">
                        <AnimatePresence>
                            {displayRules.map((rule: rule) => {
                                return (
                                    <Rule
                                        number={rule.number}
                                        text={rule.text}
                                        completed={rule.completed}
                                        key={rule.number}
                                    >
                                        {rule.content}
                                    </Rule>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </ParentRerenderContext.Provider>
            )}
        </>
    );
}

export default RuleContainer;
