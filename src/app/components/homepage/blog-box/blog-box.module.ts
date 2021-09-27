import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogBoxComponent } from './blog-box.component';
import { LogTableComponent } from './log-table/log-table.component';
import { CdkDetailRowDirective } from './row.directive';
import { BlogTableComponent } from './blog-table/blog-table.component';
import { MatTableModule } from '@angular/material/table'; 



@NgModule({
  declarations: [
    BlogBoxComponent,
    LogTableComponent,
    CdkDetailRowDirective,
    BlogTableComponent
  ],
  imports: [
    MatTableModule,
    CommonModule
  ],
  exports: [
    BlogBoxComponent
  ]
})
export class BlogBoxModule { }
