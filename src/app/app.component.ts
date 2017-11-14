import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AdministracionService } from "./services/administracion.service";
import { Menu, TipoMenu, ItemSubMenu, SubMenu, User } from "./app.models";
import { StudentService } from './services/student.service'
import { OAuthService } from 'angular-oauth2-oidc';

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

  userName: string;
  password: string;
  loginFailed: boolean = false;

  constructor(private router: Router,
    private translate: TranslateService,
    private adminService: AdministracionService,
    private studentService: StudentService,
    private oauthService: OAuthService) {

      // CONEXION CON IAM
      this.oauthService.loginUrl = "https://kcq-iamapp01.ilumno.net:9443/oauth2/authorize"; //Id-Provider?
      this.oauthService.redirectUri = window.location.origin + "/index.html";
      this.oauthService.clientId = "qAnYSzfC4Uf0B4_UqK4JjfDCpQQa";
      this.oauthService.scope = "openid";
      this.oauthService.oidc = true;
      this.oauthService.setStorage(sessionStorage);
      this.oauthService.logoutUrl = "https://kcq-iamapp01.ilumno.net:9443/oidc/logout";
      this.oauthService.tryLogin({});

  }

  ngOnInit() {
    let token = sessionStorage.getItem('access_token')
    console.log('token',token)
    if (token){
        this.router.navigate(['administration'])
        document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
        this.logued = true
        sessionStorage.setItem('logued', 'true')
    }
    else
    {
        this.login()
    }
  }

  login() {
    this.oauthService.clientId = "qAnYSzfC4Uf0B4_UqK4JjfDCpQQa";
    this.oauthService.initImplicitFlow();
  }

  logout() {
      this.oauthService.logOut();
  }

  get givenName() {
      var claims = this.oauthService.getIdentityClaims();
      if (!claims) return null;
      return claims['given_name'];
  }

  loginWithPassword() {

      this.oauthService.clientId = "qAnYSzfC4Uf0B4_UqK4JjfDCpQQa";

      this
          .oauthService
          .fetchTokenUsingPasswordFlowAndLoadUserProfile(this.userName, this.password)
          .then(() => {
              console.debug('successfully logged in');
              this.loginFailed = false;
          })
          .catch((err) => {
              console.error('error logging in', err);
              this.loginFailed = true;
          })
          .then(() => {
              this.oauthService.clientId = "angular-app-1";
          })

    // debugger;
    // this.logued = sessionStorage.getItem('logued') != null && sessionStorage.getItem('logued') == 'true'
    // console.log(this.logued)
    // let lan = window.navigator.language.substr(0, 2)
    // this.language = lan
    // this.translate.setDefaultLang(lan);
    // if (!this.logued) {
    //   this.getUsuarios()
    // } else {
    //   this.user = JSON.parse(sessionStorage.getItem('user'))
    //   this.getMenu()
    //   console.log(this.user)
    //   document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`
    // }
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

    var objLanguage: any = {
      userName: this.user.userId,
      universityCode: this.user.university,
      userLanguage: language
    }

    let url: string = 'http://10.75.8.109/PEServices'
    this.adminService.putLanguage(objLanguage, url).subscribe(lan => {
      this.language = lan
    })
  }

}


