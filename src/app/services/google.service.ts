import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private httpClient: HttpClient) {
  }

  getFiles(token: string): Observable<any> {
    return this.httpClient.get(`https://www.googleapis.com/drive/v2/files?access_token=${token}`);
  }

  /**
   * Gets a text file from a doc id
   * ex. https://docs.google.com/feeds/download/documents/export/Export?id=1yLOVtNh1eUbsOJhPzFLkN9Seb-jbiFw7evGTpsahcbM&exportFormat=txt
   * @param docURL 
   * @returns 
   */
  getDoc(docID: string, token: string): Observable<any> {
    let heads = new HttpHeaders();
    heads = heads.set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(`https://docs.google.com/feeds/download/documents/export/Export?id=${docID}&exportFormat=txt`, {
      headers: heads,
      responseType: 'text'
    });
  }

}
