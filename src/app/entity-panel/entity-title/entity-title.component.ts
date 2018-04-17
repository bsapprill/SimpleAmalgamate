import { Component, OnInit, Input, HostListener, HostBinding, ElementRef, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { EntityDataService } from '../entity-data/entity-data.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityUpdateService } from '../entity-update.service';
import { EntityData } from '../entity-data/entity-data.model';

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

    this.EDS.ActiveEntityTransposed.subscribe((data: any) => {
      this.EUS.setElementValue(this.titleInput, data.title);
    });
  }

  ngOnDestroy(){
    this.entitySubscription.unsubscribe();
  }
  
}
