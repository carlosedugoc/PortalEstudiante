import { Injectable } from '@angular/core';
import { Servicio } from "../models/servicio";
import { Http, Headers, Response, Request, RequestMethod, URLSearchParams, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { GeneralUtils } from '../shared/GeneralUtils'

@Injectable()
export class UniversityService {
  requestUrl: string;
  responseData: any;
  handleError: any;
  private utility: GeneralUtils
  private generalUrl: any

  constructor(private http: Http
  ) {
    debugger;
    this.utility = new GeneralUtils(http)
    this.utility.getConfiguration("servicios|UrlApiRest").subscribe(res => this.generalUrl = res);
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
    debugger;
    let url = `${this.generalUrl}/api/University/${universityCode}/Regulation/UploadFiles/${regulationName}`
    let formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    var returnReponse = new Promise((resolve, reject) => {
      debugger;
      this.http.post(url, formData).subscribe(
        res => {
          debugger;
          console.log(res);
          this.responseData = res;
          resolve(this.responseData);
        },
        error => {
          debugger;
          console.log(error);
          //this.router.navigate(['/login']);
          reject(error);
        }
      );
    });
    return returnReponse;
  }

  //// Método que me permite descargar el reglamento de una universidad específica.
  downloadRegulationUniversity(universityCode: string)  {
    return `${this.generalUrl}/api/University/${universityCode}/Regulation/Download`
  }
}