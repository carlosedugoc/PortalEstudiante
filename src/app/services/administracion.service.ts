import { Injectable } from '@angular/core';
import { Servicio } from "../models/servicio";
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';
// import { HttpPEInterceptor } from './shared/HttpPEInterceptor';


@Injectable()
export class AdministracionService {

  constructor(private http: Http) { }

  //Obtiene los servicios que puede prestar una universidad dada
  getServicios(IdUniversidad: String, url: string) {
    let urlServicio: string = `${url}/api/University/${IdUniversidad}/ServiceItems`
    return this.http.get(urlServicio).map(servicios => {
      console.log('json', servicios.json())
      return servicios.json()
    })
  }

  //Obtiene las universidades
  getUniversidades(url: string) {
    return this.http.get(url).map(servicios => servicios.json())
  }


  //Actualiza un servicios para una universidad y un perfil dados
  actualizaItem(item: any, url: string) {
    console.log('item', JSON.stringify(item))
    let urlServicio: string = `${url}/api/ItemSerUni`
    let body = JSON.stringify(item);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put(urlServicio, body, { headers })
      .map(res => {
        return res;
      })
  }

  //Actualiza un servicio de alguna universidad
  actualizarServicio(datos: any, url: string) {
    debugger;
    let body = JSON.stringify(datos);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, body, { headers })
      .map(res => {
        console.log('rta servicio', res, body)
        return res;
      })
  }

  //Inserta los servicios para una niversidad dada
  saveItems(items: any[], url: string) {
    let urlServicio: string = `${url}/api/ItemSerUni`
    let body = JSON.stringify(items);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    console.log('save', urlServicio, body)
    return this.http.post(urlServicio, body, { headers })
      .map(res => {
        console.log(res);
        return res;
      })
  }

  updateModified(data: any, url: string) {
    url = `${url}/api/UniversityService/Modified`
    let body = JSON.stringify(data);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put(url, body, { headers })
      .map(res => {
        return res;
      })
  }
}
