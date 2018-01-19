import { Http } from '@angular/http';
import { IProvider } from "./IProvider";
import { OAuthService, NullValidationHandler, JwksValidationHandler } from "angular-oauth2-oidc";
import { AppConfiguration } from "../../../../app.configuration";
import { Injectable } from '@angular/core';
import { AuthInfo } from "../../../../app.models";
import { Universities } from '../../../../shared/enumerators.enum';


export class IamAuth implements IProvider {

    public clientID: string
    private oauthService: OAuthService
    private config: AppConfiguration
    private authInfo: AuthInfo = new AuthInfo()
    private university: Universities

    constructor(args: any[]) {
        this.config = args[0]
        this.oauthService = args[1]
        this.university = args[2]
    }

    /**
     * Método que realiza la atenticación ante el proveedor especificado.
     * 
     * @returns {AuthInfo} 
     * @memberof IamAuth
     */
    login(): any {
        debugger;
        this.setConfig();
        // if (this.oauthService.getAccessToken()) {
        //     debugger;
        //     return this.getDataFromAuthenticatedUser()
        // } else {
        //     debugger;
        //     this.oauthService.initImplicitFlow();
        // }
    }


    /**
     * Método que desloguea al usuario autenticado ante el proveedor especificado.
     * 
     * @memberof IamAuth
     */
    logout(): void {
        debugger;
        this.setConfig()

        if (this.oauthService.getAccessToken()) {
            this.oauthService.logOut();
        }
        else {
            this.oauthService.initImplicitFlow();
        }
    }

    /**
     * Método que configura llamado a IAM.
     * 
     * @private
     * @memberof IamAuth
     */
    private setConfig() {
        let universityName = Universities[this.university]
        this.clientID = this.config.getParamConfig('clients', universityName)
        this.oauthService.loginUrl = this.config.getParamConfig('servicios', 'UrlLoginIAM'); //Id-Provider?
        this.oauthService.redirectUri = window.location.origin + "/index.html";
        this.oauthService.silentRefreshRedirectUri = window.location.origin + "/silent-refresh.html";
        this.oauthService.clientId = this.clientID;
        this.oauthService.scope = "openid";
        this.oauthService.issuer = "https://iam-qa.ilumno.com:9443/oauth2/token"
        this.oauthService.resource = "";
        if (localStorage.getItem('endsession') == 'true') {
            this.oauthService.resource = "endsession"
            localStorage.removeItem('endsession')
        }
        this.oauthService.oidc = true;
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.logoutUrl = this.config.getParamConfig('servicios', 'UrlLogoutIAM');

        this.oauthService.showDebugInformation = true
        this.oauthService.sessionChecksEnabled = true
        debugger;
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        // this.oauthService.events.subscribe(e => {
        //     console.debug('oauth/oidc event', e);
        //   });
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(value=>{
            
            this.oauthService.events.filter(e => e.type == 'token_expires').subscribe(e => {
                console.debug('received token_expires event', e);
                this.oauthService.silentRefresh();
            })


            if (this.oauthService.getAccessToken()) {
                debugger;
                return this.getDataFromAuthenticatedUser()
            } else {
                debugger;
                this.oauthService.initImplicitFlow();
            }
        }).catch(error=>{
            debugger;
            console.log(error)
        })
        // this.oauthService.tryLogin({});
        //this.oauthService.setupAutomaticSilentRefresh();
        // this.oauthService.events.filter(e => e.type == 'token_expires').subscribe(e => {
        //     console.debug('received token_expires event', e);
        //     this.oauthService.silentRefresh();
        // })
    }

    /**
     * Método que obtiene la información del usuario autenticado.
     * 
     * @returns 
     * @memberof IamAuth
     */
    public getDataFromAuthenticatedUser(): AuthInfo {
        this.setConfig()
        this.authInfo.accesToken = this.oauthService.getAccessToken()
        this.authInfo.claims = this.oauthService.getIdToken()
        return this.authInfo
    }
}
