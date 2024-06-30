import ShareLink from "./ShareLink";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import Setting from "../components/Setting";
import getGameLink from "../utils/getGameLink";

export type Settings = { difficulty: string, minimumPlayer: number };

interface GameCreatorProps {
    gameId: string;
    connectionStatus: string;
    socket: Socket | undefined;
}

const GameCreator: React.FC<GameCreatorProps> = ({
    gameId,
    connectionStatus,
    socket
}) => {
    const difficulties = ["easy", "medium", "hard", "expert"];
    const [settings, setSettings] = useState<Settings>({
        difficulty: difficulties[0],
        minimumPlayer: 1
    });

    useEffect(() => {
        if (!socket) return;

        socket.on("settings", handleSetSettings);

        return () => {
            socket.off("settings", handleSetSettings)
        };
    }, [socket]);

    function createGame() {
        if (!socket) return;

        socket.emit("gameFunction", { name: "create", settings });
    }

    function isConnectionValid() {
        return connectionStatus === "connected";
    }

    function handleSetSettings(newSettings: Partial<Settings>) {
        setSettings(prev => ({
            ...prev,
            ...newSettings
        }));
    }

    return (
        <section className="gameCreator">
            {isConnectionValid() &&
                <div className="createGameContainer">
                    <button className="createGame" onClick={createGame}>Create game</button>
                    <Setting
                        difficulties={difficulties}
                        settings={settings}
                        setSettings={handleSetSettings}
                    />
                </div>
            }
            {gameId && <ShareLink link={getGameLink(gameId).href}/>}
        </section>
    );
}

export default GameCreator;
