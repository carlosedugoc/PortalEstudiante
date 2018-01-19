import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from "../../../app.services";
import { IBreadcrumb } from "../../../app.models";

declare var mainNavToogle: any

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  public servicio: string
  public mostrar: boolean = false

  public breadcrumbs: IBreadcrumb[];

  /**
   * @class DetailComponent
   * @constructor
   */
  constructor(
    private router: Router,
    private global: GlobalService
  ) {

    this.servicio = "Servicio"
    this.breadcrumbs = [];

    this.global.breadcrumb$.subscribe((breadcrumb: IBreadcrumb[]) => {
      console.log('este es el breadcrumb', breadcrumb)
      this.mostrar = false
      this.breadcrumbs = breadcrumb
      if (this.breadcrumbs.length > 0) {
        this.mostrar = true
      }
      setTimeout(() => {
        mainNavToogle()
      }, 1000);
    })
  }

}
