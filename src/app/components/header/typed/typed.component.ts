import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-typed',
  templateUrl: './typed.component.html',
  styleUrls: ['./typed.component.scss']
})
export class TypedComponent implements OnInit {

  @Input() text: string = "";
  @Input() array: string[] = [];

  // values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
  i = 0;
  a = 0;
  isBackspacing = false;
  isParagraph = false;

  // Speed (in milliseconds) of typing.
  speedForward = 250; //Typing Speed
  speedWait = 2500; // Wait between typing and backspacing
  speedBetweenLines = 2000; //Wait between first and second lines
  speedBackspace = 100; //Backspace Speed

  constructor() { }

  ngOnInit(): void {
    this.a = Math.floor(Math.random() * (this.array.length - 1));
    this.typeWriter(this.array);
  }

  typeWriter(ar: string[]) {
    const element = document.querySelector("#output");
    const aString = ar[this.a];
    if(!element) return;

    const eHeader = element.children.item(0) //Header element
    const eParagraph = element.children.item(1); //Subheader element

    if(!eHeader || !eParagraph) return;
    
    // Determine if animation should be typing or backspacing
    if (!this.isBackspacing) {
      
      // If full string hasn't yet been typed out, continue typing
      if (this.i < aString.length) {
        
        // If character about to be typed is a pipe, switch to second line and continue.
        if (aString.charAt(this.i) == "|") {
          this.isParagraph = true;
          eHeader.classList.remove("cursor");
          eParagraph.classList.add("cursor");
          this.i++;
          setTimeout(() =>{ this.typeWriter(ar); }, this.speedBetweenLines);
          
        // If character isn't a pipe, continue typing.
        } else {
          // Type header or subheader depending on whether pipe has been detected
          if (!this.isParagraph) {
            eHeader.innerHTML = eHeader.innerHTML + aString.charAt(this.i);
          } else {
            eParagraph.innerHTML = eParagraph.innerHTML + aString.charAt(this.i);
          }
          this.i++;
          setTimeout(() =>{ this.typeWriter(ar); }, this.speedForward);
        }
        
      // If full string has been typed, switch to backspace mode.
      } else if (this.i == aString.length) {
        
        this.isBackspacing = true;
        setTimeout(() =>{ this.typeWriter(ar); }, this.speedWait);
        
      }
      
    // If backspacing is enabled
    } else {
      
      // If either the header or the paragraph still has text, continue backspacing
      if (eHeader.innerHTML.length > 0 || eParagraph.innerHTML.length > 0) {
        
        // If paragraph still has text, continue erasing, otherwise switch to the header.
        if (eParagraph.innerHTML.length > 0) {
          eParagraph.innerHTML = eParagraph.innerHTML.substring(0, eParagraph.innerHTML.length - 1);
        } else if (eHeader.innerHTML.length > 0) {
          eParagraph.classList.remove("cursor");
          eHeader.classList.add("cursor");
          eHeader.innerHTML = eHeader.innerHTML.substring(0, eHeader.innerHTML.length - 1);
        }
        setTimeout(() =>{ this.typeWriter(ar); }, this.speedBackspace);
      
      // If neither head or paragraph still has text, switch to next quote in array and start typing.
      } else { 
        
        this.isBackspacing = false;
        this.i = 0;
        this.isParagraph = false;
        // New random word
        this.a = Math.floor(Math.random() * (this.array.length - 1));
        setTimeout(() =>{ this.typeWriter(ar); }, 50);
        
      }
    }
  }
}
