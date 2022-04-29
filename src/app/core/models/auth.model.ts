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
}

export interface ResetPasswordResultModel {
    message?: string;
    error: boolean;
}

export interface ResetPasswordModel {
    userId: string;
    password: string;
}