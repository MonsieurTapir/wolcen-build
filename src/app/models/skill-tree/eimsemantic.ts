export class EIMSemantic {
  name: string;
  value: number = 0;
  descIndex: number;
  unit: string = "";
  constructor(otherName: string, otherDescIndex : number, otherUnit:string){
    this.name = otherName;
    this.descIndex = otherDescIndex;
    this.unit = otherUnit;
  }
}
