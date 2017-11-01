import { Component, Input } from '@angular/core';
import { Menu } from "../../models/menu/menu";
import { User } from "../../models/user";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input('redes') redes: Menu[]
  @Input('user') user:User
}
