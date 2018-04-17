import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { EntityDataService } from '../entity-data/entity-data.service';
import { EntityElementsService } from './entity-elements.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { EntityUpdateService } from '../entity-update.service';
import { EntityData } from '../entity-data/entity-data.model';

@Component({
  selector: 'app-entity-elements',
  templateUrl: './entity-elements.component.html',
  styleUrls: ['./entity-elements.component.css']
})
export class EntityElementsComponent implements OnInit {

  entityIds: number[] = [];

  constructor(private EDS: EntityDataService,
              private EES: EntityElementsService,
              private EUS: EntityUpdateService) { }

  ngOnInit() {    
    this.EDS.subscribeEntityIdsToDatabase();

    this.EDS.ActiveEntityTransposed.subscribe( ( data: any ) => {
      
      this.entityIds = data.childIds.slice();
    });

  }
  
}
