import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFaltantes'
})
export class FiltroFaltantesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
