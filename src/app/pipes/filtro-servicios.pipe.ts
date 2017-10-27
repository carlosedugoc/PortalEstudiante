import { Pipe, PipeTransform } from '@angular/core';
import { Servicio } from "../models/servicio";

@Pipe({
  name: 'filtroServicios'
})
export class FiltroServiciosPipe implements PipeTransform {

  transform(value: Servicio[], tipoConsulta: number): any {
    if (!value){ return }
    let filtro:Servicio[] = []
    for(let servicio of value){
      if(servicio.categoryId == tipoConsulta){
        filtro.push(servicio)
      }
    }
    return filtro;
  }

}
