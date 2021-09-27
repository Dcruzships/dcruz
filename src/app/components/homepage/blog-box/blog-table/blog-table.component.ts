import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { allArticles, PseudoArt } from 'src/app/components/blog/articles';

@Component({
  selector: 'app-blog-table',
  templateUrl: './blog-table.component.html',
  styleUrls: ['./blog-table.component.scss']
})
export class BlogTableComponent implements OnInit {

  articles: PseudoArt[] = allArticles;

  displayedColumns: string[] = ['date', 'title'];
  dataSource = new MatTableDataSource<PseudoArt>(this.articles);

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PseudoArt>(this.articles);
  }

  toBlog(): void {
    window.location.href = "/blog";
  }
}
