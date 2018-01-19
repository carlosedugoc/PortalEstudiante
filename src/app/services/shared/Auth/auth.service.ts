import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { AppConfiguration } from "../../../app.configuration";
import { AuthProvider, Universities, RolPE } from "../../../shared/enumerators.enum";
import { GlobalService } from "../../global.service";
import { BaseProvider } from "./Providers/base-provider";
import { AlertService } from "../../../app.services";
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthInfo } from "../../../app.models";
import { IProvider } from './Providers/IProvider';
import { GeneralUtils } from "../../../shared/GeneralUtils";
import { User } from '../../../models/user';

@Injectable()
export class AuthService {

  private authProvider: AuthProvider = AuthProvider.NA
  private authInfo: AuthInfo = null
  private provider: IProvider
  private universityOfUser: Universities = Universities.ilumno
  private userToTryLogin: User = new User()

  constructor(
    private http: Http,
    private config: AppConfiguration,
    private globalService: GlobalService,
    private baseProvider: BaseProvider,
    private alertService: AlertService,
    private utilidades: GeneralUtils

  ) {
    this.init();
  }

  /**
   * Método de inicio del servicio
   * 
   * @private
   * @memberof AuthService
   */
  private init() {
    let provider: string = this.config.getParamConfig("Auth", "provider");
    this.authProvider = AuthProvider[provider] == undefined ? AuthProvider.NA : AuthProvider[provider]
    this.whoCallMe()
  }

  /**
   * Método que realiza la autenticación con el provedor de autenticación correspondiente.
   * 
   * @memberof AuthService
   */
  public login(): Observable<{}> {
    debugger;
    let authInfo: AuthInfo
    this.provider = this.baseProvider.new(this.authProvider, this.universityOfUser)
    if (this.provider != undefined) {
      if (!this.isAuthenticated()) {
        this.authInfo = this.provider.login()
        return this.getAutorization()
      }
      else {
        // ya está autenticado, obtiene la información del usuario autenticado y obtiene autorización.
        this.authInfo = this.provider.getDataFromAuthenticatedUser()
        return this.getAutorization()
      }
    }
    else {
      this.globalService.WriteLog("No se encontró un proveedor de autenticación, contacte al administrador - Proveedor: " + this.authProvider)
      setTimeout(() => {
        this.alertService.error("No se encontró un proveedor de autenticación, contacte al administrador");
      }, 1000);
      return new Observable((observer) => { observer.complete() })
    }
  }

  /**
   * Método que obtiene la autorización del usuario logueado.
   * 
   * @private
   * @returns "Objeto de autenticación a travez del observador."
   * @memberof AuthService
   */
  private getAutorization() {
    const simpleObservable = new Observable((observer) => {
      //Aquí se debe consultar la autorización y llenar el objeto de autenticación con la información correspondiente.
      this.authInfo.autorization = "TODO: Aquí va la información de autorización"
      this.authInfo.user = this.userToTryLogin
debugger;
      //Se devuelve objeto con la información de autenticación
      this.globalService.authInfo = this.authInfo
      observer.next(this.authInfo)
      observer.complete()
    })

    return simpleObservable
  }

  /**
 * Método que quita autenticación del proveedor especificado.
 * 
 * @memberof AuthService
 */
  public logout() {
    this.provider.logout()
    sessionStorage.clear();
  }

  /**
   * Método que obtiene los claims de la autenticación.
   * 
   * @returns 
   * @memberof AuthService
   */
  public getClaims() {
    if (this.isAuthinfoFull()) {
      let jwt = new JwtHelper()
      return jwt.decodeToken(this.globalService.authInfo.claims)
    }
    else {
      return "No se encuentra información definida"
    }
  }

  /**
   * Método que obtiene el token del usuario autenticado.
   * 
   * @returns {string} token del usuario autenticado.
   * @memberof AuthService
   */
  public getToken(): string {
    if (this.isAuthinfoFull()) {
      return this.globalService.authInfo.accesToken
    }
    else {
      return "No se encuentra información definida"
    }
  }

  /**
   * Método que verifica si el usuario está autenticado antes de realizar alguna solicitud http.
   * 
   * @returns {boolean} Respuesta de validación de autenticación del usuario.
   * @memberof AuthService
   */
  public isAuthenticated(): boolean {
    let loguedInPE = sessionStorage.getItem('logued')
    if (loguedInPE) return true // Esto es así porque puede continuar logueado en PE sin importar provider.
    const token = this.isAuthinfoFull() ? this.globalService.authInfo.claims : ""
    return tokenNotExpired(null, token)
  }

  private isAuthinfoFull(): boolean {
    return this.globalService != undefined && this.globalService.authInfo != undefined
  }

  /**
   * Método que identifica que universidad se loguea.
   * 
   * @private
   * @memberof AuthService
   */
  private whoCallMe() {
    debugger;

    let quienSoyConfig: string = this.config.getParamConfig("Auth", "IAMSegunDominio")
    let universidades: string[] = quienSoyConfig.split('|')
    let hostname = location.hostname

    // Se determina según el dominio con el cual se ingresa que universidad está ingresando.
    // Se determina también el rol en PE.
    universidades.some(element => {

      let data = element.split(',')

      if (hostname.toLowerCase() == data[1].toLowerCase()) {

        this.userToTryLogin.universidadDelUsuario = Universities[data[0]]
        this.universityOfUser = Universities[data[0]]
        this.userToTryLogin.rolDelusuario =
          this.userToTryLogin.universidadDelUsuario == Universities.ilumno ?
            RolPE.Administrador : RolPE.Estudiante

        return true;
      }
    });
  }
}
