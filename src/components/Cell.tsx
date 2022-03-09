import React from "react";

interface CellProps {
    value: string;
    handleClick: () => void;
    isSetOnServer: boolean;
    layoutCell?: boolean;
}

const Cell: React.FC<CellProps> = ({
    value,
    handleClick,
    isSetOnServer,
    layoutCell = false
}) => {
    function getClassName() {
        let className = "cell";
        if (!isSetOnServer)
            className = className.concat(" cell-user");
        if (layoutCell)
            className = className.concat(" cell-layout");
        if (!layoutCell)
            className = className.concat(" cell-nonLayout");
        return className;
    }

    return (
        <div className={getClassName()} onClick={handleClick}><p>{value}</p></div>
    )
}

export default Cell;
