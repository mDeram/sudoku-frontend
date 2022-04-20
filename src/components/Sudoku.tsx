import React, { useEffect, useState } from "react";
import NumberPicker from "../components/NumberPicker";
import Grid from "../components/Grid";
import { Socket } from "socket.io-client";
import { GameState } from "../App";

function initData() {
    const newData: string[] = [];
    for (let i = 0; i < 81; i++) {
        newData[i] = " ";
    }
    return newData;
}

interface SudokuProps {
    socket: Socket;
    gameState: GameState;
}

const Sudoku: React.FC<SudokuProps> = ({ socket, gameState }) => {
    const [layout, setLayout] = useState<string[] | null>(null);
    const [serverData, setServerData] = useState<string[]>(initData());
    const [userData, setUserData] = useState<string[]>(initData());
    const [currentPick, setCurrentPick] = useState(" ");

    useEffect(() => {
        function listener(message: any) {
            if (message.layout)
                setLayout(message.layout);
            if (message.data) {
                setServerData(message.data);
                setUserData(message.data);
            }
        }

        socket.on("gameUpdate", listener);

        return () => {
            socket.off("gameUpdate", listener);
        };
    }, []);

    useEffect(() => {
        if (gameState === "init") {
            setLayout(null);
            setServerData(initData());
            setUserData(initData());
        }
    }, [gameState]);

    function handleSetUserData(pos: number, value: string) {
        setUserData(prev => {
            const newState = [...prev]
            newState[pos] = value;
            socket.emit("gameUpdate", newState);
            return newState;
        });
    }

    function handlePickNumber(pick: string) {
        setCurrentPick(pick);
    }

    const validStates: GameState[] = ["init", "run", "done"];

    if (!validStates.includes(gameState)) return null;

    return (
        <>
        <div>
            <Grid
                setData={(pos: number) => handleSetUserData(pos, currentPick)}
                layout={layout}
                userData={userData}
                serverData={serverData}
                gameState={gameState}
            />
            {gameState !== "done" && <NumberPicker pickNumber={handlePickNumber} currentSelection={currentPick}/>}
        </div>
        {gameState === "done" && <p>Wow, your so goooood</p>}
        </>
    )
}

export default Sudoku;
