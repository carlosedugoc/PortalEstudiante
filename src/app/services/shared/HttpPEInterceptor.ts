import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"
import { GlobalService } from "../global.service";
import { ServiceTypeToInvoke } from "../../shared/enumerators.enum";
import { AuthService } from "./Auth/auth.service";

// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"


@Injectable()
export class HttpPEInterceptor extends Http {

    public serviceTypeToInvoke: ServiceTypeToInvoke = ServiceTypeToInvoke.NA

    constructor(
        backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        private globalService: GlobalService,
        private auth: AuthService
    ) {
        super(backend, options)
    }

    public request(request: Request, options?: RequestOptionsArgs): Observable<Response> {
        debugger;

        switch (this.serviceTypeToInvoke) {
            case ServiceTypeToInvoke.Banner:
                //// Lógica necesaria para enviar información de token.
                request.headers.set("authorization", "Bearer " + this.auth.getToken())
                break;
            case ServiceTypeToInvoke.NA:
            default:
                break;
        }

        return super.request(request, options)
            .catch(this.handleError)
    }

    public handleError = (error: Response) => {
        this.globalService.WriteError(error)
        return Observable.throw("Upss... Ocurrió un error! -> " + error)
    }
}