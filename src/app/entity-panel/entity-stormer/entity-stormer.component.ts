import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { EntityDataService } from '../entity-data/entity-data.service';
import { EntityUpdateService } from '../entity-update.service';
import { EntityData } from '../entity-data/entity-data.model';

@Component({
  selector: 'app-entity-stormer',
  templateUrl: './entity-stormer.component.html',
  styleUrls: ['./entity-stormer.component.css']
})
export class EntityStormerComponent implements OnInit {

  @ViewChild('stormInput') stormInput: ElementRef;

  @HostListener('keydown.enter' || 'keydown.tab') blurOnEnter(eventData: Event){
    this.EUS.blurInput(this.stormInput);
    this.EDS.ActiveEntityStorm.next(this.EUS.returnElementValue(this.stormInput));
  };

  constructor(private EDS: EntityDataService,
              private EUS: EntityUpdateService) { }

  ngOnInit() {
    
    this.EDS.subscribeStormToDatabase();

    this.EDS.ActiveEntityTransposed.subscribe((data: any) => {
      this.EUS.setElementValue(this.stormInput, data.stormText);
    });
  }

}
