import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  pathsObservable: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

  constructor(private http: HttpClient) {}

  getImagePaths(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/files')
  }
}
