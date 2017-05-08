import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderByPipe } from './order-by.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    OrderByPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    OrderByPipe
  ]
})
export class SharedModule {}
