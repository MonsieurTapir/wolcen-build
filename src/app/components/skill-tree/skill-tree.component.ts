import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef, HostListener, AfterViewInit} from '@angular/core';
import { SkillTreeService } from 'src/app/services/skill-tree/skill-tree.service';
import { PassiveTree } from 'src/app/models/skill-tree/passive-tree';
import { SkillTooltipComponent } from '../skill-tooltip/skill-tooltip.component';
import {  PanZoomConfig, PanZoomAPI } from 'ng2-panzoom';
import { PassiveCategories } from 'src/app/models/skill-tree/passive-categories.enum';
import { PassiveTreeNode } from 'src/app/models/skill-tree/passive-tree-node';
import {style, animate,AnimationBuilder, AnimationPlayer} from '@angular/animations';
import { Subscription, fromEvent } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {PSTUtils} from './skill-tree.utils';
@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.scss'],
})
export class SkillTreeComponent implements OnInit, AfterViewInit {
  tree : PassiveTree = new PassiveTree();
  skills = {};
  highlighted = {};
  Math = Math;
  utils = new PSTUtils();
  panzoomConfig: PanZoomConfig;
  ctrlDisabled : boolean = false;
  private panZoomAPI: PanZoomAPI;
  private subscriptions: Subscription[] = [];

  @ViewChildren(SkillTooltipComponent) tooltips: QueryList<SkillTooltipComponent>;
  state: string = 'default';

  radians = [0,0,0];
  lastRadians = [0,0,0];
  searchedTerm : string;
  ringSelected = 0;
  @ViewChild('searchTree') searchBar: ElementRef;
  @ViewChildren('ring') rings: QueryList<ElementRef>;
  @ViewChildren('skill') skillNodes: QueryList<ElementRef>;
  @ViewChild('inner') innerRing: ElementRef;
  @ViewChild('mid') midRing: ElementRef;
  @ViewChild('outer') outerRing: ElementRef;


  private player: AnimationPlayer;
  angIncr = [120,60,30];
  pstPixels : number;
  pstSize: string;
  vMode : number;
  distUnit : number = 300;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.pstPixels= Math.min( window.innerHeight,window.innerWidth);
    this.vMode = window.innerHeight>window.innerWidth ? 0.6: 0.9;
    this.pstSize = window.innerHeight>window.innerWidth ? "70vw":"100vh";
    this.panzoomConfig = new PanZoomConfig({
      scalePerZoomLevel:Math.pow(6*this.distUnit/(this.pstPixels*this.vMode),0.25),
      freeMouseWheelFactor: 0.001,
      zoomLevels:5,
      neutralZoomLevel:5,
      initialZoomLevel:1,
      initialPanX: 0.05*this.pstPixels,
      initialPanY: 0.05*this.pstPixels
    });
    if(this.panZoomAPI) this.panZoomAPI.resetView()
  }

  constructor(private pstService : SkillTreeService, private animationBuilder: AnimationBuilder) {
    this.onResize()

   }
  ngOnInit(): void {
    this.subscriptions.push(
      this.pstService.getTree().subscribe(
        (value) =>{
          this.tree = value;
          [this.tree.innerRing,this.tree.midRing,this.tree.outerRing].forEach(tree => {
            tree.forEach(subtree =>{
              subtree.nodes.forEach(skill => {
                this.skills[skill.name] = skill;
                this.highlighted[skill.name] = false;
              });
            });
          });
        }
      )
    )
    this.subscriptions.push( this.panzoomConfig.api.subscribe( (api: PanZoomAPI) => this.panZoomAPI = api ));
  }
  ngAfterViewInit(): void {
    var source = fromEvent(this.searchBar.nativeElement, 'keyup');
    this.subscriptions.push(source.pipe(debounceTime(1200)).subscribe((c) =>
        {
            this.highlightNodes(this.searchedTerm);
        }
        ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
  showTooltip(e : MouseEvent, name : string){
    const tooltip = this.tooltips.find(element => element.skill.name == name);
    tooltip.toggleDisplay();
    tooltip.setPosition(e.pageX+5,e.pageY+5);
  }
  hideTooltip(name : string){
    this.tooltips.find(element => element.skill.name == name).toggleDisplay()
  }
  getColor(category: PassiveCategories){
    switch(category){
      case PassiveCategories.PASSIVE_MAGIC:
        return "blue"
      case PassiveCategories.PASSIVE_MELEE:
        return "red"
      case PassiveCategories.PASSIVE_TANK:
        return "red"
      case PassiveCategories.PASSIVE_RANGED:
        return "green"
      default:
        throw Error(`Category unknown ${category}`)
    }
  }

  getPath(A: PassiveTreeNode, B: string, ring : number , rot: number){
    if(this.skills[B]){
      const coordA = this.utils.getCoords(A,ring,rot, this.distUnit);
      const coordB = this.utils.getCoords(this.skills[B],ring,rot, this.distUnit);

      return `M ${coordA.x} ${coordA.y} L ${coordB.x} ${coordB.y}`
    }else{
      const coordA = this.utils.getCoords(A,ring,rot, this.distUnit);
      const angPosB = this.utils.getAngPosFromLitteral(B,ring==0)
      const coordB = {x:this.utils.getCoordsXFromAngPos(angPosB.ang, angPosB.pos,ring,rot, this.distUnit),
                      y:this.utils.getCoordsYFromAngPos(angPosB.ang, angPosB.pos,ring,rot, this.distUnit)};
       return `M ${coordA.x} ${coordA.y} L ${coordB.x} ${coordB.y}`
    }
  }
  resetHighlights(){
    Object.entries<boolean>(this.highlighted).forEach((key) =>{
      this.highlighted[key[0]]=false;
    })
  }

  highlightNodes(term: string){

    this.resetHighlights();
    if(term.length < 3){
      return;
    }
    Object.entries<PassiveTreeNode>(this.skills).forEach((key) =>{
      key[1].eim.forEach((eim) =>{
        if(eim.desc.toLocaleLowerCase().includes(term.toLocaleLowerCase())){
          this.highlighted[key[1].name] = true;
        }
      })
    })
  }
  createPlayer() {
    let animationFactory;

      animationFactory = this.animationBuilder
        .build([
          style({ transform: `rotate(${this.lastRadians[this.ringSelected]}deg)` }),
          animate("1200ms 50ms ease-in-out", style({ transform: `rotate(${this.radians[this.ringSelected]}deg)` }))
        ]);

    this.player = animationFactory.create(this.rings.toArray()[this.ringSelected].nativeElement);
    this.player.onDone(() => {
      this.ctrlDisabled = false;
    })
    this.player.onStart(() => {
      this.ctrlDisabled = true;
    })
  }

  turn(way : number) {
      this.lastRadians[this.ringSelected] = this.radians[this.ringSelected];
      this.radians[this.ringSelected] = this.lastRadians[this.ringSelected]+way*this.angIncr[this.ringSelected];
      this.createPlayer();
      this.player.play();
  }
  recenterView(){
    this.panZoomAPI.resetView()
  }
  setSelected(sel : number){
    this.ringSelected = sel;
  }
}
