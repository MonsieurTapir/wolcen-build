import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ring-selector',
  templateUrl: './ring-selector.component.html',
  styleUrls: ['./ring-selector.component.scss']
})
export class RingSelectorComponent implements OnInit {
  selected : number = 0;
  @Output() hasSelected = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  setSelected(x : number){
    this.selected = x;
    this.hasSelected.emit(this.selected)
  }

}
