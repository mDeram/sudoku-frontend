import './styles/App.css';
import React, { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import Sudoku from './components/Sudoku';
const ENDPOINT = process.env.NODE_ENV === "production" ? "https://mderam.com" : "http://localhost:5001";
const URL = process.env.NODE_ENV === "production" ? "https://mderam.com/sudoku" : "http://localhost:3000";
const path = process.env.NODE_ENV === "production" ? "/sudoku/socket" : "/socket.io";

const App: React.FC = () => {
    const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameState, setGameState] = useState("");
    const [joinGameId, setJoinGameId] = useState("");
    const [createGameId, setCreateJoinGameId] = useState("");

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT, { transports: ["websocket"], path: path });

        setSocket(newSocket);
        newSocket.on("connect", () => {
            setConnectionStatus("connected");
            const paramValue = new URLSearchParams(window.location.search).get("token");
            if (paramValue) {
                newSocket.emit("game join", paramValue);
                setCreateJoinGameId(paramValue);
            }
        });
        newSocket.on("disconnect", () => {
            setConnectionStatus("disconnected");
        });
        newSocket.on("game id", id => {
            setCreateJoinGameId(id);
        });
        newSocket.on("game init", () => {
            setGameState("init");
        });
        newSocket.on("game success", () => {
            setGameState("success");
        });
        newSocket.on("error", error => {
            if (error === "game not found") {
                console.log(error);
                setGameState("error");
            }
        });

        return () => { newSocket.disconnect() };
    }, []);

    function createGame() {
        if (!socket) return;

        socket.emit("game create");
    }

    function joinGame(id: string) {
        if (!socket) return;

        socket.emit("game join", id);
    }

    function isConnectionValid() {
        return socket && connectionStatus === "connected";
    }

    function getShareLink() {
        return URL + "/sudoku?token=" + createGameId;
    }

    function copyLink() {
        navigator.clipboard.writeText(getShareLink());
    }

    function copyCode() {
        navigator.clipboard.writeText(createGameId);
    }

    return (
        <div>
            <p>You are {connectionStatus}</p>
            {isConnectionValid() && <button onClick={createGame}>create game</button>}
            {gameState === "error" && <p>An error occured</p>}
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
            {(gameState === "init" || gameState === "success") && socket && <Sudoku socket={socket}/>}
            {gameState === "success" && <p>Wow, your so goooood</p>}
        </div>
    );
}

export default App;
