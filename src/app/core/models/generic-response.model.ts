export interface GenericReponse<T> {
    message: string;
    status: 'SUCCESS' | 'FAILURE';
    data: T;
    error: boolean;
}