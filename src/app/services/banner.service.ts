
import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from "@angular/http";
import { GeneralUtils } from "../shared/GeneralUtils";
import { Student } from '../models/Banner/Student/student';
import { ServiceTypeToInvoke, Universities } from "../shared/enumerators.enum";
import { String } from "typescript-string-operations";
import { AppConfiguration } from "../app.configuration";
import { Observable } from 'rxjs/Observable';
import { GlobalService } from "../services/global.service";
import { HttpPEInterceptor } from './shared/HttpPEInterceptor';

@Injectable()
export class BannerService {

  constructor(private http: HttpPEInterceptor,
    private config: AppConfiguration,
    private globalService: GlobalService) {
    this.http.serviceTypeToInvoke = ServiceTypeToInvoke.Banner
  }
  // /**
  //  * Metodo para obtener el token de los servicios de administración
  //  * 
  //  * @returns 
  //  * @memberof BannerService
  //  */
  // getToken() {
  //   let url = this.config.getParamConfig('banner', 'token')

  //   let urlSearchParams = new URLSearchParams();
  //   urlSearchParams.append('grant_type', 'client_credentials');

  //   let body = urlSearchParams.toString()

  //   let headers = new Headers({
  //     'authorization': this.config.getParamConfig('banner', 'authorization'),
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   });

  //   return this.http.post(url, body, { headers }).map(respuesta => respuesta.json())
  // }

  /**
   * Método que obtiene el dominio que se incrusta en la url del servicio de banner.
   * 
   * @param {string} idUniversity id de la universidad del usuario logueado.
   * @returns {string} El dominio para la url de banner configurado en el config.
   * 
   * @memberOf BannerService
   */
  private getDomainTenantURLBanner(idUniversity: string): string {
    debugger;
    let nameUni = Universities[idUniversity];
    let domain: string = this.config.getParamConfig('dominioTenantUniversidadBannerURL', nameUni)
    return domain
  }

  /**
   * Metodo para invocar los servicios de titulos de las grillas de la administracion de servicios
   * 
   * @param {string} token token generado
   * @param {string} url Url del servicio a invocar
   * @returns 
   * @memberof BannerService
   */
  getTitulos(url: string, idUniversity: string) {
    debugger;
    let nameUni = this.getDomainTenantURLBanner(idUniversity);
    url = String.Format(url, nameUni)

    // let headers = new Headers({
    //   'authorization': `Bearer ${token}`
    // });
    return this.http.get(url//, { headers }
    )
      .map(respuesta => {
        return respuesta
      })
  }

  //   /**
  //  * Método para obtener el token cuando se autetica el usuario.
  //  * 
  //  * @returns 
  //  * @memberof BannerService
  //  */
  //   getTokenAuthenticationStudent() {
  //     let url = this.config.getParamConfig('banner', 'token')
  //     let uni: string = localStorage.getItem("uni")
  //     let usname: string = uni == "areandina" ? "acruzjoy1@ilumno.com" : "acruzjoy@ilumno.com"
  //     let paword: string = uni == "areandina" ? "111111" : "111190"

  //     let urlSearchParams = new URLSearchParams();
  //     urlSearchParams.append('grant_type', 'password');
  //     urlSearchParams.append('username', usname);
  //     urlSearchParams.append('password', paword);

  //     let body = urlSearchParams.toString()

  //     let headers = new Headers({
  //       'authorization': this.config.getParamConfig('banner', 'authorization'),
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     });

  //     return this.http.post(url, body, { headers }).map(respuesta => respuesta.json())
  //   }

  /**
   * Método que me permite obtener información del estudiante
   * 
   * @param {string} idUniversity Id de la universidad del estudiante.
   * @param {string} bearer Token de autenticación del estudiante.
   * @param {boolean} [academicRecord] Información académica del estudiante, este parámetro es opcional.
   * @returns 
   * @memberof BannerService
   */
  getInformatioStudent(idUniversity: string, academicRecord?: boolean) {
    debugger;
    let nameUni = this.getDomainTenantURLBanner(idUniversity);

    let url: string = this.config.getParamConfig('banner', "student-info") + (academicRecord == true ? '?include=academicrecords' : '')
    //  let url = "http://localhost:3004/AcademicRecord"
    url = String.Format(url, nameUni)

    // let headers = new Headers({
    //   'authorization': `Bearer ${bearer}`
    // });

    return this.http.get(url
      //  , { headers }
    )
      .map(respuesta => respuesta.json())
    //.catch(error => Observable.throw(error));

  }

  /**
   * Método que obtiene la información de los países.
   * 
   * @param {string} idUniversity Id de la universidad del estudiante.
   * @param {string} bearer Token de autenticación del estudiante.
   * @memberof BannerService
   */
  getCountries(idUniversity: string) {

    let nameUni = this.getDomainTenantURLBanner(idUniversity);

    let url: string = this.config.getParamConfig('banner', "countries")
    //url = url.replace("{0}", nameUni)
    url = String.Format(url, nameUni)

    // let headers = new Headers({
    //   'authorization': `Bearer ${bearer}`
    // });

    return this.http.get(url//, 
      //  { headers }
    ).map(respuesta => respuesta.json());
  }

  /**
   * Método que obtiene la información de estados o departamentos de un país específico. 
   * 
   * @param {string} idUniversity Id de la universidad del estudiante.
   * @param {string} bearer Token de autenticación del estudiante.
   * @param {string} countryCode Código del país seleccionado.
   * @memberof BannerService
   */
  getStates(idUniversity: string, countryCode: string) {

    let nameUni = this.getDomainTenantURLBanner(idUniversity);

    let url: string = this.config.getParamConfig('banner', "states")
    url = String.Format(url, nameUni, countryCode);

    // let headers = new Headers({
    //   'authorization': `Bearer ${bearer}`
    // });

    return this.http.get(url//, 
      //{ headers }
    ).map(respuesta => respuesta.json());
  }

  /**
   * Método que obtiene la información de un estado o departamento específico.
   * 
   * @param {string} idUniversity Id de la universidad del estudiante.
   * @param {string} bearer Token de autenticación del estudiante.
   * @param {string} countryCode Código del país seleccionado.
   * @param {string} stateCode Código del estado o departamento seleccionado.
   * @memberof BannerService
   */
  getCities(idUniversity: string, countryCode: string, stateCode: string) {
    let nameUni = this.getDomainTenantURLBanner(idUniversity);

    let url: string = this.config.getParamConfig('banner', "cities").replace("{2}", "{2:n}");
    url = String.Format(url, nameUni, countryCode, stateCode);

    // let headers = new Headers({
    //   'authorization': `Bearer ${bearer}`
    // });

    return this.http.get(url//, 
      // { headers }
    ).map(respuesta => respuesta.json());
  }
  /**
   * Método encargado de actualizar la información del estudiante.
   * 
   * @param {string} idUniversity Id de la universidad del estudiante.
   * @param {string} bearer Token de autenticación del estudiante.
   * @param {Student} student Objeto estudiante con información para ser actualizada.
   * @memberof BannerService
   */
  setStudentInformation(idUniversity: string, bearer: string, student: Student) {

  }
}
