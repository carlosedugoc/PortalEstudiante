import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent {
  public logued:boolean
  constructor(private router:Router,translate: TranslateService){
    let lan = window.navigator.language.substr(0,2)
    translate.setDefaultLang(lan);
  }

  login(usuario:string){
    this.logued = true
    localStorage.setItem('usuario',usuario)

    if (usuario == ""){
      this.router.navigate(['administrador'])
    }else{
      this.router.navigate(['estudiante'])
    }
    
  }

}


