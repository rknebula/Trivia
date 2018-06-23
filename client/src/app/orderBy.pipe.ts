import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderByScore'})
export class orderByScore implements PipeTransform {
    transform(array: Array<any>, args) {
        if (!args[0]) {
            return array;
        } else if (array) {
            for (let i = 0; i < array.length; i++) {
                console.log("yay");//incomplete
            }
        }
    }
}
