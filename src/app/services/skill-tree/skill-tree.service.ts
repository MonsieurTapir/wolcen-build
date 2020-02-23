import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {PassiveTree} from '../../models/skill-tree/passive-tree'
@Injectable({
  providedIn: 'root'
})
export class SkillTreeService {
  private pstUrl: string;
  constructor(private http: HttpClient) {
    this.pstUrl = './assets/tree.json';
  }
  public getTree(): Observable<PassiveTree> {
    return this.http.get<PassiveTree>(this.pstUrl);
  }
}
