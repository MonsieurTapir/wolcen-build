import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eimFormatter'
})
export class EimFormatterPipe implements PipeTransform {

  transform(description: string, values: number[]): unknown {
    var ret = description.replace(/(\%([0-9]))/, (str: string, match1, match2)=>{
      return values[match2-1].toString();
    });
    console.log(`${ret} ${values}`)
    return ret
  }

}
