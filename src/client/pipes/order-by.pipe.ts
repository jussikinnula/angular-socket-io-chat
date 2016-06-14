import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    /**
     * Transform
     *
     * @class OrderByPipe
     * @method transform
     * @param input any
     * @param orderer string
     * @param reverse boolean
     * @return any
     */
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

    /**
     * Dynamic sort array of objects based on property
     *
     * @class OrderByPipe
     * @method dynamicSort
     * @param property string
     * @return any
     */
    private dynamicSort(property: string): any {
        return (a: any, b: any) => {
            return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        }
    }
}