import { FormEventHandler, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
    handlePassword: FormEventHandler<HTMLTextAreaElement>;
}

function Password({ handlePassword }: Props) {
    const [value, setValue] = useState("");
    return (
        <TextareaAutosize
            className="password"
            onInput={(e) => {
                handlePassword(e);
            }}
            cacheMeasurements
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
        />
    );
}

export default Password;
