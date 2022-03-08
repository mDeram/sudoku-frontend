import './styles/App.css';
import React, { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import Sudoku from './components/Sudoku';
const ENDPOINT = process.env.NODE_ENV === "production" ? "https://mderam.com/sudoku/socket" : "http://127.0.0.1:5001";

const App: React.FC = () => {
    const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameState, setGameState] = useState("");
    const [joinGameId, setJoinGameId] = useState("");
    const [createGameId, setCreateJoinGameId] = useState("");

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
        setSocket(newSocket);
        newSocket.on("connect", () => {
            setConnectionStatus("connected");
            newSocket.emit("create game");
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
            {createGameId && <p>Share your link to play with a friend: {createGameId}</p>}
            {gameState === "init" && socket && <Sudoku socket={socket}/>}
        </div>
    );
}

export default App;
