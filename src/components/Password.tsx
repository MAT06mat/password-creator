import { FormEventHandler, RefObject, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
    handlePassword: FormEventHandler<HTMLTextAreaElement>;
    ref?: RefObject<HTMLTextAreaElement>;
}

function Password({ handlePassword, ref }: Props) {
    const [value, setValue] = useState("");
    return (
        <TextareaAutosize
            className="password"
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
