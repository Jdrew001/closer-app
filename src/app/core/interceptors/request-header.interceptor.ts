import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { CoreConstants } from "../core.constant";
import { DeviceService } from "../services/device.service";
import { TokenService } from "../services/token.service";

@Injectable()
export class RequestHeaderInterceptor implements HttpInterceptor {
    constructor(
        private tokenService: TokenService,
        private deviceService: DeviceService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(req, next));
    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {
        const token = await this.tokenService.appToken;
        const device = await this.deviceService.getDeviceInfo();
        
        if (token && !this.urlMatchesPublicUrl(req.url)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                 }
             });
        }
        
        req = req.clone({
            setHeaders: {
                Device: JSON.stringify(device)
            }
        });
        return next.handle(req).toPromise();
    }

    private urlMatchesPublicUrl(routeURL: string) {
        let result = false;
        CoreConstants.PUBLIC_URLS.forEach(url => {result = routeURL.includes(url)});
        return result;
    }
}