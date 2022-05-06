import { CoreConstants } from './../core.constant';
import { MessageService } from './../services/message.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { LoaderService } from "../services/loader.service";
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private loaderService: LoaderService,
        private messageService: MessageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const timeout = this.createTimeout();
        if (!this.urlMatchesExcludedForSpinner(req.url)) {
            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.loaderService.toggleLoader(false);
                    }
                    return EMPTY;
                }),
                catchError((error) => {
                    return this.handleError(error);
                }),
                finalize(() => {
                    clearTimeout(timeout);
                })
            );
        }
        clearTimeout(timeout);
        return next.handle(req);
    }

    private handleError(error: HttpErrorResponse) {
        this.loaderService.toggleLoader(false);
        this.messageService.showErrorMessage(CoreConstants.GENERIC_ERROR_MESSAGE);
        return throwError(error);
    }

    private createTimeout() {
        return setTimeout(() => {
            this.loaderService.toggleLoader(true);
        }, 800);
    }

    private urlMatchesExcludedForSpinner(routeURL: string) {
        let result = false;
        CoreConstants.EXCLUDED_URLS.forEach(url => {result = routeURL.includes(url)});
        return result;
    }
}