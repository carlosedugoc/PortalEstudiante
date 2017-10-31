import { Component, AfterViewInit, Input } from '@angular/core';
import { Menu } from "../../models/menu/menu";
import { User } from "../../models/user";

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements AfterViewInit {
  
  @Input('menu') menu:Menu[]
  public user:User

  constructor(){
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }

  //quita los divs del acordion para que se colapse
  ngAfterViewInit() {
    var pTags = $("*[id='wrap']");
    pTags.unwrap();
  }

}


