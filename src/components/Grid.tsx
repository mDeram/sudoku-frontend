import clsx from "clsx";
import React, { useEffect, useState } from "react";
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
    const [errors, setErrors] = useState<Set<number>>(new Set());

    function getCompleteMergedDataOrNull(): string[] | null {
        if (!layout) return null;

        const mergedData: string[] = [...layout];
        for (let i = 0; i < serverData.length; i++) {
            if (serverData[i] !== " ")
                mergedData[i] = serverData[i];
            else if (mergedData[i] === " ")
                return null;
        }

        return mergedData;
    }

    function findErrors(): Set<number> {
        const result = new Set<number>();

        const mergedData = getCompleteMergedDataOrNull();
        if (!mergedData) return result;

        //TODO refactor

        // Check lines
        for (let l = 0; l < 9; l++) {
            const valueInLine = new Map<string, number>();
            for (let c = 0; c < 9; c++) {
                const pos = l*9 + c;
                const current = mergedData[pos];
                const otherPos = valueInLine.get(current);
                if (otherPos) {
                    result.add(otherPos);
                    result.add(pos);
                } else {
                    valueInLine.set(current, pos);
                }
            }
        }

        // Check columns
        for (let c = 0; c < 9; c++) {
            const valueInColumn = new Map<string, number>();
            for (let l = 0; l < 9; l++) {
                const pos = l*9 + c;
                const current = mergedData[pos];
                const otherPos = valueInColumn.get(current);
                if (otherPos) {
                    result.add(otherPos);
                    result.add(pos);
                } else {
                    valueInColumn.set(current, pos);
                }
            }
        }

        // Check square
        for (let l = 0; l < 9; l += 3) {
            for (let c = 0; c < 9; c += 3) {
                const offset = l*9 + c;
                const valueInSquare = new Map<string, number>();
                for (let l = 0; l < 3; l++) {
                    for (let c = 0; c < 3; c++) {
                        const pos = l*9 + c + offset;
                        const current = mergedData[pos];
                        const otherPos = valueInSquare.get(current);
                        if (otherPos) {
                            result.add(otherPos);
                            result.add(pos);
                        } else {
                            valueInSquare.set(current, pos);
                        }
                    }
                }
            }
        }

        return result;
    }

    useEffect(() => {
        setErrors(findErrors());
    }, [serverData]);

    function getError(pos: number) {
        return errors.has(pos);
    }

    function isSetOnServer(pos: number) {
        return serverData[pos] === userData[pos];
    }

    function getClassName(isSetOnServer: boolean, layoutCell: boolean | undefined = false, error: boolean | undefined = false) {
        return clsx({
            "cell-user": !isSetOnServer,
            "cell-layout": layoutCell,
            "cell-nonLayout": !layoutCell,
            "cell-error": error
        });
    }

    function drawCells() {
        const result = [];
        for (let i = 0; i < userData.length; i++) {
            if (layout && layout[i] !== " ") {
                result.push(<Cell key={i} value={layout[i]}   className={getClassName(true, true)}/>);
            } else if (gameState === "done") {
                result.push(<Cell key={i} value={userData[i]} className={getClassName(true)}/>);
            } else {
                result.push(<Cell key={i} value={userData[i]} className={getClassName(isSetOnServer(i), false, getError(i))} handleClick={() => setData(i)}/>);
            }
        }
        return result;
    }

    return (
        <div className={clsx("sudokuGrid", { "success": gameState === "done" })}>
            {drawCells()}
        </div>
    )
}

export default Grid;
