import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from "../../models/user";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() language:EventEmitter<string> = new EventEmitter<string>();
  @Input('strLanguage') strLanguage:string
  public user:User
  
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    document.getElementById('estilos')['href']=`../assets/css/estilos${this.user.university}.css`
    document.getElementById('logo')['src']=`../assets/img/logo_header${this.user.university}.png`
    // document.getElementById('logoFooter')['src']=`../assets/img/logo_footer${this.user.university}.png`
  }

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  switchLanguage(language: string) {
    this.language.emit(language)
  }
  
  
}