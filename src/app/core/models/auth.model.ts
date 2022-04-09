export interface AuthModel {
    isAuthenticated: boolean;
    userId: string;
    token: string;
    refreshToken: string;
    refreshTokenExpiration: string;
    message?: string;
    isNewDevice: false;
    shouldRedirectToLogin: boolean;
}

export interface RegisterModel {
    isUserCreated: boolean;
    message?: string;
    shouldRedirectToLogin: boolean;
    userId: string;
}