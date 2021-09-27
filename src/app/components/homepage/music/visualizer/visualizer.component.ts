import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

// Typed array to hold the audio frequency data
const NUM_SAMPLES = 256;

// Create a new array of 8-bit integers (0-255)
let audioData = new Uint8Array(NUM_SAMPLES/2);

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit, OnChanges {
  @Input() isPlaying: boolean = false;

  isAnimating: boolean = false;
  animationLoopID: number = 0;

  @ViewChild("canvasElement", { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;
  drawCtx!: CanvasRenderingContext2D;
  
  audioElement!: HTMLMediaElement;
  audioCtx!: AudioContext;
  sourceNode!: MediaElementAudioSourceNode;
  analyserNode!: AnalyserNode;
  gainNode!: GainNode;

  invert: boolean = false;
  noise: boolean = false;
  plain: boolean = true;
  waveSpace: number = 0;
  waveRange: number = 0;
  maxRadius = 200;

  mousePos = {x: 500, y: 250};

  width: number = 0;
  height: number = 0;

  setup: boolean = false;

  constructor(private elRef: ElementRef<HTMLMediaElement>) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.isPlaying.currentValue === true && changes.isPlaying.previousValue === false) this.beginVisualizer();
    if(changes.isPlaying.currentValue === false && changes.isPlaying.previousValue === true) this.stopVisualizer();
  }

  ngOnInit(): void {
    const audio = this.elRef.nativeElement.parentNode?.parentNode?.querySelector("audio");
    if(audio) {
      this.audioElement = audio;
      this.setupCanvas();
      this.resizeCanvas();
      this.beginInactive();
    }
  }

  beginInactive(): void {
    this.drawCtx.clearRect(0, 0, this.drawCtx.canvas.clientWidth, this.drawCtx.canvas.clientHeight);
    this.isAnimating = true;
    this.inactive();
  }

  inactive(): void {
    this.inactiveText();
    this.animationLoopID = window.requestAnimationFrame(this.inactive.bind(this));
  }

  inactiveText(): void {
    this.drawCtx.clearRect(0, 0, this.drawCtx.canvas.clientWidth, this.drawCtx.canvas.clientHeight);
    this.drawCtx.font = '48px serif';
    this.drawCtx.strokeText("inactive...", this.width / 2 - 80, this.height / 2);
  }

  setupWebaudio(): void {
    if(!this.audioElement) return;

    const AudioContext = window.AudioContext;
    this.audioCtx = new AudioContext();

    // 3 - create an a source node that points at the <audio> element
    this.sourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
    // 4 - create an analyser node
    this.analyserNode = this.audioCtx.createAnalyser();

    /*
    We will request NUM_SAMPLES number of samples or "bins" spaced equally
    across the sound spectrum.

    If NUM_SAMPLES (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz,
    the third is 344Hz. Each bin contains a number between 0-255 representing
    the amplitude of that frequency.
    */

    // fft stands for Fast Fourier Transform
    this.analyserNode.fftSize = NUM_SAMPLES;

    // 5 - create a gain (volume) node
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 1;

    // 6 - connect the nodes - we now have an audio graph
    this.sourceNode.connect(this.analyserNode);
    this.analyserNode.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
  }

  setupCanvas(): void {
    this.drawCtx = <CanvasRenderingContext2D>this.canvasElement.nativeElement.getContext("2d");
  }

  beginVisualizer(): void {
    // Stop any animations currently going on
    this.stopVisualizer();

    // Hopefully this will stop chrome from yelling about autoplaying...
    if(!this.setup) {
      this.setupWebaudio();
      this.setup = true;
    }
    if(this.audioElement && this.canvasElement && !this.isAnimating) {
      this.drawCtx.clearRect(0, 0, this.drawCtx.canvas.clientWidth, this.drawCtx.canvas.clientHeight);
      this.isAnimating = true;
      this.render();
    }
  }

  stopVisualizer(): void {
    window.cancelAnimationFrame(this.animationLoopID);
    this.isAnimating = false;
  }

  render(): void {
    this.update();
    this.animationLoopID = window.requestAnimationFrame(this.render.bind(this));
  }

  update(): void {
    /*
      Nyquist Theorem
      http://whatis.techtarget.com/definition/Nyquist-Theorem
      The array of data we get back is 1/2 the size of the sample rate
    */

    // populate the audioData with the frequency data
    this.analyserNode.getByteFrequencyData(audioData);

    const height = this.canvasElement.nativeElement.height;
    const halfH = height / 2;
    const width = this.canvasElement.nativeElement.width;

    // DRAW!
    this.drawCtx.clearRect(0,0,width,height);

    this.waveSpace = (this.mousePos.x / window.innerWidth) * 8;
    this.waveRange = (this.mousePos.y / window.innerHeight) * 255;

    
    // loop through the data and draw!
    audioData.map((data, i) => {
      const base = (i + .5) * (10 + 5);
      this.drawCtx.beginPath();
      this.drawCtx.strokeStyle = this.makeColor(0, 0, 255, 255);
      this.drawCtx.moveTo(i * (10 + 5), height / 2);
      
      // Top shapes
      switch(data > 156) {
        case true:
          this.drawCtx.lineTo(base - this.waveSpace, halfH - data);
          this.drawCtx.lineTo(base + this.waveSpace, halfH - data);
          break;
        case false:
          this.drawCtx.lineTo(base + this.waveSpace, halfH + data);
          this.drawCtx.lineTo(base - this.waveSpace, halfH + data);
          break;
      }

      this.drawCtx.lineTo((i + 1) * (10 + 5), halfH);
      this.drawCtx.stroke();
      this.drawCtx.closePath();

      this.drawCtx.beginPath();
      this.drawCtx.strokeStyle = this.makeColor(255, 0, 0, 255);
      if(this.invert) { this.drawCtx.strokeStyle = this.makeColor(0, 0, 255, 255); }
      this.drawCtx.moveTo(i * (10 + 5), halfH);

      // Reflections
      switch(data < 156) {
        case true:
          this.drawCtx.lineTo(base - this.waveSpace, halfH - data);
          this.drawCtx.lineTo(base + this.waveSpace, halfH - data);
          break;
        case false:
          this.drawCtx.lineTo(base + this.waveSpace, halfH + data);
          this.drawCtx.lineTo(base - this.waveSpace, halfH + data);
          break;
      }

      this.drawCtx.lineTo((i + 1) * (10 + 5), halfH);
      this.drawCtx.stroke();
      this.drawCtx.closePath();

      // Sun circles
      const percent = data / 255;
      const circleRadius = percent * this.maxRadius + this.waveRange;

      this.drawCtx.beginPath();
      this.drawCtx.fillStyle = this.makeColor(255, 111, 111, 1);
      this.drawCtx.arc(width, 0, circleRadius * .5, 0, 2 * Math.PI, false);
      this.drawCtx.stroke();
      this.drawCtx.closePath();

      this.drawCtx.beginPath();
      this.drawCtx.fillStyle = this.makeColor(255, 111, 111, 1);
      this.drawCtx.arc(width, 0, circleRadius * .5, 0, 2 * Math.PI, false);
      this.drawCtx.stroke();
      this.drawCtx.closePath();

      return data;
    });
  }

  makeColor(red: number, green: number, blue: number, alpha: number): string{
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  resizeCanvas(): void {
    const viz = document.querySelector("#visualizer");
    if(viz) {
      this.width = viz.clientWidth + 4;
      this.height = viz.clientHeight + 4;
    }
    if(this.canvasElement) {
      this.canvasElement.nativeElement.width = this.width;
      this.canvasElement.nativeElement.height = this.height;
    }
    if(this.drawCtx) {
      this.drawCtx.canvas.width = this.width;
      this.drawCtx.canvas.height = this.height;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeCanvas();
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.mousePos = {x: event.clientX, y: event.clientY};
  }

}
