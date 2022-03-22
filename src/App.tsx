import './styles/App.css';
import React, { useState, useEffect } from "react";
import Sudoku from './components/Sudoku';
import useSocket from './hooks/useSocket';
import Header from './components/Header';
import Options from './components/Options';

export type GameState = "" | "create" | "init" | "run" | "done";

const App: React.FC = () => {
    const socket = useSocket();
    const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");
    const [gameState, setGameState] = useState<GameState>("");
    const [error, setError] = useState("");
    const [gameId, setGameId] = useState("");


    useEffect(() => {
        if (!socket) {
            setConnectionStatus("disconnected");
            return;
        }

        socket.on("connect", () => {
            setConnectionStatus("connected");
            const paramValue = new URLSearchParams(window.location.search).get("token");

            if (gameId) {
                joinGame(gameId);
            } else if (paramValue) {
                joinGame(paramValue);
                setGameId(paramValue);
            }
        });
        socket.on("disconnect", () => setConnectionStatus("disconnected"));
        socket.on("gameId", setGameId);
        socket.on("gameState", setGameState);
        socket.on("error", setError);
    }, [socket]);

    useEffect(() => {
        if (error !== "")
            setGameState("");
    }, [error]);

    function createGame() {
        if (!socket) return;

        socket.emit("gameFunction", { name: "create" });
    }

    function joinGame(id: string) {
        if (!socket) return;

        socket.emit("gameFunction", { name: "join", id });
    }

    return (
        <div className="app">
            <Header connectionStatus={connectionStatus} />
            <Options
                gameId={gameId}
                connectionStatus={connectionStatus}
                createGame={createGame}
            />
            {gameState === "" && error !== "" && <p>An error occured: {error}</p>}
            {socket && <Sudoku socket={socket} gameState={gameState}/>}
        </div>
    );
}

export default App;
