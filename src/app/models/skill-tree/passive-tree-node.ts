import { PassiveCategories } from "./passive-categories.enum";
import { SkillEIM } from "./skill-eim";

export class PassiveTreeNode {
  name: string;
  uiName: string;
  lore: string;
  pos: number;
  angle: number;
  rarity: number;
  category: PassiveCategories;
  eim: SkillEIM[];
  edgesTo: string[];
}
