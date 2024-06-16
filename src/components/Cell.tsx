import clsx from "clsx";
import React from "react";

interface CellProps {
    value: string;
    handleClick?: () => void;
    className: string;
}

const Cell: React.FC<CellProps> = ({
    value,
    handleClick = () => {},
    className
}) => {
    return (
        <div className={clsx("cell", className)} onClick={handleClick}><p>{value}</p></div>
    )
}

export default Cell;
