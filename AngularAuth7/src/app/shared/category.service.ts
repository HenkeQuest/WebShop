import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly rootURL = "http://localhost:62921/api";

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get(this.rootURL + "/Category").toPromise();
  }
}
