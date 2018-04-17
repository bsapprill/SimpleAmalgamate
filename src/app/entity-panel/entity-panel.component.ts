import { Component, OnInit } from '@angular/core';
import { EntityDataService } from './entity-data/entity-data.service';
import { EntityData } from './entity-data/entity-data.model';

@Component({
  selector: 'app-entity-panel',
  templateUrl: './entity-panel.component.html',
  styleUrls: ['./entity-panel.component.css']
})
export class EntityPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 
  }

}
