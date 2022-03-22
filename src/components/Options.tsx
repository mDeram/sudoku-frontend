import ShareLink from "./ShareLink";
import { URL } from "../constants";

interface OptionsProps {
    gameId: string;
    connectionStatus: string;
    createGame: () => void;
}

const Options: React.FC<OptionsProps> = ({
    gameId,
    connectionStatus,
    createGame
}) => {

    function isConnectionValid() {
        return connectionStatus === "connected";
    }

    function getShareLink() {
        return URL + "?token=" + gameId;
    }

    return (
        <section className="options">
            {isConnectionValid() && <button className="createGame" onClick={createGame}>create game</button>}
            {gameId && <ShareLink link={getShareLink()}/>}
        </section>
    );
}

export default Options;
