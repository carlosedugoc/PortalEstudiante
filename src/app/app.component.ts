import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public logued:boolean
  constructor(private router:Router){

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

}


