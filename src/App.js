import './styles/App.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4000";

function App() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
        socket.on("hello", data => {
            setResponse(data);
        });
    }, []);

    return (
        <p>response: {response}</p>
    );
}

export default App;
