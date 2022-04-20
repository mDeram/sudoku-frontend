export const ___prod___ = process.env.NODE_ENV === "production";
export const ENDPOINT = ___prod___ ? "https://mderam.com" : "http://localhost:5001";
export const PATH = ___prod___ ? "/sudoku/socket.io" : "/socket.io";
export const SEARCH_PARAM = "token";
