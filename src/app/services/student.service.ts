import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { User } from "../models/user";
import { TipoMenu } from "../models/menu/tipomenu";

@Injectable()
export class StudentService {

  constructor(private http:Http) { }

  getStudent(){
    
  }

  getMenu(url:string, user:User){
    let urlServicio:string = `${url}/api/Option/${user.level}/${user.modality}/${user.userType}`
    return this.http.get(urlServicio).map(menu=>{ 
      console.log('json',menu.json())
      return menu.json()
    })
  }

}
