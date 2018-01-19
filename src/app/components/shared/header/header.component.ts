import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";
import { User, Menu } from "../../../app.models";
import { AppConfiguration } from "../../../app.configuration";
import { GlobalService } from '../../../app.services';

declare var llamarEventosMainJS: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  @Output() language: EventEmitter<string> = new EventEmitter<string>();
  @Input('strLanguage') strLanguage: string
  @Input('notificacion') notificacion: Menu[]
  @Input('correo') correo: Menu[]
  @Output() endSession: EventEmitter<boolean> = new EventEmitter<boolean>();

  public user: User
  // private urlLogout: any
  private inDev: any

  //Obtiene el user del sesión storage
  constructor(private config:AppConfiguration, private globalService:GlobalService) {
    this.user = this.globalService.authInfo.user
    this.user.rol = this.user.rolDelusuario.toString()
    this.user.university = this.user.universidadDelUsuario.toString()
  }

  //se cargan estilos dependiendo la universidad
  ngOnInit() {


    document.getElementById('logo')['src'] = `../assets/img/logo_header${this.user.university}.png`
    document.getElementById('logoFooter')['src'] = `../assets/img/logo_footer${this.user.university}.png`
    document.getElementById('favicon')['href'] = `../assets/img/favicon${this.user.university}.ico`

    //// Se obtiene la información para el cierre de sesión.

    // this.urlLogout = await this.utilidades.getServiceByName("UrlLogoutIAM");
    this.inDev = this.config.getParamConfig('validaciones','dev');
    if (!sessionStorage.getItem('loaded')) {
      setTimeout(function () {
        llamarEventosMainJS();
        sessionStorage.setItem('loaded', 'true')
      }, 1000);
    }
    //// Esto es para validaciones adicionales a tener en cuenta. No quitar!
    setTimeout(function () {
      llamarEventosMainJS();
    }, 3000);
  }

  //Cambia el lenguaje
  switchLanguage(language: string) {
    this.language.emit(language)
  }

  //se cierra la sesión
  signOut() {
    localStorage.setItem('endsession', 'true')
    this.endSession.emit(true)
  }
}