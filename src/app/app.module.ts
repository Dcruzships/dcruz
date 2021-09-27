import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from './components/homepage/homepage.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BlogModule } from './components/blog/blog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleService } from './services/google.service';
import { BlogTableComponent } from './components/homepage/blog-box/blog-table/blog-table.component';
import { BlogBoxModule } from './components/homepage/blog-box/blog-box.module';
import { ShowcaseComponent } from './components/homepage/projects/showcase/showcase.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomepageModule,
    BlogModule,
    NgScrollbarModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [GoogleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
