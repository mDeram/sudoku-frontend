import React from "react";

interface CellProps {
    value: string;
    handleClick: () => void;
}

const Cell: React.FC<CellProps> = ({
    value,
    handleClick
}) => {
    return (
        <button className="gridCell" onClick={handleClick}>{value}</button>
    )
}

export default Cell;
