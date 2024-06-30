import React, { useEffect, useState } from "react";

export const WaitingForPlayers: React.FC = () => {
    const [visibleDots, setVisibleDots] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleDots(prev => (prev + 1) % 4);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const dots = [
        visibleDots >= 1 ? "." : <span className="hidden">.</span>,
        visibleDots >= 2 ? "." : <span className="hidden">.</span>,
        visibleDots >= 3 ? "." : <span className="hidden">.</span>,
    ];

    return (
        <p>Waiting for players to join{dots}</p>
    )
}
