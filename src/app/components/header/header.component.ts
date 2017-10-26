import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() language:EventEmitter<string> = new EventEmitter<string>();
  
  ngOnInit() {
    console.log(this.usuario)
    document.getElementById('estilos')['href']=`../assets/css/estilos${this.usuario}.css`
    document.getElementById('logo')['src']=`../assets/img/logo_header${this.usuario}.png`
    //document.getElementById('logoFooter')['src']=`../assets/img/logo_footer${this.usuario}.png`
  }

  public usuario: string = ''

  constructor() { 
    this.usuario = localStorage.getItem('usuario')
  }

  switchLanguage(language: string) {
    this.language.emit(language)
    // let codUniversidad:number = this.getCodUniversidad()
    // var lenguaje:any = {
    //   nombreUsuario:this.usuario,
    //   codigoBanner:codUniversidad,
    //   codigoIdioma:language
    // }
    // console.log('objIdioma',lenguaje)
    //   this.adminService.updateIdioma(lenguaje,'http://10.75.8.109/PEServices/api/Usuario/Idioma/').subscribe(lan=>{
    //     console.log('language',lan)
        
    //   })
  }

  // getCodUniversidad(){
  //   let codUniversidad:number
  //   switch (this.usuario) {
  //     case 'AA':
  //       codUniversidad = 1
  //       break;
  //     case 'Poli':
  //       codUniversidad = 2
  //       break
  //     default:
  //       codUniversidad = 3
  //       break;
  //   }
  //   return codUniversidad
  // }
  
  
}