export interface RegistrationDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    deviceGuid: string;
    deviceModel: string;
    devicePlatform: string;
    deviceManufacture: string;
    ipAddress?: string;
}