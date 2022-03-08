import React from "react";
import Cell from "../components/Cell";

interface GridProps {
    userData: string[];
    serverData: string[];
    setData: (pos: number) => void;
}

const Grid: React.FC<GridProps> = ({
    userData,
    serverData,
    setData
}) => {
    console.log(serverData, userData);
    function isSetOnServer(pos: number) {
        return serverData[pos] === userData[pos];
    }

    function drawCells() {
        const result = [];
        for (let i = 0; i < userData.length; i++) {
            result.push(<Cell key={i} value={userData[i]} isSetOnServer={isSetOnServer(i)} handleClick={() => setData(i)}/>);
        }
        return result;
    }

    return (
        <div className="sudokuGrid">
            {drawCells()}
        </div>
    )
}

export default Grid;
