import { Component, OnInit, ViewChild } from '@angular/core';
import { SkillTreeService } from 'src/app/services/skill-tree/skill-tree.service';
import { Subscription } from 'rxjs';
import { EimViewerComponent } from '../eim-viewer/eim-viewer.component';

@Component({
  selector: 'app-build-view',
  templateUrl: './build-view.component.html',
  styleUrls: ['./build-view.component.scss']
})
export class BuildViewComponent implements OnInit {
  skillsSelected : string[] = [];
  skills;

  @ViewChild('eim') eimViewer : EimViewerComponent;

  private subscriptions : Subscription[] = [];
  constructor(private skillService : SkillTreeService) { }
  addSkill(skill : string){
    this.skillsSelected.push(skill);
    this.eimViewer.addEims(this.skills[skill]);
  }

  removeSkill(skill : string){
    this.skillsSelected.forEach((it,i) =>{
      if(it == skill)
        this.skillsSelected.splice(i,1);
        return;
    })
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.skillService.getSkills().subscribe(
        (value) =>{
          this.skills = value;
          this.eimViewer.initSkills(this.skills);
        }
      )
    )
  }

}
