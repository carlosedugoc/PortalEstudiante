import { Component, Input } from '@angular/core';
import { Menu } from "../../models/menu/menu";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input('redes') redes:Menu[]

  constructor() { }

}
