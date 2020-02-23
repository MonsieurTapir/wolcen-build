import { Component, OnInit, Input} from '@angular/core';
import { PassiveTreeNode } from 'src/app/models/skill-tree/passive-tree-node';
import { PassiveCategories } from 'src/app/models/skill-tree/passive-categories.enum';

@Component({
  selector: 'skill-tooltip',
  templateUrl: './skill-tooltip.component.html',
  styleUrls: ['./skill-tooltip.component.scss']
})
export class SkillTooltipComponent implements OnInit{
  @Input() skill: PassiveTreeNode;
  @Input() treeName: string;
  PassiveCategory = PassiveCategories;
  display = false;
  posLeft: number;
  posTop: number;
  height: number;
  width: number;
  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplay(){
    this.display = !this.display;
  }
  setPosition(x:number, y:number){
    this.posLeft = x;
    this.posTop = y;
    if(this.posTop + this.height > window.innerHeight)
      this.posTop -= this.height;
  }

}
