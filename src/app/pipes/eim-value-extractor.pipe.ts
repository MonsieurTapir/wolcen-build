import { Pipe, PipeTransform } from '@angular/core';
import { PassiveTreeNode } from '../models/skill-tree/passive-tree-node';
import { SkillEIM } from '../models/skill-tree/skill-eim';

@Pipe({
  name: 'eimValueExtractor'
})
export class EimValueExtractorPipe implements PipeTransform {

  transform(eim: SkillEIM): number[] {
    return eim.semantics.map((it)=>{
      return it.value;
    }
    );
  }

}

@Pipe({
  name: 'eimUnitExtractor'
})
export class EimUnitExtractorPipe implements PipeTransform {

  transform(eim: SkillEIM): string[] {
    return eim.semantics.map((it)=>{
      return it.unit;
    }
    );
  }

}
