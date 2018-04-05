import { Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding, Input 
} from '@angular/core';

@Directive({
  selector: '[appEntityData]'
})
export class EntityDataDirective implements OnInit{

  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private eR: ElementRef,
              private renderer: Renderer2) 
  { }
    
  ngOnInit(){

  }
  
  @HostListener('mouseenter') mouseover(eventData: Event){
    this.backgroundColor = this.highlightColor;   
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
    this.backgroundColor = this.defaultColor;
  }
}
