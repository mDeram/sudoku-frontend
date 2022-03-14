import './styles/App.css';
import React, { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import Sudoku from './components/Sudoku';
import { ENDPOINT, URL, PATH } from "./constants";

const App: React.FC = () => {
    const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameState, setGameState] = useState<"" | "create" | "init" | "run" | "done">("");
    const [error, setError] = useState("");
    const [joinGameId, setJoinGameId] = useState("");
    const [createGameId, setCreateJoinGameId] = useState("");

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT, { transports: ["websocket"], path: PATH, secure: true });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect()
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("connect", () => {
            setConnectionStatus("connected");
            const paramValue = new URLSearchParams(window.location.search).get("token");
            if (paramValue) {
                joinGame(paramValue);
                setCreateJoinGameId(paramValue);
            }
        });
        socket.on("disconnect", () => setConnectionStatus("disconnected"));
        socket.on("gameId", setCreateJoinGameId);
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

    function isConnectionValid() {
        return socket && connectionStatus === "connected";
    }

    function getShareLink() {
        return URL + "?token=" + createGameId;
    }

    function copyLink() {
        navigator.clipboard.writeText(getShareLink());
    }

    function copyCode() {
        navigator.clipboard.writeText(createGameId);
    }

    return (
        <div className="app">
            <p>You are {connectionStatus}</p>
            {isConnectionValid() && <button onClick={createGame}>create game</button>}
            {gameState === "" && error !== "" && <p>An error occured: {error}</p>}
            {socket &&
                <>
                <input
                    id="gameId"
                    name="gameId"
                    type="text"
                    value={joinGameId}
                    onChange={e => setJoinGameId(e.target.value)}
                />
                <button onClick={() => joinGame(joinGameId)}>Join Game</button>
                </>
            }
            {createGameId && <p>Share this link to play with some friends: <button onClick={copyLink}>{getShareLink()}</button></p>}
            {createGameId && <p>Or share the game code: <button onClick={copyCode}>{createGameId}</button></p>}
            {(gameState === "init" || gameState === "run" || gameState === "done") && socket && <Sudoku socket={socket}/>}
            {gameState === "done" && <p>Wow, your so goooood</p>}
        </div>
    );
}

export default App;
