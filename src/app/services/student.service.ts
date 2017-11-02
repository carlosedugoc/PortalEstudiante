import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { User } from "../models/user";
import { TipoMenu } from "../models/menu/tipomenu";
import { GeneralUtils } from '../shared/GeneralUtils'

@Injectable()
export class StudentService {

  private utility: GeneralUtils
  private generalUrl: any

  constructor(private http: Http
  ) {
    this.utility = new GeneralUtils(http)
    this.utility.getConfiguration("servicios|UrlApiRest").subscribe(res => this.generalUrl = res);
  }

  getStudent(){
    
  }

  getMenu(user:User){
    console.log('getMenu',this.generalUrl)
    this.generalUrl = 'http://10.75.8.109/PEServices'
    let urlServicio:string = `${this.generalUrl}/api/Option/University/${user.university}/Level/${user.level}/Modality/${user.modality}/UserType/${user.userType}`
    return this.http.get(urlServicio).map(menu=>{ 
      console.log('json',menu.json())
      return menu.json()
    })
  }

}
