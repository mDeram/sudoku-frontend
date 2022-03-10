export const ___prod___ = process.env.NODE_ENV === "production";
export const ENDPOINT = ___prod___ ? "https://mderam.com" : "http://localhost:5001";
export const URL = ___prod___ ? "https://mderam.com/sudoku" : "http://localhost:3000/sudoku";
export const PATH = ___prod___ ? "/sudoku/socket.io" : "/socket.io";
