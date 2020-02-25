import { EIMSemantic } from "./eimsemantic";

export class SkillEIM {
  desc: string;
  name: string;
  semantics: EIMSemantic[];
  constructor(desc: string, name: string, semantics: EIMSemantic[]){
    this.desc = desc;
    this.name = name;
    this.semantics = new Array<EIMSemantic>();
    semantics.forEach((sem)=>{
      const semcop : EIMSemantic = new EIMSemantic(sem.name,sem.descIndex,sem.unit);
      this.semantics.push(semcop);
    })
  }
}
