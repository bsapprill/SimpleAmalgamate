import { Component, OnInit, Input, HostListener, HostBinding, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { EntityDataService } from '../entity-data/entity-data.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityData } from '../entity-data/entity-data.model';
import { EntityUpdateService } from '../entity-update.service';

@Component({
  selector: 'app-entity-title',
  templateUrl: './entity-title.component.html',
  styleUrls: ['./entity-title.component.css']
})
export class EntityTitleComponent implements OnInit, OnDestroy {

  entitySubscription = new Subscription();

  @ViewChild('titleInput') titleInput: ElementRef;

  @HostListener('keydown.enter' || 'keydown.tab') blurOnEnter(eventData: Event){
    this.EUS.blurInput(this.titleInput);
    this.EDS.ActiveEntityTitle.next(this.EUS.returnElementValue(this.titleInput));
  };

  constructor(private EDS: EntityDataService,
              private EUS: EntityUpdateService) { }

  ngOnInit() {
    this.EDS.subscribeTitleToDatabase();

    this.EDS.entityDoc.ref.get().then(doc => {
      
      this.EDS.activeEntityElement = doc.data();
      
      this.EUS.setElementValue(this.titleInput,
                               this.EDS.activeEntityElement.title);

    });

    this.EDS.ActiveEntityTransposed.subscribe((data: EntityData) => {
      this.EUS.setElementValue(this.titleInput, data.title);
    });
  }

  ngOnDestroy(){
    this.entitySubscription.unsubscribe();
  }
  
}
