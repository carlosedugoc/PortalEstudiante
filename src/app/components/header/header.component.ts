import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { Menu } from "../../models/menu/menu";
import { GeneralUtils } from "../../shared/GeneralUtils";
import { OAuthService } from "angular-oauth2-oidc";

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

  public utilidades: GeneralUtils // Clase de utilidades
  public user: User
  // private urlLogout: any
  private inDev: any

  //Obtiene el user del sesión storage
  constructor(private router: Router, http: Http, private oauthService: OAuthService) {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    this.utilidades = new GeneralUtils(http)
  }

  //se cargan estilos dependiendo la universidad
  async ngOnInit() {
    await this.utilidades.load()

    document.getElementById('logo')['src'] = `../assets/img/logo_header${this.user.university}.png`
    document.getElementById('logoFooter')['src'] = `../assets/img/logo_footer${this.user.university}.png`
    console.log('notificacion', this.notificacion)
    console.log('correo', this.correo)

    //// Se obtiene la información para el cierre de sesión.

    // this.urlLogout = await this.utilidades.getServiceByName("UrlLogoutIAM");
    this.inDev = await this.utilidades.getValidationByName("dev");
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