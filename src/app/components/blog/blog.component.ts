import { Component, OnInit, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleService } from 'src/app/services/google.service';
import { Article } from './articles';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  @ViewChild(NgScrollbar, {static: true}) scrollbar?: NgScrollbar;

  token: string = "";
  driveFiles: any[] = [];
  docs: Article[] = [];

  article?: Article;

  constructor(private googleService: GoogleService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadArticles().then((docs: any) => {
      this.docs = docs;
      this.article = (this.docs) ? this.docs[docs.length - 1] : undefined;
    });
  }

  changeArticle(art: any): void {
    this.article = art;
  }

  loadArticles(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      // We use the auth service to generate a JWT and recieve an access token from Google via HTTP
      // Then we get all the files in the service account's folder and store them for parsing
      this.authService.getToken().subscribe(data => {
        this.token = data.access_token;
        // Get files from GDrive
        this.googleService.getFiles(this.token).subscribe(async data => {
          this.driveFiles = data.items;
          // Create new articles from all docs found
          const docs: any[] = data.items;
          this.parseDocs(docs).then(data => {
            resolve(data);
          });
        });
      });
    })
  }

  /**
   * Parse all drive files into Article class objects
   * @param docs GDrive files array
   * @returns GoogleDrive files -> GoogleDoc files -> Article[]
   */
  parseDocs(docs: any[]): Promise<Article[]> {
    let array: Article[] = [];
    let promises = docs.map(doc => {
      return this.getDoc(doc).then(data => {
        array.push(data);
      }, _reject => {
      });
    });
    return Promise.all(promises).then(data => {
      return array;
    });
  }

  /**
   * Get a Google Doc asynchronously
   * @param doc drive file, must be a Google Doc
   * @returns Google doc parsed as an Article
   */
  getDoc(file: any): Promise<Article> {
    return new Promise((resolve, reject) => {
      if(file.capabilities.canCopy === true) {
        this.googleService.getDoc(file.id, this.token).subscribe(data => {
          const art = new Article(file.id, data, file.createdDate);
          resolve(art);
        }, error => {
          console.log(error);
          reject(null);
        });
      }
      else {
        reject(null);
      }
    });
  }
}
