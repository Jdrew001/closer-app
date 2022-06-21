import { GraphModel } from "dist/ced-widgets/lib/graphs/bar-graph/bar-graph.model";
import * as moment from 'moment';
import { AppConstants } from "src/app/app.constants";

export class DashboardGraphSelectRequest {
    limit: number;
    dateSelected: string;

    constructor() {
        this.setInit();
    }

    setInit(limit?: number) {
        this.limit = limit | 9;
        this.dateSelected = moment(new Date()).format(AppConstants.DEFAULT_DATE_FORMAT);
    }
}

export class DashboardSwipeRequest {
    limit: number;
    dateSelected: string;
    boundary: string;

    constructor(limit: number, dateSelected: string, boundary: string) {
        this.limit = limit;
        this.dateSelected = moment(dateSelected).subtract(7).format(AppConstants.DEFAULT_DATE_FORMAT);
        this.boundary = boundary;
    }
}

export interface SwipeDashboardGraphRequest {
    limit: number;
    dateSelected: string;
    boundary: string;
}

export interface DashboardGraphResponse {
    title: string;
    data: Array<GraphModel>;
    animation: boolean;
    total: number;
}