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
  skills : {};

  private subscriptions : Subscription[] = [];
  constructor(private skillService : SkillTreeService) { }
  addSkill(skill : string){
    var newArr = [].concat(this.skillsSelected)
    newArr.push(skill);
    this.skillsSelected=newArr;
  }

  removeSkill(skill : string){

    var newArr = [].concat(this.skillsSelected)
    newArr.forEach((it,i) =>{
      if(it === skill)
        newArr.splice(i,1);
        return;
    })
    this.skillsSelected=newArr;
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.skillService.getSkills().subscribe(
        (value) =>{
          this.skills = value;
        }
      )
    )
  }

}
