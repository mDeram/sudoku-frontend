interface HeaderProps {
    connectionStatus: string;
}

const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
    return (
        <header>
            <h1>Mutliplayer Sudoku</h1>
            <p className={connectionStatus}>{connectionStatus}</p>
        </header>
    )
}

export default Header;
