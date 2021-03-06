import { PassiveTreeNode } from 'src/app/models/skill-tree/passive-tree-node';

  export class PSTUtils{

    getCircleSizeFactor(rarity: number){
      return [1,1.25,1.5][rarity]
    }
    getSubdivision(i : number, ringNb: number, distUnit: number){
      const ang = 2*Math.PI/(3*Math.pow(2,ringNb));
      const dist = distUnit*ringNb;
      const ret=`M ${Math.cos(i*ang)*dist} ${Math.sin(i*ang)*dist} L ${Math.cos(i*ang)*(distUnit+dist)} ${Math.sin(i*ang)*(distUnit+dist)}`;
      return ret;
    }
    getCoordsX(s : PassiveTreeNode, ring : number, rot: number, distUnit: number){
      const ang = s.angle;
      const pos = s.pos;
      const x = Math.cos((2*Math.PI/(3*Math.pow(2,ring)))*(rot+ang))*(ring+pos)*distUnit;
      return x;
    }
    getCoordsY(s : PassiveTreeNode, ring : number, rot: number, distUnit: number){
      const ang = s.angle;
      const pos = s.pos;
      const y = Math.sin((2*Math.PI/(3*Math.pow(2,ring)))*(rot+ang))*(ring+pos)*distUnit;
      return y;
    }
    getCoordsXFromAngPos(ang: number, pos:number, ring : number, rot: number, distUnit: number){
      const x = Math.cos((2*Math.PI/(3*Math.pow(2,ring)))*(rot+ang))*(ring+pos)*distUnit;
      return x;
    }
    getCoordsYFromAngPos(ang: number, pos:number, ring : number, rot: number, distUnit: number){
      const y = Math.sin((2*Math.PI/(3*Math.pow(2,ring)))*(rot+ang))*(ring+pos)*distUnit;
      return y;
    }

    getAngPosFromLitteral(s : string, inner: boolean){
      var ang = 0;
      var pos = 0;
      var mult = inner?1:0;
      if(s == "begin"){
        ang = 0.5;
        pos = 0;
      } else if(s == "leftUp"){
        ang = 0.25;
        pos = 1;
      } else if(s == "rightUp"){
        ang = 0.75;
        pos = 1;
      } else if (s== "endLeft"){
        ang = 0;
        pos = 0.74 + mult*0.04;
      }else if (s== "endRight"){
        ang = 1;
        pos = 0.74 + mult*0.04;
      } else if(s == "leftDown"){
        ang = 0;
        pos = 0.503;
      } else if(s == "rightDown"){
        ang = 1;
        pos = 0.503;
      }

      return {ang:ang,pos:pos}
    }

    getCoords(s : PassiveTreeNode, ring : number, rot: number, distUnit: number){
      return{"x":this.getCoordsX(s,ring,rot, distUnit), "y":this.getCoordsY(s,ring,rot, distUnit)}
    }
  }
