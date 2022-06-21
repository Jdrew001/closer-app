export class BarModel {
    title: string;
    data: Array<GraphModel>;
    animation: boolean;
    total: number
}

export class GraphModel {
    subTitle: string;
    startDate: string;
    endDate: string;
    graphData: Array<KeyValue> = [];
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