import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { PassiveTreeNode } from 'src/app/models/skill-tree/passive-tree-node';

@Component({
  selector: 'app-eim-viewer',
  templateUrl: './eim-viewer.component.html',
  styleUrls: ['./eim-viewer.component.scss']
})
export class EimViewerComponent implements OnChanges {

  @Input() selectedSkills;
  private skills;
  eimsDesc = {};
  eimsValues = {};
  eimsKeys = [];
  constructor() { }

  ngOnChanges():void{

  }

  addEims( skill : PassiveTreeNode){
    skill.eim.forEach((eim)=>{
      eim.semantics.forEach((element,index) => {
        this.eimsValues[eim.name][index] += element.value;
        console.log(this.eimsValues[eim.name][index]);
      });
    })
  }
  initSkills(skills: {}){
    this.skills = skills;
    Object.entries(this.skills).forEach((keyval)=>{
      let skill = keyval[1] as PassiveTreeNode;
      skill.eim.forEach((it)=>{
        this.eimsValues[it.name] = new Array<number>(it.semantics.length)
        this.eimsDesc[it.name] = it.desc
        if(this.eimsKeys.indexOf(it.name)<0){
          this.eimsKeys.push(it.name)
        }
        it.semantics.forEach((sem,index)=>{
          this.eimsValues[it.name][index] = 0;
        })
      })
    })
  }

}
