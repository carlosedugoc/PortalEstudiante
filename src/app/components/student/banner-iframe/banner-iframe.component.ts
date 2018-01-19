import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GlobalService } from "../../../app.services";
import { IBreadcrumb } from "../../../app.models";

@Component({
  selector: 'app-banner-iframe',
  templateUrl: './banner-iframe.component.html'
})
export class BannerIframeComponent implements OnInit {
  public url: string
  public servicio: string

  constructor(private route: ActivatedRoute, private global:GlobalService) {
    this.route.params.subscribe((parametros) => {
      console.log(parametros['id'])
      this.servicio = parametros['id']
      this.url = sessionStorage.getItem('url')
      if (this.url.includes('Url') || this.url.includes('No Aplica')) {
        this.url = `http://10.75.8.119:8085/banner/bannerService.html?serv=${this.servicio}`
      }
    })

    this.global.breadcrumb$.subscribe((breadcrumb: IBreadcrumb[]) => {
      console.log ('este es el breadcrumb', breadcrumb)
    })


  }

  ngOnInit() {
  }

}
