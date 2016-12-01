import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

    transform(value:String) {
        console.log("Pipe Running", value);
        let output = "";
        if (value) {
            value = value.toLowerCase();
            let split = value.split(" ");
            for (let word of split) {
                word = word.charAt(0).toUpperCase() + word.slice(1) + " ";
                output = output + word;
            }
            output = output.slice(0, (output.length - 1));
        }
        return output;
    }

}