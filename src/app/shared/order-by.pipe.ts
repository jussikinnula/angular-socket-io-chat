import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(input: any, orderer: string, reverse: boolean = false): any {
    if (input && orderer) {
      let output = input.sort(this.dynamicSort(orderer));
      if (reverse) {
        return output.reverse();
      } else {
        return output;
      }
    } else {
      return input;
    }
  }

  private dynamicSort(property: string): any {
    return (a: any, b: any) => {
      return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
  }
}