import { ElementRef } from "@angular/core";

export class EntityUpdateService{
 
    blurInput(input: ElementRef){
        input.nativeElement.blur();
    }
    
    returnElementValue(input: ElementRef){
        return input.nativeElement.value;
    }

    setElementValue(input: ElementRef, value: string){
        input.nativeElement.value = value;
    }
    
    setEntityValues(){

    }
}