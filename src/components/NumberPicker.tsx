import React from "react";

interface NumberPickerProps {
    current: string;
    pickNumber: (pick: string) => void;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
    current,
    pickNumber
}) => {
    const selection = ["1", "2", "3", "4", "5", "6", "7", "8", "9", " "];

    function drawPicker() {
        const result = [];
        for (let i = 0; i < selection.length; i++) {
            const tmp = selection[i];
            if (tmp === current) {
                result.push(
                    <button
                        key={i}
                        className="numberPickerCell numberPickerCellCurrent"
                        onClick={() => pickNumber(tmp)}
                    >{selection[i]}</button>
                );
            } else {
                result.push(
                    <button
                        key={i}
                        className="numberPickerCell"
                        onClick={() => pickNumber(tmp)}
                    >{selection[i]}</button>
                );
            }
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
