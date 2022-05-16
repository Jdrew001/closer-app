export interface BarModel {
    title: string;
    data: Array<GraphModel>;
    keys: Array<string>;
    animation: boolean;
    total: number
}

export interface GraphModel {
    subTitle: string;
    startDate: string;
    endDate: string;
    graphData: Array<KeyValue>;
    selected: boolean;
    defaultSelected: string;
}

export interface KeyValue {
    key: string;
    value: number;
    date: string;
}