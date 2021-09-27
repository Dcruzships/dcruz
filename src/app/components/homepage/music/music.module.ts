import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { MusicComponent } from './music.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MusicComponent,
    VisualizerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    FontAwesomeModule
  ],
  exports: [
    MusicComponent
  ]
})
export class MusicModule { }
