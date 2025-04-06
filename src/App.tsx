import { useState } from "react";
import "./App.css";
import Password from "./components/Password";
import RuleContainer from "./components/RuleContainer";

function App() {
    const [start, setStart] = useState(false);
    const [passwordText, setPasswordText] = useState("");

    function handlePassword(event: React.FormEvent<HTMLTextAreaElement>) {
        setPasswordText(event.currentTarget.value);
    }

    return (
        <>
            <h1>Password-Creator</h1>
            {start ? (
                <>
                    <Password handlePassword={handlePassword} />
                    <RuleContainer passwordText={passwordText} />
                </>
            ) : (
                <>
                    <div className="subtitle">
                        <p>Create the most secure password !</p>
                    </div>
                    <button
                        onClick={() => {
                            setStart(true);
                        }}
                    >
                        Create a new one
                    </button>
                </>
            )}
        </>
    );
}

export default App;
