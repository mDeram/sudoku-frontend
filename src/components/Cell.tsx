import React from "react";

interface CellProps {
    value: string;
    handleClick: () => void;
    isSetOnServer: boolean;
    serverCell?: boolean;
}

const Cell: React.FC<CellProps> = ({
    value,
    handleClick,
    isSetOnServer,
    serverCell = true
}) => {
    function getClassName() {
        let className = "gridCell";
        if (!isSetOnServer)
            className = className.concat(" userGridCell");
        if (serverCell)
            className = className.concat(" serverGridCell");
        return className;
    }

    return (
        <button className={getClassName()} onClick={handleClick}>{value}</button>
    )
}

export default Cell;
