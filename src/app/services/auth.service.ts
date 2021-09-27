import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KJUR } from 'jsrsasign';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// We're gonna try generating our own JWT from the google auth servers...
// https://stackoverflow.com/questions/28751995/how-to-obtain-google-service-account-access-token-javascript
// Here we gooooooo
// const pHeader = {"alg":"RS256","typ":"JWT"};
// const sHeader = JSON.stringify(pHeader);
// let pClaim: any = {};
// pClaim.aud = "https://www.googleapis.com/oauth2/v3/token";
// pClaim.scope = "https://www.googleapis.com/auth/analytics.readonly";
// pClaim.iss = "<serviceAccountEmail@developer.gserviceaccount.com";
// pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
// pClaim.iat = KJUR.jws.IntDate.get("now");

// const sClaim = JSON.stringify(pClaim);
// const key = credentials.private_key;
// const sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Uses jsrsasign to generate a signed JWT for the Google API
   * @returns signed JWT
   */
  generateJWT(): string {
    const iss = environment.BLOG_CLIENT_EMAIL;
    const key = environment.BLOG_PRIVATE_KEY;

    const pClaim: any = {};
    const pHeader = {"alg":"RS256","typ":"JWT"};
    const sHeader = JSON.stringify(pHeader);
    pClaim.aud = "https://oauth2.googleapis.com/token";
    pClaim.scope = "https://www.googleapis.com/auth/drive";
    pClaim.exp = KJUR.jws.IntDate.get("now + 1hour");
    pClaim.iat = KJUR.jws.IntDate.get("now");
    pClaim.iss = iss;
    const sClaim = JSON.stringify(pClaim);
    const sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);
    return sJWS;
  }

  /**
   * Get a token by sending a POST request to google's servers
   * @returns an access token, hopefully
   * ...holy shit it actually fucking works
   */
  getToken(): Observable<any> {
    const sJWS = this.generateJWT();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];

    urlEncodedDataPairs.push(
      `${encodeURIComponent("grant_type")}=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}`);
    urlEncodedDataPairs.push(`${encodeURIComponent("assertion")}=${encodeURIComponent(sJWS)}`);
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    let heads = new HttpHeaders();
    heads = heads.set('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post('https://www.googleapis.com/oauth2/v3/token', urlEncodedData, {
      headers: heads
    });
  }
}
