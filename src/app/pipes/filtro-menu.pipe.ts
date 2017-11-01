import { Pipe, PipeTransform } from '@angular/core';
import { TipoMenu } from "../models/menu/tipomenu";
import { Menu } from "../models/menu/menu";

@Pipe({
  name: 'filtroMenu'
})
export class FiltroMenuPipe implements PipeTransform {

  transform(value: TipoMenu[], tipoMenu:number): Menu[] {
    if (!value){ return }
    return value.find(item=>item.id == tipoMenu).options
  }

}
