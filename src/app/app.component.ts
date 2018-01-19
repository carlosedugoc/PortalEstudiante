import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Menu, TipoMenu, ItemSubMenu, SubMenu, User } from "./app.models";
import { StudentService, GlobalService, AlertService } from "./app.services";
import { BannerService } from "./services/banner.service";
import { AppConfiguration } from "./app.configuration";
import { OAuthService } from 'angular-oauth2-oidc';
import { GeneralUtils } from "./shared/GeneralUtils";
import { Http } from '@angular/http';
import { debug } from 'util';
import * as moment from 'moment';
import { AuthService } from "./services/shared/Auth/auth.service";
import { Universities, RolPE } from './shared/enumerators.enum';

declare var cambiarPosicionHojaEstilos: any
declare var fixToolTip: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentService, BannerService, AuthService]
})

export class AppComponent implements OnInit {

  public language: string
  public user: User
  public users: User[]
  public menu: Menu[]
  public dashboard: Menu[]
  public notificaciones: Menu[]
  public redesSociales: Menu[]
  public perfiles: Menu[]
  public menus: TipoMenu[]

  public inDev: boolean

  public utilidades: GeneralUtils

  userName: string;
  password: string;
  loginFailed: boolean = false;

  public logued: boolean = sessionStorage.getItem('logued') != null && sessionStorage.getItem('logued') == 'true'
  public clientID: string
  private idIntervalAccesToken

  @HostListener('mouseover') validateInactivity() {
    sessionStorage.setItem('lastMoveTime', moment().toString())
  }

  // ngDoCheck() {
  //   if (sessionStorage.getItem('expires_at')){
  //     let dateIAM = moment(Number(sessionStorage.getItem('expires_at')));
  //     let minutes = dateIAM.diff(moment(),'m')
  //     console.log('minutes', minutes)
  //     if (minutes < 1){
  //       this.logout(true)
  //     }
  //   }
  // }

  constructor(private router: Router,
    private translate: TranslateService,
    private studentService: StudentService,
    private oauthService: OAuthService,
    private http: Http,
    private globalService: GlobalService,
    private bannerService: BannerService,
    private config: AppConfiguration,
    private auth: AuthService,
    private alertService: AlertService
  ) {

    this.inDev = this.config.getParamConfig('validaciones', 'dev') || this.config.getParamConfig('Auth', 'provider') == "dev";
    setInterval(() => {
      if (sessionStorage.getItem('lastMoveTime')) {
        let time = moment(sessionStorage.getItem('lastMoveTime'))
        let minutes = moment().diff(time, 'm')
        console.log('minutes inactive', minutes)
        let t = this.config.getParamConfig('validaciones', 'inactiveTime')
        if (minutes >= t) {
          this.logout(true)
        }
      }
    }, 60000)
  }


  ngOnInit(): void {
    this.language = localStorage.getItem('lan')
    if (!this.language) { this.language = window.navigator.language.substr(0, 2) }
    this.translate.setDefaultLang(this.language);

    this.auth.login().subscribe(res => {
      if (this.auth.isAuthenticated()) {
        //// Aquí se realizan todo el proceso siguiente, puesto que ya se autenticó.
        this.LoadInfoUserAuthenticated()
      }
    });
  }

  LoadInfoUserAuthenticated() {
    debugger;
    this.logued = true
    sessionStorage.setItem('logued', 'true')
    //Se obtiene el usuario
    let codUsr: string = localStorage.getItem('codUsr')
    if (!codUsr) { codUsr = 'su' }
    console.log('usuario', codUsr)
    //this.getUsuarios()
    this.user = this.globalService.authInfo.user
    this.user.rol = this.user.rolDelusuario.toString()
    this.user.university = this.user.universidadDelUsuario.toString()
    this.globalService.user = this.user
    sessionStorage.setItem('user', JSON.stringify(this.user))
    localStorage.setItem("uni", this.user.university == "1" ? "areandina" : "politecnico")

    //cambiarPosicionHojaEstilos()

    document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`

    this.switchLanguage(this.language)

    //Se redirecciona dependiendo del rol que se loguea
    if (this.user.rol == "2") {
      this.cargarInfoEstudiante();
      this.router.navigate(['/dashboard'])
    } else {
      this.router.navigate(['/main'])
    }
  }

  //Realiza el cierre de sessión ante el IAM
  logout(endsession: boolean) {
    if (endsession) {
      this.logued = false
      if (this.inDev) { sessionStorage.clear(); this.router.navigate(['/']); location.reload() }
      else {
        this.auth.logout()
        localStorage.setItem("endsession", "true")
      }
    }
  }

  //Cambia el lenguaje de la página
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lan', language)
    fixToolTip()
  }

  /**
   * Método que carga la información del estudiante.
   * 
   * @memberof AppComponent
   */
  cargarInfoEstudiante() {
    this.globalService.ready = false
    // this.loadStudentToken().then(() => {
    //   this.loadStudentInfo()
    // })
    this.globalService.AutenticationStudentToken = this.auth.getToken()
    this.loadStudentInfo()
  }

  // /**
  //  * Método que carga la información del token una vez se encuentra logueado un estudiante.
  //  * 
  //  * @returns 
  //  * @memberof AppComponent
  //  */
  // loadStudentToken() {
  //   const promesa = new Promise((resolve, reject) => {
  //     try {
  //       if (this.logued) {
  //         this.bannerService.getTokenAuthenticationStudent().subscribe(res => {
  //           if (res != undefined) {
  //             this.globalService.AutenticationStudentToken = res["access_token"]
  //             let expires_in = res["expires_in"];
  //             if (expires_in > 0) {
  //               clearInterval(this.idIntervalAccesToken)
  //               this.idIntervalAccesToken = setInterval(() => this.loadStudentToken(), expires_in * 1000);//Segundos.
  //             }
  //           }
  //           else {
  //             this.globalService.WriteLog("El servicio token no devolvió información.")
  //           }
  //           resolve(res)
  //         },
  //           error => {
  //             //this.globalService.WriteError(error);
  //             reject(new Error(error))
  //           });
  //       }
  //       else {
  //         clearInterval(this.idIntervalAccesToken)
  //       }
  //     } catch (error) {
  //       this.globalService.WriteError(error);
  //       alert("Ocurrió un error al tratar de obtener el token");
  //     }
  //   });
  //   return promesa
  // }

  /**
   * Función que carga la información del estudiante ya logueado.
   * 
   * @private
   * @memberof AppComponent
   */
  private loadStudentInfo() {
    const promesa = new Promise((resolve, reject) => {
      this.bannerService.getInformatioStudent(this.user.university, true).subscribe(res => {
        this.globalService.setStudent = res;
      }, error => {
        this.globalService.WriteError(error)
        this.globalService.ready = true
        this.alertService.error(`Error: ${error.status}, Servicio: ${error.url}`)
      })
    })
    return promesa
  }


  //#region Desarrollo
  //Obtiene los usuarios de prueba
  getUsuarios() {
    // this.users = [
    //   {
    //     userId: "su",
    //     name: "Administrador Ilumno",
    //     rol: "1",
    //     university: "0",
    //     modality: "PR",
    //     level: "UG",
    //     userType: "AS"
    //   },
    //   {
    //     userId: "AA",
    //     name: "Administrador Areandina",
    //     rol: "1",
    //     university: "1",
    //     modality: "PR",
    //     level: "UG",
    //     userType: "AS"
    //   },
    //   {
    //     userId: "Poli",
    //     name: "Administrador Politécnico",
    //     rol: "1",
    //     university: "2",
    //     modality: "PR",
    //     level: "UG",
    //     userType: "AS"
    //   },
    //   {
    //     userId: "123456",
    //     name: "Carlos Eduardo González Cortes",
    //     rol: "2",
    //     university: "1",
    //     modality: "PR",
    //     level: "UG",
    //     userType: "AS"
    //   },
    //   {
    //     userId: "654123",
    //     name: "Diana Marcela Bojaca",
    //     rol: "2",
    //     university: "2",
    //     modality: "DI",
    //     level: "GR",
    //     userType: "AS"
    //   }
    // ]
  }

  //Conexión para ambiente local de desarrollo
  connectDev() {
    this.logued = sessionStorage.getItem('logued') != null && sessionStorage.getItem('logued') == 'true'
    if (!this.logued) {
      this.getUsuarios()
    } else {
      this.cargarInfoEstudiante();
      this.user = this.globalService.authInfo.user
      this.user.rol = this.user.rolDelusuario.toString()
      this.user.university = this.user.universidadDelUsuario.toString()
      this.globalService.user = this.user
    }
  }

  //Login para ambiente local de desarrollo
  loginDev(user: string) {
    this.connectDev()
    debugger;
    this.logued = true
    sessionStorage.setItem('logued', 'true')
    this.user = this.globalService.authInfo.user
    this.user.rol = this.user.rolDelusuario.toString()
    this.user.university = this.user.universidadDelUsuario.toString()
    this.globalService.user = this.user
    localStorage.setItem("codUsr", this.user.userId)
    debugger;
    localStorage.setItem("uni", this.user.university == "1" ? "areandina" : "politecnico")
    sessionStorage.setItem('user', JSON.stringify(this.user))
    this.switchLanguage(this.language)
    //cambiarPosicionHojaEstilos()
    document.getElementById('estilos')['href'] = `../assets/css/estilos${this.user.university}.css`

    //this.getMenu()
    if (this.user.rol != "2") {
      this.router.navigate(['/main'])
    } else {
      this.cargarInfoEstudiante();
      this.router.navigate(['/dashboard'])
    }
  }
  //#endregion
}