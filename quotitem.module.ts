import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BaseMaterialModule} from '../material-module';


import {QuotitemComponent,Quotitemdialog,Quotitemprint } from './quotitemlist/quotitem.component'


import {QuotitemRoutingModule} from './quotitem-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
   BaseMaterialModule,

    QuotitemRoutingModule
  ],
  declarations: [
    
    QuotitemComponent,
    
    Quotitemdialog,
    Quotitemprint,
  ],

    entryComponents: [
      QuotitemComponent,      
      Quotitemdialog,
      Quotitemprint,
    ],
})
export class QuotitemModule { }
