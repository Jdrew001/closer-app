import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { CoreConstants } from "../core.constant";
import { GenericReponse } from "../models/generic-response.model";
import { MessageService } from "../services/message.service";

@Injectable()
export class Request200ErrorInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return next.handle(req).pipe(
           tap((res: HttpEvent<any>) => {
                if (res instanceof HttpResponse && this.isGenericResponse(res['body'])) {
                    if (res.body.error) {
                        return this.handleError(res?.body?.message);
                    }
                }
           })
       )
    }

    private handleError(message: string) {
        this.messageService.showErrorMessage(null, message);
        return throwError(message);
    }

    isGenericResponse(object: any): object is GenericReponse<any> {
        return 'message' in object && 'status' in object && 'data' in object && 'error' in object;
    }
}