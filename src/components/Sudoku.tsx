import React, { useState } from "react";
import NumberPicker from "../components/NumberPicker";
import Grid from "../components/Grid";

function initData() {
    const newData: string[] = [];
    for (let i = 0; i < 81; i++) {
        newData[i] = " ";
    }
    return newData;
}

const Sudoku: React.FC = () => {
    const [data, setData] = useState<string[]>(initData());
    const [currentPick, setCurrentPick] = useState(" ");

    function handleSetData(pos: number, value: string) {
        setData(prev => {
            const newState = [...prev]
            newState[pos] = value;
            return newState;
        });
    }

    function handlePickNumber(pick: string) {
        setCurrentPick(pick);
    }

    return (
        <div>
            <Grid setData={(pos: number) => handleSetData(pos, currentPick)} data={data}/>
            <NumberPicker pickNumber={handlePickNumber} current={currentPick}/>
        </div>
    )
}

export default Sudoku;
