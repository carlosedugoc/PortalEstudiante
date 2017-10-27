import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() language:EventEmitter<string> = new EventEmitter<string>();
  @Input('strLanguage') strLanguage:string
  
  ngOnInit() {
    console.log(this.usuario)
    document.getElementById('estilos')['href']=`../assets/css/estilos${this.usuario}.css`
    document.getElementById('logo')['src']=`../assets/img/logo_header${this.usuario}.png`
    console.log('str', this.strLanguage)
    // document.getElementById('logoFooter')['src']=`../assets/img/logo_footer${this.usuario}.png`
  }

  public usuario: string = ''

  constructor() { 
    this.usuario = localStorage.getItem('usuario')
  }

  switchLanguage(language: string) {
    this.language.emit(language)
  }
  
  
}