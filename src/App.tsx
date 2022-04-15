import './styles/App.css';
import React, { useState, useEffect } from "react";
import Sudoku from './components/Sudoku';
import useSocket from './hooks/useSocket';
import Header from './components/Header';
import Options from './components/Options';

export type GameState = "" | "create" | "init" | "run" | "done";
export type ConnectionStatus = "connected" | "disconnected";

const App: React.FC = () => {
    const socket = useSocket();
    const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");
    const [gameState, setGameState] = useState<GameState>("");
    const [error, setError] = useState("");
    const [gameId, setGameId] = useState("");
    const [playerCount, setPlayerCount] = useState(0);

    useEffect(() => {
        if (!socket) {
            setConnectionStatus("disconnected");
            return;
        }

        socket.on("connect", () => setConnectionStatus("connected"));
        socket.on("disconnect", () => setConnectionStatus("disconnected"));
        socket.on("gameId", setGameId);
        socket.on("gameState", setGameState);
        socket.on("error", setError);
        socket.on("playerCount", setPlayerCount);
    }, [socket]);

    useEffect(() => {
        if (connectionStatus !== "connected") return;

        const paramValue = new URLSearchParams(window.location.search).get("token");

        if (gameId) {
            joinGame(gameId);
        } else if (paramValue) {
            joinGame(paramValue);
            setGameId(paramValue);
        }

    }, [connectionStatus]);

    useEffect(() => {
        if (error !== "")
            setGameState("");
    }, [error]);

    function joinGame(id: string) {
        if (!socket) return;

        socket.emit("gameFunction", { name: "join", id });
    }

    return (
        <div className="app">
            <Header connectionStatus={connectionStatus} playerCount={playerCount} gameState={gameState}/>
            <Options
                gameId={gameId}
                connectionStatus={connectionStatus}
                socket={socket}
            />
            {gameState === "" && error !== "" && <p>An error occured: {error}</p>}
            {socket && <Sudoku socket={socket} gameState={gameState}/>}
        </div>
    );
}

export default App;
