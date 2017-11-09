import { Injectable } from '@angular/core';
import { Servicio } from "../models/servicio";
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import { GeneralUtils } from '../shared/GeneralUtils'
import { University } from "../models/university";
import 'rxjs/Rx';


@Injectable()
export class UniversityService {
  requestUrl: string;
  responseData: any;
  handleError: any;
  private generalUrl: any
  private utilities: GeneralUtils

  constructor(private http: Http
  ) {
    //this.generalUrl = "http://estudiantesservices.azurewebsites.net"
  }

  //// Método que inicializa el servicio.
  async init() {
    this.utilities = new GeneralUtils(this.http)
    await this.utilities.load();

    this.generalUrl = this.utilities.urlApiRestDefault;
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
    console.log('university', JSON.stringify(university))
    let body = JSON.stringify(university);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.post(url, body, { headers })
      .map(res => {
        return res;
      }, error => {
        console.log('error', error)
      })
  }

  //// Método para actualizar una universidad específica.
  updateUniversity(university: University[]) {
    let url = `${this.generalUrl}/api/University`
    console.log('university', JSON.stringify(university))
    let body = JSON.stringify(university);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put(url, body, { headers })
      .map(res => {
        return res;
      }, error => {
        console.log('error', error)
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
        },
        error => {
          console.log(error);
          //this.router.navigate(['/login']);
          reject(error);
        }
      );
    });
    return returnReponse;
  }

  //// Método que me permite descargar el reglamento de una universidad específica.
  downloadRegulationUniversity(universityCode: string) {
    return `${this.generalUrl}/api/University/${universityCode}/Regulation/Download`
  }
}