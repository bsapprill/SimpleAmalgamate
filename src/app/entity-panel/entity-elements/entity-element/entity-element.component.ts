import { Component, OnInit, ViewChild, ElementRef, Input, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { EntityElementsService } from '../entity-elements.service';
import { EntityDataService } from '../../entity-data/entity-data.service';
import { EntityUpdateService } from '../../entity-update.service';
import { EntityData } from '../../entity-data/entity-data.model';

@Component({
  selector: 'app-entity-element',
  templateUrl: './entity-element.component.html',
  styleUrls: ['./entity-element.component.css']
})
export class EntityElementComponent implements OnInit {

  @Input() id: number;

  @ViewChild('elementNameInput') elementNameInput: ElementRef;

  @ViewChild('transposeButton') transposeButtonRef: ElementRef;
  @ViewChild('removeElementButton') removeElementButtonRef: ElementRef;
  
  @HostListener('keydown.enter' || 'keydown.tab') blurOnKeys(eventData: Event){
    this.EUS.blurInput(this.elementNameInput);
    this.EDS.activeChildChanges.next(this.EUS.returnElementValue(this.elementNameInput));
    
  };

  @HostListener('onClick') effectOnClick(eventData: Event){
    console.log(this.removeElementButtonRef.nativeElement);
  }

  constructor(private EES: EntityElementsService,
              private EDS: EntityDataService,
              private EUS: EntityUpdateService,
              private renderer: Renderer2) { }
  
  ngOnInit() {   
    this.EDS.getDocAtId(this.id).then(doc => {

      this.EUS.setElementValue(this.elementNameInput, doc.data().title);

    });
  }

  onFocus(){
    this.EDS.focusedChildId = this.id;
  }

  userTransposesElement(){
    this.EDS.userTransposesChildElement(this.id); 
  }

  userRemovesElement(){
    this.EDS.userRemovesChildElement(this.id);
  }

}
