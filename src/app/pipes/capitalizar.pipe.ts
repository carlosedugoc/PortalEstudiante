import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizar'
})
export class CapitalizarPipe implements PipeTransform {

  transform(value: string, todas:boolean = true ): string {
    
        value = value.toLowerCase();
    
        let titulo = value.split(" ");
    
        if( todas ){
          for( let i in titulo ){
              titulo[i] = titulo[i][0].toUpperCase() + titulo[i].substr(1);
          }
        }else{
          titulo[0] = titulo[0][0].toUpperCase() + titulo[0].substr(1).toLowerCase();
        }
        return titulo.join(" ");
      }

}
