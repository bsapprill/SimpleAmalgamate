import { EntityData } from "./entity-data.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs";
import { AngularFirestore,
         AngularFirestoreCollection,
         AngularFirestoreDocument } from "angularfire2/firestore";
import { QuerySnapshot, DocumentData } from "@firebase/firestore-types";
import { query } from "@angular/core/src/animation/dsl";
import { TitleAtDocument } from "./title-at-doc.model";
import { EDSData } from "./EDS-data.model";
import { EntityUpdateService } from "../entity-update.service";

@Injectable()
export class EntityDataService{
    
    activeEntityElement: any;
    //This is actually an 'EntityData' type, but must use 'any' due to bug

    activeEntityId: number = 0;
    
    focusedChildId: number;

    entityDoc: AngularFirestoreDocument<EntityData>;
    entityCollection: AngularFirestoreCollection<EntityData>;
    dataDoc: AngularFirestoreDocument<EDSData>;
    
    ActiveEntityTitle = new Subject<string>();
    ActiveEntityElements = new Subject<number[]>();
    ActiveEntityStorm = new Subject<string>();

    ActiveEntityTransposed = new Subject<DocumentData>();

    ActiveEntityHasParent = new Subject<boolean>();

    activeChildChanges = new Subject<string>();
    
    newDocumentIds: number[] = [];
    nextDocumentId: number;

    constructor(private db: AngularFirestore,
                private EUS: EntityUpdateService){
        
        this.entityCollection = db.collection<EntityData>('Entities');
        this.entityDoc = this.entityCollection.doc(this.activeEntityId.toString());        
        this.dataDoc = db.collection<EDSData>('Data').doc('EDS');

        this.dataDoc.ref.get().then(doc => {
           this.newDocumentIds = doc.data().newDocumentIds;
           this.nextDocumentId = doc.data().newIdCountHolder;
        });

        this.activeChildChanges.subscribe((newTitle: string) => {
            this.entityCollection.doc(this.focusedChildId.toString())
            .update({title: newTitle});
        });
    }    
    
    userAddsNewChild(){

        this.entityDoc.ref.get().then(doc => {

            var newIds = this.activeEntityElement.childIds;
            var nextId;

            if(this.newDocumentIds.length !== 0){
                nextId = this.newDocumentIds.shift();
                newIds.push(nextId);
                this.dataDoc.update({ newDocumentIds: this.newDocumentIds });
            }else{
                nextId = this.nextDocumentId;
                newIds.push(nextId);
                this.nextDocumentId++;
                this.dataDoc.update( { newIdCountHolder: this.nextDocumentId } );
            }
            
            this.entityDoc.update({ childIds: newIds });
            
            this.ActiveEntityElements.next(newIds);
            
            this.entityCollection.doc(nextId.toString())
            .set({
                childIds: [],
                id: nextId,
                parentId: this.activeEntityId,
                stormText: "",
                title: ""
            });
            
        });
        
    }

    userTransposesChildElement(id: number){   
             
        this.getDocAtId(id).then(doc=> {
            
            this.activeEntityElement = doc.data();
            this.activeEntityId = id;
            this.entityDoc = this.entityCollection.doc(id.toString());

            this.ActiveEntityTransposed.next(doc.data());
            
            this.ActiveEntityHasParent.next(true);
        });

    }

    userTransposesToParent(){

        this.entityDoc.ref.get().then(doc => {
            this.getDocAtId(doc.data().parentId).then(parentDoc => {

                this.activeEntityId = parentDoc.data().id;
                this.activeEntityElement = parentDoc.data();
                this.entityDoc = this.entityCollection.doc(this.activeEntityId.toString());
                this.ActiveEntityTransposed.next(parentDoc.data());

                if(this.activeEntityElement.parentId === -1){
                    this.ActiveEntityHasParent.next(false);
                }

            });
            

        });
    }

    userRemovesChildElement(id: number){
                
        this.entityDoc.ref.get().then(doc => {
            var newIds = this.activeEntityElement.childIds;
            var idToRemove = newIds.filter(item => item === id);

            this.newDocumentIds.push(idToRemove[0]);
            
            this.dataDoc.update( { newDocumentIds: this.newDocumentIds });

            newIds = newIds.filter(item => item !== id);

            this.entityDoc.update( { childIds: newIds });

            this.activeEntityElement.childIds = newIds;

            this.ActiveEntityElements.next(newIds);
            
            this.entityCollection.doc(id.toString()).delete();
        });
        
    }

    getDocAtId(id: number){
        return this.entityCollection.doc(id.toString()).ref.get();
    }

    subscribeTitleToDatabase(){
        this.ActiveEntityTitle.subscribe((newTitle: string) => {                                  
            this.entityDoc.update({ title: newTitle });
        });
    }
    
    subscribeEntityIdsToDatabase(){
        this.ActiveEntityElements.subscribe((newIds: number[]) => {
            this.entityDoc.update({ childIds: newIds });
        });
    }
    
    subscribeStormToDatabase(){
        this.ActiveEntityStorm.subscribe((newStorm: string) => {                                  
            this.entityDoc.update({ stormText: newStorm });
        });
    }    
}
