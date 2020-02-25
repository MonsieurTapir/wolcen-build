import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-eim-list-entry',
  templateUrl: './eim-list-entry.component.html',
  styleUrls: ['./eim-list-entry.component.scss']
})
export class EimListEntryComponent implements OnInit {
  @Input() desc : string | undefined;
  @Input() values : number[];
  @Input() value : number;
  constructor() { }

  ngOnInit(): void {
  }

}
