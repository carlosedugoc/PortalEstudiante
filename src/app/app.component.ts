import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
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
export class AppComponent implements OnInit {

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
    private http: Http,
    private route: ActivatedRoute) {
    debugger;

    this.utilidades = new GeneralUtils(http)
    let url: string = this.utilidades.getParameterHrefByName('university')
    this.connectIAM(url)
  }

  // connectIAM(url: string) {
    
  //       this.utilidades.load()
    
  //       switch (url) {
  //         case "poli":
  //           this.clientID = this.utilidades.getClientId('poli')
  //           break;
  //         case "aandina":
  //           this.clientID = this.utilidades.getClientId('aandina')
  //           break;
  //         default:
  //           this.clientID = this.utilidades.getClientId('ilumno')
  //           break;
  //       }
    
  //       debugger;
    
  //       this.configuraConexionIAM()
  //       this.logIAM()
    
  //     }

  async connectIAM(url: string) {

    await this.utilidades.load()

    switch (url) {
      case "poli":
        this.clientID = await this.utilidades.getClientId('poli')
        break;
      case "aandina":
        this.clientID = await this.utilidades.getClientId('aandina')
        break;
      default:
        this.clientID = await this.utilidades.getClientId('ilumno')
        break;
    }

    debugger;

    this.configuraConexionIAM()
    this.logIAM()

  }

  configuraConexionIAM() {
    this.oauthService.loginUrl = "https://kcq-iamapp01.ilumno.net:9443/oauth2/authorize"; //Id-Provider?
    this.oauthService.redirectUri = window.location.origin + "/index.html";
    // this.oauthService.clientId = "qAnYSzfC4Uf0B4_UqK4JjfDCpQQa";
    debugger;
    console.log('CLIENTE ID', this.clientID)
    this.oauthService.clientId = this.clientID;
    this.oauthService.scope = "openid";
    this.oauthService.resource = "";
    this.oauthService.oidc = true;
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.logoutUrl = "https://kcq-iamapp01.ilumno.net:9443/oidc/logout";
    this.oauthService.tryLogin({});
    debugger;
  }

  logIAM() {
    debugger;
    let token = sessionStorage.getItem('access_token')
    console.log('token', token)
    if (token) {
      this.getUsuarios()
      var claims = this.oauthService.getIdentityClaims();
      console.log('claims', claims)
      this.logued = true
      sessionStorage.setItem('logued', 'true')
      this.user = this.users.find(item => item.userId == '')
      sessionStorage.setItem('user', JSON.stringify(this.user))
      this.switchLanguage('es')
      document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
      this.getMenu()
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

  ngOnInit() {

  }

  login() {
    debugger;
    // this.oauthService.clientId = "qAnYSzfC4Uf0B4_UqK4JjfDCpQQa";
    this.oauthService.clientId = this.clientID
    this.oauthService.initImplicitFlow();
  }

  logout(endsession: boolean) {
    if (endsession) {
      this.oauthService.resource = "endsession"
      this.oauthService.logOut();
      sessionStorage.clear();
    }
  }

  get givenName() {
    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }


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

  // login(user: string) {
  //   debugger;
  //   this.logued = true
  //   sessionStorage.setItem('logued', 'true')
  //   this.user = this.users.find(item => item.userId == user)
  //   sessionStorage.setItem('user', JSON.stringify(this.user))
  //   this.setLanguage(this.language, this.user.userId, this.user.university)
  //   document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
  //   this.getMenu()
  //   if (this.user.rol != "2") {
  //     this.router.navigate(['administration'])
  //   } else {
  //     this.router.navigate(['student'])
  //   }
  // }

  // logout() {

  // }

  getMenu() {
    this.studentService.getMenu(this.user).subscribe(menu => {
      this.menus = menu
      console.log('menu servicio', this.menus)
    })
  }

  setLanguage(language: string, user: string, university: string) {
    let url: string = `http://http://10.75.8.109/PEServices`
    this.adminService.getLanguage(language, user, university, url).subscribe(lan => {
      this.language = lan
      this.translate.use(lan);
    })
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}


