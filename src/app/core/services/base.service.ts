import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { GenericReponse } from '../models/generic-response.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    protected messageService: MessageService
  ) { }

  protected handle200Error(res: GenericReponse<any>) : GenericReponse<any> | Observable<any> {
    if (res.error) {
      this.messageService.showErrorMessage(null, res.message);
      return EMPTY;
    }

    return res;
  }
}
