import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { TipoMenu, User } from "../app.models";
import { AppConfiguration } from "../app.configuration";
//import { HttpPEInterceptor } from './shared/HttpPEInterceptor';

@Injectable()
export class StudentService {

  private generalUrl: any

  constructor(private http: Http, private config: AppConfiguration) {

  }

  //Obtiene el menú para el usuario dado
  getMenu(user: User) {
    this.generalUrl = this.config.getParamConfig('servicios', 'UrlApiRest')
    let urlServicio: string = `${this.generalUrl}/api/Option/University/${user.university}/Level/${user.level}/Modality/${user.modality}/UserType/${user.userType}`
    console.log("url servicio: ", urlServicio)
    return this.http.get(urlServicio).map(menu => {
      return menu.json()
    })
  }
}
