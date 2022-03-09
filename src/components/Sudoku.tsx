import React, { useState } from "react";
import NumberPicker from "../components/NumberPicker";
import Grid from "../components/Grid";
import { Socket } from "socket.io-client";

function initData() {
    const newData: string[] = [];
    for (let i = 0; i < 81; i++) {
        newData[i] = " ";
    }
    return newData;
}

interface SudokuProps {
    socket: Socket;
}

const Sudoku: React.FC<SudokuProps> = ({ socket }) => {
    const [layout, setLayout] = useState<string[] | null>(null);
    const [serverData, setServerData] = useState<string[]>(initData());
    const [userData, setUserData] = useState<string[]>(initData());
    const [currentPick, setCurrentPick] = useState(" ");

    socket.on("game layout", newLayout => {
        setLayout(newLayout);
    });

    socket.on("game start", startData => {
        setServerData(startData);
        setUserData(startData);
    });

    socket.on("game update", newData => {
        setServerData(newData);
        setUserData(newData);
    });

    function handleSetUserData(pos: number, value: string) {
        setUserData(prev => {
            const newState = [...prev]
            newState[pos] = value;
            socket.emit("game update", newState);
            return newState;
        });
    }

    function handlePickNumber(pick: string) {
        setCurrentPick(pick);
    }

    return (
        <div>
            <Grid setData={(pos: number) => handleSetUserData(pos, currentPick)} layout={layout} userData={userData} serverData={serverData}/>
            <NumberPicker pickNumber={handlePickNumber} currentSelection={currentPick}/>
        </div>
    )
}

export default Sudoku;
