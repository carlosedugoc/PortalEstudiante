import { Component, Input } from '@angular/core';
import { User, Menu } from "../../../app.models";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
 @Input('user') user:User
}
