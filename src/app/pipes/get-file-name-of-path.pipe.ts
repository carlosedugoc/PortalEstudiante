import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFileNameOfPath',
  pure: false
})
export class GetFileNameOfPathPipe implements PipeTransform {

  transform(value: any): string {
    if (value != undefined && value != "") {
      return value.split('\\').pop().split('/').pop();
    }
    else {
      return value
    }

  }

}
