import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillTreeComponent } from './components/skill-tree/skill-tree.component';
import { SkillTooltipComponent } from './components/skill-tooltip/skill-tooltip.component';
import {Ng2PanZoomModule} from 'ng2-panzoom'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RingSelectorComponent } from './components/ring-selector/ring-selector.component';
import { BuildViewComponent } from './components/build-view/build-view.component'
import { FormsModule } from '@angular/forms';
import { EimViewerComponent } from './components/eim-viewer/eim-viewer.component';
import { EimFormatterPipe } from './pipes/eim-formatter.pipe';
import { EimListEntryComponent } from './components/eim-viewer/eim-list-entry/eim-list-entry.component';
import { EimValueExtractorPipe, EimUnitExtractorPipe } from './pipes/eim-value-extractor.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SkillTreeComponent,
    SkillTooltipComponent,
    RingSelectorComponent,
    BuildViewComponent,
    EimViewerComponent,
    EimFormatterPipe,
    EimListEntryComponent,
    EimValueExtractorPipe,
    EimUnitExtractorPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2PanZoomModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
