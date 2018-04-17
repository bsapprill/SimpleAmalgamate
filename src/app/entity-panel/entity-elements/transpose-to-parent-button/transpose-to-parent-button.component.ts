import { Component, OnInit, HostListener, Input, HostBinding, Output } from '@angular/core';
import { EntityDataService } from '../../entity-data/entity-data.service';

@Component({
  selector: 'app-transpose-to-parent-button',
  templateUrl: './transpose-to-parent-button.component.html',
  styleUrls: ['./transpose-to-parent-button.component.css']
})
export class TransposeToParentButtonComponent implements OnInit {

  constructor(private EDS: EntityDataService) { }

  ngOnInit() {
    
  }

  @HostListener('click') userTransposesToParent(){
    
    this.EDS.userTransposesToParent();

  }
}
