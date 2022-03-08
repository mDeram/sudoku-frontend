import React from "react";
import Cell from "../components/Cell";

interface GridProps {
    userData: string[];
    serverData: string[];
    layout: string[] | null;
    setData: (pos: number) => void;
}

const Grid: React.FC<GridProps> = ({
    userData,
    serverData,
    setData,
    layout
}) => {
    console.log(serverData, userData);
    function isSetOnServer(pos: number) {
        return serverData[pos] === userData[pos];
    }

    function drawCells() {
        const result = [];
        for (let i = 0; i < userData.length; i++) {
            if (layout && layout[i] !== " ")
                result.push(<Cell key={i} value={layout[i]} isSetOnServer={true} handleClick={() => {}}/>);
            else
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
