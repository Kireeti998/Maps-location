import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsComponent } from './maps/maps.component';
import { LocatorComponent } from './maps/locator/locator.component';
import { ListComponent } from './maps/list/list.component';

const routes: Routes = [
  {
    path: 'maps',
    component: MapsComponent,
    children: [
      {
        path: 'locator',
        component: LocatorComponent
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  },
  { path: '', redirectTo: 'maps/locator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
