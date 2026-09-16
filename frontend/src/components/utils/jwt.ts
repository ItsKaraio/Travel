import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface JwtPayload {
    sub: string; //userID
    exp: number;
    iat: number;
    email?: string;
    role?: string;
}


const getToken = () => {
    const token = Cookies.get("accessToken");
    if (token) return atob(token) || null;
};


export const decodeToken = (): JwtPayload | null => {
    const token = getToken();
    if (!token) return null;

    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
};


export const isTokenExpired = (): boolean => {
    const decoded = decodeToken();
    if (!decoded) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
};

export const getEmailFromToken = (): string | null => {
    const decoded = decodeToken();
    return decoded?.email || null;
};


