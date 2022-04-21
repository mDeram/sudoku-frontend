import classNames from "classnames";
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
        <div className={classNames("cell", className)} onClick={handleClick}><p>{value}</p></div>
    )
}

export default Cell;
