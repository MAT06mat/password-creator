import { FormEventHandler, RefObject, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
    handlePassword: FormEventHandler<HTMLTextAreaElement>;
    ref?: RefObject<HTMLTextAreaElement>;
    fullScreen: boolean;
}

function Password({ handlePassword, ref, fullScreen }: Props) {
    const [value, setValue] = useState("");
    return (
        <TextareaAutosize
            className={fullScreen ? "password fullscreen" : "password"}
            onInput={(e) => {
                handlePassword(e);
            }}
            cacheMeasurements
            ref={ref}
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
        />
    );
}

export default Password;
