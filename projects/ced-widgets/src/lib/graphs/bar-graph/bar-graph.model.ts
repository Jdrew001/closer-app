export interface BarModel {
    title: string;
    data: Array<KeyValue>;
    keys: Array<string>;
    animation: boolean;
}

export interface KeyValue {
    key: string;
    value: number;
}