import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { Menu } from "../../models/menu/menu";

declare var mainNavToogle: any
declare var checkItems: any
declare var activeForParentAcordion: any
declare var gridMasonryDashboard: any
declare var rotate180: any
declare var inputFileClear: any
declare var appearWhenChange: any
declare var newInputs: any


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  @Output() language:EventEmitter<string> = new EventEmitter<string>();
  @Input('strLanguage') strLanguage:string
  @Input('notificacion') notificacion: Menu[]
  @Input('correo') correo: Menu[]

  public user:User

  //se cargan estilos dependiendo la universidad
  ngOnInit() {
    document.getElementById('logo')['src']=`../assets/img/logo_header${this.user.university}.png`
    document.getElementById('logoFooter')['src']=`../assets/img/logo_footer${this.user.university}.png`
    console.log('notificacion',this.notificacion)
    console.log('correo',this.correo)
    if(!sessionStorage.getItem('loaded')){
      setTimeout(function () {
        mainNavToogle(); //Función de js para colapsar el menu lateral. Main.js
        activeForParentAcordion(); //Función de js para cambiar el estilo activo a cada menu del acordion. Main.js
        sessionStorage.setItem('loaded','true')
      }, 1000);
    }

  }

  //Obtiene el user del sesión storage
  constructor(private router:Router) { 
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  //Cambia el lenguaje
  switchLanguage(language: string) {
    this.language.emit(language)
  }

  //se cierra la sesión
  signOut(){
    this.router.navigate(['/'])
    sessionStorage.clear()
  }
  
  
}