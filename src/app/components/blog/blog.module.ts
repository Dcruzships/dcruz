import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../header/header.module';
import { BlogComponent } from './blog.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ArticleComponent } from './article/article.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [BlogComponent, SideNavComponent, ArticleComponent, LoadingComponent],
  imports: [
    CommonModule,
    HeaderModule,
    NgScrollbarModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ]
})
export class BlogModule { }
