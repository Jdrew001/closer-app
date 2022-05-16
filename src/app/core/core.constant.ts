import { LoadingOptions, ToastOptions } from "@ionic/angular";

export class CoreConstants {
    public static AUTH_URL = 'Authentication'
    public static LOGIN_URL = 'login';
    public static REGISTER_URL = 'register';
    public static REFRESH_URL = 'refreshToken';
    public static VERIFY_URL = 'validateCode';
    public static REISSUE_VERIFICATION = 'resendCode';
    public static EMAIL_FOR_RESET = 'sendEmailForReset';
    public static PASSWORD_RESET = 'sendPasswordForReset';
    public static LOGOUT_URL = 'logout';

    // toast options
    public static GENERIC_SUCCESS_TOAST: ToastOptions = {
        icon: 'thumbs-up-outline',
        position: 'bottom',
        duration: 2000,
        color: 'success',
        message: 'Success',
        cssClass: 'message-style'
    };
    public static GENERIC_ERROR_TOAST: ToastOptions = {
        icon: 'alert-circle-outline',
        position: 'bottom',
        color: 'danger',
        duration: 2000,
        message: 'An error occurred.',
        cssClass: 'message-style'
    };
    public static GENERIC_ERROR_MESSAGE: string = 'An error occurred, please contact support.';

    // spinner options
    public static LOADING_OPTIONS: LoadingOptions = {
        animated: true,
        mode: "ios",
        showBackdrop: true,
        spinner: "crescent",
        translucent: true
    }
    public static LOAD_TIME: 2000;
    public static EXCLUDED_URLS = [CoreConstants.REFRESH_URL];

    public static PUBLIC_URLS = [
        this.LOGIN_URL,
        this.REGISTER_URL,
        this.REFRESH_URL,
        this.VERIFY_URL,
        this.REISSUE_VERIFICATION,
        this.EMAIL_FOR_RESET,
        this.PASSWORD_RESET
    ];
}