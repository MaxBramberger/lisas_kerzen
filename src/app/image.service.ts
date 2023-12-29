import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  pathsObservable: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  getImagePaths(category: string): Observable<string[]> {
    return this.http.get<string[]>('api/images/'+category);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('api/categories')
  }
}
