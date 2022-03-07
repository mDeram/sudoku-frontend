import './styles/App.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

const App: React.FC = () => {
    const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected">("disconnected");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
        socket.on("connect", () => {
            setConnectionStatus("connected");
            socket.emit("create game");
        });
        socket.on("disconnect", () => {
            setConnectionStatus("disconnected");
        });

        return () => { socket.disconnect() };
    }, []);

    return (
        <p>You are {connectionStatus}</p>
    );
}

export default App;
