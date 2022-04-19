import Popup from "../components/Popup";
import { MdArrowDropUp, MdSettings } from "react-icons/md";
import { Slider } from "@mantine/core";
import { Settings } from "../components/GameCreator";

interface SettingsProps {
    difficulties: string[];
    settings: Settings;
    setSettings: (newSettings: Partial<Settings>) => void;
}

const Setting: React.FC<SettingsProps> = ({
    difficulties,
    settings,
    setSettings
}) => {

    function renderDifficulties() {
        return difficulties.map(difficulty => {
            const selectedClass = settings.difficulty == difficulty ? " selected" : "";
            return <button className={"difficulty" + selectedClass} onClick={() => setSettings({ difficulty: difficulty })}>{difficulty}</button>;
        });
    }

    return (
        <Popup trigger={<button className="settings"><MdSettings/></button>}>
            <div className="flyout"><MdArrowDropUp/></div>
            <div className="popupContent">
                <div className="playerNumber">
                    <div>
                        <p>Minimum Player</p>
                    </div>
                    <div className="playerNumberSliderContainer">
                        <p>{settings.minimumPlayer}</p>
                        <Slider
                            className="playerNumberSlider"
                            defaultValue={1}
                            color="black"
                            step={1}
                            value={settings.minimumPlayer}
                            onChange={(value: number) => setSettings({ minimumPlayer: value })}
                            min={1}
                            max={3}
                            marks={[{ value: 1 }, { value: 2 }, { value: 3 }]}
                            label={null}
                            styles={() => ({
                                track: {
                                    backgroundColor: "#EFEFEF",
                                },
                                bar: {
                                    backgroundColor: "transparent"
                                },
                                mark: {
                                    backgroundColor: "#555555"
                                },
                                markFilled: {
                                    borderColor: "transparent"
                                },
                                thumb: {
                                    backgroundColor: "white",
                                    borderColor: "#CCCCCC",
                                    borderWidth: "1px",
                                    width: "24px",
                                    height: "24px",
                                }
                            })}
                        />
                    </div>
                </div>
                <div className="difficulties">
                    {renderDifficulties()}
                </div>
            </div>
        </Popup>
    );
}

export default Setting;
