import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericReponse } from 'src/app/core/models/generic-response.model';
import { BaseService } from 'src/app/core/services/base.service';
import { MessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import { DashboardConstant } from './dashboard.constant';
import { DashboardGraphResponse, DashboardGraphSelectRequest, SwipeDashboardGraphRequest } from './dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  protected baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    protected messageService: MessageService
  ) {
    super(messageService);

    this.baseUrl = `${environment.base_url}Habit/`;
  }

  fetchGetSelectedGraphData(dto: DashboardGraphSelectRequest): Observable<GenericReponse<DashboardGraphResponse>> {
    return this.httpClient.post(`${this.baseUrl}${DashboardConstant.GET_SELECTED_DATA}`, dto) as Observable<GenericReponse<DashboardGraphResponse>>;
  }

  fetchGetSwipedGraphData(dto: SwipeDashboardGraphRequest): Observable<GenericReponse<DashboardGraphResponse>> {
    return this.httpClient.post(`${this.baseUrl}${DashboardConstant.GET_SWIPED_DATA}`, dto) as Observable<GenericReponse<DashboardGraphResponse>>;
  }
}
