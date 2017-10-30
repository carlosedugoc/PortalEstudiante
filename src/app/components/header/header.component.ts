import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";
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
    document.getElementById('logo')['src']=`../assets/img/logo_header${this.user.university}.png`
    // document.getElementById('logoFooter')['src']=`../assets/img/logo_footer${this.user.university}.png`
  }

  constructor(private router:Router) { 
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  switchLanguage(language: string) {
    this.language.emit(language)
  }

  signOut(){
    sessionStorage.clear()
    this.router.navigate(['/'])
  }
  
  
}