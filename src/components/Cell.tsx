import React from "react";

interface CellProps {
    value: string;
    handleClick: () => void;
    isSetOnServer: boolean;
}

const Cell: React.FC<CellProps> = ({
    value,
    handleClick,
    isSetOnServer
}) => {
    function getClassName() {
        let className = "gridCell";
        if (!isSetOnServer)
            className = className.concat(" userGridCell");
        return className;
    }

    return (
        <button className={getClassName()} onClick={handleClick}>{value}</button>
    )
}

export default Cell;
