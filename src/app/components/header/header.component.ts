import { Component, Input, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgScrollbar } from 'ngx-scrollbar';
import { heads } from './heads';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faBars = faBars;

  isMobile: boolean = false;

  links = [
    "Home",
    "Projects",
    "Music",
    "Blog",
    "Contact"
  ];

  @Input() scrollbar: NgScrollbar | undefined;

  title: string = "brandon dcruz is ";
  headers: string[] = heads;

  constructor() { }

  ngOnInit(): void {
  }

  move(id: string): void {
    if(!this.scrollbar) {
      if(id === "Blog") {
        window.location.href = "/blog";
      }
      else {
        window.location.href = "/";
      }
      return;
    }

    switch(id) {
      case "Music":
      case "Projects":
        this.scrollbar?.scrollToElement(`#${id}Label`);
        break;
      default:
        this.scrollbar?.scrollToElement(`#app${id}`);
        break;
    }
  }
}
