import { Pipe, PipeTransform } from '@angular/core';
import { SkillEIM } from '../models/skill-tree/skill-eim';
import { EIMSemantic } from '../models/skill-tree/eimsemantic';

@Pipe({
  name: 'eimFormatter'
})
export class EimFormatterPipe implements PipeTransform {

  transform(eim: SkillEIM): string {
    const description = eim.desc;
    const values : number[] = eim.semantics.map((it)=>{
      const sem = it as EIMSemantic;
      return sem.value;
    }
    );
    const unit : string[] = eim.semantics.map((it)=>{
      return it.unit;
    }
    );
    var ret = description.replace(/(\%([0-9]))/g, (str: string, match1, match2)=>{
      if(match2 <= values.length)
        return values[match2-1].toString() + (unit[match2-1]?unit[match2-1]:"");
      else
        return "??"
    });
    return ret
  }

}
