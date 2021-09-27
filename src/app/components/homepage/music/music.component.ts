import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faAngleLeft, faAngleRight, faPauseCircle, faPlayCircle, faRandom, faSync, faVolumeDown, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { Subscriber, Observable, timer } from 'rxjs';
import { Track, tracks } from './tracks';

const songs: Track[] = tracks;

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  faLeft = faAngleLeft;
  faRight = faAngleRight;
  faPlay = faPlayCircle;
  faPause = faPauseCircle;
  faRandom = faRandom;
  faSync = faSync;
  faVolumeUp = faVolumeUp;
  faVolumeDown = faVolumeDown;
  faVolumeMute = faVolumeMute;

  @ViewChild('audio')
  audioPlayer!: ElementRef;

  position: number = 0;
  positionObserver: Subscriber<string> | any;
  _position: Observable<string> = new Observable<string>(observer => {
    this.positionObserver = observer.next("0:00");
  });
  duration: number = 0;
  _duration: string = "0:00";

  track: Track = songs[0];
  trackNum: number = 0;
  time: number = 0;
  isPlaying: boolean = false;
  isSeeking: boolean = false;

  seekValue: number = 0;
  sliderPos: number = 0;
  loop: boolean = false;
  shuffle: boolean = true;
  volume: number = 30;

  constructor() { }

  ngOnInit(): void {
    // Random track on startup
    this.trackNum = Math.floor(Math.random() * (songs.length - 1));
    this.track = songs[this.trackNum];
  }

  /**
   * Seek to the time when the slider is changed
   */
  onSliderChange(): void {
    // Advanced algebra right here
    let newPos = (this.sliderPos / 100) * this.duration;
    newPos = Math.round(newPos);
    this.seekValue = newPos;
    this.isSeeking = false;
    this.audioPlayer.nativeElement.currentTime = newPos / 1000;
    this.updatePosition();
  }

  /**
   * When the slider's moving, stop the timer updates and set isSeeking to true
   */
  onSliderMove(): void {
    this.resetPosition(false);
    this.isSeeking = true;
  }

  /**
   * Used with mat-slider to print value above seeker
   * @param value value of slider
   * @returns format time for slider pos
   */
  formatLabel(value: number)  {
    if(!this.duration) return "0:00";
    value = Math.round((value / 100) * this.duration);
    return this.formatTime(value);
  }

  playPause(): void {
    this.isPlaying = !this.isPlaying;
    if(this.isPlaying){
      this.audioPlayer.nativeElement.play();
      this.updatePosition();
    } else {
      this.audioPlayer.nativeElement.pause();
      this.resetPosition(false);
    }
  }

  changeTrack(num: number): void {
    if(this.isPlaying) this.playPause();
    if(this.shuffle) this.trackNum = Math.floor(Math.random() * (songs.length - 1));
    else this.trackNum += num;
    if(this.trackNum >= songs.length) this.trackNum = 0;
    if(this.trackNum < 0) this.trackNum = (songs.length - 1);
    this.track = songs[this.trackNum];
    this.audioPlayer.nativeElement.load();
    if(!this.isPlaying) this.playPause();
  }

    /**
   * Uses window player to get the current position every .5 seconds
   * @param position the starting position
   */
  updatePosition(): void {
    this._position = new Observable<string>(observer => {
      this.positionObserver = timer(500, 500).subscribe(() => {
        if(!this.isSeeking) {
          this.position = this.audioPlayer.nativeElement.currentTime * 1000;
          this.duration = this.audioPlayer.nativeElement.duration * 1000;
        } else {
          this.position = this.seekValue;
        }
        observer.next(this.formatTime(this.position));
        this._duration = this.formatTime(this.duration);
        this.sliderPos = (this.position / this.duration) * 100;
      });
    });
  }

  /**
   * Format a given milisecond value into a string with leading 0s
   * @param miliseconds given time in ms
   */
  formatTime(miliseconds: number): string {
    if(!miliseconds || miliseconds < 1000) {
      return `0:00`;
    }

    let seconds: number | string = Math.floor((miliseconds / 1000) % 60);
    let minutes: number | string = Math.floor((miliseconds / (1000 * 60)) % 60);

    // Format each section with a leading 0 if needed
    // minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    // If it's more than an hour, return the hour too. Otherwise, just the min:sec
    return `${minutes}:${seconds}`;
  }

  /**
   * Helper function to reset _position to 0:00
   * @param reset whether to change the timer back to 0:00 or not
   */
  resetPosition(reset: boolean): void {
    this.positionObserver?.unsubscribe();
    if(reset) {
      this._position = new Observable<string>(observer => {
        this.positionObserver = observer.next("0:00");
      });
      this.position = 0;
    }
  }

}
