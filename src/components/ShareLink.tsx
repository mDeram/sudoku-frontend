import { useState } from "react";

interface ShareLinkProps {
    link: string;
}

const ShareLink: React.FC<ShareLinkProps> = ({ link }) => {
    const initialCopyValue = "copy";
    const [copy, setCopy] = useState<typeof initialCopyValue | "copied" | "error">(initialCopyValue);
    const [copyTimeout, setCopyTimeout] = useState<any>(null);

    function updateCopy(value: "copied" | "error") {
        if (copyTimeout) clearTimeout(copyTimeout);

        setCopy(value);
        setCopyTimeout(setTimeout(() => setCopy(initialCopyValue), 1000));
    }

    function copyLink() {
        navigator.clipboard.writeText(link).then(
            () => updateCopy("copied"),
            () => updateCopy("error")
        );
    }

    function getCopyClassName() {
        switch(copy) {
            case initialCopyValue: return "";
            case "copied": return "successCopy";
            case "error": return "errorCopy";
        }
    }

    return (
        <>
        <p>Share this link to invite players</p>
        <div className="shareLink">
            <input onFocus={e => e.target.select()} value={link} readOnly/>
            <button onClick={copyLink} className={getCopyClassName()}>{copy}</button>
        </div>
        </>
    );
}

export default ShareLink;
