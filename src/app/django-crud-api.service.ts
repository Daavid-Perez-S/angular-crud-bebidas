import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DjangoCrudApiService {

  serverURL = 'http://178.128.152.244:8000/api/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllBebidas(): Observable<any> {
    return this.http.get(`${this.serverURL}/bebidas/`)
  }

  getBebidaById(id): Observable<any> {
    return this.http.get(`${this.serverURL}/bebidas/${id}`)
  }

  updateBebida(id, bebida): Observable<any> {
    let data = JSON.stringify(bebida)
    return this.http.put(`${this.serverURL}/bebidas/${id}`, data, this.httpOptions)
  }

  deleteBebida(id): Observable<any> {
    return this.http.delete(`${this.serverURL}/bebidas/${id}`, this.httpOptions)
  }

  addBebida(bebida): Observable<any> {
    return this.http.post(`${this.serverURL}/bebidas/`, bebida)
  }
}
