import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { ENDPOINT, PATH } from "../constants";

const useSocket = () => {
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const newSocket = socketIOClient(ENDPOINT, { transports: ["websocket"], path: PATH, secure: true });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect()
        };
    }, []);

    return socket;
}

export default useSocket;
