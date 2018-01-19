import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { University, Servicio } from "../app.models"
import { AppConfiguration } from "../app.configuration";
import 'rxjs/Rx';
//import { HttpPEInterceptor } from './shared/HttpPEInterceptor';

@Injectable()
export class UniversityService {
  requestUrl: string;
  responseData: any;
  handleError: any;
  private generalUrl: any

  constructor(private http: Http, private config: AppConfiguration
  ) {
    this.init();
  }

  //// Método que inicializa el servicio.
  private init() {
    // Se asigna la url de los servicios api.
    this.generalUrl = this.config.getParamConfig('servicios', "UrlApiRest");
  }

  //// Método que obtiene toda la información de todas las universidades.
  getInfoAllUniversities() {
    debugger;
    let url = `${this.generalUrl}/api/University`
    return this.http.get(url).map(res => {
      return res.json();
    })
  }

  //// Método que crea una nueva universidad.
  createUniversity(university: University[]) {
    let url = `${this.generalUrl}/api/University`
    let body = JSON.stringify(university);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, { headers })
      .map(res => {
        return res;
      })
  }

  //// Método para actualizar una universidad específica.
  updateUniversity(university: University[]) {
    let url = `${this.generalUrl}/api/University`
    let body = JSON.stringify(university);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put(url, body, { headers })
      .map(res => {
        return res;
      })
  }

  //// Método que obtiene la información de una universidad seleccionada.
  getInfoUniversity(universityCode: string) {
    let url = `${this.generalUrl}/api/University/${universityCode}`
    return this.http.get(url).map(res => {
      return res.json();
    })
  }

  //// Método que actualiza el reglamento de una universidad específica.
  updateRegulationUniversity(universityCode: string, regulationName: string, files: File) {
    let url = `${this.generalUrl}/api/University/${universityCode}/Regulation/UploadFiles/${regulationName}`
    let formData: FormData = new FormData();
    if (files != undefined) {
      formData.append('file', files[0], files[0].name);
    }

    var returnReponse = new Promise((resolve, reject) => {
      this.http.post(url, files != undefined ? formData : null).subscribe(
        res => {
          console.log(res);
          this.responseData = res;
          resolve(this.responseData);
        });
    });
    return returnReponse;
  }

  //// Método que me permite descargar el reglamento de una universidad específica.
  downloadRegulationUniversity(universityCode: string) {
    return `${this.generalUrl}/api/University/${universityCode}/Regulation/Download`
  }
}