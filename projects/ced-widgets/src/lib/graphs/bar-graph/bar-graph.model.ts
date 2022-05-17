export interface BarModel {
    title: string;
    data: Array<GraphModel>;
    animation: boolean;
    total: number
}

export interface GraphModel {
    subTitle: string;
    startDate: string;
    endDate: string;
    graphData: Array<KeyValue>;
    selected: boolean;
    current: boolean;
    defaultSelected: string;
    keys: Array<string>;
}

export interface KeyValue {
    key: string;
    value: number;
    date: string;
}