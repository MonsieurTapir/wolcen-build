import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { PassiveTreeNode } from 'src/app/models/skill-tree/passive-tree-node';
import { SkillEIM } from 'src/app/models/skill-tree/skill-eim';
import { EimFormatterPipe } from 'src/app/pipes/eim-formatter.pipe';
import { EIMSemantic } from 'src/app/models/skill-tree/eimsemantic';

@Component({
  selector: 'app-eim-viewer',
  templateUrl: './eim-viewer.component.html',
  styleUrls: ['./eim-viewer.component.scss']
})
export class EimViewerComponent implements OnChanges{

  @Input() selectedSkills : [];
  @Input()  skills:{};
  displayed  = [];
  eims = new Map<string, SkillEIM>();
  eimUsage = new Map<string,number>();
  eimsKeys = [];
  eimFormatter = new EimFormatterPipe();
  constructor() { }

  ngOnChanges(changes:SimpleChanges):void{
    if(changes['selectedSkills'] && changes['selectedSkills'].previousValue){
      if(changes['selectedSkills'].previousValue.length > changes['selectedSkills'].currentValue.length){
        var removed : string =  changes['selectedSkills'].previousValue.filter(x=>!changes['selectedSkills'].currentValue.includes(x));
        this.removeEims(this.skills[removed])
      }else{
        var added : string = changes['selectedSkills'].currentValue.slice(-1);
        this.addEims(this.skills[added])
      }
      this.renderEims();
    }
    if(changes['skills'] && this.skills){
      this.initEims()
    }
  }
  renderEims(){
    this.displayed = new Array();
    this.eimsKeys.forEach((it) =>{
      if(this.eimUsage[it]>0){
        this.displayed.push(this.eimFormatter.transform(this.eims[it]));
      }
    })
  }
  isUsed(eim : string){
    return this.eimUsage[eim]>0;
  }
  trackByUsage(index, item: string){
    return item
  }

  initEims(){
    Object.keys(this.skills).forEach((key)=>{
      const skill = this.skills[key] as PassiveTreeNode;
      skill.eim.forEach((eim : SkillEIM)=>{
      if(this.eimsKeys.indexOf(eim.name)<0)
        this.eimsKeys.push(eim.name);
      this.eimUsage[eim.name] = 0;
      this.eims[eim.name] = new SkillEIM(eim.desc,eim.name,eim.semantics);
      })
    })
  }
  addEims( skill : PassiveTreeNode){
    skill.eim.forEach((eim)=>{
      eim.semantics.forEach((element,index) => {
        this.eims[eim.name].semantics[index].value += element.value;
        console.log(this.eims[eim.name].semantics[index].value)
        this.eimUsage[eim.name]+=1;
      });
    })
  }
  removeEims( skill : PassiveTreeNode){
    skill.eim.forEach((eim)=>{
      eim.semantics.forEach((element,index) => {
        this.eims[eim.name].semantics[index].value -= element.value;
        this.eimUsage[eim.name]-=1;
      });
    })
  }
}
