import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
      value = value+"";
      
      value = value.split('T');
      let dia = value[0];
      let hora = value[1];
      
      dia = dia.split('-');
      dia = dia[2]+"/"+dia[1]+"/"+dia[0];
      
      hora = hora.replace('Z', '');
      
      return dia+" "+hora
  }

}
