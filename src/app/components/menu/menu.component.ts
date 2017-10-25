import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, AfterViewInit {

  //quita los divs del acordion para que se colapse
  ngAfterViewInit() {
    var pTags = $("*[id='wrap']");
    pTags.unwrap();
  }

  public usuario: string = ""
  public menus:any[]

  constructor() {
    this.usuario = localStorage.getItem('usuario')
    if (this.usuario != ''){
      this.getMenu()
      this.menus = [this.menu]
    }
  }

  ngOnInit() {
    // let items:any
    // items = document.getElementById('divItem')
    // console.log(items)

    //   if ( pTags.parent().is( "div" ) ) {
    //     pTags.unwrap();
    //   } else {
    //     pTags.wrap( "<div></div>" );
    //   }
    // $("#wrap").unwrap() ;
  }

  public menu:any[]
  getMenu(){
    this.menu = [
      {
        id:1,
        Nombre:"Pagos",
        logo:"money",
        datos:
        [
          {
          id:2,
          Nombre:"Académica",
          datos: 
            [
              {
                id:3,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:4,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:5,
                Nombre:"SubConsulta 3",
                Url:"Url"
              },
              {
                id:6,
                Nombre:"SubConsulta 4",
                Url:"Url"
              },
              {
                id:7,
                Nombre:"SubConsulta 5",
                Url:"Url"
              }
            ]
          },
          {
            id:8,
            Nombre:"Financiera",
            Url:"Url"
          },
          {
          id:9,
          Nombre:"Otra",
          datos: 
            [
              {
                id:10,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:11,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:12,
                Nombre:"SubConsulta 3",
                Url:"Url"
              }
            ]
          },
        ]
      },
      {
        id:1,
        Nombre:"Consulta",
        logo:"commenting",
        datos:
        [
          {
          id:2,
          Nombre:"Académica",
          datos: 
            [
              {
                id:3,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:4,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:5,
                Nombre:"SubConsulta 3",
                Url:"Url"
              },
              {
                id:6,
                Nombre:"SubConsulta 4",
                Url:"Url"
              },
              {
                id:7,
                Nombre:"SubConsulta 5",
                Url:"Url"
              }
            ]
          },
          {
            id:8,
            Nombre:"Financiera",
            Url:"Url"
          },
          {
          id:9,
          Nombre:"Otra",
          datos: 
            [
              {
                id:10,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:11,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:12,
                Nombre:"SubConsulta 3",
                Url:"Url"
              }
            ]
          },
        ]
      },
      {
        id:1,
        Nombre:"Solicitud",
        logo:"send",
        datos:
        [
          {
          id:2,
          Nombre:"Académica",
          datos: 
            [
              {
                id:3,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:4,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:5,
                Nombre:"SubConsulta 3",
                Url:"Url"
              },
              {
                id:6,
                Nombre:"SubConsulta 4",
                Url:"Url"
              },
              {
                id:7,
                Nombre:"SubConsulta 5",
                Url:"Url"
              }
            ]
          },
          {
            id:8,
            Nombre:"Financiera",
            Url:"Url"
          },
          {
          id:9,
          Nombre:"Otra",
          datos: 
            [
              {
                id:10,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:11,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:12,
                Nombre:"SubConsulta 3",
                Url:"Url"
              }
            ]
          },
        ]
      },
      {
        id:1,
        Nombre:"Portales",
        logo:"laptop",
        datos:
        [
          {
          id:2,
          Nombre:"Académica",
          datos: 
            [
              {
                id:3,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:4,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:5,
                Nombre:"SubConsulta 3",
                Url:"Url"
              },
              {
                id:6,
                Nombre:"SubConsulta 4",
                Url:"Url"
              },
              {
                id:7,
                Nombre:"SubConsulta 5",
                Url:"Url"
              }
            ]
          },
          {
            id:8,
            Nombre:"Financiera",
            Url:"Url"
          },
          {
          id:9,
          Nombre:"Otra",
          datos: 
            [
              {
                id:10,
                Nombre:"SubConsulta 1",
                Url:"Url"
              },
              {
                id:11,
                Nombre:"SubConsulta 2",
                Url:"Url"
              },
              {
                id:12,
                Nombre:"SubConsulta 3",
                Url:"Url"
              }
            ]
          },
        ]
      }
    ]
  }
}


