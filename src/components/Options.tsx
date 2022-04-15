import ShareLink from "./ShareLink";
import { URL } from "../constants";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

interface OptionsProps {
    gameId: string;
    connectionStatus: string;
    socket: Socket | undefined;
}

const Options: React.FC<OptionsProps> = ({
    gameId,
    connectionStatus,
    socket
}) => {
    const difficulties = ["easy", "medium", "hard", "expert"];
    const [difficulty, setDifficulty] = useState(difficulties[0]);

    useEffect(() => {
        if (!socket) return;

        socket.on("difficulty", setDifficulty);

        return () => {
            socket.off("difficulty", setDifficulty)
        };
    }, [socket]);

    function createGame() {
        if (!socket) return;

        socket.emit("gameFunction", { name: "create", difficulty });
    }

    function nextDifficulty() {
        const newIndex = (difficulties.indexOf(difficulty) + 1) % difficulties.length;
        setDifficulty(difficulties[newIndex]);
    }

    function isConnectionValid() {
        return connectionStatus === "connected";
    }

    function getShareLink() {
        return URL + "?token=" + gameId;
    }

    return (
        <section className="options">
            {isConnectionValid() &&
                <div className="createGameContainer">
                    <button className="createGame" onClick={createGame}>create game</button>
                    <button className="difficulty" onClick={nextDifficulty}>{difficulty}</button>
                </div>
            }
            {gameId && <ShareLink link={getShareLink()}/>}
        </section>
    );
}

export default Options;
