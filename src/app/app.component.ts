import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AdministracionService } from "./services/administracion.service";
import { Menu, TipoMenu, ItemSubMenu, SubMenu, User } from "./app.models";
import { StudentService } from './services/student.service'
import { OAuthService } from 'angular-oauth2-oidc';
import { GeneralUtils } from "./shared/GeneralUtils";
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AdministracionService, StudentService]
})
export class AppComponent {

  public logued: boolean
  public language: string
  public user: User
  public users: User[]
  public menu: Menu[]
  public dashboard: Menu[]
  public notificaciones: Menu[]
  public redesSociales: Menu[]
  public perfiles: Menu[]
  public menus: TipoMenu[]

  public utilidades: GeneralUtils

  userName: string;
  password: string;
  loginFailed: boolean = false;
  public clientID: string

  constructor(private router: Router,
    private translate: TranslateService,
    private adminService: AdministracionService,
    private studentService: StudentService,
    private oauthService: OAuthService,
    private http: Http) {
      this.language = window.navigator.language.substr(0,2)
      this.translate.setDefaultLang(this.language);
      this.connectIAM(this.getParameters())
  }

  ////Obtiene los parametros enviados por get y los almacena en el localstorage
  getParameters(){
    this.utilidades = new GeneralUtils(this.http)
    let url: string = this.utilidades.getParameterHrefByName('university')
    let usr: string = this.utilidades.getParameterHrefByName('usr')
    if (usr){
      localStorage.setItem('codUsr', usr)
    }
    if (!url) { url = localStorage.getItem('uni') }
    localStorage.setItem('uni', url)
    return url
  }
  
  //CLIENTS ID EN DESPLIEGUE

  // connectIAM(url: string) {

  //   switch (url) {
  //     case "poli":
  //       this.clientID = 'tIUNIrRI1zFUVLzwk4S41lAuWYUa'
  //       break;
  //     case "aandina":
  //       this.clientID = 'PEJMcU2GQ7wFDCYeJ7FiFAU548ga'
  //       break;
  //     default:
  //       this.clientID = 'qAnYSzfC4Uf0B4_UqK4JjfDCpQQa'
  //       break;
  //   }

  //   this.configuraConexionIAM()
  //   this.logIAM()

  // }

  //CLIENTS ID EN DESARROLLO
  connectIAM(url: string) {

    switch (url) {
      case "poli":
        this.clientID = 'LfvveQdYe4BFSfE0GT1N5mUH8OEa'
        break;
      case "aandina":
        this.clientID = 'VGZjZR9US6kFqn5pP3YNEymOwiwa'
        break;
      default:
        this.clientID = 'aeemiW1RZu4nIYl2frJEPnxN9wQa'
        break;
    }

    this.configuraConexionIAM()
    this.logIAM()

  }

  // async connectIAM(url: string) {

  //   await this.utilidades.load()

  //   switch (url) {
  //     case "poli":
  //       this.clientID = await this.utilidades.getClientId('poli')
  //       break;
  //     case "aandina":
  //       this.clientID = await this.utilidades.getClientId('aandina')
  //       break;
  //     default:
  //       this.clientID = await this.utilidades.getClientId('ilumno')
  //       break;
  //   }

  // }

  //Se configura el objeto del IAM con los parametros de conexión
  configuraConexionIAM() {
    this.oauthService.loginUrl = "https://kcq-iamapp01.ilumno.net:9443/oauth2/authorize"; //Id-Provider?
    this.oauthService.redirectUri = window.location.origin + "/index.html";
    this.oauthService.clientId = this.clientID;
    this.oauthService.scope = "openid";
    this.oauthService.resource = "";
    if (localStorage.getItem('endsession') == 'true') {
      this.oauthService.resource = "endsession"
      localStorage.removeItem('endsession')
    }
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.logoutUrl = "https://kcq-iamapp01.ilumno.net:9443/oidc/logout";
    this.oauthService.tryLogin({});
  }

  //Configuración del login 
  logIAM() {
    this.getUsuarios()
    let token = sessionStorage.getItem('access_token')
    console.log('token', token)
    if (token) {
      this.logued = true
      sessionStorage.setItem('logued', 'true')
      //Se obtiene el usuario
      let codUsr:string = localStorage.getItem('codUsr')
      if(!codUsr){codUsr = ''}
      console.log('usuario',codUsr)
      this.user = this.users.find(item => item.userId == codUsr)
      sessionStorage.setItem('user', JSON.stringify(this.user))
      //Se colocan los estilos segun la universidad y el idioma
      document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
      this.switchLanguage(this.language)
      this.getMenu()
      //Se redirecciona dependiendo del rol que se loguea
      if (this.user.rol != "2") {
        this.router.navigate(['administration'])
      } else {
        this.router.navigate(['student'])
      }

    }
    else {
      this.login()
    }
  }

  //Realiza la autenticación ante el IAM
  login() {
    this.oauthService.clientId = this.clientID
    this.oauthService.initImplicitFlow();
  }

  //Realiza el cierre de sessión ante el IAM
  logout(endsession: boolean) {
    if (endsession) {
      this.oauthService.logOut();
      sessionStorage.clear();
    }
  }

  //Obtiene los datos del usuario autenticado
  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }


  //Obtiene los usuarios de prueba
  getUsuarios() {
    this.users = [
      {
        userId: "",
        name: "Administrador Ilumno",
        rol: "1",
        university: "0",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "AA",
        name: "Administrador Areandina",
        rol: "1",
        university: "1",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "Poli",
        name: "Administrador Politécnico",
        rol: "1",
        university: "2",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "123456",
        name: "Carlos Eduardo González Cortes",
        rol: "2",
        university: "1",
        modality: "PR",
        level: "UG",
        userType: "AS"
      },
      {
        userId: "654123",
        name: "Diana Marcela Bojaca",
        rol: "2",
        university: "2",
        modality: "DI",
        level: "GR",
        userType: "AS"
      }
    ]
  }

  //Obtiene el menú con las opciones parametrizadas para los usuarios
  getMenu() {
    this.studentService.getMenu(this.user).subscribe(menu => {
      this.menus = menu
      console.log('menu servicio', this.menus)
    })
  }

  //Establece el idioma del portal
  setLanguage(language: string, user: string, university: string) {
    let url: string = `http://http://10.75.8.109/PEServices`
    this.adminService.getLanguage(language, user, university, url).subscribe(lan => {
      this.language = lan
      this.translate.use(lan);
    })
  }

  //Cambia el lenguaje de la página
  switchLanguage(language: string) {
    this.translate.use(language);
  }

}


