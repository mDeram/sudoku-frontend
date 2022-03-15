interface ShareLinkProps {
    link: string;
}

const ShareLink: React.FC<ShareLinkProps> = ({ link }) => {
    function copyLink() {
        navigator.clipboard.writeText(link);
    }

    return (
        <>
        <p>Share this link to invite players</p>
        <div className="shareLink">
            <input onFocus={e => e.target.select()} value={link} readOnly/>
            <button onClick={copyLink}>copy</button>
        </div>
        </>
    );
}

export default ShareLink;
