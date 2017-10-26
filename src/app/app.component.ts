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
  constructor(private router:Router,private translate: TranslateService){
    let lan = window.navigator.language.substr(0,2)
    if (sessionStorage.getItem('lan')){
      lan = sessionStorage.getItem('lan')
    }
    this.translate.setDefaultLang(lan);
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

  switchLanguage(language: string) {
    console.log(language)
    this.translate.use(language);
    sessionStorage.setItem('lan',language)
  }

}


