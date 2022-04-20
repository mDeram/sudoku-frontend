import React from "react";

interface CellProps {
    value: string;
    isSetOnServer: boolean;
    handleClick?: () => void;
    layoutCell?: boolean;
}

const Cell: React.FC<CellProps> = ({
    value,
    isSetOnServer,
    handleClick = () => {},
    layoutCell = false
}) => {
    function getClassName() {
        let className = "cell";
        if (!isSetOnServer)
            className = className.concat(" cell-user");

        if (layoutCell)
            className = className.concat(" cell-layout");
        else
            className = className.concat(" cell-nonLayout");

        return className;
    }

    return (
        <div className={getClassName()} onClick={handleClick}><p>{value}</p></div>
    )
}

export default Cell;
