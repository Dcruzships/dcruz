import { Component, OnInit, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

// deploy with ng deploy --cname=brandondcruz.com

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @ViewChild(NgScrollbar, {static: true}) scrollbar?: NgScrollbar;

  constructor() { }

  ngOnInit(): void {
  }

}
