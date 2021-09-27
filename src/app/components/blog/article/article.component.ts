import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../articles';

@Component({
  selector: 'article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger('fadeSlideUpDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-75px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
      ])
    ]),
  ]
})
export class ArticleComponent implements OnInit {
  @Input() article?: Article;

  constructor() { }

  ngOnInit(): void {
  }

}
