import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodSearchService {
  private readonly BASE_URL = 'https://yummly2.p.rapidapi.com';
  private readonly headers = new HttpHeaders({
    'x-rapidapi-key': environment.yummlyApiKey,
    'x-rapidapi-host': 'yummly2.p.rapidapi.com'
  });

  constructor(private http: HttpClient) {}

  searchFeed(query: string, params: any = {}): Observable<any> {
    const httpParams = new HttpParams()
      .set('q', query)
      .set('start', params.start || '0')
      .set('maxResult', params.maxResult || '18')
      .set('maxTotalTimeInSeconds', params.maxTotalTimeInSeconds || '7200')
      .set('allowedAttribute', params.allowedAttribute || 'diet-lacto-vegetarian,diet-low-fodmap')
      .set('FAT_KCALMax', params.FAT_KCALMax || '1000');

    return this.http.get(`${this.BASE_URL}/feeds/search`, {
      headers: this.headers,
      params: httpParams
    });
  }

  getAutoComplete(query: string): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('start', '0')
      .set('maxResult', '5');

    return this.http.get(`${this.BASE_URL}/feeds/auto-complete`, {
      headers: this.headers,
      params
    });
  }

  getFeedsList(limit: number = 24, start: number = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('start', start.toString());

    return this.http.get(`${this.BASE_URL}/feeds/list`, {
      headers: this.headers,
      params
    });
  }

  getFeedSimilarities(feedId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/feeds/list-similarities/${feedId}`, {
      headers: this.headers
    });
  }

  getTagsList(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/tags/list`, {
      headers: this.headers
    });
  }

  getReviewsList(feedId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/reviews/list/${feedId}`, {
      headers: this.headers
    });
  }
} 