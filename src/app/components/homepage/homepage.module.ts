import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontComponent } from './front/front.component';
import { HomepageComponent } from './homepage.component';
import { ContactComponent } from './contact/contact.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HeaderModule } from '../header/header.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MusicModule } from './music/music.module';
import { BlogBoxModule } from './blog-box/blog-box.module';
import { ProjectsModule } from './projects/projects.module';

@NgModule({
  declarations: [
    HomepageComponent,
    FrontComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    HeaderModule,
    FontAwesomeModule,
    MusicModule,
    BlogBoxModule,
    ProjectsModule
  ]
})
export class HomepageModule { }
