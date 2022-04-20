import { SEARCH_PARAM } from "../constants";

function getGameLink(gameId: string) {
    const url = new URL(window.location as any);
    url.searchParams.set(SEARCH_PARAM, gameId);
    return url;
}

export default getGameLink;
