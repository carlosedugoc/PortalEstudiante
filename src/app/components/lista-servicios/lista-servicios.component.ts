import { Component, Input, OnChanges } from '@angular/core';
import { Servicio } from "../../models/servicio";
import { AdministracionService } from "../../services/administracion.service";

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html'
})
export class ListaServiciosComponent {
  @Input('total_modalidades') total_modalidades: number
  @Input('total_niveles') total_niveles:number
  @Input('total_estados') total_estados:number
  @Input('servicios') servicios:Servicio[]
  @Input('tipos') tipos:any[]

  constructor(private adminService:AdministracionService) { console.log('lista',this.servicios) }
  
    updateItem(id:number,estado:boolean){
      var servicios:any
      servicios = localStorage.getItem('servicios')
      console.log(JSON.parse(servicios))
  
      this.adminService.actualizaItem({id:id,status:estado},JSON.parse(servicios).UrlApiRest).subscribe(data =>{
        console.log('Item actualizado con éxito')
      })
    }
  
    updateServicio(idServicio:number, campo:string, valor:any ){
      console.log(idServicio,campo,valor)
      var servicios:any = localStorage.getItem('servicios')
      var url:string = `${ JSON.parse(servicios).UrlApiRest}/api/UniversityService/${campo}`
      this.adminService.actualizarServicio({id:idServicio,status:valor},url).subscribe(data=>{
        console.log('Servicio actualizado con éxito')
      })
    }
  
    ModificarTodos(estado:boolean, idx:number){
      console.log(estado,idx)
  
      for(let dato of this.servicios[idx].data){
        dato.status = estado
        this.updateItem(dato.id,estado)
      }
    }

}
