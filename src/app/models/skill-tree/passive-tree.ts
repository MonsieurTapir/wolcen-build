import { PassiveTreeGroup } from "./passive-tree-group";

export class PassiveTree {
  innerRing: PassiveTreeGroup[];
  midRing: PassiveTreeGroup[];
  outerRing: PassiveTreeGroup[];
  constructor(){
    this.innerRing = [];
    this.midRing = [];
    this.outerRing = [];
  }
}
