import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {PassiveTree} from '../../models/skill-tree/passive-tree'
import { PassiveTreeNode } from 'src/app/models/skill-tree/passive-tree-node';
@Injectable({
  providedIn: 'root'
})
export class SkillTreeService {
  private pstUrl: string;
  private skillsUrl: string;
  constructor(private http: HttpClient) {
    this.pstUrl = './assets/tree.json';
    this.skillsUrl = './assets/passives.json';
  }
  public getTree(): Observable<PassiveTree> {
    return this.http.get<PassiveTree>(this.pstUrl);
  }
  public getSkills(): Observable<{string:PassiveTreeNode}>{
    return this.http.get<{string:PassiveTreeNode}>(this.skillsUrl);
  }
}
