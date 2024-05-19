import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface PathByCategory {
  baptism: string[];
  birthday: string[];
  christmas: string[];
  communion: string[];
  easter: string[];
  funeral: string[];
  general: string[];
  marriage: string[];
  confirmation: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  pathsObservable: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  getImagePaths(category: string): Observable<string[]> {
    return this.http.get<string[]>('api/images/' + category);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('api/categories');
  }

  getPaths(): Observable<PathByCategory> {
    return this.http.get<PathByCategory>('assets/paths.json');
  }
}
