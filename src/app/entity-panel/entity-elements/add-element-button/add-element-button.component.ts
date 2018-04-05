import { Component, OnInit, HostListener } from '@angular/core';
import { EntityElementsService } from '../entity-elements.service';
import { EntityDataService } from '../../entity-data/entity-data.service';

@Component({
  selector: 'app-add-element-button',
  templateUrl: './add-element-button.component.html',
  styleUrls: ['./add-element-button.component.css']
})
export class AddElementButtonComponent implements OnInit {

  constructor(private EDS: EntityDataService) { }

  ngOnInit() {
  }
  
  @HostListener('click') userAddsNewElement(){
    
    this.EDS.userAddsNewChild();

  }
  
}
