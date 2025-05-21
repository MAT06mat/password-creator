import { useRef, useState } from "react";
import "./App.css";
import Password from "./components/Password";
import RuleContainer from "./components/RuleContainer";
import FullScreenButton from "./components/FullScreenButton";

function App() {
    const [start, setStart] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [passwordText, setPasswordText] = useState("");
    const passwordRef = useRef<HTMLTextAreaElement>(
        document.createElement("textarea")
    );

    function handlePassword(event: React.FormEvent<HTMLTextAreaElement>) {
        setPasswordText(event.currentTarget.value);
    }

    return (
        <>
            <h1 style={{ display: fullScreen ? "none" : "inline" }}>
                Password-Creator
            </h1>
            {start ? (
                <>
                    <Password
                        handlePassword={handlePassword}
                        ref={passwordRef}
                        fullScreen={fullScreen}
                    />
                    <RuleContainer
                        passwordText={passwordText}
                        passwordRef={passwordRef}
                    />
                    <FullScreenButton
                        fullScreen={fullScreen}
                        setFullScreen={setFullScreen}
                    />
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
