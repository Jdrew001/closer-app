export interface LoginDTO {
    email: string;
    password: string;
    deviceUUID: string;
    ipAddress?: string;
}