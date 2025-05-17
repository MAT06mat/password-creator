import { Captcha } from "navid-react-captcha-generator";
import Refresh from "./Refresh.tsx";
import { useState } from "react";

function CreateCaptcha({
    onValue,
    getCaptchaFixed,
}: {
    onValue: (value: string) => void;
    getCaptchaFixed: () => boolean;
}) {
    const [regenerate, setRegenerate] = useState(false);

    const regenerateCaptcha = () => {
        if (!getCaptchaFixed()) {
            setRegenerate((prev) => !prev);
        }
    };

    return (
        <div className="captcha">
            <Captcha
                onChange={onValue}
                regenerate={regenerate}
                width={200}
                height={50}
                length={5}
                fontSize={24}
                bgColor="#fff"
                textColor="#000"
                noise={true}
                lines={true}
                distortion={false}
            />
            <button
                className="no-padding"
                onClick={regenerateCaptcha}
                disabled={getCaptchaFixed()}
            >
                <Refresh />
            </button>
        </div>
    );
}

export default CreateCaptcha;
