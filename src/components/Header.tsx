import { ConnectionStatus, GameState } from "../App";

interface HeaderProps {
    connectionStatus: ConnectionStatus;
    playerCount: number;
    gameState: GameState;
}

const Header: React.FC<HeaderProps> = ({
    connectionStatus,
    playerCount,
    gameState
}) => {
    return (
        <header>
            <h1>Mutliplayer Sudoku</h1>
            <div className="connectionInfo">
                {connectionStatus === "connected" && ["init", "run"].includes(gameState) && <p className="playerCount">{playerCount}</p>}
                <p className={connectionStatus}>{connectionStatus}</p>
            </div>
        </header>
    )
}

export default Header;
