import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { Menu } from "../../models/menu/menu";
import { User } from "../../models/user";


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements AfterViewInit, OnInit {

  ngOnInit() {
  }

  @Input('menu') menu:Menu[]
  @Input('perfil') perfil:Menu[]
  public user:User

  constructor(){
    debugger;
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  //quita los divs del acordion para que se colapse
  ngAfterViewInit() {
    setTimeout(function () {
      var pTags = $("*[id='wrap']");
      console.log('ptags',pTags)
      pTags.unwrap();
    }, 2000);
  }

}


