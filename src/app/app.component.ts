import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { AdministracionService } from "./services/administracion.service";
import { User } from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css'],
  providers: [AdministracionService]
})
export class AppComponent {
  public logued:boolean
  public language:string
  public user:User
  public users:User[]

  constructor(private router:Router,private translate: TranslateService,private adminService:AdministracionService){
    let lan = window.navigator.language.substr(0,2)
    this.language = lan
    this.translate.setDefaultLang(lan);
    this.getUsuarios()
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
    localStorage.setItem('usuario',user)
    this.user=this.users.find(item => item.userId == user)
    console.log('usuar',this.user)
    this.setLanguage(this.language,this.user.userId,this.user.university)

    if (this.user.rol != "2" ){
      this.router.navigate(['administrador'])
    }else{
      this.router.navigate(['estudiante'])
    }
  }

  setLanguage(language:string,user:string,university:string){
    let url:string = `http://10.75.8.109/PEServices`
    this.adminService.getLanguage(language,user,university,url).subscribe(lan=>{
      console.log('devuelto',lan)
      this.language = lan
      console.log('devuelto2',this.language)
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
      console.log(lan)
      this.language = lan
    })
  }

}


