import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCoffee, faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Article } from '../articles';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  faCoffee = faCoffee;
  faHome = faHome;
  faNewspaper = faNewspaper;

  @Input() articles: Article[] = [];

  @Output() changeArticleEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


}
