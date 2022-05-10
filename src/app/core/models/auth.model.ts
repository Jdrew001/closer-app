export interface AuthModel {
    isAuthenticated: boolean;
    userId: string;
    token: string;
    refreshToken: string;
    refreshTokenExpiration: string;
    message?: string;
    isNewDevice: false;
    shouldRedirectToLogin: boolean;
    error: boolean;
    confirmed: boolean;
    email: string;
    firstName: string;
    lastName: string;
}

export interface RegisterModel {
    isUserCreated: boolean;
    message?: string;
    shouldRedirectToLogin: boolean;
    userId: string;
}

export interface ResetEmailModel {
    isUser: boolean;
    message?: string;
    userId: string;
    email: string;
}

export interface ResetPasswordResultModel {
    message?: string;
    error: boolean;
}

export interface ResetPasswordModel {
    userId: string;
    password: string;
}

export interface ValidationCodeModel {
    code: string;
    email: string;
    validationType: 'NEW_ACCOUNT' | 'RESET_PASSWORD' | 'NEW_DEVICE_LOGIN'
}

export enum ValidationType {
    NEW_ACCOUNT = 'NEW_ACCOUNT',
    RESET_PASSWORD = 'RESET_PASSWORD',
    NEW_DEVICE_LOGIN = 'NEW_DEVICE_LOGIN'
}