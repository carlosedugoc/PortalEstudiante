import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { Http, Headers, URLSearchParams } from "@angular/http";
import {  } from "../models/me";

@Injectable()
export class StudentService {

  constructor() { }

  getStudent(){
    
  }

  getMenu(){
    // let urlServicio:string = `${url}/api/University/${IdUniversidad}/ServiceItems`
    // return this.http.get(urlServicio).map(servicios=>{ 
    //   console.log('json',servicios.json())
    //   return servicios.json()
    // })
  }

}
