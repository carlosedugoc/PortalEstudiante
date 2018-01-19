import { IProvider } from "./IProvider";
import { DevAuth } from "./dev-auth";
import { IamAuth } from "./iam-auth";
import { AuthProvider, Universities } from "../../../../shared/enumerators.enum";
import { OAuthService } from "angular-oauth2-oidc";
import { AppConfiguration } from "../../../../app.configuration";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseProvider {

    constructor(
        private oauthService: OAuthService,
        private config: AppConfiguration,
    ) { }

    private createInstance<T extends IProvider>(c: new (...args: any[]) => T, ...args: any[]): T {
        return new c(args);
    }

    public new(provider: AuthProvider, university: Universities = Universities.ilumno): IProvider {
        let newProvider
        switch (provider) {
            case AuthProvider.dev:
                newProvider = this.createInstance(DevAuth);
                break;
            case AuthProvider.IAM:
                newProvider = this.createInstance(IamAuth, this.config, this.oauthService, university)
                break;
            case AuthProvider.NA:
            default:
                newProvider = null
                break;
        }
        return newProvider
    }
}
