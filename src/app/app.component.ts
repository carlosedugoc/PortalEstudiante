import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AdministracionService } from "./services/administracion.service";
import { User } from "./models/user";
import { Menu } from "./models/menu/menu";
import { TipoMenu } from "./models/menu/tipomenu";
import { ItemSubMenu } from "./models/menu/itemsubmenu";
import { SubMenu } from "./models/menu/submenu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css'],
  providers: [AdministracionService]
})
export class AppComponent {
  public logued: boolean
  public language:string
  public user:User
  public users:User[]
  public menu:Menu[]
  public dashboard:Menu[]
  public notificaciones:Menu[]
  public redesSociales:Menu[]
  public perfiles:Menu[]
  public menus:TipoMenu[]

  constructor(private router:Router,private translate: TranslateService,private adminService:AdministracionService){
    this.logued = sessionStorage.getItem('logued') != null && sessionStorage.getItem('logued') == 'true'
    console.log(this.logued)
    let lan = window.navigator.language.substr(0,2)
    this.language = lan
    this.translate.setDefaultLang(lan);
    if (!this.logued){
      this.getUsuarios()
    }else{
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.getMenus()
      console.log(this.user)
      document.getElementById('estilos')['href']=`../assets/css/estilos${this.user.university}.css`
    }

  }

  getUsuarios(){
    this.users = [
      {
        userId:"",
        name:"Administrador Ilumno",
        rol:"1",
        university:"0"
      },
      {
        userId:"AA",
        name:"Administrador Areandina",
        rol:"1",
        university:"1"
      },
      {
        userId:"Poli",
        name:"Administrador Politécnico",
        rol:"1",
        university:"2"
      },
      {
        userId:"123456",
        name:"Carlos Eduardo González Cortes",
        rol:"2",
        university:"1"
      },
      {
        userId:"654123",
        name:"Diana Marcela Bojaca",
        rol:"2",
        university:"2"
      }
    ]
  }

  login(user:string){
    this.logued = true
    sessionStorage.setItem('logued','true')
    this.user=this.users.find(item => item.userId == user)
    sessionStorage.setItem('user',JSON.stringify(this.user))
    this.setLanguage(this.language,this.user.userId,this.user.university)
    document.getElementById('estilos')['href']=`../assets/css/estilos${this.user.university}.css`
    this.getMenus()
    if (this.user.rol != "2" ){
      this.router.navigate(['administration'])
    }else{
      this.router.navigate(['student'])
    }

  }

  setLanguage(language:string,user:string,university:string){
    let url:string = `http://10.75.8.109/PEServices`
    this.adminService.getLanguage(language,user,university,url).subscribe(lan=>{
      this.language = lan
      this.translate.use(lan);
    })
  }

  switchLanguage(language: string) {
    this.translate.use(language);

    var objLanguage:any = {
      userName:this.user.userId,
      universityCode:this.user.university,
      userLanguage:language
    }

    let url:string = 'http://10.75.8.109/PEServices'
    this.adminService.putLanguage(objLanguage,url).subscribe(lan=>{
      this.language = lan
    })
  }


//DATOS QUEMADOS
  
  getMenus(){
    this.getMenu()
    this.getOtrosMenus()

    this.menus = [
      {
        id:1,
        name:"menu",
        options:this.menu
      },
      {
        id:2,
        name:"Dashboard",
        options:this.dashboard
      },
      {
        id:3,
        name:"Notificaciones",
        options:this.notificaciones
      },
      {
        id:4,
        name:"Redes Sociales",
        options:this.redesSociales
      },
      {
        id:5,
        name:"Perfil",
        options:this.perfiles
      }
    ]

    console.log('menus',this.menus)
  }

  getMenu(){
    this.menu = [
      {
        id:1,
        name:"Consulta",
        logo:"commenting",
        data:
        [
          {
          id:2,
          name:"Académica",
          data: 
            [
              {
                id:3,
                name:"SubConsulta 1",
                url:"url"
              },
              {
                id:4,
                name:"SubConsulta 2",
                url:"url"
              },
              {
                id:5,
                name:"SubConsulta 3",
                url:"url"
              },
              {
                id:6,
                name:"SubConsulta 4",
                url:"url"
              },
              {
                id:7,
                name:"SubConsulta 5",
                url:"url"
              }
            ]
          },
          {
            id:8,
            name:"Financiera",
            url:"url"
          },
          {
          id:9,
          name:"Otra",
          data: 
            [
              {
                id:10,
                name:"SubConsulta 1",
                url:"url"
              },
              {
                id:11,
                name:"SubConsulta 2",
                url:"url"
              },
              {
                id:12,
                name:"SubConsulta 3",
                url:"url"
              }
            ]
          },
        ]
      },
      {
        id:1,
        name:"Solicitud",
        logo:"send",
        data:
        [
          {
          id:2,
          name:"Académica",
          data: 
            [
              {
                id:3,
                name:"SubConsulta 1",
                url:"url"
              },
              {
                id:4,
                name:"SubConsulta 2",
                url:"url"
              },
              {
                id:5,
                name:"SubConsulta 3",
                url:"url"
              },
              {
                id:6,
                name:"SubConsulta 4",
                url:"url"
              },
              {
                id:7,
                name:"SubConsulta 5",
                url:"url"
              }
            ]
          },
          {
            id:8,
            name:"Financiera",
            url:"url"
          },
          {
          id:9,
          name:"Otra",
          data: 
            [
              {
                id:10,
                name:"SubConsulta 1",
                url:"url"
              },
              {
                id:11,
                name:"SubConsulta 2",
                url:"url"
              },
              {
                id:12,
                name:"SubConsulta 3",
                url:"url"
              }
            ]
          },
        ]
      },
      {
        id:1,
        name:"Portales",
        logo:"laptop",
        data:
        [
          {
          id:2,
          name:"Académica",
          data: 
            [
              {
                id:3,
                name:"SubConsulta 1",
                url:"url"
              },
              {
                id:4,
                name:"SubConsulta 2",
                url:"url"
              },
              {
                id:5,
                name:"SubConsulta 3",
                url:"url"
              },
              {
                id:6,
                name:"SubConsulta 4",
                url:"url"
              },
              {
                id:7,
                name:"SubConsulta 5",
                url:"url"
              }
            ]
          },
          {
            id:8,
            name:"Financiera",
            url:"url"
          },
          {
          id:9,
          name:"Otra",
          data: 
            [
              {
                id:10,
                name:"SubConsulta 1",
                url:"url"
              },
              {
                id:11,
                name:"SubConsulta 2",
                url:"url"
              },
              {
                id:12,
                name:"SubConsulta 3",
                url:"url"
              }
            ]
          },
        ]
      }
    ]
  }

  getOtrosMenus(){
    this.dashboard = [
      {
        id:1,
        name:"Consulta",
        description:"",
        url:""
      }
    ]

    this.notificaciones = [
      {
        id:51,
        name:"Notificaciones y alertas",
        url:""
      }
    ]

    this.redesSociales = [
      {
        id:56,
        name:"Redes Sociales",
        url:""
      }
    ]

    this.perfiles = [
      {
        id:17,
        name:"Programas",
        url:""
      },
      {
        id:19,
        name:"Datos personales",
        url:""
      },
      {
        id:20,
        name:"Perfil",
        url:""
      },
      {
        id:31,
        name:"Actualización de datos",
        url:""
      }
    ]
  }




}


