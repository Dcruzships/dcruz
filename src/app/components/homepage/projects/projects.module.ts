import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { SwiperModule } from 'swiper/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgScrollbarModule } from 'ngx-scrollbar';



@NgModule({
  declarations: [
    ProjectsComponent,
    ShowcaseComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    FontAwesomeModule,
    NgScrollbarModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
