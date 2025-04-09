import { ReactNode, useState } from "react";
import Rule from "./Rule";
import rules from "../assets/rules";
import { AnimatePresence } from "framer-motion";

interface rule {
    text?: string;
    condition: (text: string) => boolean;
    content?: ReactNode | undefined;
    number?: number;
    completed?: boolean;
}

interface Props {
    passwordText: string;
}

function RuleContainer({ passwordText }: Props) {
    const [displayRules, setDisplayRules] = useState<rule[]>([]);

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
        }
    }

    return (
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
    );
}

export default RuleContainer;
