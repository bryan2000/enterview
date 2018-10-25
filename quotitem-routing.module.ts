import { NgModule } from '@angular/core';

import { RouterModule,Routes} from '@angular/router';

import {QuotitemComponent} from './quotitemlist/quotitem.component';
import {DialogdeleteComponent} from './dialogdelete/dialogdelete.component';



const quotRoutes: Routes = [
  {path:'quot-item', component:QuotitemComponent},
  {path:'dialog-delete',component:DialogdeleteComponent},
  {path:'', redirectTo:'dialog-delete', pathMatch:'full'}
];


@NgModule({
  imports: [
  RouterModule.forChild(quotRoutes),
  ],
  exports: [RouterModule],
})
export class QuotitemRoutingModule { }
