import React from "react";
import Cell from "../components/Cell";

interface GridProps {
    data: string[];
    setData: (pos: number) => void;
}

const Grid: React.FC<GridProps> = ({
    data,
    setData
}) => {
    function drawCells() {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(<Cell key={i} value={data[i]} handleClick={() => setData(i)}/>);
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
