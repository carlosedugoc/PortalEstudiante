import { Injectable } from '@angular/core';
import { Servicio } from "../models/servicio";
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class AdministracionService {

  constructor(private http:Http) { }

  getServicios(IdUniversidad:String, url:string ){
    let urlServicio:string = `${url}/api/University/${IdUniversidad}/ServiceItems`
    return this.http.get(urlServicio).map(servicios=>{ 
      console.log('json',servicios.json())
      return servicios.json()
    })
  }

  getUniversidades(url:string ){
    return this.http.get(url).map(servicios=> servicios.json())
  }

  getTitulos(token:string, url:string ){
    let headers = new Headers({
      'authorization':`Bearer ${token}`
    });
    return this.http.get(url,{headers})
        .map(respuesta=>{
          return respuesta
        })
  }


  getToken(){
    let url = 'https://apis.qailumno.com/token'

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type','client_credentials');

    let body = urlSearchParams.toString()

    let headers = new Headers({
      'authorization':'Basic eHJQYnpWYXB0Vk42OTF0QlJ0eWVvbGlCbXBrYTp6N3o0NXozWFdwR3RQVFJUU0FfUXVEaUhpSVFh',
      'Content-Type':'application/x-www-form-urlencoded'
    });
    return this.http.post(url,body,{headers}).map(respuesta=>respuesta.json()['access_token'])
  }


actualizaItem( item:any, url:string  ){
      console.log('item',JSON.stringify( item ))
      let urlServicio:string = `${url}/api/ItemSerUni`
      let body = JSON.stringify( item );

      let headers = new Headers({
        'Content-Type':'application/json'
      });
  
      return this.http.put(  urlServicio , body, { headers }  )
            .map( res=>{
              return res;
            },error=>{
              console.log('error',error)
            })
    }

actualizarServicio(datos:any, url:string ){
  let body = JSON.stringify( datos );
  let headers = new Headers({
    'Content-Type':'application/json'
  });
  return this.http.put(  url , body, { headers }  )
        .map( res=>{
          return res;
        },error=>{
          console.log('error',error)
        })
}
  
saveItems( items:any[], url:string ){
  let urlServicio:string = `${url}/api/ItemSerUni`
  let body = JSON.stringify( items );
  let headers = new Headers({
    'Content-Type':'application/json'
  });
  console.log('save',urlServicio, body)
  return this.http.post(urlServicio, body, { headers }  )
        .map( res=>{
          console.log(res);
          return res;
        })
}

getLanguage(language:string,user:string, university:string,url:string){
  console.log('ingreso al servicio de idioma')
  if (user == '' || user == undefined){user='Admin'}
  let urlServicio = `${url}/api/User/${user}/${language}/University/${university}`
  return this.http.get(urlServicio).map(servicios=> servicios.json())
}

putLanguage(language:any,url:string){
  let body = JSON.stringify( language );
  let headers = new Headers({
    'Content-Type':'application/json'
  });
  let urlServicio = `${url}/api/User/Language`
  return this.http.put(  urlServicio , body, { headers }  )
        .map( res=>{
          return res.json();
        },error=>{
          console.log('error',error)
        })
}

}
