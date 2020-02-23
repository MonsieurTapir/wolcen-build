import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildViewComponent } from './components/build-view/build-view.component';


const routes: Routes = [{ path: 'pst', component: BuildViewComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
