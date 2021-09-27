import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { TypedComponent } from './typed/typed.component';

@NgModule({
  declarations: [HeaderComponent, TypedComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatMenuModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
