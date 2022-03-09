import React from "react";

interface NumberPickerProps {
    currentSelection: string;
    pickNumber: (pick: string) => void;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
    currentSelection,
    pickNumber
}) => {
    const selections = ["1", "2", "3", "4", "5", "6", "7", "8", "9", " "];

    function drawPicker() {
        const result = [];
        for (let i = 0; i < selections.length; i++) {
            const selection = selections[i];
            let className = "cell cell-nonLayout";
            if (selection === currentSelection)
                className = className.concat(" numberPickerCellCurrent");

            result.push(
                <div
                    key={i}
                    className={className}
                    onClick={() => pickNumber(selection)}
                ><p>{selection}</p></div>
            );
        }
        return result;
    }

    return (
        <div className="numberPicker">
            {drawPicker()}
        </div>
    );
}

export default NumberPicker;
