import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class EntityElementsService{
    
    constructor(private db: AngularFirestore){
        
    }

}
