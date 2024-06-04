import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Novelnameurl, TopByTag } from '../models/novelnameurl';
import { TagsNovel } from '../models/listchapters';
import { ListChaptersResponse } from '../models/listchapters';
import { Observable } from 'rxjs';
import { comentario } from '../models/comment';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApicallService {
  private apiUrlRequest: string = '';
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}
  //////////////////////////////////////////////////////////////////////

  getTags() {
    this.apiUrlRequest = `${this.url}/novels/tags`;
    return this.http.get<TagsNovel[]>(this.apiUrlRequest);
  }

  //////////////////////////////////////////////////////////////////////

  getNovels() {
    this.apiUrlRequest = `${this.url}/novels`;
    return this.http.get<Novelnameurl[]>(this.apiUrlRequest);
  }

  getRecentUpload() {
    this.apiUrlRequest = `${this.url}/novels/recent-uploaded`;
    return this.http.get<Novelnameurl[]>(this.apiUrlRequest);
  }

  getTopOneByTag() {
    this.apiUrlRequest = `${this.url}/novels/top-one-by-tag`;
    return this.http.get<Novelnameurl[]>(this.apiUrlRequest);
  }

  getTopTenByTag() {
    this.apiUrlRequest = `${this.url}/novels/top-ten-by-tag`;
    return this.http.get<TopByTag[]>(this.apiUrlRequest);
  }

  ////////////////////////////////////////////////////////////////////////

  getChapters(urlName?: string) {
    this.apiUrlRequest = `${this.url}/novels/${urlName}`;
    return this.http.get<ListChaptersResponse>(this.apiUrlRequest);
  }

  ////////////////////////////////////////////////////////////////////////

  getChapterContent(
    urlName: string,
    capNro: number,
    language: string,
  ): Observable<any> {
    let token = sessionStorage.getItem('authToken');

    console.log(token);
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const apiUrlRequest = `${this.url}/novels/${urlName}/${capNro}/${language}`;
    return this.http.get<any>(apiUrlRequest, { headers });
  }

  getRecentAccess(): Observable<any> {
    let token = sessionStorage.getItem('authToken');
    console.log(token);
    let headers = new HttpHeaders();
    let apiUrlRequest;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      apiUrlRequest = `${this.url}/novels/library`;
    } else {
      return new Observable();
    }
    return this.http.get<any>(apiUrlRequest, { headers });
  }

  validateToken(): Observable<any> {
    let token;
    token = sessionStorage.getItem('authToken');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const apiUrlRequest = `${this.url}/auth/validate`;
    return this.http.get<any>(apiUrlRequest, { headers });
  }

  postComment(
    comentario: comentario,
    urlName: string,
    capNro: number,
    language: string,
  ): Observable<any> {
    const apiUrlRequest = `${this.url}/novels/${urlName}/${capNro}/${language}/comentario`;
    return this.http.post(apiUrlRequest, comentario);
  }

  getComment(urlName: string, capNro: number, language: string) {
    this.apiUrlRequest = `${this.url}/novels/${urlName}/${capNro}/${language}/comentario `;
    return this.http.get<comentario[]>(this.apiUrlRequest);
  }

  postRegister(formData: {
    name: string | null;
    email: string | null;
    password: string | null;
  }): Observable<any> {
    const apiUrlRequest = `${this.url}/auth/register`;
    return this.http.post(apiUrlRequest, formData);
  }

  postLogin(credentials: { email: string; password: string }): Observable<any> {
    const apiUrlRequest = `${this.url}/auth/login`;
    return this.http.post(apiUrlRequest, credentials);
  }
}
