import React from "react";
import { GameState } from "../App";
import Cell from "../components/Cell";

interface GridProps {
    userData: string[];
    serverData: string[];
    layout: string[] | null;
    gameState: GameState;
    setData: (pos: number) => void;
}

const Grid: React.FC<GridProps> = ({
    userData,
    serverData,
    setData,
    gameState,
    layout
}) => {
    function isSetOnServer(pos: number) {
        return serverData[pos] === userData[pos];
    }

    function drawCells() {
        const result = [];
        for (let i = 0; i < userData.length; i++) {
            if (layout && layout[i] !== " ")
                result.push(<Cell key={i} value={layout[i]} isSetOnServer={true} layoutCell/>);
            else if (gameState === "done")
                result.push(<Cell key={i} value={userData[i]} isSetOnServer={isSetOnServer(i)}/>);
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
